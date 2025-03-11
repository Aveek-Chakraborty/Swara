'use client'
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import React from "react";








const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/hero"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Index() {
  return (
    <div className="bg-zinc-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Navbar />
        </motion.div>
        <motion.div variants={itemVariants}>
          <HeroSection />
        </motion.div>
      </motion.div>




    </div>

  );
}