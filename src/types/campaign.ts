import type { RFC33339Date } from '../types/Product'

export interface Campaign {
  id: number
  key: string
  name: string
  description: string
  reduction: number
  start_at: RFC33339Date | null
  end_at: RFC33339Date | null
}
