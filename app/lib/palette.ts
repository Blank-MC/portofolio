/**
 * JS-side mirror of the design tokens declared in `app/globals.css`.
 * Used where CSS variables cannot reach: Three.js materials, canvas fills,
 * and dynamic inline gradients.
 */
export const palette = {
  obsidian: "#07090d",
  surface: "#0e121a",
  surfaceHover: "#131823",
  borderSubtle: "#1e2634",
  foreground: "#f3f1ed",
  secondary: "#8a93a2",
  gold: "#d4b886",
  goldHover: "#e5cfa5",
  teal: "#2dd4bf",
  tealDeep: "#0f766e",
  goldRgb: "212, 184, 134",
  tealRgb: "45, 212, 191",
  tealDeepRgb: "15, 118, 110",
} as const;
