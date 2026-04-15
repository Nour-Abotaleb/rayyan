
export default function CardBg({
    className,
    preserveAspectRatio = "none",
  }: {
    className?: string;
    preserveAspectRatio?: string;
  }) {
    return (
      <svg
        viewBox="0 0 364 219"
        fill="#ffffff60"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        preserveAspectRatio={preserveAspectRatio}
        aria-hidden
      >
        <g filter="url(#bgblur_card)">
          <path
            d="M307 29C307 45.0163 319.984 58 336 58H344C355.046 58 364 66.9543 364 78V195C364 208.255 353.255 219 340 219H24C10.7452 219 0 208.255 0 195V24C0 10.7452 10.7452 0 24 0H287C298.046 0 307 8.95431 307 20V29Z"
            fill="#ffffff60"
          />
        </g>
        <defs>
          <filter
            id="bgblur_card"
            x="-4"
            y="-4"
            width="372"
            height="227"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }