import { ui, type Lang } from './ui';

export const range = (start: number, end: number | null, lang: Lang) =>
  end === start ? `${start}` : `${start} – ${end ?? ui[lang].present}`;

const utc = (iso: string) => new Date(`${iso}T00:00:00Z`);

export const month = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(utc(iso));

export const isPast = (iso: string) => utc(iso).getTime() < Date.now();
