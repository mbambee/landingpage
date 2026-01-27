"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

// Reusable contact form used in Services (compact) and Contact sections
export default function ContactForm({ action, compact }: { action: string; compact?: boolean }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus('loading');

    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = (fd.get('email') || '').toString().trim();
    const message = (fd.get('message') || '').toString().trim();

    if (!email || !message) {
      setError(t('contact.error.fill') as string);
      setStatus('error');
      return;
    }

    try {
      const res = await fetch(action, {
        method: form.method || 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        // try to read JSON error if available
        let msg = t('contact.error.network') as string;
        try {
          const json = await res.json();
          if (json && json.error) msg = json.error;
        } catch (_) { }
        setError(msg);
        setStatus('error');
      }
    } catch (err) {
      setError(t('contact.error.network') as string);
      setStatus('error');
    }
  };

  const inputClass = "block border-2 border-gray-300 rounded-md p-2 w-[80%] mb-4";
  return (
    <form method="POST" action={action} onSubmit={handleSubmit} className={compact ? 'p-0' : ''}>
      <label htmlFor="name">{t('contact.label.name')}</label>
      <input name="name" type="text" className={inputClass} />

      <label htmlFor="email">{t('contact.label.email')}</label>
      <input name="email" type="email" className={inputClass} />

      {!compact && (
        <>
          <label htmlFor="subject">{t('contact.label.subject')}</label>
          <input name="subject" type="text" className={inputClass} />
        </>
      )}

      <label htmlFor="message" >{t('contact.label.message')}</label>
      <textarea name="message" className={inputClass} rows={4}></textarea>

      <div className="flex items-center gap-4">
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          className={compact ? 'btn' : 'border-2 border-red-500 bg-white text-black text-lg rounded-md p-2 w-30 hover:text-red-500'}
          whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.14 } }}
          whileTap={{ scale: 0.97 }}
        >
          {t('contact.send')}
        </motion.button>

        {status === 'loading' && <span className="text-gray-600">...</span>}
      </div>

      {status === 'success' && <p className="mt-3 text-green-600">{t('contact.success')}</p>}
      {status === 'error' && error && <p className="mt-3 text-red-600">{error}</p>}
    </form>
  );
}

