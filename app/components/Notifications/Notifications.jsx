import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIG } from "~/utils/constants";

const Notifications = () => {
  const data = useActionData();

  useEffect(() => {
    if (!data) return;
    
    const { errors, success, warnings } = data;
    if (errors && Array.isArray(errors)) {
      errors.forEach((error) => {
        console.error(error.detail);
        toast.error(error.message, DEFAULT_TOAST_CONFIG);
      });
    };

    if (warnings && Array.isArray(warnings)) {
      warnings.forEach((warning) => {
        toast.warning(warning, DEFAULT_TOAST_CONFIG);
      });
    };

    if (success) {
      toast.success(success, DEFAULT_TOAST_CONFIG);
    };
  }, [data]);

  return <ToastContainer />;
};

export default Notifications;