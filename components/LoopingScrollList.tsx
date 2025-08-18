"use client";

import React, { useEffect, useRef } from "react";

interface LoopingScrollListProps {
  children: React.ReactNode;
}

export default function LoopingScrollList({
  children,
}: LoopingScrollListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        container.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollRef} className="relative flex-1 overflow-y-auto">
      <div className=" absolute inset-0 animate-scroll-vertical space-y-4 px-4">
        {children}
      </div>
    </div>
  );
}