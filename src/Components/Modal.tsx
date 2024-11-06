import { forwardRef, ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
    trigger: ReactNode;
    id: string;
    width: number;
    loading?: boolean;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ children, trigger, id, width, loading }, ref) => {
    const handleShowModal = () => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) { modal.showModal(); }
    };

    return (
      <>
        <button onClick={handleShowModal}>{trigger}</button>
        <dialog id={id} className="modal" ref={ref}>
          <div
            className="modal-box border border-neutral"
            style={{ maxWidth: `${width}px` }}
          >
            {loading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                <span className="loading loading-dots loading-md"></span>
              </div>
            )}
            
            {children}
          </div>
        </dialog>
      </>
    );
  }
);

Modal.displayName = "Modal";
