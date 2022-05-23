require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRoutes, postRoutes } = require('./routes');
app.get('/', (req, res) => res.json({ message: "Welcome to Codigram API" }))
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/assets/images',express.static('./assets/images/'));

const errHandling = require('./middlewares/error');
app.use(errHandling);


app.listen(port, () => {
    console.log(`port : ${port}`);
})