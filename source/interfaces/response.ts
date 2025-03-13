export interface BlinkResponse extends Response {
  status: number;
  ok: boolean;
  json: () => Promise<any>;
  text: () => Promise<string>;
  clone: () => BlinkResponse;
  headers: Headers;
  redirected: boolean;
  statusText: string;
  url: string;
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
  arrayBuffer: () => Promise<ArrayBuffer>;
  blob: () => Promise<Blob>;
  formData: () => Promise<FormData>;
  bytes: () => Promise<Uint8Array>;
  userAgent: string;
}
