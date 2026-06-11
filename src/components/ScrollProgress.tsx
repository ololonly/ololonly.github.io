import { motion, useScroll, useSpring } from "framer-motion";

/* Thin violet progress bar fixed to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-term-cyan)]"
      style={{ scaleX }}
    />
  );
}
