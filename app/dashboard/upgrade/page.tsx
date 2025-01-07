"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPro = false,
  buttonText,
  buttonAction,
  buttonVariant = "default",
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPro?: boolean;
  buttonText: string;
  buttonAction?: () => void;
  buttonVariant?: "default" | "outline";
}) => (
  <motion.div
    initial="initial"
    animate="animate"
    variants={fadeInUp}
    className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
      isPro
        ? "border-2 border-indigo-500"
        : "border border-gray-100 dark:border-gray-700"
    }`}
  >
    {isPro && (
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
        Most Popular
      </div>
    )}
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4 flex items-baseline justify-center">
        <span
          className={`text-6xl font-bold ${
            isPro
              ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600"
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500"
          }`}
        >
          {price}
        </span>
        {price !== "Free" && (
          <span className="text-xl font-medium text-gray-500 ml-2">/month</span>
        )}
      </div>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>

    <ul className="mt-8 space-y-4">
      {features.map((feature, index) => (
        <li key={index}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 group"
          >
            <CheckCircle2
              className={`w-5 h-5 ${
                isPro
                  ? "text-indigo-500 group-hover:text-purple-600"
                  : "text-green-500 group-hover:text-indigo-500"
              } transition-colors`}
            />
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
              {feature}
            </span>
          </motion.div>
        </li>
      ))}
    </ul>

    <Button
      variant={buttonVariant}
      onClick={buttonAction}
      className={`mt-8 w-full rounded-full px-8 py-6 text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${
        isPro
          ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 border border-transparent hover:border-indigo-200/50"
          : "border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 hover:shadow-lg"
      }`}
    >
      {buttonText}
    </Button>
  </motion.div>
);

export default function Upgrade() {
  const onCheckoutClick = async () => {
    try {
      const result = await axios.post("/api/payment/checkout", {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      });

      if (result.data.sessionUrl) {
        window.location.href = result.data.sessionUrl;
      } else {
        console.error("No session URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-gray-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
            Choose Your Learning Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Unlock your full potential with our flexible pricing plans designed
            to support your learning goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="Starter"
            price="Free"
            description="Perfect for getting started"
            features={[
              "5 Courses Generate",
              "Basic Course Templates",
              "Email Support",
              "Help Center Access",
              "Community Forums",
            ]}
            buttonText="Current Plan"
            buttonVariant="outline"
          />

          <PricingCard
            title="Pro"
            price="$9.99"
            description="For serious learners"
            features={[
              "Unlimited Course Generate",
              "Advanced Course Templates",
              "Priority Email Support",
              "Help Center Access",
              "1-on-1 Learning Consultation",
              "Custom Learning Paths",
              "Progress Analytics",
            ]}
            isPro={true}
            buttonText="Upgrade Now"
            buttonAction={onCheckoutClick}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>
            All plans include automatic updates and premium community support.
            <br />
            Need help choosing? Contact us at support@example.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}
