const express = require("express")
const zod = require("zod")
const router = express.Router()
router.use(express.json())
const {Accounts, User} = require("../db")
const {authMiddleware} = require("../middleware")
const cors = require("cors")
router.use(cors())


router.get("/balance", authMiddleware, async(req,res)=>{

   const userId = req.userId;
    const account = await Accounts.findOne({
        userId: userId
    })
    console.log(account);
    const balance = account.balance
    console.log(balance);
    res.status(200).json({
        balance: balance
    })

})


const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
})

router.post("/transfer", authMiddleware,async(req,res)=>{

    try{
    const {amount, to} = req.body
    const trasferCheck = transferSchema.safeParse(req.body);
    if(!trasferCheck.success){
        res.status(400).json({
            msg: "Wrong Inputs"
        })
    }
    // const session = mongoose.startSession()

    const account = await Accounts.findOne({
        userId: req.userId
    })
    // console.log(account);
    if(account.balance < amount){
        // await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toaccount = await Accounts.findOne({
        userId: to
    })
     // console.log(toaccount);
    if(!toaccount){
        // await session.abortTransaction();
        res.status(400).json({
            message: "Invalid account"
        })
    }

    await Accounts.updateOne({
        userId: req.userId
    }, {
       $inc: {
        balance: -amount
       }
    })


    await Accounts.updateOne({
        userId: to
    },{
        $inc:{
            balance: +amount
        }
    })

    // await session.commitTransaction()

    res.status(200).json({
        message: "Transfer successful"
    })}catch(e){
        console.log("Error: ", e);
    }
})


module.exports = router