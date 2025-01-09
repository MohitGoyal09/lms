import React from "react";
import { ChevronRight } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { TextReveal } from "@/components/ui/text-reveal";
import Link from "next/link";

import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function HeroSection() {
  return (
    <div className="relative min-h-[80vh] overflow-hidden flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        <div className="z-10 mb-8">
          <AnimatedGradientText>
            🎉{" "}
            <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300 dark:bg-gray-700" />{" "}
            <span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              Introducing Artifical Guruji
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </div>

        <div className="container relative px-3 mx-auto max-w-6xl">
          <div className="relative z-10 space-y-3 sm:space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                <TextReveal
                  text="AI-Powered"
                  className="inline-block"
                  delay={0.3}
                />{" "}
                <TextReveal
                  text="Exam Prep"
                  className="inline-block text-blue-600 dark:text-blue-700"
                  delay={0.4}
                />
                <br />
                <TextReveal
                  text="Made Simple"
                  className="inline-block"
                  delay={0.5}
                />
              </h1>
              <TextAnimate
                animation="slideLeft"
                by="word"
                className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-2 leading-relaxed whitespace-normal"
              >
                Generate Personalized Study Materials in Seconds – Smarter,
                Faster, and Stress-Free.
              </TextAnimate>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <Link href="/sign-up" className="w-fit">
                <RainbowButton 
                  onClick={() => {
                    
                    window.location.href = "/dashboard";
                  }}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-medium transition-all duration-200 hover:scale-105"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 inline-block" />
                </RainbowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
}
