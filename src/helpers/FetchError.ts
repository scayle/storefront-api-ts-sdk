export class FetchError extends Error {
  response: Response;

  constructor(response: Response) {
    const message = `Failed to fetch ${response.url}. ${response.status} ${response.statusText}`;
    super(message);

    this.response = response;
    this.name = 'FetchError';
    this.message = message;
  }
}
