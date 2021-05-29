declare const __windowURLs: Record<string, string>

declare namespace NodeJS {
  interface Global {
    __windowURLs: Record<string, string>
  }
}
