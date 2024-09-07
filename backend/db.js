const mongoose = require("mongoose");


const url = "add your mongo db url"

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
