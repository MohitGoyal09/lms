import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CTASection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 " />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Start Your Learning Journey Today
          </h2>

          <p className="text-xl text-muted-foreground">
            Join thousands of students who are already transforming their
            learning experience with our AI-powered platform. Get personalized
            study materials, interactive quizzes, and expert guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/create">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started for Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>
          <div className="pt-8 border-t border-border w-full">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Trusted by students and educators worldwide
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <span className="font-bold text-2xl sm:text-3xl">50K+</span>
                  <span className="mt-1 sm:mt-0 sm:ml-2 text-sm text-muted-foreground">
                    Active Users
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <span className="font-bold text-2xl sm:text-3xl">100+</span>
                  <span className="mt-1 sm:mt-0 sm:ml-2 text-sm text-muted-foreground">
                    Universities
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <span className="font-bold text-2xl sm:text-3xl">4.9</span>
                  <span className="mt-1 sm:mt-0 sm:ml-2 text-sm text-muted-foreground">
                    User Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
