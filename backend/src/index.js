const express = require('express');
const {json} = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieparser = require('cookie-parser');
colors = require('colors');
const app = express();
/*settings*/
console.log(new Date());
app.set('json spaces',2);
app.set('port',3000);
//app.use(cookieParser());

/*importin routes*/
const ensayosRoutes =  require('./routes/ensayos');
/* middleware */
app.use(morgan('dev'));
app.use(json());

/* routes */
app.use('/api/ensayos',ensayosRoutes);
/* startup */
app.listen(app.get('port'),()=> {
    console.log(`Server on port: ${app.get('port')}`.magenta);
});