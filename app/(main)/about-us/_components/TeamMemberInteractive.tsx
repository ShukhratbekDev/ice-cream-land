'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function TeamMemberInteractive({ children }: { children: ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
}
