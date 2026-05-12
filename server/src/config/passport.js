const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try{
            const user = await prisma.user.findUnique({
                where:{
                    username,
                },
            });
            if (!user) {
                return done(null, false);
            }
            const match = await bcrypt.compare(
                password,
                user.password
            );
            if(!match) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        done(null,user);
    } catch (error) {
        done(error);
    }
});