interface ButtonProps {
  text: string;
  callback: () => void;
  disabled?: boolean;
}

function Button({ text, callback, disabled }: ButtonProps) {
  const enabledStyles =
    "bg-cyan-400 w-24 h-9 flex shadow-xl items-center justify-center rounded-lg cursor-pointer ";

  const disabledStyles =
    "bg-cyan-400 w-24 h-9 flex items-center justify-center rounded-lg cursor-not-allowed opacity-20";

  return (
    <div
      className={disabled ? disabledStyles : enabledStyles}
      onClick={() => callback()}>
      <div className="text-[#000000] text-xl">{text}</div>
    </div>
  );
}

export default Button;
