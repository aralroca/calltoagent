import BuyButton from "@/components/BuyButton";
import OfferForm from "@/components/OfferForm";
import OfferLink from "@/components/OfferLink";
import { formattedPrice, saleConfig } from "@/lib/sale-config";

const categories = ["Voice AI", "AI Agents", "Agent Communication", "Developer Infrastructure"];
const transferSteps = [
  "Agree on the purchase price",
  "Buyer funds the escrow transaction",
  `${saleConfig.domain} is transferred to the buyer`,
  "Funds are released to the seller",
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="hero-inner">
          <p className="eyebrow"><span /> Domain for sale</p>
          <h1 id="hero-title">{saleConfig.domain}</h1>
          <p className="hero-copy">A premium domain for the next generation of AI agents.</p>
          <p className="hero-detail">Built for voice agents, agent-to-agent communication and AI infrastructure.</p>
          <div className="price-block">
            <span>Asking price</span>
            <strong>{formattedPrice}</strong>
          </div>
          <div className="hero-actions">
            <BuyButton escrowUrl={saleConfig.escrowUrl} />
            <OfferLink />
          </div>
          <p className="trust"><span aria-hidden="true">◇</span> Secure domain transfer through a trusted escrow service.</p>
        </div>
      </section>

      <section className="positioning section-shell" aria-labelledby="positioning-title">
        <p className="section-label">Positioning</p>
        <div className="positioning-grid">
          <div>
            <h2 id="positioning-title">A name built for the agent era.</h2>
            <p>Clear, memorable and immediately relevant to how people and software connect with AI agents.</p>
          </div>
          <ul className="tags" aria-label="Relevant categories">
            {categories.map((category, index) => <li key={category}><span>0{index + 1}</span>{category}</li>)}
          </ul>
        </div>
      </section>

      <section className="process section-shell" aria-labelledby="process-title">
        <p className="section-label">The transaction</p>
        <h2 id="process-title">A secure, straightforward transfer.</h2>
        <ol className="steps">
          {transferSteps.map((step, index) => (
            <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>
          ))}
        </ol>
        <p className="process-note">The domain transfer is completed manually after the buyer’s funds are secured.</p>
      </section>

      <section className="offer-section" id="offer" aria-labelledby="offer-title">
        <div className="section-shell offer-grid">
          <div className="offer-intro">
            <p className="section-label">Make an offer</p>
            <h2 id="offer-title">Interested in owning<br />{saleConfig.domain}?</h2>
            <p>Share your details and proposed offer. The owner will respond directly.</p>
          </div>
          <OfferForm />
        </div>
      </section>

      <footer className="section-shell">
        <strong>{saleConfig.domain}</strong>
        <p>Domain for sale.</p>
        <a href="#offer">Contact owner <span aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
