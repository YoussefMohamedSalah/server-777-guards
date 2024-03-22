declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      WSS_PORT?: number;
      WSS_ADDRESS?: string;
      SECRET_HASH?: string;

      DATABASE_USER?: string;
      DATABASE_HOST?: string;
      DATABASE_TYPE?: string;
      DATABASE_PORT?: any;
      DATABASE_PASSWORD?: string;
      DATABASE_DATABASE?: string;
      DATABASE_URL?: string;

      NODE_ENV?: string;
      OTP_SECRET_KEY?: string;
    }
  }
}

export {};
