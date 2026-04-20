/**
 * ui/Mockups.jsx
 * Komponenty wizualne (SVG) imitujące interfejsy i architekturę.
 */

import React from "react";
import { NoiseOverlay } from "./Cards";

export function MockupChart() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
      <svg viewBox="0 0 400 250" className="h-full w-full">
        <rect width="400" height="250" fill="transparent" />
        <rect x="0" y="0" width="70" height="250" fill="rgba(255,255,255,0.03)" />
        <rect x="15" y="20" width="40" height="4" rx="2" fill="rgba(255,255,255,0.45)" />
        <rect x="15" y="52" width="30" height="2" rx="1" fill="rgba(255,255,255,0.22)" />
        <rect x="15" y="66" width="40" height="2" rx="1" fill="rgba(255,255,255,0.22)" />
        <rect x="90" y="20" width="100" height="6" rx="2" fill="rgba(255,255,255,0.65)" />
        <rect x="90" y="34" width="60" height="3" rx="1" fill="rgba(255,255,255,0.24)" />
        <rect x="90" y="56" width="90" height="50" rx="5" fill="none" stroke="rgba(255,255,255,0.25)" />
        <rect x="185" y="56" width="90" height="50" rx="5" fill="none" stroke="rgba(255,255,255,0.25)" />
        <rect x="280" y="56" width="90" height="50" rx="5" fill="none" stroke="rgba(255,255,255,0.25)" />
        <rect x="100" y="80" width="40" height="12" rx="2" fill="rgba(255,255,255,0.85)" />
        <rect x="195" y="80" width="45" height="12" rx="2" fill="rgba(255,255,255,0.85)" />
        <rect x="290" y="80" width="35" height="12" rx="2" fill="rgba(255,255,255,0.85)" />
        <rect x="90" y="120" width="285" height="110" rx="5" fill="none" stroke="rgba(255,255,255,0.22)" />
        <polyline
          points="105,210 140,180 175,190 210,150 245,160 280,130 315,140 355,110"
          fill="none"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="1.5"
        />
        <polyline
          points="105,220 140,200 175,205 210,190 245,185 280,175 315,170 355,155"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
      </svg>
      <NoiseOverlay />
    </div>
  );
}

export function MockupTopology() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
      <svg viewBox="0 0 400 250" className="h-full w-full">
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.5)" />
          </marker>
        </defs>
        <rect x="160" y="20" width="80" height="40" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.5)" />
        <text x="200" y="38" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)">API Gateway</text>
        <text x="200" y="50" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">v1</text>
        {[
          { x: 40, label: "auth" },
          { x: 135, label: "orders" },
          { x: 230, label: "billing" },
          { x: 325, label: "mail", w: 55 },
        ].map((box, idx) => (
          <g key={idx}>
            <rect x={box.x} y="110" width={box.w || 75} height="40" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.35)" />
            <text x={box.x + (box.w || 75) / 2} y="127" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.8)">{box.label}</text>
            <circle cx={box.x + (box.w || 75) - 10} cy="117" r="2" fill="#4ade80" />
          </g>
        ))}
        <rect x="60" y="190" width="90" height="36" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" />
        <rect x="170" y="190" width="80" height="36" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" />
        <rect x="270" y="190" width="85" height="36" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" />
        <text x="105" y="212" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.65)">postgresql</text>
        <text x="210" y="212" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.65)">redis</text>
        <text x="312.5" y="212" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.65)">queue</text>
        <line x1="175" y1="60" x2="85" y2="108" stroke="rgba(255,255,255,0.3)" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="200" y1="60" x2="172.5" y2="108" stroke="rgba(255,255,255,0.3)" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="225" y1="60" x2="267.5" y2="108" stroke="rgba(255,255,255,0.3)" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="235" y1="60" x2="352.5" y2="108" stroke="rgba(255,255,255,0.3)" strokeWidth="1" markerEnd="url(#arrowhead)" />
      </svg>
      <NoiseOverlay />
    </div>
  );
}
