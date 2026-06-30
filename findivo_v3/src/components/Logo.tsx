type Props = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

export function Logo({ size = 36, withWordmark = true, className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" className="fill-findivo-700 dark:fill-findivo-800" />
        <circle cx="24" cy="24" r="13" stroke="#14b8a6" strokeWidth="2.4" fill="none" />
        <path d="M24 15 L27.5 24 L24 33 L20.5 24 Z" fill="#14b8a6" />
      </svg>
      {withWordmark && (
        <span className="text-lg font-semibold tracking-tight text-findivo-900 dark:text-cream">
          findivo
        </span>
      )}
    </span>
  );
}
