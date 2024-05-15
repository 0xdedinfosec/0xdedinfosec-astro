import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<boolean | string>(false);

    useEffect(() => {
        if (window.location !== undefined) {
            const theme =
                document.documentElement.attributes.getNamedItem(
                    'data-theme'
                )?.value;
            if (theme) {
                setTheme(theme);
            }
        }
    }, [theme]);

    const changeTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.dispatchEvent(
            new CustomEvent('set-theme', { detail: newTheme })
        );
        setTheme(newTheme);
    };

    return (
        <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all'
            onClick={() => changeTheme()}
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                className='w-5 h-5 text-gray-800 dark:text-gray-200'
            >
                {theme === 'dark' ? (
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                ) : (
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                    />
                )}
            </svg>
        </button>
    );
};

export default ThemeSwitcher;
