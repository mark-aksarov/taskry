export class FetchError extends Error {
  status: number;

  constructor(
    status: number,
    message = "An error occurred while fetching the data.",
  ) {
    super(message);
    this.name = "FetchError";
    this.status = status;
  }
}
