import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site.config";
import { getServicesWithPage } from "@/lib/plan";

/**
 * Páginas de serviço que não existem devolvem 404 de verdade.
 * Sem isto, um endereço como /servicos/qualquer-coisa recebe a casca pré-renderizada com
 * status 200 (o notFound() da página só roda depois que o streaming começou), o que o
 * Google trata como "soft 404".
 */
const validSlugs = new Set(getServicesWithPage(siteConfig).map((s) => s.id));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2] ?? "";
  if (validSlugs.has(decodeURIComponent(slug))) return NextResponse.next();
  // Reescreve para um caminho sem rota: o Next responde com a página not-found e status 404.
  return NextResponse.rewrite(new URL("/_servico-inexistente", request.url));
}

export const config = {
  matcher: "/servicos/:path*",
};
