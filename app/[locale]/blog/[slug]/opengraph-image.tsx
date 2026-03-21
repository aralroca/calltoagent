import { ImageResponse } from "next/og";
import { getPostData } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CallToAgent Blog";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale === "es" ? "es" : "en";
  const post = await getPostData(lang, slug);

  const title = post?.title ?? "CallToAgent Blog";
  const category = post?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#6366F1",
              color: "white",
              padding: "8px 20px",
              borderRadius: "20px",
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {category}
          </div>
        </div>
        <div
          style={{
            fontSize: title.length > 60 ? "48px" : "56px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            marginBottom: "40px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "22px",
              background: "rgba(99, 102, 241, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6366F1",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "22px", fontWeight: 600 }}>
            CallToAgent Blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
