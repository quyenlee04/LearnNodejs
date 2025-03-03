const User = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createUser(req, res) {
        try {
            const newUser = req.body;

            const temp = await User.checkUser(newUser.username);
            if (temp) {
                res.status(400).json({ error: 'Username already exists' });
                return;
            }
            newUser.password = await bcrypt.hash(newUser.password, 10);
            await User.createUser(newUser);
            res.status(201).json({ message: 'User created' });

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedUser = req.body;
            await User.updateUser(userId, updatedUser);
            res.status(200).json({ message: 'User updated' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        const user = await User.checkUser(username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await User.deleteUser(userId);
            res.status(200).json({ message: 'User deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new UserController;