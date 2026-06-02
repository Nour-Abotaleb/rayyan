export default function FilterIcon({ size = 11, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={(size * 7) / 11}
      viewBox="0 0 11 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M4.08333 7V5.83333H6.41667V7H4.08333ZM1.75 4.08333V2.91667H8.75V4.08333H1.75ZM0 1.16667V0H10.5V1.16667H0Z"
        fill="currentColor"
      />
    </svg>
  );
}
