import { useCallback } from "react";

import { useToasts } from "react-toast-notifications";

const useShowToast = () => {
  const { addToast } = useToasts();

  const showToast = useCallback(
    ({ type, message }) => {
      addToast(message, {
        appearance: type,
        autoDismiss: true,
      });
    },
    [addToast]
  );

  return showToast;
};

export default useShowToast;
