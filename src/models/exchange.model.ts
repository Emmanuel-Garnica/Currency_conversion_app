export interface SupportedCodes {
  supported_codes: Array<[string, string]>;
}

export interface Conversion {
  base_code: string;
  target_code: string;
  conversion_rate: number;
  conversion_result: number;
}
