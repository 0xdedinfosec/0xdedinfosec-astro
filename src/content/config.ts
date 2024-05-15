import { defineCollection, z } from 'astro:content';

const blogsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        image: z.string(),
    }),
});

const snippetsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            image: image(),
        }),
});

export const collections = {
    blogs: blogsCollection,
    snippets: snippetsCollection,
};
