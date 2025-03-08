"use client"

import dynamic from 'next/dynamic';
import AnimatedBackground from "@/components/functions/AnimatedBackground";
import Particles from "@/components/ui/particles";


const IDE = dynamic(() => import('@/components/IDE'), { ssr: false });


export default function IDEPage() {

  return (<div>
    <IDE />
    
    
    
  </div>
  
)
}

