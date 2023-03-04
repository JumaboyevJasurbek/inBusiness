namespace Express {
  export interface Request {
    filtered: {
      userId?: string | undefined
      id?: any
    }
  }
}
