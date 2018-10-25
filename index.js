var	express	=	require('express');
var	api	=	require('./routes/api');
var	app	=	express();
app.use('/api',	api);
module.exports	=	app;
