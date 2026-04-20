export function UnitedKingdomFlag({
  width = 24,
  height = 16,
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 30"
      width={width}
      height={height}
    >
      <clipPath id="s">
        <path d="M0,0 v30 h45 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M22.5,15 h22.5 v15 z v15 h-22.5 z h-22.5 v-15 z v-15 h22.5 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h45 v-30 z" fill="#012169" />
        <path d="M0,0 L45,30 M45,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L45,30 M45,0 L0,30"
          clipPath="url(#t)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M22.5,0 v30 M0,15 h45" stroke="#fff" strokeWidth="10" />
        <path d="M22.5,0 v30 M0,15 h45" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
