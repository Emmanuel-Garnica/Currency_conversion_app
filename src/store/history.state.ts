import { getConversionByAmount } from 'api/exchange.api';
import { ImmerStateCreator } from 'models/state.model';
import { Conversion } from 'models/exchange.model';
import { ErrorResponse } from 'models/common.model';

export interface History extends Conversion {
  amount: number;
  search_date: number;
}

export interface HistorySlice {
  loading: boolean;
  error?: ErrorResponse;
  history: Array<History>;
  /**
   * This function fetch and store conversion data from API
   *
   * @param base string
   * @param target string
   * @param amount number
   * @returns void
   */
  addHistoryItem: (base: string, target: string, amount: number) => void;
  clearHistory: () => void;
}

export const createHistorySlice: ImmerStateCreator<HistorySlice> = (set) => ({
  loading: false,
  error: undefined,
  history: [],
  async addHistoryItem(base, target, amount) {
    try {
      set((state) => {
        state.loading = true;
      });
      const { data } = await getConversionByAmount(base, target, amount);
      set((state) => {
        state.loading = false;
        state.history = [
          {
            amount,
            base_code: base,
            target_code: target,
            conversion_rate: data.conversion_rate,
            conversion_result: data.conversion_result,
            search_date: new Date().getTime(),
          },
          ...state.history,
        ];
      });
    } catch (error) {
      set((state) => {
        state.error = {
          message: 'An error was occurred while fetch conversion amount',
          error,
        };
      });
    }
  },
  clearHistory() {
    set((state) => {
      const latest = state.history[0];
      state.history = [latest];
    });
  },
});
