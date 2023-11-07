import { Request, Response, NextFunction } from "express"
import passport, { notAuthorizedJson } from "../../config/passportStrategy"
import { User } from "../../interfaces/user"

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {

        // Authenticate user using JWT strategy
        passport.authenticate('jwt', (err:any, user:User) => {
            // Set user to request object
            req.user = user

            // If user is authenticated, proceed to next middleware
            // Otherwise, return an error
            return user ? next() : next(notAuthorizedJson)

        })(req, res, next)
    }
}

