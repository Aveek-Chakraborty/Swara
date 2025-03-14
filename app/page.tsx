'use client'
import dynamic from "next/dynamic";
import React from "react";


const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/hero"), { ssr: false });

export default function Index() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    </>

  );
}