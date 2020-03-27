// TODO : 적용이 되는거 같았는데 안된다... 왜일까...

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
    };
  }
}
