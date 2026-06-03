interface Props {
  amount: number | string;
  className?: string;
  iconSize?: number;
}

export default function FormatWithCurrency({ amount, className, iconSize = 14 }: Props) {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      <svg width={iconSize} height={Math.round(iconSize * 44 / 38)} viewBox="0 0 38 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
        <g clipPath="url(#riyal-clip)">
          <path d="M23.6496 38.9787C22.9715 40.5364 22.5233 42.2268 22.3516 43.9996L36.7015 40.8393C37.3796 39.2819 37.8275 37.5911 37.9996 35.8184L23.6496 38.9787Z" fill="currentColor"/>
          <path d="M36.7019 31.3718C37.38 29.8144 37.8283 28.1236 38 26.3508L26.8218 28.8139V24.079L36.7016 21.9039C37.3797 20.3465 37.8279 18.6557 37.9997 16.8829L26.8215 19.3438V2.31594C25.1087 3.31228 23.5875 4.63853 22.351 6.20291V20.3286L17.8804 21.3131V0C16.1676 0.995997 14.6464 2.32259 13.4099 3.88698V22.2972L3.40707 24.4993C2.72897 26.0567 2.28039 27.7475 2.10833 29.5202L13.4099 27.032V32.9947L1.29806 35.6612C0.619958 37.2185 0.171722 38.9094 0 40.6821L12.6777 37.8909C13.7097 37.6686 14.5967 37.0364 15.1734 36.1665L17.4984 32.5954V32.5947C17.7398 32.2252 17.8804 31.7798 17.8804 31.3V26.0476L22.351 25.0631V34.5328L36.7016 31.3711L36.7019 31.3718Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="riyal-clip">
            <rect width="38" height="44" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <span>{amount}</span>
    </span>
  );
}
