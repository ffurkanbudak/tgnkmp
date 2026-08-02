"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitContact } from "@/app/actions/contact";
import { initialContactState, type ContactFieldName } from "@/lib/contact";
import { Button, ButtonLink } from "@/components/ui/Button";
import { IconArrowRight, IconCheck, IconWhatsapp } from "@/components/icons";
import { contactPage, educationLevelOptions, subjectOptions } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";

const fieldBase =
  "w-full rounded-xl border bg-paper px-4 text-[0.9375rem] tracking-[-0.01em] text-navy-950 transition-[border-color,box-shadow] duration-300 placeholder:text-navy-300 focus:outline-none focus-visible:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  // Hatalarda ilk sorunlu alana odaklan — klavye ve ekran okuyucu için.
  useEffect(() => {
    if (state.status !== "error") return;
    const firstError = Object.keys(state.errors)[0];
    if (!firstError) {
      statusRef.current?.focus();
      return;
    }
    const el = formRef.current?.elements.namedItem(firstError);
    if (el instanceof HTMLElement) el.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[var(--radius-card)] border border-line bg-paper p-8 lg:p-12"
        role="status"
        aria-live="polite"
      >
        <span className="grid size-12 place-items-center rounded-full bg-navy-900 text-white">
          <IconCheck className="size-5" />
        </span>
        <h3 className="text-h3 mt-7 text-navy-950">Talebiniz alındı.</h3>
        <p className="text-body mt-4 max-w-md text-muted">{state.message}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={whatsappUrl}
            external
            variant="quiet"
            icon={<IconWhatsapp className="size-[18px]" />}
          >
            WhatsApp&apos;tan Yazın!
          </ButtonLink>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:p-8 lg:p-10"
    >
      {/* bot tuzağı */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={`${baseId}-website`}>Web sitesi</label>
        <input
          id={`${baseId}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${baseId}-veliAdi`}
          name="veliAdi"
          label="Veli Adı Soyadı"
          placeholder="Adınız ve soyadınız"
          autoComplete="name"
          required
          error={state.errors.veliAdi}
        />
        <Field
          id={`${baseId}-ogrenciAdi`}
          name="ogrenciAdi"
          label="Öğrenci Adı Soyadı"
          placeholder="Öğrencinin adı ve soyadı"
          required
          error={state.errors.ogrenciAdi}
        />
        <Field
          id={`${baseId}-telefon`}
          name="telefon"
          label="Telefon"
          type="tel"
          inputMode="tel"
          placeholder="0541 000 00 00"
          autoComplete="tel"
          required
          error={state.errors.telefon}
        />
        <Field
          id={`${baseId}-eposta`}
          name="eposta"
          label="E-posta"
          type="email"
          inputMode="email"
          placeholder="ornek@eposta.com"
          autoComplete="email"
          required
          error={state.errors.eposta}
        />
        <SelectField
          id={`${baseId}-kademe`}
          name="kademe"
          label="Eğitim Kademesi"
          placeholder="Kademe seçin"
          options={educationLevelOptions}
          required
          error={state.errors.kademe}
        />
        <SelectField
          id={`${baseId}-brans`}
          name="brans"
          label="Branş"
          placeholder="Branş seçin"
          options={subjectOptions}
          required
          error={state.errors.brans}
        />
      </div>

      <div className="mt-6">
        <FieldShell
          id={`${baseId}-mesaj`}
          label="Mesajınız"
          optional
          error={state.errors.mesaj}
        >
          <textarea
            id={`${baseId}-mesaj`}
            name="mesaj"
            rows={5}
            placeholder="Çocuğunuzun mevcut durumu ve beklentileriniz hakkında kısaca bilgi verebilirsiniz."
            aria-invalid={state.errors.mesaj ? true : undefined}
            aria-describedby={state.errors.mesaj ? `${baseId}-mesaj-error` : undefined}
            className={`${fieldBase} resize-y py-3.5 leading-relaxed ${
              state.errors.mesaj
                ? "border-brand-600 focus:shadow-[0_0_0_3px_rgba(224,31,39,0.12)]"
                : "border-line focus:border-navy-400 focus:shadow-[0_0_0_3px_rgba(26,42,74,0.08)]"
            }`}
          />
        </FieldShell>
      </div>

      <AnimatePresence>
        {state.status === "error" && state.message && (
          <motion.div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-6 rounded-xl border border-brand-600/25 bg-brand-600/[0.04] px-4 py-3.5 text-[0.875rem] text-brand-800">
              {state.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-9 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8125rem] leading-relaxed text-faint">
          {contactPage.formNote}
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          icon={!pending ? <IconArrowRight className="size-[18px]" /> : undefined}
          className="shrink-0"
        >
          {pending ? "Gönderiliyor…" : "Ön Görüşme Talebi Gönderin!"}
        </Button>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function FieldShell({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-eyebrow mb-3 flex items-center gap-2 text-navy-500"
      >
        {label}
        {optional && <span className="font-medium text-navy-300">Opsiyonel</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[0.8125rem] text-brand-700">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({
  id,
  name,
  label,
  error,
  ...rest
}: {
  id: string;
  name: ContactFieldName;
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldBase} h-13 ${
          error
            ? "border-brand-600 focus:shadow-[0_0_0_3px_rgba(224,31,39,0.12)]"
            : "border-line focus:border-navy-400 focus:shadow-[0_0_0_3px_rgba(26,42,74,0.08)]"
        }`}
        {...rest}
      />
    </FieldShell>
  );
}

function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
  error,
  required,
}: {
  id: string;
  name: ContactFieldName;
  label: string;
  placeholder: string;
  options: ReadonlyArray<string>;
  error?: string;
  required?: boolean;
}) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue=""
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${fieldBase} h-13 appearance-none pe-11 ${
            error
              ? "border-brand-600 focus:shadow-[0_0_0_3px_rgba(224,31,39,0.12)]"
              : "border-line focus:border-navy-400 focus:shadow-[0_0_0_3px_rgba(26,42,74,0.08)]"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-navy-400"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  );
}
