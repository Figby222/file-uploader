import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import pool from "../db/pool.mjs";

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await 
                pool.user.findUnique({ where: { username: username } });

            if (!user) {
                return done(null, false, { message: "Incorrect username or password" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return done(null, false, { message: "Incorrect username or password" });
            }
            
            return done(null, user);
        } catch (err) {
            done(err);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await 
            pool.user.findUnique({ where: { id: userId } });
        
        done(null, user);
    } catch(err) {
        done(err);
    }
})

export default passport;