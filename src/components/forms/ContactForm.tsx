import { useState } from "react";
import { Send } from "lucide-react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { contactInfo } from "../../data/contact";
import { Button } from "../common/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a phone number."),
  subject: z.string().min(3, "Please enter a subject."),
  message: z.string().min(10, "Please enter a message with at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactResolver: Resolver<ContactFormValues> = async (values) => {
  const result = contactSchema.safeParse(values);

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  return {
    values: {},
    errors: result.error.issues.reduce<Record<string, { type: string; message: string }>>(
      (accumulator, issue) => {
        const fieldName = issue.path.join(".");
        accumulator[fieldName] = {
          type: issue.code,
          message: issue.message,
        };
        return accumulator;
      },
      {},
    ),
  };
};

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "subject", label: "Subject", type: "text" },
] as const;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: contactResolver,
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitted(false);

    try {
      const response = await fetch("https://formspree.io/f/xeebbjgw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
      } else {
        const errorResult = await response.json();
        setSubmitError(errorResult.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setSubmitError("Failed to submit. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-4xl bg-white p-6 shadow-xl sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="text-sm font-black uppercase tracking-wide text-bloom-ink/58">
              {field.label}
            </span>
            <input
              type={field.type}
              {...register(field.name)}
              className="mt-2 w-full rounded-2xl border border-bloom-ink/12 bg-bloom-cream/50 px-4 py-4 text-bloom-ink outline-none transition focus:border-bloom-leaf focus:ring-4 focus:ring-bloom-leaf/15"
            />
            {errors[field.name] ? (
              <span className="mt-2 block text-sm font-bold text-bloom-clay">
                {errors[field.name]?.message}
              </span>
            ) : null}
          </label>
        ))}
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-black uppercase tracking-wide text-bloom-ink/58">
          Message
        </span>
        <textarea
          {...register("message")}
          rows={5}
          className="mt-2 w-full resize-none rounded-2xl border border-bloom-ink/12 bg-bloom-cream/50 px-4 py-4 text-bloom-ink outline-none transition focus:border-bloom-leaf focus:ring-4 focus:ring-bloom-leaf/15"
        />
        {errors.message ? (
          <span className="mt-2 block text-sm font-bold text-bloom-clay">
            {errors.message.message}
          </span>
        ) : null}
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          <Send className="size-4" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        {submitted ? (
          <p className="max-w-md text-sm font-bold leading-6 text-bloom-leaf">
            {contactInfo.successMessage}
          </p>
        ) : null}
        {submitError ? (
          <p className="max-w-md text-sm font-bold leading-6 text-bloom-clay">
            {submitError}
          </p>
        ) : null}
      </div>
    </form>
  );
}
