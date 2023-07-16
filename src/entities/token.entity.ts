import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CommonField } from "./commonEntity";
import { TokenStatus } from "../constant/enum";
import { Admin } from "./admin.entity";

@Entity()
class Token extends CommonField {
  @Column({
    type: "text",
  })
  token: string;

  @Column({
    type: "enum",
    enum: TokenStatus,
  })
  status: TokenStatus;

  @Column({
    type: "datetime",
  })
  expiresAt: Date;

  @ManyToOne(() => Admin, (admin)=>admin.tokens, { nullable: true })
  @JoinColumn({ name :'admin_id'})
  admin:Admin
}
export default Token;
