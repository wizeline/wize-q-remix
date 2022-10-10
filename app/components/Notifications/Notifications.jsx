import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIG } from "~/utils/constants";
import { useGlobalSuccessMessage } from "~/utils/hooks/useGlobalSuccessMessage";

const Notifications = () => {
  const globalSuccess = useGlobalSuccessMessage();
  const data = useActionData();

  useEffect(() => {
    if (globalSuccess) {
      toast.success(globalSuccess, DEFAULT_TOAST_CONFIG);
    }
    if (!data) return;
    
    const { error, errors, success, warnings } = data;

    if (error) {
      console.error(error.detail);
      toast.error(error.message, DEFAULT_TOAST_CONFIG);
    };

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
  }, [data, globalSuccess]);

  return <ToastContainer />;
};

export default Notifications;