import { useState } from 'react';
import { X } from 'lucide-react';

const initialForm = { title: '', location: '', salary: '', description: '' };

export default function PostJobPanel({ onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const salary = Number(form.salary);
    if (!form.title.trim() || !form.location.trim() || !form.description.trim() || !salary || salary < 1) {
      setError('Complete each field and enter a valid annual salary.');
      return;
    }
    onSubmit({
      salary,
      title: form.title.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/65" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="post-job-title" className="flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-[#101416] shadow-2xl">
        <header className="flex items-start justify-between border-b border-white/10 px-5 py-5 sm:px-7">
          <div><p className="text-xs uppercase tracking-[0.12em] text-[#8c969c]">New listing</p><h2 id="post-job-title" className="mt-1 text-xl font-semibold text-white">Post a job</h2><p className="mt-1 text-sm text-[#9ba3a8]">Share the role details candidates need to decide if it fits.</p></div>
          <button onClick={onClose} aria-label="Close job form" className="rounded-md p-2 text-[#9ba3a8] hover:bg-white/5 hover:text-white"><X size={19} /></button>
        </header>
        <form onSubmit={submit} className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1 space-y-5 px-5 py-6 sm:px-7">
            <Field label="Job title" name="title" value={form.title} onChange={update} placeholder="e.g. Senior Backend Engineer" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Location" name="location" value={form.location} onChange={update} placeholder="City or Remote" required />
              <Field label="Annual salary (INR)" name="salary" type="number" min="1" value={form.salary} onChange={update} placeholder="1800000" required />
            </div>
            <label className="block"><span className="mb-2 block text-sm font-medium text-[#d9dddf]">Role description</span><textarea name="description" value={form.description} onChange={update} rows={9} required placeholder="What will this person work on? Include responsibilities and the experience you are looking for." className="w-full resize-y rounded-lg border border-white/10 bg-[#0b0d0f] px-3.5 py-3 text-sm leading-6 text-white outline-none placeholder:text-[#687279] focus:border-[#93b8ab] focus:ring-2 focus:ring-[#93b8ab]/20" /></label>
            <p className="text-xs leading-5 text-[#7f898f]">This preview uses the job fields currently supported by NextHire. Employment type and application settings can be added when the API is ready.</p>
            {error && <p role="alert" className="text-sm text-[#f0a7a7]">{error}</p>}
          </div>
          <footer className="flex justify-end gap-3 border-t border-white/10 px-5 py-4 sm:px-7">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm text-[#a6afb4] hover:bg-white/5 hover:text-white">Cancel</button>
            <button type="submit" className="rounded-lg bg-[#c9e4dc] px-4 py-2.5 text-sm font-semibold text-[#15221f] hover:bg-[#d9eee7]">Add listing to preview</button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, type = 'text', ...props }) {
  return <label className="block"><span className="mb-2 block text-sm font-medium text-[#d9dddf]">{label}</span><input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className="h-11 w-full rounded-lg border border-white/10 bg-[#0b0d0f] px-3.5 text-sm text-white outline-none placeholder:text-[#687279] focus:border-[#93b8ab] focus:ring-2 focus:ring-[#93b8ab]/20" {...props} /></label>;
}
