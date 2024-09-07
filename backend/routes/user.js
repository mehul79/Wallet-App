const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { User, Accounts } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.use(express.json());
router.use(cors());

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstname: zod.string(),
  lastname: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

const updateSchema = zod.object({
  password: zod.string().min(6).optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional()
});

router.post("/signup", async (req, res) => {
  try {
    const userCheck = signupSchema.safeParse(req.body);
    if (!userCheck.success) {
      return res.status(411).json({
        message: "Incorrect inputs"
      });
    }

    const userFind = await User.findOne({ username: req.body.username });
    if (userFind) {
      return res.status(411).json({
        message: "Email already taken"
      });
    }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });

    const userId = user._id;
    const token = jwt.sign({ userId: userId }, JWT_SECRET);

    const balance = Math.floor(Math.random() * (10000 - 1) + 1);
    await Accounts.create({
      userId: user._id,
      balance: balance
    });

    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const userCheck = signinSchema.safeParse(req.body);
    if (!userCheck.success) {
      return res.status(411).json({
        message: "Incorrect inputs"
      });
    }

    const userFind = await User.findOne({
      username: req.body.username,
      password: req.body.password
    });

    if (!userFind) {
      return res.status(411).json({
        message: "Error while logging in"
      });
    }

    const userId = userFind._id;
    const token = jwt.sign({ userId: userId }, JWT_SECRET);

    res.status(200).json({
      token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const updateCheck = updateSchema.safeParse(req.body);
    if (!updateCheck.success) {
      return res.status(411).json({
        message: "Error while updating information"
      });
    }

    await User.updateOne(
      { _id: req.userId },
      {
        ...(req.body.password && { password: req.body.password }),
        ...(req.body.firstname && { firstname: req.body.firstname }),
        ...(req.body.lastname && { lastname: req.body.lastname })
      }
    );

    res.status(200).json({
      message: "Updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

router.get("/bulk", async (req, res) => {
  try {
    const parameter = req.query.filter || "";

    let query = {};
    if (parameter !== "") {
      query = {
        $or: [
          { firstname: new RegExp(parameter, 'i') },
          { lastname: new RegExp(parameter, 'i') }
        ]
      };
    }

    const users = await User.find(query).select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

module.exports = router;