/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { motion,  useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12000, suffix: "+", label: "Active Users" },
  { value: 20000, suffix: "+", label: "Verified Sellers" },
  { value: 2500000, prefix: "$", suffix: "+", label: "Total Transactions" },
  { value: 4.9, suffix: "/5", label: "Average Rating" },
];

// 🧮 Count-up hook
function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = target;
    const increment = end / (duration / 16); // smooth 60fps update

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(counter);
  }, [inView, target, duration]);

  return Math.floor(count);
}

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 md:py-28 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center lg:text-left">
          {stats.map((stat, index) => {
            const value = useCountUp(stat.value, inView);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <p className="text-4xl lg:text-5xl font-bold text-white mb-1">
                  {stat.prefix || ""}
                  {value.toLocaleString()}
                  {stat.suffix || ""}
                </p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
