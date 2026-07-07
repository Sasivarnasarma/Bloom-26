import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Linkedin, Mail } from "lucide-react";
import { teamIntro, teamMembers } from "../../data/team";
import { Section, SectionIntro } from "../../components/common/Section";
import { Reveal } from "../../components/animations/Reveal";
import { Button } from "../../components/common/Button";

import { ImageWithPlaceholder } from "../../components/common/ImageWithPlaceholder";

export function TeamSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 2000);

    return () => window.clearInterval(interval);
  }, [emblaApi, isPaused]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  return (
    <Section id="team" className="bg-white">
      <SectionIntro intro={teamIntro} align="center" />
      <Reveal>
        <div
          className="overflow-hidden"
          ref={emblaRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          aria-label="Bloom team carousel"
        >
          <div className="-ml-5 flex">
            {teamMembers.map((member) => (
              <div
                key={`${member.name}-${member.position}`}
                className="min-w-0 flex-[0_0_86%] pl-5 sm:flex-[0_0_48%] lg:flex-[0_0_25%]"
              >
                <article className="team-profile-card group relative h-[420px] overflow-hidden rounded-[1.75rem] text-white transition duration-300 hover:-translate-y-1">
                  <ImageWithPlaceholder
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,10,18,0.04)_0%,rgba(0,10,18,0.08)_42%,rgba(0,10,18,0.82)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 overflow-hidden p-5">
                    <div className="translate-y-14 transition duration-500 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
                      <h3 className="font-display text-2xl font-black leading-tight drop-shadow">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-black uppercase tracking-wide text-bloom-sky">
                        {member.position}
                      </p>
                    </div>
                    <div className="mt-5 grid translate-y-5 grid-cols-2 gap-2 opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {member.email ? (
                        <a
                          href={`mailto:${member.email}`}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 text-sm font-bold text-white backdrop-blur transition hover:bg-bloom-gold hover:text-bloom-ink"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="size-4" />
                          Email
                        </a>
                      ) : null}
                      {member.linkedIn ? (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 text-sm font-bold text-white backdrop-blur transition hover:bg-bloom-gold hover:text-bloom-ink"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="size-4" />
                          LinkedIn
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="secondary"
            className="size-12 px-0"
            onClick={scrollPrev}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Previous team member"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="size-12 px-0"
            onClick={scrollNext}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Next team member"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
