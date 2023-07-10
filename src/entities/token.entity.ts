import { Column, Entity } from "typeorm";
import { CommonField } from "./commonEntity";
import { TokenStatus } from "../constant/enum";

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
}
export default Token;
