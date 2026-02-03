'use client';

export function ContactHero() {
  return (
    <div className="relative pt-8 animate-fade-in-down">
      {/* Big blurred background text at top */}
      <div className="pointer-events-none flex justify-center overflow-visible">
        <div
          className="whitespace-nowrap bg-gradient-to-b from-neutral-400/70 via-neutral-400/55 to-neutral-400/0 bg-clip-text text-[10vw] leading-none font-black text-transparent select-none sm:text-[11vw] md:text-[12vw] lg:text-[13vw] xl:text-[14vw] 2xl:text-[15vw] dark:from-neutral-400/10 dark:via-neutral-400/8 dark:to-neutral-400/0"
          style={{
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
          }}
        >
          Get In Touch
        </div>
      </div>
    </div>
  );
}
