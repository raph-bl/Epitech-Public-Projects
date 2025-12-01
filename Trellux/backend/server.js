// require('dotenv').config();
const path = require('path');
const dotenv = require('dotenv').config({path: path.join(__dirname, '.env')})
const express       = require('express');
const cors          = require('cors');
const mysql         = require('mysql2/promise');
const jwt           = require('jsonwebtoken');
const cookieParser  = require('cookie-parser')
const app           = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
};

function generateToken(user) {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email
        },
        process.env.JWT_SECRET,
        { 
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
}

let pool;
async function initDatabase() {
    try {
        pool = mysql.createPool(dbConfig); 
        console.log("[*] Db connected successfully!");
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(100) NOT NULL,
                firstname VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);


        await pool.execute(`
            CREATE TABLE IF NOT EXISTS project (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                due_time DATETIME NULL,
                user_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS board (
                id INT AUTO_INCREMENT PRIMARY KEY,
                project_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                position INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
                INDEX idx_project_id (project_id)
            );
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS todo (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                due_time DATETIME NULL,
                status ENUM('not started', 'todo', 'in progress', 'done') DEFAULT 'not started',
                priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
                user_id INT NOT NULL,
                project_id INT,
                board_id INT DEFAULT NULL,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
                FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
            );
        `);

    } catch (err) {
        console.log("[!] Database init error :", err);
        process.exit(1);
    }
}

function getPool() {
    return pool;
}

module.exports = { getPool, generateToken };

async function selectUser() {
    try {
        const [rows] = await pool.execute('SELECT * FROM user');
        return rows;
    } catch (err) {
        console.log("[!] Database error: ", err);
        throw err;
    }
}

// route de base
app.get('/', (req, res) => {
    res.send('Its database here');
});

// test 
app.get('/test', async (req, res) => {
    try {
        const users = await selectUser();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

const PORT = 3000;
initDatabase().then(() => {
    app.use('/api', require('./routes'));

    app.listen(PORT, () => {
        console.log(`[*] Server running on http://localhost:${PORT}`);
        console.log('[*] Routes chargées : /api/auth, /api/todos, /api/users, /api/projects');
    });
});
