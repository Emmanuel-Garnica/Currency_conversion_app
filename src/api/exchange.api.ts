import { apiInstance } from 'config/api.ts';
import { Conversion, SupportedCodes } from 'models/exchange.model.ts';
import { ApiResponse } from 'models/api.model.ts';

export const getSupportedCodes = async (): Promise<
  ApiResponse<SupportedCodes>
> => apiInstance.get('/codes');

export const getConversionByAmount = async (
  base: string,
  target: string,
  amount: number
): Promise<ApiResponse<Conversion>> =>
  apiInstance.get(`/pair/${base}/${target}/${amount}`);
