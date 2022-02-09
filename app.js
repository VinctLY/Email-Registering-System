const { registerInput, saveEmailContact, close, chalk } = require('./module/contacts')

async function registerUser() {
    try {
        const name = await registerInput(chalk.bold.red('What is your name : '))
        const email = await registerInput(chalk.bold.green('What is your email : '))

        saveEmailContact(name, email)
    } catch (err) {
        console.log("Please check if there's a mistake in your input!")

        // if there's an program error, uncomment this!
        // console.log("Theres an error { ", err, " }");
        close()
    }
}

registerUser()