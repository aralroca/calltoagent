import { ImageResponse } from "next/og";
import { formattedPrice, saleConfig } from "@/lib/sale-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"72px 80px",background:"#f4f2ec",color:"#151713",fontFamily:"Arial, sans-serif",position:"relative" }}>
      <div style={{ position:"absolute",inset:22,border:"1px solid #d8d7d0",display:"flex" }} />
      <div style={{ display:"flex",alignItems:"center",gap:12,fontSize:19,letterSpacing:3,textTransform:"uppercase" }}><span style={{ width:11,height:11,borderRadius:"50%",background:"#c9ff5c" }} /> Domain for sale</div>
      <div style={{ display:"flex",flexDirection:"column" }}><div style={{ fontSize:99,letterSpacing:-7,fontWeight:600 }}>{saleConfig.domain}</div><div style={{ marginTop:25,fontSize:27,color:"#686b63" }}>A premium domain for the next generation of AI agents.</div></div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end" }}><div style={{ display:"flex",fontSize:17,color:"#686b63" }}>Voice AI · AI Agents · Developer Infrastructure</div><div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6 }}><span style={{ fontSize:14,letterSpacing:2,textTransform:"uppercase",color:"#686b63" }}>Asking price</span><strong style={{ fontSize:43 }}>{formattedPrice}</strong></div></div>
    </div>, size,
  );
}
