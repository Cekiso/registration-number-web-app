let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const reg = require('./reg');

const pg = require('pg');
const Pool = pg.Pool;

let app = express();


// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://nkully:nkully@localhost:5432/user';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }

});
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",

    resave: false,
    saveUninitialized: true
}));

const registration = reg(pool);
// const route = routes(registration)
console.log(pool)



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

// initialise the flash middleware
app.use(flash());

//Home
app.get("/", async function(req, res) {
    try {

        res.render("index", {
            regNo1: await registration.showReg()


        });
        console.log(await registration.showReg());
    } catch (error) {
        console.log(error)
    }
});

app.post('/Registration-number', async function(req, res) {

    let intake = req.body.number

    await registration.regTake(intake);

    await registration.regTake(intake)
    console.log(await registration.regTake(intake));



    res.redirect('/')
})

app.post('/reset', async function(req, res) {
    try {

        await registration.clear();
        res.redirect('/')

    } catch (error) {
        console.log(error)
    }
})


let PORT = process.env.PORT || 4534;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});