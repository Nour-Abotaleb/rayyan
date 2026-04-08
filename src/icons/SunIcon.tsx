interface IconProps {
  size?: number
  className?: string
}

export default function SunIcon({ size = 22, className }: IconProps) {
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
        d="M10.9998 16.9587C14.2905 16.9587 16.9582 14.291 16.9582 11.0003C16.9582 7.70963 14.2905 5.04199 10.9998 5.04199C7.70914 5.04199 5.0415 7.70963 5.0415 11.0003C5.0415 14.291 7.70914 16.9587 10.9998 16.9587Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5452 17.5447L17.426 17.4255M17.426 4.57384L17.5452 4.45467L17.426 4.57384ZM4.45516 17.5447L4.57433 17.4255L4.45516 17.5447ZM11.0002 1.90634V1.83301V1.90634ZM11.0002 20.1663V20.093V20.1663ZM1.90683 10.9997H1.8335H1.90683ZM20.1668 10.9997H20.0935H20.1668ZM4.57433 4.57384L4.45516 4.45467L4.57433 4.57384Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
