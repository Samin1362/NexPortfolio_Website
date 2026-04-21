export type ApiEnvelope<T> = { success: true } & T;
export type ApiErrorBody = { success: false; message?: string };
export type ApiBody<T> = ApiEnvelope<T> | ApiErrorBody;

export type Revalidate = number | false;

export type FetchOptions = {
  revalidate?: Revalidate;
  tags?: string[];
  signal?: AbortSignal;
};
