import { useActionData } from '@remix-run/react';
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { DEFAULT_TOAST_CONFIG, QUESTION_CREATED_TOAST_CONFIG } from 'app/utils/constants';
import useGlobalSuccessMessage from 'app/utils/hooks/useGlobalSuccessMessage';

function Notifications() {
  const globalSuccess = useGlobalSuccessMessage();
  const data = useActionData();

  const successAnonMessage = (message, questionUrl) => (
    <div>
      <p>{message}</p>
      <a href={questionUrl}>
        {questionUrl}
      </a>
    </div>
  );

  useEffect(() => {
    if (globalSuccess) {
      const { message, questionUrl } = globalSuccess;
      if (questionUrl) {
        toast.info(successAnonMessage(message, questionUrl), QUESTION_CREATED_TOAST_CONFIG);
      } else {
        toast.info(message, QUESTION_CREATED_TOAST_CONFIG);
      }
    }
    if (!data) return;

    const {
      error, errors, successMessage, warnings,
    } = data;

    if (error) {
      console.error(error.detail);
      toast.error(error.message, DEFAULT_TOAST_CONFIG);
    }

    if (errors && Array.isArray(errors)) {
      errors.forEach((_error) => {
        console.error(_error.detail);
        toast.error(_error.message, DEFAULT_TOAST_CONFIG);
      });
    }

    if (warnings && Array.isArray(warnings)) {
      warnings.forEach((warning) => {
        toast.warning(warning, DEFAULT_TOAST_CONFIG);
      });
    }

    if (successMessage) {
      toast.success(successMessage, DEFAULT_TOAST_CONFIG);
    }
  }, [data, globalSuccess]);

  return <ToastContainer />;
}

export default Notifications;
