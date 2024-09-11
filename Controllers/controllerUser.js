const userModel= require("../Models/modelUser")

async function login(req, res) {
    const { name, password } = req.body;

    try {
        const user = await userModel.findOne({ name, password });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { userId: user._id, password: user.password }, 
            secret, 
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


async function createUser(req, res) {
    try {
        const newUser = req.body;
        const user = await userModel.create(newUser);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {login,createUser}
