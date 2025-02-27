const express = require('express');
const app = express();

const { auth, authAdmin } = require('./middlewares/auth.js');
const logger = require('./middlewares/log.js');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//config. mustache
const mustacheExpress = require('mustache-express');
const engine = mustacheExpress();

app.engine('mustache', engine);
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { loginRoute, registerRoute, userRoute, adminRoute } = require('./routes');

app.get("/", (req, res) => {
    const args = {header:{
        opcao: "Usuario",
        url: "api/log"
    }};
    res.render('header', args);
})

app.use('/oapi', loginRoute);
app.use('/oapi', registerRoute);
app.use('/api', auth, logger, userRoute);
app.use('/api/admin', authAdmin, adminRoute);



const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/ticketDB');
    const { create } = require('./services/userService.js');
    create('admin', 'admin', [], true);
}

const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})