export type BapiCall<SuccessResponseT> =
  | {
      method: 'GET' | 'DELETE';
      endpoint: string;
      params?: {
        [key: string]: string | boolean | number;
      };

      responseValidator?: (o: any) => o is SuccessResponseT;
    }
  | {
      method: 'POST' | 'PATCH';
      endpoint: string;
      params?: {
        [key: string]: string | boolean | number;
      };
      data?: any;

      responseValidator?: (o: any) => o is SuccessResponseT;
    };
