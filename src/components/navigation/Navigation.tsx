import { useState } from "react";
import { motion } from "framer-motion";
import { HandHeart, Menu, X } from "lucide-react";
import { donorCta, navigation, whatsappNumber } from "../../data/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cn } from "../../utils/cn";
import { buildWhatsAppLink } from "../../utils/links";
import { scrollToSection } from "../../utils/scroll";
import { AnchorButton } from "../common/Button";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navigation);
  const donorLink = buildWhatsAppLink(whatsappNumber, donorCta.message);

  function handleNavClick(href: string) {
    setOpen(false);
    scrollToSection(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/76 px-4 py-3 shadow-[0_18px_60px_rgba(25,33,31,0.12)] backdrop-blur-xl">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="flex items-center rounded-full focus:outline-none focus:ring-4 focus:ring-bloom-gold/40"
        >
          <img
            src="/logos/bloom/horizontal/black.png"
            alt="Bloom '26"
            className="h-10 w-auto object-contain"
          />
        </a>

        <div className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={cn(
                "relative whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-bold text-bloom-ink/64 transition-colors duration-200 hover:text-bloom-ink xl:px-3",
                active === item.href && "text-bloom-ink",
              )}
            >
              {active === item.href ? (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-bloom-gold/70"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <AnchorButton
            href={donorLink}
            target="_blank"
            rel="noreferrer"
            icon={HandHeart}
            className="min-h-11 whitespace-nowrap border border-bloom-gold/60 bg-bloom-gold px-4 text-xs text-bloom-ink shadow-[0_12px_28px_rgba(255,210,31,0.26)] hover:bg-bloom-ink hover:text-white xl:px-5 xl:text-sm [&>svg]:size-3.5 xl:[&>svg]:size-4"
          >
            {donorCta.label}
          </AnchorButton>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full bg-bloom-ink text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/70 bg-white/92 p-4 shadow-xl backdrop-blur-xl lg:hidden">
          <div className="grid gap-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "rounded-2xl px-4 py-3 text-left font-bold text-bloom-ink/70",
                  active === item.href && "bg-bloom-gold/70 text-bloom-ink",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
          <AnchorButton
            href={donorLink}
            target="_blank"
            rel="noreferrer"
            icon={HandHeart}
            className="mt-4 w-full"
          >
            {donorCta.label}
          </AnchorButton>
        </div>
      ) : null}
    </header>
  );
}
