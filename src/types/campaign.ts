import {RFC33339Date} from '../types/BapiProduct';

export type Campaign = {
  id: number;
  key: string;
  name: string;
  description: string;
  reduction: number;
  start_at: RFC33339Date | null;
  end_at: RFC33339Date | null;
};
