"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';

const transformations = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  src: `/images/${index + 1}.jpg`,
  alt: `Client before and after fitness transformation ${index + 1}`,
}));

export default function Transformations() {
  const [selected, setSelected] = useState<(typeof transformations)[number] | null>(null);

  useEffect(() => {
    if (!selected) return;

    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  return (
    <section id="transformations" className="py-24 md:py-32 bg-surface-container-low border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 md:flex md:items-end md:justify-between md:gap-12">
          <div>
            <span className="font-mono text-xs text-primary mb-2 block uppercase tracking-widest">
              04 // CLIENT TRANSFORMATIONS
            </span>
            <h2 className="font-anton text-4xl md:text-5xl uppercase text-on-surface tracking-tight">
              Real Work. <span className="text-primary italic">Real Progress.</span>
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-on-surface/65 md:max-w-md mt-5 md:mt-0 leading-relaxed">
            A selection of client journeys shaped through structured training, consistency, and personalized fitness guidance. Individual results vary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="transformation-gallery">
          {transformations.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item)}
              className="group text-left bg-surface-container-lowest border border-outline/25 hover:border-primary transition-colors shadow-sm cursor-pointer"
              aria-label={`Open transformation ${item.id}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#151515]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-outline/15">
                <div>
                  <span className="font-mono text-[9px] text-primary uppercase tracking-widest block mb-1">Before / After</span>
                  <h3 className="font-anton text-lg text-on-surface uppercase tracking-wide">Transformation {String(item.id).padStart(2, '0')}</h3>
                </div>
                <ArrowUpRight className="w-5 h-5 text-on-surface/40 group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Transformation ${selected.id}`}
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full max-w-5xl max-h-full" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors p-2 cursor-pointer"
              aria-label="Close transformation viewer"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="relative aspect-[4/3] max-h-[82vh] bg-[#111] border border-white/15">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
