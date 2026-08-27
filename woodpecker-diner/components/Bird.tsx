export default function Bird({ width = 70 }: { width?: number }) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Woodpecker mascotte"
    >
      <path d="M52 22 L43 5 L56 14 L54 1 L67 12 L67 3 L76 20 Z" fill="var(--orange)" />
      <path
        d="M58 30c9 14 8 34-6 46-4 4-9 6-14 7l-16 5 10-15c-4-14 0-31 12-40 4-3 9-4 14-3Z"
        fill="var(--brown)"
      />
      <circle cx="62" cy="29" r="16" fill="var(--brown)" />
      <path d="M75 25 L97 32 L75 39 Z" fill="var(--orange)" />
      <circle cx="66" cy="25" r="4.6" fill="var(--creme-light)" />
      <circle cx="67.2" cy="25" r="2.2" fill="var(--brown)" />
      <path
        d="M54 44c5 9 4 21-3 29-4 4-9 5-13 3-4-8-3-20 3-27 3-4 8-6 13-5Z"
        fill="var(--creme-light)"
      />
    </svg>
  )
}
