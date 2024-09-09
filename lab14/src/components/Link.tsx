import React from "react";

type LinkProps = {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

function Link({ active, children, onClick }: LinkProps) {
  return (
    <button
      onClick={onClick}
      disabled={active}
      className={
        "font-xl transition-all " + (active ? "text-gray-700" : "text-gray-300")
      }
    >
      {children}
    </button>
  );
}

export default Link;
