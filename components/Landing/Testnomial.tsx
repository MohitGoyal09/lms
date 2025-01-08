import React from "react";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
const reviews = [
  {
    name: "Sarah Chen",
    username: "@sarahc_dev",
    body: "This AI study platform has completely transformed my exam preparation. I've seen a 40% improvement in my practice test scores!",
    img: "https://avatar.vercel.sh/sarahc",
  },
  {
    name: "Michael Rodriguez",
    username: "@mrod_tech",
    body: "The personalized study materials are incredible. It's like having a private tutor available 24/7. Worth every penny!",
    img: "https://avatar.vercel.sh/mrod",
  },
  {
    name: "Priya Patel",
    username: "@priya_learns",
    body: "Finally found a study tool that adapts to my learning style. The AI-generated practice questions are spot-on!",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    name: "David Kim",
    username: "@dkim_student",
    body: "Been using this for my medical board exams. The way it breaks down complex topics is amazing. Highly recommend!",
    img: "https://avatar.vercel.sh/dkim",
  },
  {
    name: "Emma Watson",
    username: "@emma_tech",
    body: "The smart study plans have helped me stay consistent and focused. My productivity has doubled!",
    img: "https://avatar.vercel.sh/emma",
  },
  {
    name: "Alex Thompson",
    username: "@alex_certified",
    body: "As a working professional, time is precious. This platform helped me prepare for my certification in half the time.",
    img: "https://avatar.vercel.sh/alex",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
function Testnomial() {
  return (
    <section className="py-16">
      <h2 className="text-center text-3xl font-bold mb-12">
        What Our Users Say
      </h2>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </section>
  );
}

export default Testnomial;
