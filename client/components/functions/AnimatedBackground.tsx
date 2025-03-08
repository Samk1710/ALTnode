"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(circle, rgba(29,78,216,0.15) 0%, rgba(30,64,175,0.15) 50%, rgba(17,24,39,0.15) 100%)",
            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(109,40,217,0.15) 50%, rgba(17,24,39,0.15) 100%)",
            "radial-gradient(circle, rgba(2, 59, 68, 0.95) 0%, rgba(111, 13, 230, 0.15) 50%, rgba(17,24,39,0.15) 100%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-xl"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 0.5 + 0.5],
            opacity: [0.1, 0.3],
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
            background: `radial-gradient(circle, rgba(${Math.random() * 255}, ${
              Math.random() * 255
            }, ${Math.random() * 255}, 0.15) 0%, rgba(0, 0, 0, 0) 70%)`,
          }}
        />
      ))}
    </div>
  );
}
