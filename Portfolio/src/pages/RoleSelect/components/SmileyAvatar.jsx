/** Simple colored square with a smiley face (no animation library). */
export default function SmileyAvatar({ gradientStart, gradientEnd, name }) {
  const gradientId = `avatar-${name}`;

  return (
    <svg className="smiley-avatar" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={gradientStart} />
          <stop offset="100%" stopColor={gradientEnd} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="200" rx="8" fill={`url(#${gradientId})`} />
      <circle cx="72" cy="82" r="10" fill="#fff" />
      <circle cx="128" cy="82" r="10" fill="#fff" />
      <path
        d="M68 128 Q100 158 132 128"
        stroke="#fff"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
