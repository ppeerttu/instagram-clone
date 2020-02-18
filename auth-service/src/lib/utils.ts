import { RedisClient } from "redis";
import { AccountInfo } from "../proto/generated/auth_service_pb";
import { Account, IAccount } from "../models/Account";

/**
 * Get a variable from `process.env` and throw if not found.
 *
 * @param value The env variable e.g `SERVER_PORT`
 * @param fallback Optional fallback value in case the value is empty (or not defined)
 */
export function getProcessEnv(
    value: string,
    fallback: string | null = null,
): string {
    if (typeof value !== "string") {
        throw new TypeError(
            `Expected value to be string but received: ${value}`,
        );
    }
    const val = process.env[value];
    if (!val && !fallback) {
        throw new Error(`Unable to find env variable ${value}`);
    }
    return val || fallback as string;
}

/**
 * Delay execution asynchronously.
 *
 * @param ms Time in milliseconds
 */
export function delay(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

/**
 * Return item from redis wrapped in promise
 *
 * @param key key of the item
 * @param redis RedisClient
 */
export function getFromRedis(key: string, redis: RedisClient): Promise<any> {
    return new Promise((resolve, reject) => {
        redis.get(key, (err, value) => {
            if (err) {
                reject(err);
            } else {
                value ? resolve(value) : reject(null);
            }
        });
    });
}

/**
 * Maps account to grpc AccountInfo
 *
 * @param account account
 */
export function accountToAccountInfo(account: IAccount): AccountInfo {
    const accountInfo = new AccountInfo();
    accountInfo.setId(account.id);
    accountInfo.setCreatedAt(account.createdAt.toJSON());
    accountInfo.setUpdatedAt(account.updatedAt.toJSON());
    accountInfo.setUsername(account.username);

    return accountInfo;
}

/**
 * Validate that given credential > 3 and < 30.
 * Same rule is applied to username and password.
 *
 * @param credential string credential username / password
 */
export function validateCredential(credential: string): boolean {
    if (credential) {
        if (credential.length > 3 && credential.length < 30) {
            return true;
        }
    }
    return false;
}