var	express	=	require('express');
var	api	=	require('./routes/api');
var	app	=	express();

require('./models/post');

/*
var	bodyParser	=	require('body-parser');
var 	session		=	require('express-session');
var 	passport	=	require('passport');
var	auth		=	require('./routes/auth')(passport);

app.use(session({secret:	'secret	token'}));
app.use(passport.initialize());
app.use(passport.session());

var	initPassport	=	require('./config/passport-init');
initPassport(passport);

app.use('/auth',	auth);
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use('/api',	api);


module.exports	=	app;
