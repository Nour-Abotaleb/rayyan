interface IconProps {
  size?: number;
  className?: string;
}

export default function LockIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8.96875 22H14.9688C19.9688 22 21.9688 20 21.9688 15V9C21.9688 4 19.9688 2 14.9688 2H8.96875C3.96875 2 1.96875 4 1.96875 9V15C1.96875 20 3.96875 22 8.96875 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.96875 12.7001L7.96875 12.6801C8.71875 12.6801 9.55875 13.2501 9.83875 13.9501L10.9787 16.8301C11.2387 17.4801 11.6487 17.4801 11.9087 16.8301L14.1987 11.0201C14.4187 10.4601 14.8287 10.4401 15.1087 10.9701L16.1487 12.9401C16.4587 13.5301 17.2587 14.0101 17.9187 14.0101H21.9788" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
