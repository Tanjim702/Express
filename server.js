require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const moongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
//Session store
const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'mySessions',
    expires: 1000 * 60 * 60 * 2
});
//session store
//Template Engine

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Import Middlewares
const setLocals = require('./middlewares/setLocals')
const { bindUserWithRequest } = require('./middlewares/authMiddleware')
//Middlewares
app.use(session({
    secret: process.env.SECRET_KEY || 'SECRET_KEY',
    resave: false,
    saveUninitialized: false,
    store: store,


}))

if (app.get('env').toLowerCase() === 'development') {
    app.use(morgan('dev'))
}
app.use(express.urlencoded({ extended: true }))//Like body parser
app.use(bindUserWithRequest())
app.use(setLocals())
//Public directory
app.use(express.static('public'))

const PORT = process.env.PORT


//Routes
app.use('/user', require('./routes/userRoutes'))
app.use('/dashboard', require('./routes/dashboardRoute'))
app.get('/', (req, res) => {

    res.render('home', {
        title: 'Blog_Post app',
    })
})
//Routes
moongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to datebase!`)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
