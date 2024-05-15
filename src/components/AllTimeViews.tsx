import { useEffect, useState } from 'react';
import { formatViews } from '../lib/utils';

const AllTimeViews = () => {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        try {
            fetch(`${import.meta.env.PUBLIC_API_URL}/views`)
                .then((res) => res.json())
                .then((data) => {
                    setViews(data.count);
                });
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div className='transform hover:scale-[1.01] transition-all border dark:border-gray-800 rounded p-4 w-full bg-white dark:bg-gray-900'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='2em'
                height='2em'
                viewBox='0 0 32 32'
            >
                <path
                    fill='currentColor'
                    d='M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25'
                />
                <path
                    fill='currentColor'
                    d='M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6m0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4'
                />
            </svg>
            <h3 className='text-lg font-bold text-left mt-2 text-gray-900 dark:text-gray-100'>
                All-Time Views
            </h3>
            <p className='mt-1 text-gray-700 dark:text-gray-400'>
                {views ? formatViews(views) : '-'}
            </p>
        </div>
    );
};

export default AllTimeViews;
