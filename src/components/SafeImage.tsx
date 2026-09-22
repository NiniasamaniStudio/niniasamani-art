"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = ImageProps & { fallbackLabel?: string };

export default function SafeImage({ alt, fallbackLabel = "სურათი ჯერ არ არის", onError, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="image-placeholder" role="img" aria-label={alt}><span>{fallbackLabel}</span></div>;
  }

  return <Image {...props} alt={alt} onError={(event) => { setFailed(true); onError?.(event); }} />;
}