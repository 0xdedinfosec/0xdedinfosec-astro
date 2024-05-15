import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { formatViews } from '../lib/utils';

const BlogPostViews = ({
    slug,
    className,
    increment,
}: {
    slug: string;
    className?: string;
    increment?: boolean;
}) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
    });
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        try {
            if (inView) {
                fetch(`${import.meta.env.PUBLIC_API_URL}/views/${slug}`, {
                    method: increment ? 'POST' : 'GET',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setViews(data.count);
                    });
            }
        } catch (e) {
            console.log(e);
        }
    }, [inView]);

    return (
        <span
            className={className ? className : 'ml-2 align-baseline capsize'}
            ref={ref}
        >
            {views ? formatViews(views) : '–––'}
        </span>
    );
};

export default BlogPostViews;
