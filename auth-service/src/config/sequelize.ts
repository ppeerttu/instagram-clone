import pino from "pino";
import { Sequelize } from "sequelize-typescript";

const env = process.env.NODE_ENV || "development";
// tslint:disable-next-line: no-var-requires
const { host, port, username, password, database, dialect } = require("./database")[env];

import { Account } from "../models/Account";

const logger = pino({ level: env === "development" ? "debug" : "info" });

const logging = env === "development"
    ? (query: string) => logger.debug(query)
    : false;

const sequelize = new Sequelize({
    models: [Account],
    host,
    port,
    username,
    password,
    database,
    dialect,
    logging,
});

export default sequelize;
