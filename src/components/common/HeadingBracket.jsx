/**
 * HeadingBracket — decorative bracket with full top, full left, half right (from top), and half bottom (from left).
 * Usage:
 *   <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
 *     <HeadingBracket />
 *     <h2>Your Heading</h2>
 *   </div>
 */
export default function HeadingBracket({ color = "#f97316", size = 72, thickness = 3, style = {} }) {
  return (
    <div style={{ 
      position: "relative", 
      width: `${size}px`, 
      height: `${size}px`, 
      flexShrink: 0,
      ...style 
    }}>
      {/* Top line — full width */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: `${thickness}px`,
        background: color,
      }} />
      {/* Left line — full height */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: `${thickness}px`, height: "100%",
        background: color,
      }} />
      {/* Right line — half height from top */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: `${thickness}px`, height: "50%",
        background: color,
      }} />
      {/* Bottom line — half width from left */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: "50%", height: `${thickness}px`,
        background: color,
      }} />
    </div>
  );
}