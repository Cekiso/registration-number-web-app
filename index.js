let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const reg = require('./reg');

const pg = require('pg');
const Pool = pg.Pool;

let app = express();

const connectionString = process.env.DATABASE_URL || 'postgresql://nkully:nkully@localhost:5432/users';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }

});
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",

    resave: false,
    saveUninitialized: true
}));

const registration = reg();
// const route = routes(registration)
console.log(pool)



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

// initialise the flash middleware
app.use(flash());

//Home
app.get("/", function(req, res) {
    res.render("index", {


    });
});

app.post('/Registration-number', function(req, res) {
    const plate = req.body.number;
    console.log(plate);
    const select = req.body.place;

    registration.setReg(plate)
    res.render("index", {
        regNo1: registration.Names()

    });

})


let PORT = process.env.PORT || 4534;

app.listen(PORT, function() {
    console.log('App starting on port', PORT);
});