import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Analysis: long-form forensic research pieces
const analysis = defineCollection({
  loader: glob({ base: './src/content/analysis', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    number: z.string(),          // e.g. "001", "002"
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    status: z.string().default('Published'),
  }),
});

// Signals: short-form intelligence updates
const signals = defineCollection({
  loader: glob({ base: './src/content/signals', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    pubDate: z.coerce.date(),
    tag: z.string(),             // e.g. "Geopolitics", "Finance", "Technology"
  }),
});

export const collections = { analysis, signals };
