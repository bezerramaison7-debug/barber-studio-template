"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteTexts } from "@/config/texts";
import type { ImageAsset } from "@/config/types";
import { ChevronIcon, CloseIcon } from "@/components/ui/icons";

/**
 * Grade de fotos em colunas (respeita a proporção de cada foto) com visualização ampliada.
 * O <dialog> nativo cuida do foco, do Esc e do fundo inerte.
 */
interface GalleryGridProps {
  images: ImageAsset[];
  labels: SiteTexts["gallery"];
}

export function GalleryGrid({ images, labels }: GalleryGridProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {images.map((image, i) => (
          <li key={image.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => open(i)}
              className="group block w-full overflow-hidden rounded-sm"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <span className="sr-only">{labels.enlarge}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={labels.dialogLabel}
        onClose={() => setIndex(null)}
        onClick={(event) => event.target === event.currentTarget && close()}
        className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 text-foreground backdrop:bg-black/90"
      >
        {current && (
          <div className="flex h-full flex-col p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted" aria-live="polite">
                {index! + 1} de {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-11 items-center justify-center text-2xl hover:text-accent"
                autoFocus
              >
                <CloseIcon />
                <span className="sr-only">{labels.close}</span>
              </button>
            </div>

            <figure className="relative my-4 flex-1">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </figure>
            <p className="text-center text-sm text-foreground/80">{current.alt}</p>

            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex size-12 items-center justify-center rounded-full border border-line text-xl hover:border-accent hover:text-accent"
              >
                <ChevronIcon className="rotate-180" />
                <span className="sr-only">{labels.previous}</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex size-12 items-center justify-center rounded-full border border-line text-xl hover:border-accent hover:text-accent"
              >
                <ChevronIcon />
                <span className="sr-only">{labels.next}</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
