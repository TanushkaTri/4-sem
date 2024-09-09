import { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  onClose: () => void;
}

function Modal({ onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#FFFF00] opacity-50" />
      <div className="z-10 bg-transparent p-8 rounded-lg">{children}</div>
    </div>
  );
}

export default Modal;
