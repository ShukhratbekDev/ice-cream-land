'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ResultsSection() {
  return (
    <section 
      className="py-8 sm:py-12 md:py-16"
      aria-labelledby="results-heading"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12"
        >
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 id="results-heading" className="text-2xl sm:text-3xl font-bold">
              Results in numbers
            </h2>
            <div className="space-y-4">
              <p 
                className="text-gray-700 text-sm sm:text-base leading-relaxed"
                tabIndex={0}
              >
                At Ice Cream Land, our mission is to create the finest ice cream that brings happiness to our customers. We
                believe in using only the highest quality ingredients, sourced responsibly and sustainably.
              </p>
              <p 
                className="text-gray-700 text-sm sm:text-base leading-relaxed"
                tabIndex={0}
              >
                Our commitment to innovation means we are always exploring new flavors and techniques to delight your
                taste buds. Most importantly, we are dedicated to providing exceptional customer service and creating a
                welcoming environment for all.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 sm:gap-8"
            role="list"
            aria-label="Key statistics"
          >
            <div 
              className="p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <div 
                role="listitem"
                tabIndex={0}
                aria-label="5.5 million customers served"
              >
                <div className="text-3xl sm:text-4xl font-bold mb-2">5.5M+</div>
                <p className="text-gray-600 text-sm sm:text-base">Customers served</p>
              </div>
            </div>
            <div 
              className="p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <div 
                role="listitem"
                tabIndex={0}
                aria-label="50+ ice cream flavors"
              >
                <div className="text-3xl sm:text-4xl font-bold mb-2">50+</div>
                <p className="text-gray-600 text-sm sm:text-base">Ice cream flavors</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
