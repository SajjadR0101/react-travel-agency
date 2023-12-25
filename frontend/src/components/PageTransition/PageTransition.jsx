import React from 'react'
import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div initial={{ y: "10%", opacity: 0 }} animate={{ y: "0", opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>{children}</motion.div>
  )
}
