export type BapiCall<SuccessResponseT> =
  | {
      method: 'GET' | 'DELETE';
      endpoint: string;
      params?: {
        [key: string]: any;
      };

      responseValidator?: (o: any) => o is SuccessResponseT;
    }
  | {
      method: 'POST' | 'PATCH';
      endpoint: string;
      params?: {
        [key: string]: any;
      };
      data?: any;

      responseValidator?: (o: any) => o is SuccessResponseT;
    };
