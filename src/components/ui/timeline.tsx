"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full text-center bg-hero dark:from-neutral-950 dark:via-neutral-900 dark:to-slate-900 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 max-w-4xl font-bold"
        >
          Why Choose Nilantheon?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          Discover our comprehensive platform features, scalable solutions, and expert founding team that makes digital transformation seamless.
        </motion.p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {/* Timeline vertical bar */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-neutral-300 dark:via-neutral-600 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-green-500 via-blue-500 to-purple-500 rounded-full shadow-lg"
          />
        </div>

        {/* Timeline entries */}
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-32 md:pt-52 md:gap-10"
          >
            {/* Sticky title and marker */}
            <div className="sticky top-20 self-start z-40 flex flex-col md:flex-row max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 w-12 absolute left-3 md:left-3 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-lg border-2 border-blue-200 dark:border-blue-800">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-inner" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-neutral-300 leading-tight">
                {item.title}
              </h3>
            </div>

            {/* Content block */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-6 text-left font-bold text-neutral-700 dark:text-neutral-300">
                {item.title}
              </h3>
              <div className="bg-slate-100 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-300">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
