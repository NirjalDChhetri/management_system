import { Column, Entity } from "typeorm";
import { CommonField } from "./commonEntity";
import { Role } from "../constant/enum";

@Entity({
    name: 'admin'
})
export class Admin extends CommonField {
    @Column({
        unique: true,
    })
    email: string

    @Column({
        select: false,
    })
    password: string

    @Column({
        name:'role',
        type: 'enum',
        enum: Role
    })
    role: Role
}