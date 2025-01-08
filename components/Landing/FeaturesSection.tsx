import React from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { BookOpen, Brain, Sparkles, Clock } from "lucide-react"; // Import icons

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-8 md:shadow-xl">
      <Icon className="mb-4 h-8 w-8" />
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
      <BorderBeam size={150} duration={10} delay={Math.random() * 10} />
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Learning",
      description:
        "Personalized study materials generated in seconds using advanced AI technology",
      icon: Brain,
    },
    {
      title: "Smart Study Plans",
      description:
        "Customized study schedules that adapt to your learning pace and goals",
      icon: Sparkles,
    },
    {
      title: "Comprehensive Materials",
      description:
        "Access to a wide range of study resources and practice questions",
      icon: BookOpen,
    },
    {
      title: "Time-Efficient",
      description:
        "Save hours of preparation time with instant material generation",
      icon: Clock,
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-center text-3xl font-bold mb-12">
        Why Choose Our Platform
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
