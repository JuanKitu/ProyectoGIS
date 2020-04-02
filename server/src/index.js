const express = require('express');
const { json } = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieparser = require('cookie-parser');
colors = require('colors');
const app = express();
const cors = require('cors');
/*settings*/
console.log(new Date());
app.set('json spaces', 2);
app.set('port', 3000);
//app.use(cookieParser());

/*importin routes*/
const ensayosRoutes = require('./routes/ensayos');
const probetasRoutes = require('./routes/probetas');
const ambientesRoutes = require('./routes/ambientes');
const parametrosRoutes = require('./routes/parametros');
const usuariosRoutes = require('./routes/usuarios');
/* middleware */
app.use(morgan('dev'));
app.use(json());

// Configurar cabeceras y cors
const corsOptions = {
    origin: 'http://localhost:8100',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));



/* routes */
app.use('/api/ensayos', ensayosRoutes);
app.use('/api/probetas', probetasRoutes);
app.use('/api/ambientes', ambientesRoutes);
app.use('/api/parametros', parametrosRoutes);
app.use('/api/usuarios', usuariosRoutes);
/* startup */
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`.magenta);
});