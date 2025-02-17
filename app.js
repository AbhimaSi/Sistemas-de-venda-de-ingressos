const express = require('express');
const app = express();

const { loginRoute, registerRoute, userRoute, adminRoute } = require('./routes');

app.use(express.json())

app.use('/oapi', loginRoute);
app.use('/oapi', registerRoute);

app.use('/api', userRoute);
app.use('/api/admin', adminRoute);

const mongoose = require('mongoose');
const User = require('./model/User.js');







main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/ticketDB') 

    const admin = new User({
        nome: 'admin',
        senha: 'admin',
        isAdmin: true,
        tickets: []
    })
    await admin.save();
}

const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})