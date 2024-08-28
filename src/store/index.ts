import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { createExchangeSlice, ExchangeSlice } from './exchange.state.ts';
import { createHistorySlice, HistorySlice } from './history.state.ts';

type Store = ExchangeSlice & HistorySlice;

export const useStore = create<Store>()(
  persist(
    immer((...methods) => ({
      ...createExchangeSlice(...methods),
      ...createHistorySlice(...methods),
    })),
    {
      name: 'conversion-state',
    }
  )
);
