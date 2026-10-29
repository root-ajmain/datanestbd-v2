'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, MessageSquare, ArrowRight, Video } from 'lucide-react';
import { services } from '@/content/services';
import { siteConfig } from '@/content/site';
import { pricingTiers } from '@/content/pricing';
import { leadSubmissionSchema } from '@/lib/leads/schema';
import { newEventId, trackLead, trackWhatsAppClick } from '@/lib/analytics';

interface LeadFormProps {
  initialServiceId?: string;
  initialPlanId?: string;
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
}

const whatsappPlanIds = ['whatsapp-starter', 'whatsapp-growth', 'whatsapp-elite', 'whatsapp-scale'];
const serviceOptions = [
  { id: 'whatsapp-starter', title: 'WhatsApp API — Starter (৳4,000/month)' },
  { id: 'whatsapp-growth', title: 'WhatsApp API — Growth (৳8,500/month)' },
  { id: 'whatsapp-elite', title: 'WhatsApp API — Elite (৳20,000/month)' },
  { id: 'whatsapp-scale', title: 'WhatsApp API — Scale (৳27,000/month)' },
  ...services.map(({ id, title }) => ({ id, title })),
];
function normalizeService(id: string) {
  const normalized = ({ 'web-engineering': 'web-development', 'ai-agent': 'ai-automation' } as Record<string, string>)[id] || id;
  return serviceOptions.some((option) => option.id === normalized) ? normalized : 'whatsapp-api';
}
const newSubmissionKey = () => `sub_${crypto.randomUUID()}`;
const inputClass = 'w-full min-h-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-3 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] aria-invalid:border-red-600';
const labelClass = 'block text-sm font-semibold text-[var(--color-text-headings)]';

export function LeadForm({
  initialServiceId = 'whatsapp-api', initialPlanId,
  title = 'Tell us what you need',
  subtitle = 'Save your inquiry, then continue the conversation on WhatsApp. Consultations are online via Google Meet or Zoom.',
  onSuccess,
}: LeadFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pendingRef = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  const submissionRef = useRef<{ key: string; fingerprint: string; pixelEventId: string } | null>(null);
  const [name, setName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [serviceId, setServiceId] = useState(normalizeService(initialServiceId));
  const [meetingPref, setMeetingPref] = useState('google-meet');
  const [industry, setIndustry] = useState('');
  const [monthlyMessageVolume, setMonthlyMessageVolume] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState('whatsapp');
  const [context, setContext] = useState('');
  const [inquiryAcknowledged, setInquiryAcknowledged] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorSummary, setErrorSummary] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  useEffect(() => () => { requestRef.current?.abort(); requestRef.current = null; }, []);
  useEffect(() => {
    if (submittedWhatsAppUrl) headingRef.current?.focus();
  }, [submittedWhatsAppUrl]);
  useEffect(() => {
    if (Object.keys(fieldErrors).length) {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [fieldErrors]);

  const errorProps = (field: string) => ({
    'aria-invalid': Boolean(fieldErrors[field]?.length),
    'aria-describedby': fieldErrors[field]?.length ? `${id}-${field}-error` : undefined,
  });
  const fieldError = (field: string) => fieldErrors[field]?.length ? (
    <p id={`${id}-${field}-error`} className="mt-1 text-sm text-red-700 dark:text-red-300">{fieldErrors[field][0]}</p>
  ) : null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pendingRef.current || honeypot.trim()) return;
    setErrorSummary(null);
    setFieldErrors({});
    setFallbackUrl(null);
    const meetingName = meetingPref === 'zoom' ? 'Zoom' : 'Google Meet';
    const isWhatsAppService = serviceId === 'whatsapp-api' || whatsappPlanIds.includes(serviceId);
    const qualificationContext = isWhatsAppService
      ? [
          industry && `Industry: ${industry}`,
          monthlyMessageVolume && `Estimated monthly message volume: ${monthlyMessageVolume}`,
          `Preferred follow-up: ${preferredContactMethod === 'video' ? meetingName : preferredContactMethod === 'email' ? 'Email' : 'WhatsApp'}`,
        ].filter(Boolean).join('\n')
      : '';
    const combinedContext = [context.trim(), qualificationContext].filter(Boolean).join('\n');
    const details = {
      name, contactMethod: 'whatsapp' as const, contactValue, serviceId,
      planId: whatsappPlanIds.includes(serviceId)
        ? serviceId : serviceId === normalizeService(initialServiceId) ? initialPlanId : undefined,
      context: `${combinedContext} [Preferred Meeting: ${meetingName}]`.trim().slice(0, 1900),
      inquiryAcknowledged, marketingOptIn: false, sourcePage: window.location.pathname,
    };
    const fingerprint = JSON.stringify(details);
    if (!submissionRef.current || submissionRef.current.fingerprint !== fingerprint) {
      submissionRef.current = { key: newSubmissionKey(), fingerprint, pixelEventId: newEventId() };
    }
    const submission = submissionRef.current;
    const validated = leadSubmissionSchema.safeParse({
      ...details,
      idempotencyKey: submission.key,
      pixelEventId: submission.pixelEventId,
    });
    if (!validated.success) {
      setFieldErrors(validated.error.flatten().fieldErrors);
      setErrorSummary('Please check the highlighted fields and try again.');
      return;
    }
    const serviceTitle = serviceOptions.find((option) => option.id === serviceId)?.title || serviceId;
    const text = `Inquiry to DataNest BD\nName: ${name.trim()}\nService: ${serviceTitle}\nWhatsApp: ${contactValue.trim()}\nMeeting: ${meetingName}\nDetails: ${details.context || 'General consultation'}`;
    const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(text)}`;
    pendingRef.current = true;
    setIsSubmitting(true);
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    let saved = false;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ''}/api/leads`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated.data), signal: controller.signal,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        if (data?.fieldErrors) setFieldErrors(data.fieldErrors);
        const message = response.status === 429
          ? 'Too many inquiries were submitted. Please wait a few minutes, or contact us on WhatsApp.'
          : response.status === 400 ? 'Please check your details and try again.'
          : 'We could not save your inquiry. Your details are still here; try again or continue on WhatsApp.';
        setErrorSummary(message);
        setFallbackUrl(whatsappUrl);
        return;
      }
      saved = true;
      const planPrice = pricingTiers.find((tier) => tier.id === validated.data.planId)?.monthlyPriceTk;
      trackLead({ contentName: serviceTitle, value: planPrice, eventId: submission.pixelEventId });
      setSubmittedWhatsAppUrl(whatsappUrl);
    } catch {
      if (!controller.signal.aborted || requestRef.current === controller) {
        setErrorSummary('We could not confirm your inquiry was saved. Check your connection and retry, or continue on WhatsApp.');
        setFallbackUrl(whatsappUrl);
      }
    } finally {
      window.clearTimeout(timeout);
      pendingRef.current = false;
      setIsSubmitting(false);
      requestRef.current = null;
    }
    if (saved) onSuccess?.();
  };

  const startAnother = () => {
    submissionRef.current = null;
    setName(''); setContactValue(''); setIndustry(''); setMonthlyMessageVolume(''); setPreferredContactMethod('whatsapp'); setContext(''); setInquiryAcknowledged(false);
    setServiceId(normalizeService(initialServiceId)); setMeetingPref('google-meet');
    setErrorSummary(null); setFieldErrors({}); setFallbackUrl(null); setSubmittedWhatsAppUrl(null);
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus());
  };

  if (submittedWhatsAppUrl) return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 space-y-5">
      <CheckCircle2 className="h-10 w-10 text-[#336269] dark:text-[#93D4D8]" aria-hidden="true" />
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold">Your inquiry has been saved</h2>
      <p className="text-base text-[var(--color-text-secondary)]">Continue in WhatsApp to send your prepared message. You can review it there before sending.</p>
      <div className="flex flex-wrap gap-3">
        <a href={submittedWhatsAppUrl} onClick={() => trackWhatsAppClick('lead-form-success')} target="_blank" rel="noopener noreferrer" className="glass-btn glass-btn-accent min-h-12 px-5 text-base">
          <MessageSquare className="h-5 w-5 shrink-0" aria-hidden="true" />Continue in WhatsApp<span className="sr-only"> (opens a new tab)</span>
        </a>
        <button type="button" onClick={startAnother} className="glass-btn min-h-12 px-5 text-sm">Submit another inquiry</button>
      </div>
    </div>
  );

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">{subtitle}</p>
        <a href={siteConfig.contact.whatsappUrl} onClick={() => trackWhatsAppClick('lead-form-skip')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-link)] underline underline-offset-4">
          Prefer to skip the form? Chat on WhatsApp<ArrowRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (opens a new tab)</span>
        </a>
      </div>
      <p className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
        <Video className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Meetings take place online via Google Meet or Zoom. Fields marked * are required.
      </p>
      {errorSummary && (
        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
          <p className="flex items-start gap-2"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{errorSummary}</p>
          {fallbackUrl && <a className="mt-3 inline-flex min-h-11 items-center font-semibold underline" href={fallbackUrl} onClick={() => trackWhatsAppClick('lead-form-fallback')} target="_blank" rel="noopener noreferrer">Continue directly in WhatsApp<span className="sr-only"> (opens a new tab)</span></a>}
        </div>
      )}
      <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={isSubmitting} className="space-y-5">
        <div hidden aria-hidden="true"><label htmlFor={`${id}-honeypot`}>Leave blank</label><input id={`${id}-honeypot`} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></div>
        <fieldset disabled={isSubmitting} className="min-w-0 space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="min-w-0 space-y-2">
              <label htmlFor={`${id}-name`} className={labelClass}>Your name or business name *</label>
              <input id={`${id}-name`} name="name" required minLength={2} maxLength={100} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Tanvir Ahmed" className={inputClass} {...errorProps('name')} />
              {fieldError('name')}
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor={`${id}-service`} className={labelClass}>Service you need *</label>
              <select id={`${id}-service`} name="serviceId" required value={serviceId} onChange={(e) => setServiceId(e.target.value)} className={inputClass} {...errorProps('serviceId')}>
                {serviceOptions.map((option) => <option key={option.id} value={option.id}>{option.title}</option>)}
              </select>
              {fieldError('serviceId')}
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor={`${id}-phone`} className={labelClass}>WhatsApp number *</label>
              <input id={`${id}-phone`} name="contactValue" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} value={contactValue} onChange={(e) => setContactValue(e.target.value)} placeholder="+880 1700-000000" className={inputClass} {...errorProps('contactValue')} />
              {fieldError('contactValue')}
            </div>
            <fieldset className="min-w-0 space-y-2">
              <legend className={labelClass}>Preferred meeting platform</legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {[['google-meet', 'Google Meet'], ['zoom', 'Zoom']].map(([value, label]) => (
                  <label key={value} className="flex min-h-12 flex-1 items-center gap-2 rounded-xl border border-[var(--color-border)] px-3 text-sm">
                    <input type="radio" name={`${id}-meeting`} value={value} checked={meetingPref === value} onChange={() => setMeetingPref(value)} className="h-4 w-4 accent-[var(--red-700)]" />{label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          {(serviceId === 'whatsapp-api' || whatsappPlanIds.includes(serviceId)) && (
            <div className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/45 p-4 sm:p-5">
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text-headings)]">Help us prepare the right WhatsApp setup</h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Optional details help us route your consultation without adding extra steps later.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="min-w-0 space-y-2">
                  <label htmlFor={`${id}-industry`} className={labelClass}>Your industry <span className="font-normal text-[var(--color-text-secondary)]">(optional)</span></label>
                  <select id={`${id}-industry`} name="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className={inputClass}>
                    <option value="">Select an industry</option>
                    <option>E-commerce</option>
                    <option>Travel or recruitment</option>
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Professional services</option>
                    <option>Local service business</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="min-w-0 space-y-2">
                  <label htmlFor={`${id}-volume`} className={labelClass}>Estimated monthly message volume <span className="font-normal text-[var(--color-text-secondary)]">(optional)</span></label>
                  <select id={`${id}-volume`} name="monthlyMessageVolume" value={monthlyMessageVolume} onChange={(e) => setMonthlyMessageVolume(e.target.value)} className={inputClass}>
                    <option value="">Select a range</option>
                    <option>Under 1,000</option>
                    <option>1,000–10,000</option>
                    <option>10,000–50,000</option>
                    <option>50,000+</option>
                  </select>
                </div>
              </div>
              <fieldset className="space-y-2">
                <legend className={labelClass}>Preferred follow-up <span className="font-normal text-[var(--color-text-secondary)]">(optional)</span></legend>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[['whatsapp', 'WhatsApp'], ['email', 'Email'], ['video', 'Google Meet or Zoom']].map(([value, label]) => (
                    <label key={value} className="flex min-h-12 items-center gap-2 rounded-xl border border-[var(--color-border)] px-3 text-sm">
                      <input type="radio" name={`${id}-preferred-contact`} value={value} checked={preferredContactMethod === value} onChange={() => setPreferredContactMethod(value)} className="h-4 w-4 accent-[var(--red-700)]" />{label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor={`${id}-context`} className={labelClass}>{serviceId === 'whatsapp-api' || whatsappPlanIds.includes(serviceId) ? 'Primary challenge or project details' : 'Project details'} <span className="font-normal text-[var(--color-text-secondary)]">(optional)</span></label>
            <textarea id={`${id}-context`} name="context" rows={4} maxLength={1900} value={context} onChange={(e) => setContext(e.target.value)} placeholder={serviceId === 'whatsapp-api' || whatsappPlanIds.includes(serviceId) ? 'What would you like WhatsApp to help your team handle?' : 'Tell us about your goals, team size, or existing tools.'} className={`${inputClass} resize-y`} {...errorProps('context')} />
            {fieldError('context')}
          </div>
          <div>
            <label className="flex items-start gap-3 text-sm leading-relaxed">
              <input name="inquiryAcknowledged" type="checkbox" required checked={inquiryAcknowledged} onChange={(e) => setInquiryAcknowledged(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[var(--red-700)]" {...errorProps('inquiryAcknowledged')} />
              <span>I agree that DataNest BD may contact me about this inquiry via WhatsApp or an online meeting. *</span>
            </label>
            {fieldError('inquiryAcknowledged')}
          </div>
          <button type="submit" disabled={isSubmitting} className="glass-btn glass-btn-accent min-h-12 w-full px-5 py-3 text-base disabled:cursor-wait disabled:opacity-60">
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin shrink-0" aria-hidden="true" /> : <MessageSquare className="h-5 w-5 shrink-0" aria-hidden="true" />}
            {isSubmitting ? 'Saving your inquiry…' : 'Save inquiry & continue'}
          </button>
        </fieldset>
        <p role="status" className="sr-only">{isSubmitting ? 'Saving your inquiry. Please wait.' : ''}</p>
      </form>
    </div>
  );
}
