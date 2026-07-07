import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { legacyIntro, legacyProjects } from "../../data/legacy";
import { galleryItems } from "../../data/gallery";
import { Section, SectionIntro } from "../../components/common/Section";
import { Reveal } from "../../components/animations/Reveal";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { ImageWithPlaceholder } from "../../components/common/ImageWithPlaceholder";

export function LegacySection() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter gallery items by active project
  const projectImages = activeProject
    ? galleryItems.filter((item) => item.project === activeProject)
    : [];

  const handleOpenGallery = (projectId: string) => {
    setActiveProject(projectId);
    setCurrentImageIndex(0);
  };

  const handleCloseGallery = () => {
    setActiveProject(null);
  };

  const handleNextImage = useCallback(() => {
    if (projectImages.length === 0) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
  }, [projectImages.length]);

  const handlePrevImage = useCallback(() => {
    if (projectImages.length === 0) return;
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + projectImages.length) % projectImages.length,
    );
  }, [projectImages.length]);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") handleCloseGallery();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, handleNextImage, handlePrevImage]);

  return (
    <Section id="legacy" className="bg-bloom-cream/45">
      <SectionIntro intro={legacyIntro} align="center" />

      {/* Grid of 3 legacy cards */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {legacyProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.1}>
            <div className="flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-white border border-bloom-ink/5 shadow-[0_12px_45px_rgba(25,33,31,0.06)] hover:-translate-y-1.5 transition duration-300">
              {/* Cover Image (Clickable) */}
              <button
                type="button"
                onClick={() => handleOpenGallery(project.id)}
                className="relative block w-full p-0 border-none aspect-video overflow-hidden bg-bloom-cream focus:outline-none focus:ring-4 focus:ring-bloom-gold/45"
              >
                <ImageWithPlaceholder
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <span className="absolute left-6 top-6 rounded-full bg-bloom-ink px-4 py-1.5 text-xs font-black uppercase tracking-wider text-bloom-gold">
                  {project.period}
                </span>
              </button>

              {/* Content Body */}
              <div className="flex grow flex-col p-8">
                <h3 className="font-display text-3xl font-black text-bloom-ink">{project.title}</h3>
                <p className="mt-3 grow text-base leading-7 text-bloom-ink/70">
                  {project.longDescription}
                </p>

                {/* Stats / Impact Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-bloom-ink/5 pt-6 text-center">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-xl font-black text-bloom-gold sm:text-2xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-bloom-ink/54">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* View Gallery Button */}
                <button
                  type="button"
                  onClick={() => handleOpenGallery(project.id)}
                  className="mt-8 w-full rounded-full border border-bloom-gold bg-bloom-gold py-3.5 text-center text-sm font-black text-bloom-ink shadow-[0_12px_32px_rgba(255,210,31,0.22)] hover:bg-bloom-ink hover:text-white transition duration-200"
                >
                  View Project Gallery
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Legacy Project Interactive Lightbox Modal */}
      {activeProject && projectImages.length > 0
        ? createPortal(
            <div
              className="fixed inset-0 z-80 flex flex-col items-center justify-center bg-bloom-ink/92 p-4 backdrop-blur-md cursor-zoom-out"
              role="dialog"
              aria-modal="true"
              onClick={handleCloseGallery}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseGallery}
                className="absolute right-6 top-6 z-10 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition duration-200"
                aria-label="Close gallery"
              >
                <X className="size-6" />
              </button>

              {/* Lightbox Main Container */}
              <div
                className="relative flex max-w-5xl w-full flex-col items-center justify-center p-2 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Active Image with Navigation Overlay */}
                <div className="relative group flex items-center justify-center overflow-hidden rounded-2xl bg-black/20 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                  <img
                    src={projectImages[currentImageIndex].image}
                    alt={projectImages[currentImageIndex].alt}
                    className="max-h-[72vh] max-w-full object-contain rounded-2xl"
                  />

                  {/* Desktop Hover Navigation Controls */}
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Next image"
                  >
                    <ArrowRight className="size-5" />
                  </button>

                  {/* Image Counter Badge */}
                  <span className="absolute bottom-4 right-4 rounded-md bg-black/60 px-3 py-1.5 text-xs font-bold text-white/90">
                    {currentImageIndex + 1} / {projectImages.length}
                  </span>
                </div>

                {/* Mobile / Screen-centered Bottom Controls */}
                <div className="mt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition md:hidden"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition md:hidden"
                    aria-label="Next image"
                  >
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </Section>
  );
}
