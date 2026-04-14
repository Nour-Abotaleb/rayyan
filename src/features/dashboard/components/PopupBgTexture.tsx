/**
 * Vector shape from `popup-bg.svg` — uses `currentColor` so tint via parent `text-*` classes.
 */
export default function PopupBgTexture({
  className,
  preserveAspectRatio = "none",
}: {
  className?: string;
  preserveAspectRatio?: string;
}) {
  return (
    <svg
      viewBox="0 0 423 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      aria-hidden
    >
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0H351.618C360.455 0 367.619 7.16344 367.619 16V34C367.619 47.2548 378.364 58 391.619 58H407C415.837 58 423 65.1634 423 74V164C423 172.837 415.837 180 407 180H16C7.16344 180 0 172.837 0 164V16Z"
        fill="currentColor"
      />
    </svg>
  );
}
