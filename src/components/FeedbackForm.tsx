"use client";

import { useState } from 'react';
import { z } from 'zod';

const feedbackSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
  category: z.enum(['bug', 'feature', 'ui_ux', 'performance', 'security', 'other']),
  rating: z.coerce.number().min(1).max(5),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }).max(2000),
  userEmail: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  userName: z.string().min(1).max(80).optional().or(z.literal('')),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  bug: 'Describe the bug, steps to reproduce, expected vs actual behavior...',
  feature: 'Describe the feature you would like to see, why it is needed, and how it should work...',
  ui_ux: 'Describe the UI/UX issue, where it occurs, and your suggested improvement...',
  performance: 'Describe the performance issue, when it happens, and any metrics...',
  security: 'Describe the security concern (do not include sensitive credentials)...',
  other: 'Please provide details about your feedback...',
};

export default function FeedbackForm() {
  const [form, setForm] = useState<FeedbackFormValues>({
    title: '',
    category: 'feature',
    rating: 5,
    description: '',
    userEmail: '',
    userName: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const validateField = (name: keyof FeedbackFormValues, value: unknown) => {
    try {
      feedbackSchema.shape[name as keyof typeof feedbackSchema.shape].parse(value);
      return '';
    } catch (e: any) {
      return e.errors?.[0]?.message || 'Invalid';
    }
  };

  const handleChange = (name: keyof FeedbackFormValues, value: unknown) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const validation = feedbackSchema.safeParse(form);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof FeedbackFormValues, string>> = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FeedbackFormValues;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || 'Failed to submit feedback');
      setSubmitStatus({
        type: 'success',
        message: result.message || 'Thank you! Your feedback has been submitted.',
      });
      setForm({
        title: '',
        category: 'feature',
        rating: 5,
        description: '',
        userEmail: '',
        userName: '',
      });
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const charCount = form.description.length;
  const categoryPlaceholder = CATEGORY_PLACEHOLDERS[form.category];

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Feedback Title
        </label>
        <input
          id="title"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 ${errors.title ? 'border-red-500' : ''}`}
          placeholder="e.g. Dark mode toggle"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value as FeedbackFormValues['category'])}
            className="mt-1 block w-full rounded-md border-gray-300"
          >
            <option value="feature">Feature Request</option>
            <option value="bug">Bug Report</option>
            <option value="ui_ux">UI/UX Improvement</option>
            <option value="performance">Performance</option>
            <option value="security">Security</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating (1-5)
          </label>
          <select
            id="rating"
            value={form.rating}
            onChange={(e) => handleChange('rating', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} - {r === 5 ? 'Excellent' : r === 4 ? 'Very Good' : r === 3 ? 'Good' : r === 2 ? 'Fair' : 'Poor'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Detailed Description
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={6}
          className={`mt-1 block w-full rounded-md border-gray-300 ${errors.description ? 'border-red-500' : ''}`}
          placeholder={categoryPlaceholder}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        <div className="mt-1 text-right text-xs text-gray-500">
          {charCount} / 2000 characters
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            Your Name (optional)
          </label>
          <input
            id="userName"
            value={form.userName}
            onChange={(e) => handleChange('userName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
            Email (optional, for updates)
          </label>
          <input
            id="userEmail"
            type="email"
            value={form.userEmail}
            onChange={(e) => handleChange('userEmail', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300"
            placeholder="you@example.com"
          />
          {errors.userEmail && <p className="mt-1 text-sm text-red-600">{errors.userEmail}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {submitStatus && (
        <div
          className={`p-3 rounded-md ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
        >
          {submitStatus.message}
        </div>
      )}
    </form>
  );
}