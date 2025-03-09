"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/functions/NavBar";
import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/functions/AnimatedBackground";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import Link from "next/link";
import { Vortex } from "../components/ui/vortex";
import ShinyText from '../components/ui/ShinyText/ShinyText';
import Button from "@/components/ui/landing-button";

export default function LandingPage() {
  const [color, setColor] = useState("#ffffff");
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component only renders client-side interactive elements after mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      {/* <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}

        refresh
      /> */}
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      ></Vortex>

      <main className="container mx-auto px-4 py-20 relative z-10 mt-16 ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="whitespace-pre-wrap bg-gradient-to-r from-[#F0F8FF] via-[#87CEEB] via-[#9370DB] to-[#FFB6C1] bg-clip-text text-center text-[7rem] font-bold leading-none text-transparent animate-gradient-fast dark:from-[#F0F8FF] dark:via-[#87CEEB] dark:via-[#9370DB] dark:to-[#FFB6C1] dark:via-[#F0F8FF] mb-2"
        >
          {/* <div className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-[#F0F8FF] via-[#9370DB] to-[#FFB6C1] bg-clip-text text-center text-8xl font-semibold leading-none text-transparent animate-gradient-fast">
            {isMounted && (
              <SparklesText text="" />
            )}
            <span>Al<i>t</i>node</span>

          </div> */}
          <h1 className="whitespace-pre-wrap bg-gradient-to-r dark:from-[#FFFFFF] dark:via-[#C0C0C0] dark:to-[#FFFFFF] bg-clip-text text-transparent text-center text-3xl md:text-7xl lg:text-9xl font-bold relative z-20 leading-none animate-gradient-slow ">
            Al<i>t</i>node
          </h1>

        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl text-center mb-4 text-gray-300 p-8"
        >
          {isMounted && (
            <ShinyText text=" Your No-Code Decentralised AI Agent Marketplace!" disabled={false} speed={8} className='custom-class' />

            // <WordPullUp>
            //   Your No-Code AI Agent Marketplace
            // </WordPullUp>
          )}
        </motion.div>
        <div>  </div>
        <div className="flex justify-center p-4">
          <Link href={'/nfts'}>

            <Button />
          </Link>
        </div>
      </main>
      {isMounted && <AnimatedBackground />}
    </div>
  );
}
