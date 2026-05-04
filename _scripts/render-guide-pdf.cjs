const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const rootDir = path.resolve(__dirname, "..");
const sourcePath = path.join(rootDir, "_docs", "guide-domindynamics.md");
const htmlPath = path.join(rootDir, "_docs", "guide-domindynamics.html");
const pdfPath = path.join(rootDir, "_docs", "guide-domindynamics.pdf");
const logoPath = path.join(rootDir, "src", "assets", "icons", "logo-white.png");

const markdown = fs.readFileSync(sourcePath, "utf8").replace(/^\uFEFF/, "");
const logoDataUri = `data:image/png;base64,${fs.readFileSync(logoPath, "base64")}`;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(value) {
  return value
    .toLocaleLowerCase("pl")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeHref(href) {
  if (!href.startsWith("#")) {
    return href;
  }

  return `#${slugify(decodeURIComponent(href.slice(1)))}`;
}

function renderInline(value) {
  const code = [];
  let html = escapeHtml(value).replace(/`([^`]+)`/g, (_, match) => {
    code.push(`<code>${match}</code>`);
    return `\u0000${code.length - 1}\u0000`;
  });

  html = html
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      return `<a href="${escapeHtml(normalizeHref(href))}">${renderInline(label)}</a>`;
    });

  return html.replace(/\u0000(\d+)\u0000/g, (_, index) => code[Number(index)]);
}

function isTableStart(lines, index) {
  return (
    index + 1 < lines.length &&
    /^\s*\|.+\|\s*$/.test(lines[index]) &&
    /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])
  );
}

function parseTable(lines, index) {
  const tableLines = [];
  while (index < lines.length && /^\s*\|.+\|\s*$/.test(lines[index])) {
    tableLines.push(lines[index]);
    index += 1;
  }

  const rows = tableLines.map((line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim())
  );

  const [head, , ...body] = rows;
  const html = [
    '<div class="table-wrap"><table>',
    "<thead><tr>",
    ...head.map((cell) => `<th>${renderInline(cell)}</th>`),
    "</tr></thead>",
    "<tbody>",
    ...body.flatMap((row) => [
      "<tr>",
      ...row.map((cell) => `<td>${renderInline(cell)}</td>`),
      "</tr>",
    ]),
    "</tbody></table></div>",
  ].join("");

  return { html, index };
}

function renderMarkdown(value) {
  const lines = value.split(/\r?\n/);
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```(\w+)?\s*$/);
    if (fence) {
      const language = fence[1] || "text";
      const codeLines = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        `<pre class="language-${escapeHtml(language)}"><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`
      );
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const raw = heading[2].trim();
      const id = slugify(raw);

      if (level === 1) {
        blocks.push(`<section class="cover" id="${id}">
          <img class="cover-logo" src="${logoDataUri}" alt="DominDynamics">
          <div class="cover-kicker">DominDynamics / przewodnik</div>
          <h1>${renderInline(raw)}</h1>
          <p class="cover-subtitle">Przewodnik techniczno-edukacyjny po strukturze, treści, UI i jakości projektu.</p>
        </section>`);
        index += 1;
        continue;
      }

      const alias = slugify(raw.replace(/\//g, ""));
      const aliasAnchor =
        alias !== id ? `<span class="anchor-alias" id="${alias}"></span>` : "";
      blocks.push(
        `${aliasAnchor}<h${level} id="${id}">${renderInline(raw)}</h${level}>`
      );
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      const table = parseTable(lines, index);
      blocks.push(table.html);
      index = table.index;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(`<aside>${quote.map(renderInline).join("<br>")}</aside>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ""));
        index += 1;
      }
      blocks.push(
        `<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`
      );
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push(
        `<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ol>`
      );
      continue;
    }

    const paragraph = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^```/.test(lines[index]) &&
      !/^>\s?/.test(lines[index]) &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !/^\s*\d+\.\s+/.test(lines[index]) &&
      !isTableStart(lines, index)
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return blocks.join("\n");
}

const body = renderMarkdown(markdown);
const html = `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DominDynamics - przewodnik techniczno-edukacyjny</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 15mm 20mm;
    }

    * {
      box-sizing: border-box;
    }

    html {
      background: #ffffff;
      color: #18181b;
      font-family:
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        "Noto Sans",
        "DejaVu Sans",
        Arial,
        sans-serif;
      font-size: 10.6pt;
      line-height: 1.56;
    }

    body {
      margin: 0;
      background: #ffffff;
    }

    main {
      background:
        radial-gradient(circle at 8% 0%, rgba(24, 24, 27, 0.055), transparent 24rem),
        radial-gradient(circle at 96% 4%, rgba(255, 255, 255, 0.42), transparent 22rem),
        linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
      min-height: 100vh;
      padding: 0;
    }

    .cover {
      background:
        radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.16), transparent 18rem),
        radial-gradient(circle at 86% 26%, rgba(255, 255, 255, 0.08), transparent 19rem),
        linear-gradient(145deg, #000000 0%, #09090b 48%, #18181b 100%);
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin: -18mm -15mm 18mm;
      min-height: 216mm;
      overflow: hidden;
      padding: 28mm 22mm 32mm;
      position: relative;
    }

    .cover::before {
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 18px 18px;
      content: "";
      inset: 0;
      mask-image: radial-gradient(circle at 64% 35%, black 0, transparent 62%);
      opacity: 0.86;
      position: absolute;
    }

    .cover::after {
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.95), rgba(212, 212, 216, 0.18));
      border-radius: 999px;
      bottom: 24mm;
      content: "";
      height: 4px;
      left: 22mm;
      position: absolute;
      width: 50mm;
    }

    .cover-logo {
      height: 21mm;
      left: 22mm;
      object-fit: contain;
      position: absolute;
      top: 28mm;
      width: auto;
      z-index: 1;
    }

    .cover-kicker {
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 999px;
      color: rgba(244, 244, 245, 0.84);
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.16em;
      margin-bottom: 11mm;
      padding: 7px 12px;
      position: relative;
      text-transform: uppercase;
      width: max-content;
      z-index: 1;
    }

    h1 {
      color: #ffffff;
      font-size: 34pt;
      font-weight: 760;
      letter-spacing: -0.05em;
      line-height: 0.96;
      position: relative;
      z-index: 1;
      margin: 0;
    }

    .cover-subtitle {
      color: rgba(228, 228, 231, 0.78);
      font-size: 13pt;
      line-height: 1.45;
      margin: 7mm 0 0;
      max-width: 128mm;
      position: relative;
      z-index: 1;
    }

    h2 {
      break-before: page;
      color: #09090b;
      font-size: 23pt;
      font-weight: 760;
      letter-spacing: -0.035em;
      line-height: 1.05;
      margin: 0 0 12pt;
      padding-top: 2mm;
    }

    .cover + h2 {
      break-before: auto;
    }

    h3 {
      color: #27272a;
      font-size: 13.5pt;
      font-weight: 720;
      letter-spacing: -0.015em;
      line-height: 1.25;
      margin: 18pt 0 6pt;
    }

    h3::before {
      background: #71717a;
      border-radius: 999px;
      content: "";
      display: inline-block;
      height: 0.5em;
      margin-right: 0.5em;
      width: 0.5em;
    }

    p {
      margin: 0 0 9pt;
    }

    a {
      color: #18181b;
      font-weight: 650;
      text-decoration: underline;
      text-decoration-color: rgba(24, 24, 27, 0.24);
      text-underline-offset: 2px;
    }

    strong {
      color: #0f172a;
      font-weight: 750;
    }

    code {
      background: #f4f4f5;
      border: 1px solid #e4e4e7;
      border-radius: 5px;
      color: #18181b;
      font-family: "Cascadia Code", "Consolas", monospace;
      font-size: 0.9em;
      padding: 0.08em 0.34em;
    }

    pre {
      background: #050505;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 14px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
      color: #f4f4f5;
      line-height: 1.45;
      margin: 12pt 0 14pt;
      overflow-wrap: anywhere;
      padding: 12pt;
      white-space: pre-wrap;
    }

    pre code {
      background: transparent;
      border: 0;
      color: inherit;
      padding: 0;
    }

    aside {
      background: #f4f4f5;
      border: 1px solid #e4e4e7;
      border-left: 4px solid #18181b;
      border-radius: 14px;
      color: #3f3f46;
      margin: 12pt 0;
      padding: 11pt 12pt;
    }

    ul,
    ol {
      margin: 0 0 11pt 18pt;
      padding: 0;
    }

    li {
      margin: 3pt 0;
      padding-left: 2pt;
    }

    .table-wrap {
      break-inside: avoid;
      margin: 11pt 0 14pt;
      overflow: hidden;
    }

    table {
      border-collapse: collapse;
      box-shadow: 0 0 0 1px #e4e4e7;
      font-size: 8.8pt;
      table-layout: fixed;
      width: 100%;
    }

    th,
    td {
      border: 1px solid #e4e4e7;
      padding: 7px 8px;
      text-align: left;
      vertical-align: top;
      word-break: break-word;
    }

    th {
      background: #09090b;
      color: #fafafa;
      font-weight: 750;
    }

    tr:nth-child(even) td {
      background: #ffffff;
    }

    tr:nth-child(odd) td {
      background: #fafafa;
    }
  </style>
</head>
<body>
  <main>
    ${body}
  </main>
</body>
</html>`;

fs.writeFileSync(htmlPath, html, "utf8");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath.replace(/\\/g, "/")}`, {
    waitUntil: "networkidle",
  });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<div></div>",
    footerTemplate:
      '<div style="width:100%;font:8px Segoe UI,Arial,sans-serif;color:#78716c;padding:0 15mm;display:flex;justify-content:space-between;"><span>DominDynamics</span><span class="pageNumber"></span></div>',
    margin: {
      top: "18mm",
      right: "15mm",
      bottom: "20mm",
      left: "15mm",
    },
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log(`Wrote ${path.relative(rootDir, htmlPath)}`);
  console.log(`Wrote ${path.relative(rootDir, pdfPath)}`);
})();
