import { useState } from "react";

function CoverImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return null;
  }

  return (
    <div className="relative w-full h-[400px] mb-8">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
        onError={() => setError(true)}
      />
      {/* Optional overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-lg" />
    </div>
  );
}

export default CoverImage;