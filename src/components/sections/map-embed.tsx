"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from "@/components/ui/icons";

interface MapEmbedProps {
  src: string;
  title: string;
  notice: string;
  buttonLabel: string;
}

/**
 * O mapa do Google só carrega quando a pessoa pede. Antes do clique o site não contata
 * nenhum domínio de terceiros; depois, o iframe acessa serviços do Google (Maps e fontes).
 */
export function MapEmbed({ src, title, notice, buttonLabel }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-sm border border-line bg-surface-raised lg:aspect-auto lg:h-full lg:min-h-96">
      {loaded ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 size-full grayscale-[0.4] invert-[0.9] hue-rotate-180"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
          <MapPinIcon className="text-5xl text-accent" />
          <p className="max-w-xs text-muted">{notice}</p>
          <Button variant="outline" onClick={() => setLoaded(true)}>
            {buttonLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
