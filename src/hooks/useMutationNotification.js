import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function useMutationNotification({
  isError,
  isSuccess,
  actionType = "create",
  entity,
  data,
  error,
  useServerMessage = true,
}) {
  const [notificationConfig, setNotificationConfig] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    if (isError) {
      setNotificationConfig({
        type: "error",
        message: useServerMessage
          ? error.message
          : `${entity} could not be ${actionType}d`,
      });
    }
  }, [
    useServerMessage,
    isError,
    setNotificationConfig,
    entity,
    actionType,
    error,
  ]);

  useEffect(() => {
    if (isSuccess) {
      setNotificationConfig({
        type: "success",
        message: useServerMessage
          ? data.message
          : `${entity} successfully ${actionType}d`,
      });
    }
  }, [
    useServerMessage,
    isSuccess,
    setNotificationConfig,
    entity,
    actionType,
    data,
  ]);

  useEffect(() => {
    if (notificationConfig) {
      const { type, message } = notificationConfig;
      showToast({ type, message: capFirst(message) });
    }
  }, [notificationConfig, showToast]);
}

export default useMutationNotification;
