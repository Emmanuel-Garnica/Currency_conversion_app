import { SupportedCodes } from 'models/exchange.model.ts';
import { getSupportedCodes } from 'api/exchange.api.ts';
import { ErrorResponse } from 'models/common.model.ts';
import { ImmerStateCreator } from 'models/state.model';
import { Bounce, toast } from 'react-toastify';

export interface ExchangeSlice {
  loading: boolean;
  codes: SupportedCodes['supported_codes'];
  error?: ErrorResponse;
  loadCodes: () => void;
}

export const createExchangeSlice: ImmerStateCreator<ExchangeSlice> = (set) => ({
  loading: false,
  error: undefined,
  codes: [],
  loadCodes: async function () {
    try {
      set((state) => {
        state.loading = true;
      });
      const codes = await getSupportedCodes();
      set({
        codes: codes.data.supported_codes,
        loading: false,
        error: undefined,
      });
    } catch (e) {
      toast.error('An error was occurred while fetch exchange codes', {
        pauseOnHover: true,
        theme: 'dark',
        transition: Bounce,
      });
      set((state) => {
        state.error = {
          message: 'An error was occurred while fetch exchange codes',
          error: e,
        };
        state.loading = false;
      });
    }
  },
});
