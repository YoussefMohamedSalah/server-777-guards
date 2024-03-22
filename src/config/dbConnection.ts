import { createConnection, ConnectionOptions } from "typeorm";
import { entities } from "../entities";

require("dotenv").config();

export const connectToDataBase = async () => {
  const dbType = process.env.DATABASE_TYPE as any;
  const dbUrl = process.env.DATABASE_URL;

  const connectionOptions: ConnectionOptions = {
    type: dbType,
    entities,
    synchronize: true,
  };

  if (process.env.NODE_ENV === "development") {
    Object.assign(connectionOptions, {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || "5432", 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
    });
  } else {
    Object.assign(connectionOptions, {
      url: dbUrl,
    });
  }

  try {
    await createConnection(connectionOptions);
    console.log(`You Are Now Connected to Database`);
  } catch (error) {
    console.error("Unable To Connect To Database");
    console.error(error);
    process.exit(1);
  }
};
