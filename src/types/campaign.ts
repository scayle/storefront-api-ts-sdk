import type { RFC33339Date } from '../types/Product'

/**
 * Custom data object for campaigns that can contain arbitrary key-value pairs
 */
export interface CampaignCustomData {
  [key: string]: unknown | undefined
}

/**
 * Represents a marketing campaign with all its properties and configurations
 */
export interface Campaign {
  /** Unique identifier for the campaign */
  id: number
  /** Unique key/slug for the campaign */
  key: string
  /** Display name of the campaign */
  name: string
  /** Detailed description of the campaign */
  description: string
  /** Reduction percentage or amount for the campaign */
  reduction: number
  /**
   * @deprecated - will be removed in the next major version. Please switch to {@link Campaign.startsAt}
   */
  start_at: RFC33339Date | null
  /**
   * @deprecated - will be removed in the next major version. Please switch to {@link Campaign.endsAt}
   */
  end_at: RFC33339Date | null
  /** Campaign start date and time in RFC3339 format */
  startsAt: RFC33339Date | null
  /** Campaign end date and time in RFC3339 format */
  endsAt: RFC33339Date | null
  customData: CampaignCustomData
  /** Main headline text for the campaign */
  headline: string
  /** Subline or secondary text for the campaign */
  subline: string
  /** URL link associated with the campaign */
  link: string
  /** CSS color style identifier for the campaign */
  colorStyle: string
  /** Whether to hide the countdown timer for this campaign */
  hideCountdown: boolean
  /** Color configuration for the campaign display */
  color: {
    /** Background color */
    background: string
    /** Text color */
    text: string
  }
  /** Product-related configuration for the campaign */
  product: {
    /** Attribute ID for product */
    attributeId: number
    /** Label text for the campaign badge */
    badgeLabel: string
  }
  /** Condition string that defines when the campaign applies */
  condition: string
}
