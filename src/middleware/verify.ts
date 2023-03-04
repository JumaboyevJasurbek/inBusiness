// // import jwt from "jsonwebtoken"
// import { Request, Response, NextFunction } from "express"
// import * as jwt from "jsonwebtoken"
// import dotenv from "dotenv"
// import { ErrorHandler } from "../exception/errorHandler"
// dotenv.config()

// export default (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers

//   console.log(req.headers, "headers")

//   if (token != true) {
//     console.log(token, "token")
//     return next(res.json(new ErrorHandler("Provide access token", 401)))
//   }

//   jwt.verify(token, String(process.env.SECRET_KEY), (err, decode) => {
//     if (err instanceof jwt.JsonWebTokenError) {
//       return next(new ErrorHandler("Invalid token", 401))
//     }

//     req.id = decode.id
//     next()
//   })
// }
