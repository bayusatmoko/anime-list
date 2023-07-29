declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GRAPHQL_API_URL: string;
    }
  }