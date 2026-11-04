
import { sequelize } from "./sequelize.js";
import Book from "./models/Book.js";
import Member from "./models/Member.js";
import Loan from "./models/Loan.js";

// Define foreign key relationships
Loan.belongsTo(Member, {
  foreignKey: "member_id",
});

Loan.belongsTo(Book, {
  foreignKey: "book_id",
});

async function createTables(): Promise<void> {
  try {
    await sequelize.authenticate();

    // Create only the missing Member and Loan tables
    await Member.sync();
    await Loan.sync();

    console.log("Members and Loans tables are ready!");
  } catch (error) {
    console.error("Error creating tables:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

void createTables();
