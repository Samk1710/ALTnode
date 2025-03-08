"use client";

import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-8 relative z-10"
      >
        <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
          Decentralized AI Asset Ecosystem
        </h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 text-center text-xl font-semibold"
        >
          Intellectual Property Protection
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6 mb-12"
        >
          <ListItem>Reduces barriers to AI solution development</ListItem>
          <ListItem>Creates new economic opportunities in AI ecosystem</ListItem>
        </motion.ul>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-8 text-center text-2xl font-bold"
        >
          Potential Impact
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-6"
        >
          <ListItem>Accelerates AI innovation</ListItem>
          <ListItem>Provides economic incentives for AI developers</ListItem>
          <ListItem>Increases accessibility of advanced AI technologies</ListItem>
          <ListItem>Promotes a collaborative, open-source approach to AI development</ListItem>
        </motion.ul>
      </motion.div>

      <AnimatedBackground />
    </div>
  )
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      className="flex items-center space-x-3"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-2 h-2 bg-pink-500 rounded-full"
        whileHover={{ scale: 1.5 }}
      />
      <span className="text-lg">{children}</span>
    </motion.li>
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-xl opacity-30"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 0.5 + 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 300 + 50}px`,
            height: `${Math.random() * 300 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
          }}
        />
      ))}
    </div>
  )
}

