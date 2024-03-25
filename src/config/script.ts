import { getByEmail } from "../repositories/UserRepository";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { Website } from "../entities/Website";
import { getWebsite } from "../repositories/WebsiteRepository";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handleAddAdmins = async () => {
  try {
    // Delay for 30 seconds
    await delay(20000);
    const existingWebsite = await getWebsite("777-guards")
    if (!existingWebsite) {
      await addWebsite("777-guards")
    }

    const existingMohamed = await getByEmail("mohamed@777-guards.com")
    if (!existingMohamed) {
      const hashedPassword = await bcrypt.hash("mohamed_777_guards", 10);

      let userData = {
        name: "Mohamed",
        email: "mohamed@777-guards.com",
        password: hashedPassword
      }
      await addUser(userData)
    }

    const existingKareem = await getByEmail("kareem@777-guards.com")
    if (!existingKareem) {
      const hashedPassword = await bcrypt.hash("kareem_777_guards", 10);

      let userData = {
        name: "Kareem",
        email: "kareem@777-guards.com",
        password: hashedPassword
      }
      await addUser(userData)
    }
    return true
  } catch (error) {
    console.error("Error Getting Adding Admins:", error);
    return { msg: "Internal server error" };
  }
};

const addUser = async (newUserData: any) => {
  const {
    name,
    email,
    password,
  } = newUserData;

  try {
    const userRepository = getRepository(User);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    await userRepository.save(user);
    return console.log("User Created Successfully");
  } catch (error) {
    console.error("Error Creating User:", error);
  }
};

const addWebsite = async (identifier: string) => {
  try {
    const websiteRepository = getRepository(Website);
    const website = new Website();
    website.identifier = identifier;
    website.facebook = "https://www.facebook.com/profile.php?id=61556189053260&mibextid=ibOpuV";
    website.instagram = "https://www.instagram.com/777.guards/?igsh=aGI5ZjJpMDc5ZXA4&utm_source=qr";
    website.linkedin = "";

    await websiteRepository.save(website);
    return console.log("Website Created Successfully");
  } catch (error) {
    console.error("Error Creating Website:", error);
  }
};