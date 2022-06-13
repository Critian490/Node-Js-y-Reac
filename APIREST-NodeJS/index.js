const { getConnection } = require('./database/connect-to-mongodb');
const express = require('express');
var cors = require('cors');

const app = express();
const port = 2022;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/inventario', require('./router/inventory'));
app.use('/usuarios', require('./router/user'));
app.use('/estados', require('./router/state'));
app.use('/marcas', require('./router/brand'));
app.use('/tipos', require('./router/type'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});