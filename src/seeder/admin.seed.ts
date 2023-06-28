import "reflect-metadata";
import { AppDataSource } from "../config/database.config";
import { Admin } from "../entities/admin.entity";
import { ADMINS } from "../constant/admin";
import BcryptService from "../utils/bcrypt.utils";

const AdminRepo = AppDataSource.getRepository(Admin);
const args = process.argv[2];
if (!args) {
  throw new Error("Please pprovide an argument");
}

//For Admin seed login credentials
const addAadmin = async () => {
  for (const i of ADMINS) {
    try {
      const admin = AdminRepo.create({
        ...i,
        role: i.role,
        password: await BcryptService.hash(i.password),
      });
      await AdminRepo.save(admin);
    } catch (error: any) {
      console.log("failed to seed admin");
      return;
    }
    console.log("Admin seed successfullly");
  }
  AppDataSource.destroy();
  process.exit(0);
};

//for remove all admin login credentials
const removeAllAdmin = async () => {
  try {
    await AdminRepo.createQueryBuilder().delete().execute();
  } catch (error: any) {
    console.log("Filed to delete admin");
    process.exit(1);
  }
  console.log("Admin remove successfully");
  AppDataSource.destroy();
  process.exit(0);
};

AppDataSource.initialize()
  .then(() => {
    if (args === "add") {
      addAadmin();
    } else if (args === "remove") {
      removeAllAdmin();
    } else {
      console.log("Please Provide an arguement");
    }
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
