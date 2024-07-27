//const {createServer} = require('node:http');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app=express();
app.use(cors());
app.use(bodyParser.json());


const port=5000;
const secretKey = 'your_secret_key'; // Replace with your own secret key

mongoose.connect('mongodb://localhost:27017/petdb', { useNewUrlParser: true, useUnifiedTopology: true });
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Pet Management API',
            description: 'Pet Management API Information',
            version: '1.0.0',
        }
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', require('./routes/pets'));


// Login route to authenticate user and generate JWT
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);

    const user = await User.findOne({ email: email, password: password });
    if (!user) {
        res.status(400).json({ error: 'Invalid credentials' });
    } else {
        const token = jwt.sign({ username: user.name }, secretKey, { expiresIn: '1h' });
        // console.log(token);
        res.json({ success: 'Welcome, ' + email, token });
    }
});


app.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    // console.log(req.body);

    const user= new User({
        name:username,
        email:email,
        password:password
    });

    if (password !== confirmPassword) {
        res.status(400).json({ error: 'Passwords do not match' });
    } else {
        // Generate JWT
        await user.save();
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        // console.log(token);
        res.json({ success: 'Welcome, ' + username, token });
    }
});


// Middleware to verify JWT


// Protected route example
// app.get('/protected', verifyToken, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// });

app.listen(port,()=>{
    console.log(`server running at :${port}`);
});
