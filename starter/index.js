const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "../../Employee-Information");
const outputPath = path.join(OUTPUT_DIR, "index.html");

const render = require("./src/page-template.js");


// create empty arrays for team and id input
const teamInput = [];
const idInput = []


// function to start application
function init() {


    // function to prompt user to create a manager upon application start
    function addManager() {
        console.log("Begin building your team profile");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What's the manager's name?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the team manager's name.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What's the manager's ID",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid manager's ID.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What's the manager's email?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Email address cannot be left empty.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What's the manager's office number? (format: 1111111111)",
                validate: answer =>  {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true
                    }
                    return "Please enter a correct phone number.";
                    }
                }
        ]). then(answers =>{
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamInput.push(manager);
            idInput.push(answers.managerId);
            addTeam();
        });
    }

    
    // function to begin adding remaining team members after adding manager
    function addTeam() {

        inquirer.prompt([
            {
                type: "list",
                name: "memberOption",
                message: "What role would you like to add next?",
                choices: [
                    "Engineer",
                    "Intern",
                    "End Application"
                ]
            }
        ]).then(userInput => {
            switch (userInput.memberOption) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    generateHTML();
            }
        });
    }


    // function to add an Engineer once selected
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What's the engineer's name?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Engineer's name cannot be left empty.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What's the engineer's ID",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid Engineer's ID.";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What's the engineer's email?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Email address cannot be left empty.";
                }
            },
            {
                type: "input",
                name: "engineerGitHub",
                message: "What's the engineer's GitHub username?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the engineer's GitHub username.";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
            teamInput.push(engineer);
            idInput.push(answers.engineerId);
            addTeam();
        });
    }

    // function to add an Intern once selected
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What's the intern's name?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Intern's name cannot be left empty.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What's the intern's ID",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid Intern's ID.";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What's the intern's email?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Email address cannot be left empty.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What's the intern's school?",
                validate: answer =>  {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a correct school.";
                }
            }
        ]). then(answers =>{
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamInput.push(intern);
            idInput.push(answers.internId);
            addTeam();
        });
    }

    function generateHTML() {
        // create dist directory for index.html in the case it does not already exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        console.log("Generating Team Profile....");
        fs.writeFileSync(outputPath, render(teamInput), "utf-8");
    }

    addManager();
}

init();
