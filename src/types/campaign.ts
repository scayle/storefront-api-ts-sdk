import {RFC33339Date} from './Date';

export interface CampaignCustomData {
  [key: string]: unknown | undefined;
}

export type Campaign = {
  id: number;
  key: string;
  name: string;
  description: string;
  reduction: number;
  start_at: RFC33339Date;
  end_at: RFC33339Date;
  customData: CampaignCustomData;
};
