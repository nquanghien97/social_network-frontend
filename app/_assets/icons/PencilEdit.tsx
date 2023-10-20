interface PencilEditProps {
  color?: string;
}

function PencilEdit(props: PencilEditProps) {
  const { color } = props;
  return (
    <svg
      width={20}
      height={20}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ModeIcon"
      tabIndex={-1}
      fill={color}
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
    </svg>
  );
}

export default PencilEdit;
