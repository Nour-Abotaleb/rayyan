interface IconProps {
  size?: number;
  className?: string;
}

export default function UserNameIcon({ size = 24, className }: IconProps) {
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
        d="M18 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H6C4.34 18.86 3 17.53 3 15.89V4.97C3 3.33 4.34 2 6 2H18C19.66 2 21 3.33 21 4.97V15.88C21 17.52 19.66 18.86 18 18.86Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0691 8.9498C12.0291 8.9498 11.9691 8.9498 11.9191 8.9498C10.8691 8.9098 10.0391 8.0598 10.0391 6.9998C10.0391 5.9198 10.9091 5.0498 11.9891 5.0498C13.0691 5.0498 13.9391 5.9298 13.9391 6.9998C13.9491 8.0598 13.1191 8.9198 12.0691 8.9498Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2475 11.96C7.9175 12.85 7.9175 14.3 9.2475 15.19C10.7575 16.2 13.2375 16.2 14.7475 15.19C16.0775 14.3 16.0775 12.85 14.7475 11.96C13.2375 10.96 10.7675 10.96 9.2475 11.96Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
