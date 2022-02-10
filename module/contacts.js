// =============== EMAIL CONTACT MANAGEMENT MODULE ===============

// NPM Public Modules :
// chalk module
const chalk = require('../npm/node_modules/chalk');
// validator module
const validator = require('../npm/node_modules/validator');

// Core Modules :
// file system module
const fs = require('fs');
// readline module
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// checking if email dirr is created, if not, create!
const dirr_email_path = './email';
if (!fs.existsSync(dirr_email_path)) {
    fs.mkdirSync(dirr_email_path)
}

// checking if email data (JSON) is created, if not, create!
const data_email_path = './email/data.json';
if (!fs.existsSync(data_email_path)) {
    fs.writeFileSync(data_email_path, '[]', 'utf-8')
} else if (fs.readFileSync(data_email_path, 'utf-8') == []) {
    fs.writeFileSync(data_email_path, '[]', 'utf-8')
}

// =============== IF YOU WANT TO SHOW WHATS IN THE DATA.JSON ===============

// const test = fs.readFileSync(data_email_path, 'utf-8')
// const testArray = JSON.parse(test)

// for (let i in testArray) {
//     console.log(testArray[i])
// }

// =============== !!MAIN FUNCTION!! ===============

function registerInput(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            if (answer.trim() == 0) {
                reject(answer)
                console.log("Your input can't be empty!")
            } else {
                if (validator.isInt(answer)) {
                    reject(answer)
                    console.log("Your input can't be a number!")
                } else {
                    if (answer.length == 1) {
                        reject(answer)
                        console.log('Sorry, but your name nor email cannot be an initial!');
                    } else {
                        const readFileJson = fs.readFileSync(data_email_path, 'utf-8')
                        const rfjArray = JSON.parse(readFileJson)
                        for (let i in rfjArray) {
                            if (rfjArray[i].name == answer || rfjArray[i].email == answer) {
                                reject(answer)
                                if (rfjArray[i].name == answer) {
                                    console.log(`Sorry, but your name ${chalk.bold.red(answer)} has been registered!`)
                                } else if (rfjArray[i].email == answer) {
                                    console.log(`Sorry, but your email ${chalk.bold.green(answer)} has been registered!`)
                                }
                            }
                        }
                        resolve(answer.replace(/\s+/g, " ").trim())
                    }
                }
            }
        })
    })
}

function saveEmailContact(name, email) {
    if (!validator.isEmail(email)) {
        console.log('Your email is not valid! Please try again later!')
        rl.close()
    } else {
        function success() {
            const emailReg = {
                name,
                email
            }
            const file_buffer = fs.readFileSync(data_email_path, 'utf-8')
            const emails = JSON.parse(file_buffer)
            emails.push(emailReg)

            fs.writeFileSync(data_email_path, JSON.stringify(emails));
            console.log(`Your name ${chalk.red(name)} and email ${chalk.green(email)} has been registered. Thanks for registering!`)

            rl.close();
        }

        const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const formatNumber = /\d/;
        if (format.test(name)) {
            console.log('Your name nor email could not contain symbol!')
            rl.close()
        } else if (formatNumber.test(name)) {
            console.log('Your name could not contain number!')
            rl.close()
        } else {
            success()
        }
    }
}

function close() {
    rl.close()
}

module.exports = { registerInput, saveEmailContact, close, chalk }