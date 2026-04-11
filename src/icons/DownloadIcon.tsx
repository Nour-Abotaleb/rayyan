interface IconProps {
  size?: number
  className?: string
}

export default function DownloadIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.59255 5.19141C11.6926 5.37224 12.5501 6.45141 12.5501 8.81391V8.88974C12.5501 11.4972 11.5059 12.5414 8.89839 12.5414H5.10089C2.49339 12.5414 1.44922 11.4972 1.44922 8.88974V8.81391C1.44922 6.46891 2.29505 5.38974 4.36005 5.19724"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 1.16699V8.68033"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.95326 7.37891L6.99909 9.33307L5.04492 7.37891"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
