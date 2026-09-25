import toast from "react-hot-toast";

export function handleError(error, fallbackMessage = "Something went wrong.") {
    const message = error?.message || fallbackMessage;

    toast.error(message);
}