/**
 * UI/Button.jsx
 * Uniwersalny komponent przycisku z obsługą stylów Primary i Ghost.
 */

import React from "react";

export function PrimaryButton({
  as: Component = "button",
  children,
  className = "",
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function GhostButton({
  as: Component = "button",
  children,
  className = "",
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
