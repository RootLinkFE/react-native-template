import { useToast } from 'native-base';
import { useCallback } from 'react';

export function useSimpleToast() {
  const toast = useToast();
  const toastSuccess = useCallback(
    (title: string) => {
      toast.show({
        title,
        status: 'success',
      });
    },
    [toast],
  );

  const toastFail = useCallback(
    (title: string) => {
      toast.show({
        title,
        status: 'error',
      });
    },
    [toast],
  );

  const toastInfo = useCallback(
    (title: string) => {
      toast.show({
        title,
        placement: 'top',
      });
    },
    [toast],
  );

  return {
    toastSuccess,
    toastFail,
    toastInfo,
  };
}
