export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-red-600 px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-200 ease-in-out hover:bg-red-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 active:translate-y-0 ${
                    disabled && 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
