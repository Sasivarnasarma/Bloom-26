import { socialLinks } from "../../data/contact";
import { footer, navigation, siteInfo } from "../../data/site";
import { scrollToSection } from "../../utils/scroll";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function getSocialIcon(label: string) {
  switch (label.toLowerCase()) {
    case "facebook":
      return Facebook;
    case "instagram":
      return Instagram;
    case "linkedin":
      return Linkedin;
    case "youtube":
      return Youtube;
    case "tiktok":
      return TiktokIcon;
    case "x":
      return XIcon;
    default:
      return null;
  }
}

export function FooterSection() {
  return (
    <footer className="bg-bloom-ink px-6 py-12 text-white sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr_0.8fr]">
        <div>
          <div className="flex flex-col gap-4">
            <div>
              <img
                src="/logos/bloom/horizontal/yellow.png"
                alt="Bloom '26 Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="font-hand text-xl text-bloom-gold">{siteInfo.tagline}</p>
          </div>
          <p className="mt-5 max-w-md leading-7 text-white/68">{footer.description}</p>
        </div>

        <div>
          <h3 className="font-display text-lg font-black">Quick Links</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {navigation.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="text-left font-bold text-white/66 transition hover:text-bloom-gold"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-black">Social</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = getSocialIcon(link.label);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/66 transition duration-300 hover:border-bloom-gold hover:bg-bloom-gold hover:text-bloom-ink hover:-translate-y-1"
                  aria-label={link.label}
                >
                  {Icon && <Icon className="size-5.5" />}
                </a>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/30">
              Visit AIESEC
            </span>
            <a
              href="https://aiesec.lk"
              target="_blank"
              rel="noreferrer"
              className="inline-block self-start transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
              aria-label="AIESEC Sri Lanka Website"
            >
              <img
                src="/logos/aiesec/White-Blue-Logo.png"
                alt="AIESEC Sri Lanka"
                className="h-8 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/12 pt-6 text-sm font-bold text-white/48 sm:flex-row sm:items-center sm:justify-between">
        <p>{footer.copyright}</p>
        <p>
          <a
            href={footer.builtByLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bloom-gold transition duration-200"
          >
            {footer.builtBy}
          </a>
        </p>
      </div>
    </footer>
  );
}
