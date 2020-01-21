/**
 * Database configuration according to the requirements of `sequelize-cli` package.
 * 
 * This file is written in JavaScript since the `sequelize-cli` can't run TypeScript.
 * The CLI is required for managing migrations and seeders. This file can be used
 * with TypeScript (see sequelize.ts in this directory).
 */


/**
 * Get a variable from `process.env` and throw if not found.
 *
 * @param {string} value The env variable e.g `SERVER_PORT`
 * @param {string} fallback Optional fallback value in case the value is empty (or not defined)
 */
function getProcessEnv(
    value,
    fallback = null,
) {
    if (typeof value !== "string") {
        throw new TypeError(
            `Expected value to be string but received: ${value}`,
        );
    }
    const val = process.env[value];
    if (!val && fallback === null) {
        throw new Error(`Unable to find env variable ${value}`);
    }
    return val || fallback;
};


const config = {
    database: getProcessEnv("POSTGRES_DB"),
    host: getProcessEnv("POSTGRES_HOST"),
    username: getProcessEnv("POSTGRES_USER"),
    password: getProcessEnv("POSTGRES_PASSWORD"),
    port: parseInt(getProcessEnv("POSTGRES_PORT", "5432"), 10),
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData"
};

/**
 * The `sequelize-cli` will select the proper environment according to `NODE_ENV`.
 */
module.exports = {
    development: config,
    test: config,
    production: config
};
