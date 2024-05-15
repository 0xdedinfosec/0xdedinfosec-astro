import { useState } from 'react';
import BlogPostViews from './BlogPostViews';

const BlogPostWithSearch = ({ sortedPosts }: { sortedPosts: any }) => {
    const [searchValue, setSearchValue] = useState('');
    const filteredBlogPosts = sortedPosts.filter((post: any) =>
        post.data.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (
        <>
            <div className='relative w-full mb-4'>
                <input
                    aria-label='Search articles'
                    type='text'
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder='Search articles'
                    className='block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
                />
                <svg
                    className='absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                </svg>
            </div>
            <h3 className='mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white'>
                All Posts
            </h3>
            {!filteredBlogPosts.length && (
                <p className='mb-4 text-gray-600 dark:text-gray-400'>
                    No posts found.
                </p>
            )}
            {filteredBlogPosts.length > 0 &&
                filteredBlogPosts.map(
                    (
                        post: {
                            slug: string;
                            data: {
                                title: string;
                                slug: string;
                                description: string;
                            };
                        },
                        key: number
                    ) => (
                        <a
                            href={`/blog/${post.slug}`}
                            className='w-full'
                            key={key}
                        >
                            <div className='w-full mb-8'>
                                <div className='flex flex-col justify-between md:flex-row'>
                                    <h4 className='w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100'>
                                        {post.data.title}
                                    </h4>
                                    <p className='w-32 mb-4 text-left text-gray-500 md:text-right md:mb-0'>
                                        <div className='flex items-center space-x-1'>
                                            {' '}
                                            <BlogPostViews slug={post.slug} />
                                            <span>views</span>
                                        </div>
                                    </p>
                                </div>
                                <p className='text-gray-600 dark:text-gray-400'>
                                    {post.data.description}
                                </p>
                            </div>
                        </a>
                    )
                )}
        </>
    );
};

export default BlogPostWithSearch;
