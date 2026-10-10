import { z } from 'zod';

const year = z.number().int().min(1950).max(2100);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD');
const bullets = z.array(z.string().min(1)).min(1);

export const resumeSchema = z.object({
  basics: z.object({
    name: z.string(),
    label: z.string(),
    email: z.string(),
    phone: z.object({ value: z.string(), print_only: z.boolean().optional() }).optional(),
    location: z.object({
      address: z.string(),
      postal_code: z.string(),
      city: z.string(),
      country: z.string(),
      print_only: z.boolean().optional(), // hides street + postal code on the web
    }),
    summary: z.string(),
  }),
  metrics: z.array(z.object({ value: z.string(), label: z.string() })),
  skills: z.array(z.object({ id: z.string(), title: z.string(), items: bullets })),
  education: z.array(
    z.object({ id: z.string(), institution: z.string(), location: z.string(), degree: z.string(), start: year, end: year }),
  ),
  competencies: z.array(z.string()),
  experience: z.array(
    z.object({
      id: z.string().regex(/^[a-z0-9-]+$/),
      company: z.string(),
      sector: z.string().optional(),
      position: z.string(),
      location: z.string(),
      start: year,
      end: year.nullable(), // null = present
      tags: z.array(z.string()).optional(),
      duration: z.string().optional(),
      description: z.string().optional(),
      highlights: bullets.optional(),
      sections: z.array(z.object({ title: z.string(), highlights: bullets })).optional(),
    }),
  ),
  languages: z.array(z.object({ name: z.string(), level: z.enum(['native', 'fluent', 'basic']) })),
  hobbies: z.array(z.string()),
  projects: z.array(
    z.object({ id: z.string(), name: z.string(), role: z.string(), start: year, end: year, description: z.string() }),
  ),
  certifications: z.array(
    z.object({
      issuer: z.string(),
      name: z.string(),
      issued: isoDate,
      expires: isoDate.optional(),
      url: z.string().url().optional(),
    }),
  ),
});

export type Resume = z.infer<typeof resumeSchema>;
