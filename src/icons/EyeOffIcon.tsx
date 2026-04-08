interface IconProps {
  size?: number
  className?: string
}

export default function EyeOffIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.5319 9.46992L9.47188 14.5299C8.82188 13.8799 8.42188 12.9899 8.42188 11.9999C8.42188 10.0199 10.0219 8.41992 12.0019 8.41992C12.9919 8.41992 13.8819 8.81992 14.5319 9.46992Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8237 5.77047C16.0737 4.45047 14.0737 3.73047 12.0037 3.73047C8.47375 3.73047 5.18375 5.81047 2.89375 9.41047C1.99375 10.8205 1.99375 13.1905 2.89375 14.6005C3.68375 15.8405 4.60375 16.9105 5.60375 17.7705"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.42188 19.5297C9.56187 20.0097 10.7719 20.2697 12.0019 20.2697C15.5319 20.2697 18.8219 18.1897 21.1119 14.5897C22.0119 13.1797 22.0119 10.8097 21.1119 9.39969C20.7819 8.87969 20.4219 8.38969 20.0519 7.92969"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5075 12.7002C15.2475 14.1102 14.0975 15.2602 12.6875 15.5202"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.47 14.5303L2 22.0003"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.0013 2L14.5312 9.47"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
