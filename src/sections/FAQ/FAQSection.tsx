import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { faqIntro, faqItems } from "../../data/faq";
import { Section, SectionIntro } from "../../components/common/Section";
import { cn } from "../../utils/cn";

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqItems[0]?.question || null);

  const filteredItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Section id="faq" className="bg-bloom-mint">
      <SectionIntro intro={faqIntro} align="center" />

      {/* Search Input */}
      <div className="mx-auto mb-10 max-w-2xl">
        <div className="relative flex items-center">
          <span className="absolute left-5 text-bloom-ink/45">
            <Search className="size-5" />
          </span>
          <input
            type="text"
            placeholder="Search questions (e.g., donate, partner, Galaha)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Auto-expand the first match if available, otherwise clear
              const matches = faqItems.filter(
                (item) =>
                  item.question.toLowerCase().includes(e.target.value.toLowerCase()) ||
                  item.answer.toLowerCase().includes(e.target.value.toLowerCase()),
              );
              setOpenQuestion(matches[0]?.question || null);
            }}
            className="w-full rounded-2xl border border-bloom-ink/10 bg-white/60 py-4 pl-12 pr-16 text-bloom-ink placeholder-bloom-ink/45 shadow-sm backdrop-blur-md transition duration-200 focus:border-bloom-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-bloom-gold/24"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setOpenQuestion(faqItems[0]?.question || null);
              }}
              className="absolute right-4 rounded-lg bg-bloom-ink/5 px-2.5 py-1 text-xs font-bold text-bloom-ink/65 hover:bg-bloom-ink/10 transition focus:outline-none"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isOpen = openQuestion === item.question;

            return (
              <div key={item.question} className="border-b border-bloom-ink/12">
                <button
                  type="button"
                  onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl font-black text-bloom-ink">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn("size-5 shrink-0 transition", isOpen && "rotate-180")}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl leading-8 text-bloom-ink/70">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg font-bold text-bloom-ink/52">
              No matching questions found for "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setOpenQuestion(faqItems[0]?.question || null);
              }}
              className="mt-3 text-sm font-black text-bloom-clay underline hover:text-bloom-ink transition"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
