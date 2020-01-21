import { AllowNull, Column, CreatedAt, DataType, Model, Table, Unique, UpdatedAt } from "sequelize-typescript";

export interface IAccount {
    /**
     * A unique identifier of an account
     */
    id: string;

    /**
     * Username of the account
     */
    username: string;

    /**
     * Created at timestamp
     */
    createdAt: Date;

    /**
     * Updated at timestamp
     */
    updatedAt: Date;
}

/**
 * Account entity that can be saved into the database by using Sequelize.
 */
@Table({
    tableName: "Accounts",
})
export class Account extends Model<Account> implements IAccount {

    /**
     * Unique identifier of the account. This is automatically set
     * by Sequelize - you don't need to manually set that.
     */
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    public id!: string;

    @AllowNull(false)
    @Unique
    @Column
    public username!: string;

    @AllowNull(false)
    @Column
    public passwordHash!: string;

    @CreatedAt
    public createdAt!: Date;

    @UpdatedAt
    public updatedAt!: Date;
}

