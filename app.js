const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { prompt } = require('inquirer')

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []

const buildManager = employee => {
  prompt([
    {
      type: 'input',
      name: 'officeNumber',
      message: 'Enter the Room Number'
    }
  ])
    .then(({ officeNumber }) => {
      employees.push(new Manager(employee.name, employee.id, employee.email, officeNumber))
      subMenu()
    })
    .catch(err => console.log(err))
}

const buildEngineer = employee => {
  prompt([
    {
      type: 'input',
      name: 'gitHub',
      message: 'Enter the GitHub username'
    }
  ])
    .then(({ gitHub }) => {
      employees.push(new Engineer(employee.name, employee.id, employee.email, gitHub))
      subMenu()
    })
    .catch(err => console.log(err))
}

const buildIntern = employee => {
  prompt([
    {
      type: 'input',
      name: 'school',
      message: 'Enter the school name'
    }
  ])
    .then(({ school }) => {
      employees.push(new Intern(employee.name, employee.id, employee.email, school))
      subMenu()
    })
    .catch(err => console.log(err))
}

const subMenu = () => {
  prompt({
    type: 'list',
    name: 'addition',
    message: 'Do you want to add another employee?',
    choices: ['yes', 'no']
  })
    .then(({ addition }) => {
      switch (addition) {
        case 'yes':
          mainMenu()
          break
        case 'no':
          const html = render(employees)
          fs.writeFileSync(path.join(__dirname, 'output', 'index.html'), html)
      }
    })
}

const mainMenu = () => {
  prompt([
    {
      type: 'list',
      name: 'position',
      choices: ['Manager', 'Engineer', 'Intern'],
      message: 'Select the employee position '
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter employee name'
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter employee ID number'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter employee email'
    }
  ])
    .then(employee => {
      switch (employee.position) {
        case 'Manager':
          buildManager(employee)
          break
        case 'Engineer':
          buildEngineer(employee)
          break
        case 'Intern':
          buildIntern(employee)
          break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
