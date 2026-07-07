import { motion } from "framer-motion";
import { HandHeart, Handshake } from "lucide-react";
import { partnerCta, donorCta, whatsappNumber } from "../../data/site";
import { hero } from "../../data/content";
import { buildWhatsAppLink } from "../../utils/links";
import { AnchorButton } from "../../components/common/Button";

export function HeroSection() {
  const donorLink = buildWhatsAppLink(whatsappNumber, donorCta.message);
  const partnerLink = buildWhatsAppLink(whatsappNumber, partnerCta.message);

  return (
    <section id="home" className="relative min-h-[84svh] overflow-hidden bg-bloom-ink text-white">
      <img
        src={hero.image}
        alt={hero.imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,33,31,.88),rgba(25,33,31,.56),rgba(25,33,31,.18))]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,transparent_0%,rgba(255,246,216,0.56)_48%,#fff6d8_100%)] sm:h-64" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 128 }).map((_, i) => {
          const left = `${(i * 9 + 7) % 100}%`;
          const size = (i % 3) * 2 + 3; // 3px, 5px, or 7px
          const duration = (i % 4) * 6 + 12; // 12s to 30s
          const delay = (i % 3) * 2; // 0s, 2s, or 4s

          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-bloom-gold/30"
              style={{
                left,
                bottom: "-20px",
                width: size,
                height: size,
              }}
              animate={{
                y: [-1000, -100],
                x: [0, i % 2 === 0 ? 30 : -30],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      <div className="relative mx-auto flex min-h-[84svh] max-w-7xl items-end px-6 pb-16 pt-36 sm:px-10 lg:px-16 lg:pb-20">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/12 px-4 py-2 text-sm font-black tracking-wide backdrop-blur">
            {hero.badge}
          </p>
          <h1 className="font-display text-6xl font-black leading-none text-balance sm:text-7xl lg:text-8xl">
            {hero.heading}
          </h1>
          <p className="mt-5 font-hand text-3xl text-bloom-gold sm:text-4xl">{hero.kicker}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AnchorButton
              href={donorLink}
              target="_blank"
              rel="noreferrer"
              icon={HandHeart}
              className="bg-bloom-gold text-bloom-ink shadow-[0_18px_42px_rgba(255,210,31,0.28)] hover:bg-white hover:text-bloom-ink"
            >
              {donorCta.label}
            </AnchorButton>
            <AnchorButton
              href={partnerLink}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              icon={Handshake}
              className="border-white bg-bloom-cream text-bloom-ink shadow-[0_18px_42px_rgba(0,0,0,0.22)] hover:border-bloom-gold hover:bg-white hover:text-bloom-ink"
            >
              {partnerCta.label}
            </AnchorButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
