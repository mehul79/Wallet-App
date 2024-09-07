const mongoose = require("mongoose");


const url = "mongodb://mega1:fg@ac-an8nybv-shard-00-00.hky8tct.mongodb.net:27017/?ssl=true&replicaSet=atlas-d1d4lu-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

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