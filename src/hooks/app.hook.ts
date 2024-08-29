import { Bounce, toast } from 'react-toastify';
import { useEffect, useMemo, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ERROR_MESSAGES } from 'constants/messages';
import { useStore } from 'store';

interface FormValues {
  amount: number;
  target: string;
  base: string;
}

const validations = yup.object<FormValues>().shape({
  amount: yup
    .number()
    .required(ERROR_MESSAGES.REQUIRED)
    .typeError(ERROR_MESSAGES.NOT_VALID_NUMBER)
    .min(1, ERROR_MESSAGES.MORE_THAN_0),
  base: yup.string().required(ERROR_MESSAGES.REQUIRED),
  target: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

export const useApp = () => {
  const initialized = useRef(false);
  const supportedCodes = useStore((state) => state.codes);
  const history = useStore((state) => state.history);
  const isLoading = useStore((state) => state.loading);
  const getSupportedCodes = useStore((state) => state.loadCodes);
  const sendConversionRequest = useStore((state) => state.addHistoryItem);
  const clearHistory = useStore((state) => state.clearHistory);

  const result = useMemo(() => {
    return history[0];
  }, [history]);

  const historyList = useMemo(() => {
    return history.slice(1);
  }, [history]);

  const form = useFormik<FormValues>({
    initialValues: {
      amount: 0,
      base: '',
      target: '',
    },
    validationSchema: validations,
    onSubmit(data, { setErrors }) {
      const { base, target, amount } = data;
      if (base === target) {
        setErrors({
          target: "Base can't be the same of target",
        });
        return;
      }

      if (history.length > 0 && validateLatestRequest(data)) {
        toast.error('The request is the same to latest', {
          pauseOnHover: true,
          theme: 'dark',
          transition: Bounce,
        });
        return;
      }
      sendConversionRequest(base, target, amount);
    },
  });

  /**
   * This function is for validate that user not convert repeatedly the same values
   *
   * @param formValues FormValues: This param is for take form values and validate each
   * @returns boolean
   */
  const validateLatestRequest = ({
    base,
    target,
    amount,
  }: FormValues): boolean => {
    if (history.length === 0) return false;
    const latestRequest = history[0];
    return (
      base === latestRequest.base_code &&
      target === latestRequest.target_code &&
      amount === latestRequest.amount
    );
  };

  const switchCurrencies = () => {
    const { values, setValues } = form;
    setValues({
      ...values,
      base: values.target,
      target: values.base,
    });
  };

  const getCodeName = (code: string): string => {
    return supportedCodes.find((codeInfo) => codeInfo[0] === code)?.[1] ?? code;
  };

  const onClearHistory = () => {
    toast.success('History is already cleaned', {
      pauseOnHover: true,
      theme: 'dark',
      transition: Bounce,
    });
    clearHistory();
  };

  useEffect(() => {
    if (supportedCodes.length === 0 && !initialized.current) {
      getSupportedCodes();
      initialized.current = true;
    }
  }, [getSupportedCodes, supportedCodes.length]);

  return {
    result,
    historyList,
    supportedCodes,
    switchCurrencies,
    getCodeName,
    onClearHistory,
    isLoading,
    ...form,
  };
};
