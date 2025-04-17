/* tslint:disable */
/* eslint-disable */
export function resize(image_data: Uint8Array, width: number, height: number): Uint8Array;
export function grayscale(image_data: Uint8Array): Uint8Array;
export function blur(image_data: Uint8Array, sigma: number): Uint8Array;
export function invert(image_data: Uint8Array): Uint8Array;
export function brighten(image_data: Uint8Array, value: number): Uint8Array;
export function flip_horizontal(image_data: Uint8Array): Uint8Array;
export function rotate90(image_data: Uint8Array): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly resize: (a: number, b: number, c: number, d: number) => [number, number];
  readonly grayscale: (a: number, b: number) => [number, number];
  readonly blur: (a: number, b: number, c: number) => [number, number];
  readonly invert: (a: number, b: number) => [number, number];
  readonly brighten: (a: number, b: number, c: number) => [number, number];
  readonly flip_horizontal: (a: number, b: number) => [number, number];
  readonly rotate90: (a: number, b: number) => [number, number];
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
