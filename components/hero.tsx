'use client';

import { motion } from 'framer-motion';
import { MouseIcon } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';


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
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const HeroSection = () => {
  return (
    <>
      <AuroraBackground 
        className='pb-10' 
      >
        <section className="relative flex flex-col w-full justify-center items-start h-screen px-4 sm:px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className=""
          >
            <div className='flex flex-col md:flex-row md:items-center md:m-10 md:justify-between'>
              
              <div className='flex flex-col mt-6 md:mt-10 items-start '>
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl md:mt-10 lg:text-6xl font-bold mb-4"
                >
                  Lorem Ipsum Dolor Sit
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mb-6 md:mb-8"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis accusantium fuga, autem ab optio eius aut itaque fugit! Officiis, nihil velit? Nostrum aspernatur eum perspiciatis id nesciunt odio. Unde, cum.
                </motion.p>
              </div>
              <motion.img 
                src="./meow2.png" 
                className="w-full h-auto md:w-2/3 lg:w-1/2 mt-4 md:mt-0" 
                alt="Decorative image" 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="absolute right-4 bottom-6 sm:right-10 sm:bottom-8 md:bottom-12 flex justify-center items-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="text-2xl sm:text-3xl md:text-4xl grid items-center"
            >
              <div className='text-2xl sm:text-3xl md:text-5xl'>🐥</div>
            </motion.div>
          </motion.div>
        </section>
      </AuroraBackground>
    </>
  );
};

export default HeroSection;