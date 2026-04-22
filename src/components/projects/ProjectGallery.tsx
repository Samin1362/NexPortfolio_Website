"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === "ArrowRight")
        setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border bg-surface-muted">
        <Image
          key={images[index]}
          src={images[index]!}
          alt={`${title} — image ${index + 1} of ${images.length}`}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          priority={index === 0}
          className="object-cover"
        />
      </div>
      {images.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "relative h-16 w-24 overflow-hidden rounded-sm border transition-colors",
                i === index
                  ? "border-border-strong"
                  : "border-border hover:border-border-strong",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
