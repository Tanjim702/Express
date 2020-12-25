const express = require('express')
const morgan = require('morgan')
const moongoose = require('mongoose')
const app = express()
const exphbs = require('express-handlebars')
//Template Engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
// Import Middlewares
const customMiddleware = require('./customMiddlewares/customMiddleware')
//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))//Like body parser
app.use(customMiddleware)
//Public directory
app.use(express.static('public'))

const PORT = process.env.PORT || 5000


//Routes
app.use('/user', require('./routes/userRoutes'))
app.get('/', (req, res) => {
    res.render('home',{
        title:'Blog_Post app'
    })
})
//Routes
moongoose.connect('mongodb+srv://tanjim:tanjim@cluster0.i5mdg.mongodb.net/tanjim?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => {
        console.log(`Connected to datebase!`)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
