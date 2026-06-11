import { motion } from "framer-motion";

/* Subtle animated grid + drifting violet glow + vignette.
   Purely decorative, sits behind all content. */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-border) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-border) 70%, transparent) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />

      {/* drifting accent glows */}
      <motion.div
        className="absolute -top-40 left-1/4 h-[42rem] w-[42rem] rounded-full blur-[140px]"
        style={{ background: "color-mix(in srgb, var(--color-accent) 22%, transparent)" }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 h-[34rem] w-[34rem] rounded-full blur-[150px]"
        style={{ background: "color-mix(in srgb, var(--color-term-cyan) 12%, transparent)" }}
        animate={{ x: [0, -50, 20, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--color-bg)_100%)]" />
    </div>
  );
}
