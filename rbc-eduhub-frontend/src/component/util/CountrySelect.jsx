import React, { useState, useEffect, useRef } from 'react';
import countries from '../../data/countries';

export default function CountrySelect({ value, onChange, placeholder = 'Select country' }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [dropUp, setDropUp] = useState(false);
  const wrapperRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    function onDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  useEffect(() => {
    if (open && wrapperRef.current && !isMobile) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 224;
      
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  }, [open, isMobile]);

  const selected = countries.find((c) => c.code === value);
  const filtered = countries.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  function handleSelect(code) {
    onChange && onChange(code);
    setQuery('');
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[highlight]) handleSelect(filtered[highlight].code);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <>
      <select
        name="country"
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="md:hidden w-full border border-gray-300 p-2 rounded bg-white"
        required
      >
        <option value="">{placeholder}</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>{c.name}</option>
        ))}
      </select>

      <div className="hidden md:block relative w-full" ref={wrapperRef}>
        <div
          className="flex items-center border border-gray-300 rounded overflow-hidden bg-white"
          onKeyDown={handleKeyDown}
        >
          <input
            type="text"
            aria-label="Country"
            placeholder={selected ? selected.name : placeholder}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlight(0); }}
            onFocus={() => setOpen(true)}
            className="flex-1 p-2 outline-none min-w-0"
          />
          <button
            type="button"
            aria-label="toggle"
            onClick={() => { setOpen((o) => !o); }}
            className="px-3 border-l border-gray-300 flex-shrink-0"
          >
            ▾
          </button>
        </div>

        {open && (
          <ul 
            className={`absolute z-50 max-h-56 w-full overflow-auto bg-white border border-gray-300 rounded shadow-lg left-0 ${
              dropUp ? 'bottom-full mb-1' : 'top-full mt-1'
            }`}
          >
            {filtered.length === 0 && (
              <li className="p-2 text-sm text-gray-500">No results</li>
            )}
            {filtered.map((c, i) => (
              <li
                key={c.code}
                className={`p-2 cursor-pointer hover:bg-blue-50 ${i === highlight ? 'bg-blue-50' : ''}`}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => { e.preventDefault(); handleSelect(c.code); }}
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}