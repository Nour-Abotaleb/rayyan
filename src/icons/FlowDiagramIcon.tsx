export default function FlowDiagramIcon({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24.5 10.4413V18.5263C24.5 20.4397 22.9367 21.9913 21 21.9913H20.1133C19.18 21.9913 18.2933 22.353 17.64 23.0063L15.645 24.978C14.735 25.8763 13.2534 25.8763 12.3434 24.978L10.3483 23.0063C9.69499 22.353 8.79667 21.9913 7.875 21.9913H7C5.06333 21.9913 3.5 20.4397 3.5 18.5263V5.79801C3.5 3.88467 5.06333 2.33301 7 2.33301H21C22.9367 2.33301 24.5 3.88467 24.5 5.79801" stroke="#488981" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.0793 10.4416C14.0326 10.4416 13.9626 10.4416 13.9043 10.4416C12.6793 10.3949 11.7109 9.40327 11.7109 8.1666C11.7109 6.9066 12.726 5.8916 13.986 5.8916C15.246 5.8916 16.261 6.91827 16.261 8.1666C16.2726 9.40327 15.3043 10.4066 14.0793 10.4416Z" stroke="#488981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.791 17.7214C12.5527 18.8998 15.446 18.8998 17.2077 17.7214C18.7593 16.6831 18.7593 14.9914 17.2077 13.9531C15.446 12.7748 12.5527 12.7748 10.791 13.9531" stroke="#488981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
