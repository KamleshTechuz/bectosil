import { toast } from "react-toastify";

const features = {
  position: toast.POSITION.RIGHT_LEFT,
  autoClose: 1500,
};

export const showErrorToaster = (data) => {
  if (data.error) {
    return toast.error(data.error, features);
  }
};

export const showsuccessToaster = (message) => {
  console.log("message : ", message);
  if (message) {
    return toast.success(message, features);
  }
};
