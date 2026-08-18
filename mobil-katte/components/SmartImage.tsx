"use client";

import { useState } from "react";
import { photoFallback } from "@/lib/data";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
}

export default function SmartImage({ src, alt, className, lazy = true }: SmartImageProps) {
  const [current, setCurrent] = useState(src);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={lazy ? "lazy" : undefined}
      onError={() => {
        if (current !== photoFallback()) setCurrent(photoFallback());
      }}
    />
  );
}