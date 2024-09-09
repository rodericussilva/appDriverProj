const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
//const romaneiosRoutes = require('./routes/romaneiosRoutes');
//const uploadRoutes = require('./routes/uploadRoutes');
const newDeliveriesRoutes = require('./routes/newDeliveriesRoutes');

const app = express();
const PORT = process.env.PORT || 3020;

app.use(express.json());
app.use(cors({
    origin: '*',
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend')));

//app.use('/', uploadRoutes);
app.use('/api/users', userRoutes);
//app.use('/api/romaneios', romaneiosRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/new-deliveries', newDeliveriesRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/login.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server run on port ${PORT}`);
});