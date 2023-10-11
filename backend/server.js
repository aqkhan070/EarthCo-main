const express = require('express')
const server = express();
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(cors());

const dbConnector = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/EarthCo', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

const userSchema = new mongoose.Schema({
    fullName: String,
    userName: String,
    email: String,
    password: String
})

const customerSchema = new mongoose.Schema({
    customerName: String,
    companyName: String,
    title: String,
    description: String,
    contacts: Array,
    adress: Object,
    userLogin: Object,
    serviceLocations: Array
})

dbConnector();

const Users = mongoose.model('Users', userSchema);
const Customers = mongoose.model('Customers', customerSchema)

server.get('/Users', async (req, res) => {
    const docs = await Users.find({});
    res.json(docs);
})

server.post('/AddUser', async (req, res) => {
    const data = req.body;
    const user = new Users();
    user.fullName = data.fullName;
    user.userName = data.userName;
    user.email = data.email;
    user.password = data.password;

    const doc = await user.save();

    res.json(doc)
})

server.post('/AddCustomer', async (req, res) => {
    const data = req.body;
    const customer = new Customers();
    customer.customerName = data.customerName;
    customer.companyName = data.companyName;
    customer.title = data.title;
    customer.description = data.description;
    customer.contacts = data.contacts;
    customer.adress = data.customerAdress;
    customer.userLogin = data.userLogin;
    customer.serviceLocations = data.serviceLocation;

    const doc = customer.save();
    res.json(doc);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Customers.findByIdAndRemove(id);
})

server.get('/Customers', async (req, res) => {
    const docs = await Customers.find({});
    res.json(docs)
})

server.use('/router', router);

server.listen(8001)