#!/usr/bin/env node

const boxen = require("boxen");
const chalk = require("chalk");
const clear = require("clear");
const inquirer = require("inquirer");
const fetch = require("cross-fetch");
const open = require("open");

clear();

const data = {
  name: chalk.bold.green("               Viraj Walavalkar"),
  twitter: chalk.gray("https://x.com/") + chalk.bold.cyan("Walavalkarviraj"),
  github: chalk.gray("https://github.com/") + chalk.bold.green("Viraj2722"),
  linkedin: chalk.gray("https://linkedin.com/") + chalk.bold.blue("in/viraj-walavalkar-4a2696257/"),
  web: chalk.bold.cyan("https://viraj.is-a.dev"),

  labelTwitter: chalk.white.bold("X:"),
  labelGitHub: chalk.white.bold("GitHub:"),
  labelLinkedIn: chalk.white.bold("LinkedIn:"),
  labelWeb: chalk.white.bold("Web:"),
};

console.log(
  boxen(
    [
      `${data.name}`,
      ``,
      `${data.labelTwitter}         ${data.twitter}`,
      `${data.labelGitHub}    ${data.github}`,
      `${data.labelLinkedIn}  ${data.linkedin}`,
      `${data.labelWeb}       ${data.web}`,
    ].join("\n"),
    {
      margin: 1,
      padding: 1,
      float: "center",
      borderStyle: "round",
      borderColor: "green",
    }
  )
);

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      {
        name: `Send me an ${chalk.green.bold("anonymous message")}?`,
        value: async () => {
          let { message } = await inquirer.prompt([
            {
              name: "message",
              message: "Type a message:",
            },
          ]);
          if (!message) return console.log("- Message empty, couldn't send!");
          let response = await fetch(
            "https://api.dedomil.workers.dev/message",
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ message }),
            }
          );
          let { status } = await response.json();
          if (status === 200) {
            console.log("- Message sent successfully!");
          } else {
            console.log("- Internal server error, please contact via email");
          }
        },
      },
      {
        name: `Send me an ${chalk.green.bold("email")}?`,
        value: async () => {
          await open("mailto:dedomil@skiff.com");
          console.log("- Done, see you soon at inbox!");
        },
      },
      {
        name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
        value: async () => {
          await open("https://api.dedomil.workers.dev/files/cv.pdf");
          console.log("- Resume opened in browser!");
        },
      },
      {
        name: "Quit!",
        value: () => {
          console.log("- Thank you for visiting, good bye!");
        },
      },
    ],
  },
];

prompt(questions).then((answer) => answer.action());
