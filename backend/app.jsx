require('dotenv').config();
const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const dbUrl = process.env.DB_URL;
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const createUsersWithPosts = async () => {
    const users = [
        {
            username: 'animalz',
            password: 'fluffers',
            posts: [
                { title: 'fluffy', content: 'so fluffy' },
                { title: 'floofy', content: 'so floofy' },
                { title: 'flippity', content: 'flippity floppity' }
            ]
        },
        {
            username: 'kelc',
            password: 'monopoly',
            posts: [
                { title: 'farming', content: 'plantin pumpkins' },
                { title: 'business model', content: 'business good' },
                { title: 'financials', content: 'we rich' }
            ]
        },
        {
            username: 'pokemonz',
            password: 'catchthemall',
            posts: [
                { title: 'coolest', content: 'charizard' },
                { title: 'cutest', content: 'eevee' },
                { title: 'why god why', content: 'mr mime' }
            ]
        }
    ];

    for (const userData of users) {
        const user = await prisma.user.create({
            data: {
                username: userData.username,
                password: userData.password,
                posts: {
                    create: userData.posts
                }
            }
        });
        console.log(`Created user with id: ${user.id}`);
    }
};

createUsersWithPosts().catch((error) => {
    console.error('Error creating users and posts:', error);
});

app.post('/auth/register', async (req, res) => {
    // create a new user and return a JWT token
});

app.post('/auth/login', async (req, res) => {
    // log in and return a JWT token
});

app.get('/api/posts', async (req, res) => {
    // get all posts
});

app.get('/api/posts/:id', async (req, res) => {
    // get post by ID
});

app.post('/api/posts', authenticateToken, async (req, res) => {
    // create a new post
});

app.put('/api/posts/:id', authenticateToken, async (req, res) => {
    // update a post by ID
});

app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
    // delete a post by ID
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});