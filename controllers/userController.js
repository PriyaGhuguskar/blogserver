const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')

exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'please fill all fields'
            })
        }

        const exisitingUser = await userModel.findOne({ email })
        if (exisitingUser) {
            return res.status(401).send({
                success: false,
                message: 'user already exist'
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10)


        const user = new userModel({ username, email, password: hashedpassword });
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'new user Created',
            user,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'erroe in register callback',
            success: false,
            error
        })
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "all users data",
            users,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get All Users",
            error,
        })
    }
};



exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please Provide email or Password'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Email is not Registered',

            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or password'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'login Successfully',
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error In Login Callback',
            error
        })
    }
}