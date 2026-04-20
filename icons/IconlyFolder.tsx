type IconlyIconProps = {
  size?: number;
  color?: string;
};

export const IconlyFolder = ({
  size = 24,
  color = "currentColor",
}: IconlyIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.13 15.84H17.37V14.34H7.13V15.84ZM12.46 5.94998L10.2 3.16998H2.5V20.83H22V5.94998H12.46Z"
        fill={color}
      ></path>
    </svg>
  );
};
