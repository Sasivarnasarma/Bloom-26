import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { formatCurrency, getFundraisingPercentage } from "../../utils/format";

interface ProgressMeterProps {
  raised: number;
  goal: number;
  currency: string;
}

export function ProgressMeter({ raised, goal, currency }: ProgressMeterProps) {
  const percentage = getFundraisingPercentage(raised, goal);
  const containerRef = useRef<HTMLDivElement>(null);
  const raisedRef = useRef<HTMLParagraphElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const raisedMotion = useMotionValue(0);
  const percentMotion = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;

    const raisedAnim = animate(raisedMotion, raised, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(latest) {
        if (raisedRef.current) {
          raisedRef.current.textContent = formatCurrency(Math.round(latest), currency);
        }
      },
    });

    const percentAnim = animate(percentMotion, percentage, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(latest) {
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(latest)}%`;
        }
      },
    });

    return () => {
      raisedAnim.stop();
      percentAnim.stop();
    };
  }, [isInView, raised, percentage, currency, raisedMotion, percentMotion]);

  return (
    <div
      ref={containerRef}
      className="rounded-4xl bg-white p-6 shadow-[0_24px_80px_rgba(25,33,31,0.13)] sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-bloom-leaf">Raised</p>
          <p ref={raisedRef} className="mt-2 font-display text-4xl font-black text-bloom-ink">
            {formatCurrency(0, currency)}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm font-black uppercase tracking-wide text-bloom-ink/45">Goal</p>
          <p className="mt-2 text-xl font-black text-bloom-ink">{formatCurrency(goal, currency)}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex justify-between text-sm font-black uppercase tracking-wide text-bloom-ink/58">
          <span>Completion</span>
          <span ref={percentRef}>0%</span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-bloom-mint">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-bloom-leaf via-bloom-gold to-bloom-amber"
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
