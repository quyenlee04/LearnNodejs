const connection = require('../utils/connectDB');

const  getAllUsers = async () => {
    const query = 'SELECT * FROM user';
    const [rows, fields] = await connection.execute(query);
    return rows;
};

const createUser = async (newUser) => {
    const {username, email, password} = newUser;
    const query = `INSERT INTO user (USERNAME, PASSWORD, EMAIL) VALUES (?, ?, ?)`;
    const [rows, fields] = await connection.execute(query, [username,email,password]);
    return rows;
};
const checkUser = async (username) => {
    const query = `SELECT * FROM user WHERE USERNAME = ?`;
    const [rows, fields] = await connection.execute(query, [username]);
    return rows[0];
};

const updateUser = async (newUser) => {
    const {id, username, email, password} = newUser;
    const query = `UPDATE user SET USERNAME = ?, EMAIL = ?, PASSWORD = ? WHERE ID = ?`;
    const [rows, fields] = await connection.execute(query, [username, email, password, id]);
    return rows;
};

const deleteUser = async (id) => {
    const query = `DELETE FROM user WHERE ID = ?`;
    const [rows, fields] = await connection.execute(query, [id]);
    return rows;
};

module.exports = {
    getAllUsers, createUser, updateUser, checkUser, deleteUser
};
