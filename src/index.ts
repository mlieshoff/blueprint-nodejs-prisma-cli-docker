#! /usr/bin/env node

import { PrismaClient } from "@prisma/client";

import chalk from "chalk";
import { Command } from "commander";

import figlet from "figlet";

import { UserDao } from "./dao/user.js";
import { UserDomain } from "./domain/domain.js";

import mime from "mime-types";

const program = new Command();

console.log(figlet.textSync("Blueprint"));

console.log(chalk.blue("Ready to serve!"));

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-l, --ls  [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(1);
}

export const prisma = new PrismaClient();

const userDao = new UserDao();

const user: UserDomain = {
  firstName: "Al",
  lastName: "Bundy",
  job: "Fahrer",
};

userDao.save(user);

console.log(mime.lookup("test.jpg"));
console.log(mime.contentType("file.json"));
