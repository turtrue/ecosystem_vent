const express = require('express');
const path = require('path');
const compileSass = require('express-compile-sass');
const homeRoutes = require('./routes/home');
const catalogRoutes = require('./routes/catalog');
const productsRoutes = require('./routes/products');
const servicesRoutes = require('./routes/services');
const emailsRoutes = require('./routes/emails');

const app = express();

// Sass
app.use(compileSass({
    root: path.join(__dirname, 'public'),
    sourceMap: true,
    sourceComments: true,
    watchFiles: true,
    logToConsole: false
}));

// Pug
app.set('view engine', 'pug');

// Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Регистрация роутов
app.use('/', homeRoutes);
app.use('/catalog', catalogRoutes);
app.use('/products', productsRoutes);
app.use('/services', servicesRoutes);
app.use('/emails', emailsRoutes);

const PORT = process.env.PORT || 3000;

function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();