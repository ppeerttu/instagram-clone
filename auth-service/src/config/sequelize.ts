import path from "path";
import { Sequelize } from "sequelize-typescript";

const env = process.env.NODE_ENV || "development";
// tslint:disable-next-line: no-var-requires
const { host, port, username, password, database, dialect } = require("./database")[env];


const sequelize = new Sequelize({
    models: [
        path.resolve("../models/**.ts"),
    ],
    host,
    port,
    username,
    password,
    database,
    dialect,
});

export default sequelize;
