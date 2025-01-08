import { cn } from "@/lib/utils";
import {
  useMotionValue,
  motion,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { MouseEvent, PropsWithChildren, useEffect, useState } from "react";

export interface MagicCardProps extends PropsWithChildren {
  className?: string;
  gradientSize?: number;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export const MagicCard = ({
  children,
  className,
  gradientSize = 400,
  gradientOpacity = 0.5,
  gradientFrom = "#9E7AFF",
  gradientTo = "#FE8BBB",
}: MagicCardProps) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [isHovered, setIsHovered] = useState(false);

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 opacity-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: gradientOpacity }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(${gradientSize}px circle at ${mouseX.get()}px ${mouseY.get()}px, ${gradientFrom}, transparent 80%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(${gradientSize}px circle at ${mouseX.get()}px ${mouseY.get()}px, ${gradientTo}, transparent 80%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
