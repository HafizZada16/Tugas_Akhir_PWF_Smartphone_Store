export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold tracking-wide text-gray-700 shadow-sm transition-all duration-200 ease-in-out hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
