"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

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
    const email = fd.get('email')?.toString().trim();
    const message = fd.get('message')?.toString().trim();

    if (!email || !message) {
      setError(t('contact.error.fill') as string);
      setStatus('error');
      return;
    }

    try {
      const res = await fetch(action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setError(t('contact.error.network') as string);
        setStatus('error');
      }
    } catch (err) {
      setError(t('contact.error.network') as string);
      setStatus('error');
    }
  };

  const labelClass = "block text-sm font-bold text-gray-700 uppercase mb-1 ml-1";
  const inputClass = "block w-full border-2 border-gray-300 rounded-md p-2 mb-4 focus:border-red-500 outline-none transition-colors";

  return (
    <form method="POST" action={action} onSubmit={handleSubmit} className="relative">
      <div className="flex flex-col">
        <label htmlFor="name" className={labelClass}>{t('contact.label.name')}</label>
        <input name="name" type="text" className={inputClass} />

        <label htmlFor="email" className={labelClass}>{t('contact.label.email')}</label>
        <input name="email" type="email" className={inputClass} required />

        {!compact && (
          <>
            <label htmlFor="subject" className={labelClass}>{t('contact.label.subject')}</label>
            <input name="subject" type="text" className={inputClass} />
          </>
        )}

        <label htmlFor="message" className={labelClass}>{t('contact.label.message')}</label>
        <textarea name="message" className={inputClass} rows={4} required></textarea>

        <div className="flex items-center gap-4">
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            // Ton style original exact
            className={compact ? 'btn' : 'border-2 border-red-500 bg-white text-black text-lg rounded-md p-2 w-40 hover:text-red-500 transition-colors font-bold'}
            whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.14 } }}
            whileTap={{ scale: 0.97 }}
          >
            {status === 'loading' ? '...' : t('contact.send')}
          </motion.button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 font-medium">
                {t('contact.success')}
              </motion.span>
            )}
            {status === 'error' && error && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 font-medium text-sm">
                {error}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}