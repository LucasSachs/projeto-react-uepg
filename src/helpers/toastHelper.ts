import { Slide, toast } from "react-toastify";

export function toastSuccess(message: string) {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "colored",
        transition: Slide,
    });
}

export function toastError(message: string) {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "colored",
        transition: Slide,
    });
}
