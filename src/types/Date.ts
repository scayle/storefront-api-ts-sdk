/**
 * Date string formatted according to RFC 3339.
 *
 * e.g. `2018-06-01T14:56:08+02:00`
 */
export type RFC33339Date = string & {
  readonly ____tagRFC33339Date: unique symbol;
};
