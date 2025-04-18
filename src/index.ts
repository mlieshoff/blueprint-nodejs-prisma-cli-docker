#! /usr/bin/env node

import { PrismaClient } from '@prisma/client'

import chalk from "chalk";

import {Command} from "commander";

import figlet from "figlet";

const program = new Command();

console.log(figlet.textSync("Blueprint"));

console.log(chalk.blue('Ready to serve!'));

program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("-l, --ls  [value]", "List directory contents")
    .option("-m, --mkdir <value>", "Create a directory")
    .option("-t, --touch <value>", "Create a file")
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1)
}

const prisma = new PrismaClient()

async function main() {
    const person = await prisma.user.create({
        data: {
            firstname: 'Al',
            lastname: 'Bundy',
        },
    })
    console.log(person)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
