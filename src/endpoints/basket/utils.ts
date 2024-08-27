export const encodeBase64 = (string: string) => {
  // node
  // eslint-disable-next-line node/prefer-global/buffer
  if (typeof Buffer === 'function') {
    // eslint-disable-next-line node/prefer-global/buffer
    return Buffer.from(string).toString('base64')
  }

  // https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
  const binString = Array.from(
    new TextEncoder().encode(string),
    (x) => String.fromCodePoint(x),
  ).join('')
  return btoa(binString)
}

export const buildOrderCustomDataHeaders = (
  orderCustomData?: Record<string, unknown>,
): Record<string, string> => {
  if (!orderCustomData) {
    return {}
  }

  return {
    'X-Order-Custom-Data': encodeBase64(JSON.stringify(orderCustomData)),
  }
}
