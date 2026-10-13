import Image from "next/image";

type AnimatedSceneProps = {
  src: string;
  alt?: string;
  className?: string;
  overlay?: "light" | "brand" | "dark";
  intensity?: "soft" | "strong";
};

const overlayClass = {
  light: "from-page/95 via-page/78 to-page/45",
  brand: "from-brand/88 via-brand/72 to-brand-deep/80",
  dark: "from-brand-deep/88 via-brand/70 to-brand-deep/92",
} as const;

/** Static image scene — continuous pan removed for performance. */
export function AnimatedScene({
  src,
  alt = "",
  className = "",
  overlay = "light",
  intensity = "soft",
}: AnimatedSceneProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden={alt ? undefined : true}
    >
      <div
        className={`absolute inset-0 ${
          intensity === "strong" ? "opacity-95" : "opacity-55"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${overlayClass[overlay]}`}
      />
      {overlay === "light" ? (
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-page to-transparent" />
      ) : null}
    </div>
  );
}
