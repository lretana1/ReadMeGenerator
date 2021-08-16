// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of the project? '
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your GitHub Username?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address?'
    },
    {
        type: 'input',
        name: 'what',
        message: 'Describe the project and the problem its meant to solve'
    },
    {
        type: 'input',
        name: 'why',
        message: 'Why was the prokect created??'
    },
    {
        type: 'input',
        name: 'how',
        message: 'Describe how someone may utilize this?'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Give step by step instruction as to how to install the project'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Give some brief instructions and a few examples for use'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which liscences apply to your project?',
        choices: ['agpl', 'apache', 'mit', 'no license']
    },
    {
        type: 'confirm',
        name: 'confirmContributers',
        message: 'Will you be adding any contributers?',
    },
    {
        type: 'input',
        name: 'contribute',
        message: 'How can someone contribute to the project?',
        when: ({ confirmContributers }) => {
            if (confirmContributers) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributerInput => {
            if (contributerInput) {
                return true;
            } else {
                console.log('Please enter guidelines');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'test',
        message: 'give brief instructions on how to test the app'
    }
];

// TODO: Create a function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/generated-README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'Your file has been created!'
            });
        });
    });
};

// TODO: Create a function to initialize app
const init = () => {

    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
}

// Function call to initialize app
init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
})
