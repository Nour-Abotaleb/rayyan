interface IconProps {
  size?: number
  className?: string
}

export default function MoonIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.85839 11.3852C2.18839 16.106 6.19423 19.9469 10.9884 20.1577C14.3709 20.3044 17.3959 18.7277 19.2109 16.2435C19.9626 15.226 19.5592 14.5477 18.3034 14.7769C17.6892 14.8869 17.0567 14.9327 16.3967 14.9052C11.9142 14.7219 8.24756 10.9727 8.22922 6.54521C8.22006 5.35354 8.46756 4.22604 8.91672 3.19938C9.41172 2.06271 8.81589 1.52188 7.67006 2.00771C4.04006 3.53854 1.55589 7.19604 1.85839 11.3852Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
