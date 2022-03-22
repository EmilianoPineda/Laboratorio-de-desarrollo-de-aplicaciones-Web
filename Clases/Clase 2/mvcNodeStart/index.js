let express = require('express');
let appRoutes = require('./routes/app.js');
 
let app = express();

app.use('/', appRoutes);

// app.get('/', (req, res) => {
//     res.send("Hola mundo!");
// });

let exphbs = require('express-handlebars');

const extNameHbs = 'hbs';

let hbs = exphbs.create({extname: extNameHbs});

app.engine(extNameHbs, hbs.engine);

app.set("view engine", extNameHbs);

// app.listen(3000, () => {
//     console.log('App listening on port 3000! (https://localhost:3000)')
// });

let appConfig = require('./configs/app.js');

app.listen(appConfig.express_port,() =>{
    let show = `App listening on port ${appConfig.express_port}! (https://localhost:${appConfig.express_port})`
    console.log(show);
});