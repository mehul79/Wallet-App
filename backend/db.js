const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const url = process.env.MONGO_URI
mongoose.connect(url)
    .then(()=>{
        console.log(`Successfully connect to db`);
    }).catch((err)=>{
        console.log(err);
    })

const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        firstname: String,
        lastname: String,
})

const accountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: Number
})

const User = mongoose.model("User", userSchema);
const Accounts = mongoose.model("Accounts", accountsSchema)

module.exports = ({
    User,
    Accounts
})
