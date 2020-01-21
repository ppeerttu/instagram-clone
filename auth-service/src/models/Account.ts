import { AllowNull, Column, CreatedAt, Model, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";

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

@Table({
    tableName: "Accounts",
})
export class Account extends Model<Account> implements IAccount {

    @PrimaryKey
    @Column
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

