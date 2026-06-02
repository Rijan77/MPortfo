import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE_OUT = 'easeOut' as const;
const EASE_IN  = 'easeIn'  as const;

const variants: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE_OUT } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.22, ease: EASE_IN } },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
