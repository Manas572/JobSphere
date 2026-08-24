import React from 'react';
import { useResumeStore } from '../store';

const Checkbox = ({ title, items, field, displayKey = 'title' }) => {
  const { [field]: selectedIds, toggleList } = useResumeStore();
  
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-lg font-medium text-white mb-4">Select {title}</h2>
      <div className="space-y-3">
        {items?.length === 0 && <p className="text-sm text-zinc-500">No {title.toLowerCase()} found.</p>}
        {items?.map(item => (
          <label key={item.id} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 transition-colors">
            <input 
              type="checkbox" 
              checked={selectedIds?.includes(item.id)}
              onChange={() => toggleList(field, item.id)}
              className="w-5 h-5 accent-blue-500 rounded cursor-pointer"
            />
            <span className="text-sm text-zinc-200">{item[displayKey] || item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;