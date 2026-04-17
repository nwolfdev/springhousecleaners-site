import { defineCollection, z } from 'astro:content';

// Note: `slug` is a reserved Astro property - we use it via entry.slug, not data.slug
const cityCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    city: z.string(),
    date: z.string().optional(),
    type: z.string().optional()
  })
});

const serviceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    type: z.string().optional()
  })
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    type: z.string().optional(),
    excerpt: z.string().optional()
  })
});

const pageCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    type: z.string().optional()
  })
});

export const collections = {
  cities: cityCollection,
  services: serviceCollection,
  blog: blogCollection,
  pages: pageCollection
};
