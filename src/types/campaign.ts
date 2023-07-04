import {RFC33339Date} from './Product';

export type Campaign = {
  id: number;
  key: string;
  name: string;
  description: string;
  reduction: number;
  start_at: RFC33339Date | null;
  end_at: RFC33339Date | null;
};
