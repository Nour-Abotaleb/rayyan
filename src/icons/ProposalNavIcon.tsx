"use client";

export default function ProposalNavIcon({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
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
        d="M22 13V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.32812 14.4898L9.70813 11.3998C10.0481 10.9598 10.6781 10.8798 11.1181 11.2198L12.9482 12.6598C13.3882 12.9998 14.0181 12.9198 14.3581 12.4898L16.6682 9.50977"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4773 15.8204L19.7573 16.3904C19.8973 16.6704 20.2473 16.9304 20.5573 16.9904L20.9373 17.0504C22.0773 17.2404 22.3473 18.0804 21.5273 18.9104L21.1773 19.2604C20.9473 19.5004 20.8173 19.9604 20.8873 20.2804L20.9373 20.4904C21.2473 21.8704 20.5173 22.4004 19.3173 21.6804L19.0573 21.5304C18.7473 21.3504 18.2473 21.3504 17.9373 21.5304L17.6773 21.6804C16.4673 22.4104 15.7373 21.8704 16.0573 20.4904L16.1073 20.2804C16.1773 19.9604 16.0473 19.5004 15.8173 19.2604L15.4673 18.9104C14.6473 18.0804 14.9173 17.2404 16.0573 17.0504L16.4373 16.9904C16.7373 16.9404 17.0973 16.6704 17.2373 16.3904L17.5173 15.8204C18.0573 14.7304 18.9373 14.7304 19.4773 15.8204Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

