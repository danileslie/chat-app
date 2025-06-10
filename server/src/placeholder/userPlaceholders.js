// placeholder entries

import { config } from "dotenv";
import dbConnection from "../lib/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

config();

const seedUsers = [
  {
    email: "morrigan.puppy@example.com",
    userName: "morrigan",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=27",
  },
  {
    email: "python.puppy@example.com",
    userName: "python",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=13",
  },
  {
    email: "georg.puppy@example.com",
    userName: "georg",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=52",
  },
  {
    email: "orb_puppy@example.com",
    userName: "orb",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=69",
  },
  {
    email: "daley_puppy@example.com",
    userName: "daley",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=132",
  },
  {
    email: "goldeen_puppy@example.com",
    userName: "goldeen",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=78",
  },
  {
    email: "quartz_puppy@example.com",
    userName: "quartz",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=179",
  },
  {
    email: "maybe_puppy@example.com",
    userName: "maybe",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=205",
  },
  {
    email: "geef_puppy@example.com",
    userName: "geef",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=189",
  },
  {
    email: "oreo_puppy@example.com",
    userName: "oreo",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=153",
  },
  {
    email: "beeeeeeef_puppy@example.com",
    userName: "beeeeeeef",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=172",
  },
  {
    email: "anesthesia_puppy@example.com",
    userName: "anesthesia",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=125",
  },
  {
    email: "papyrus_puppy@example.com",
    userName: "papyrus",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=64",
  },
  {
    email: "jester_puppy@example.com",
    userName: "jester",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=157",
  },
  {
    email: "glorb_puppy@example.com",
    userName: "glorb",
    password: "12345678",
    profilePic: "https://placedog.net/130x130?id=146",
  },
];

const seedDatabase = async () => {
  try {
    await dbConnection();

    // need to has passwords or placeholder logins will fail
    for (const user of seedUsers) {
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(user.password, salt);
    }

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
