import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const ONE_DAY = 24 * 60 * 60 * 1000;
const TWO_MINUTES = 2 * 60 * 1000;

const session = expressSession({
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: TWO_MINUTES,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    ),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_DAY }
});

export default session;