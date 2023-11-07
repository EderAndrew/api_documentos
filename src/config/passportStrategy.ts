import passport from "passport";
import dotenv from "dotenv";
import {ExtractJwt, Strategy as JWTStrategy} from "passport-jwt";
import JWT from 'jsonwebtoken'
import prisma from "../client";

dotenv.config()

export const notAuthorizedJson = {status: 401, message: "Não autorizado."}

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY as string,
    maxAge: "2h"
}

//token
export const generateToken = (data: object) => {
    return JWT.sign(
        data,
        process.env.JWT_SECRET_KEY as string,
    )
}

passport.use(new JWTStrategy(options, async (payload, done) => {
    const user = await prisma.user.findUnique({ where: { register: payload.register } })

    return user ? done(null, user) : done(notAuthorizedJson, false)
}))

export default passport