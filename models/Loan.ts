
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../sequelize.js";

class Loan extends Model<
  InferAttributes<Loan>,
  InferCreationAttributes<Loan>
> {
  declare id: CreationOptional<number>;
  declare member_id: number;
  declare book_id: number;
  declare loan_date: CreationOptional<Date>;
  declare returned_at: CreationOptional<Date | null>;
}

Loan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loan_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    returned_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Loan",
    tableName: "loans",
    timestamps: false,
  }
);

export default Loan;
