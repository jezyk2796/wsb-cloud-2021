const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const port = process.env.port || 3000

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');
const mongoDBConnect = require('./lib/database').mongoDBConnect;

const app = express();

app.engine('hbs', hbs({ defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.getErrors);


mongoDBConnect(() => {
    app.listen(port);
});
