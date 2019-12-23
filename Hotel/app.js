const express = require('express');
const app = express();
require('dotenv').config();
global.fetch = require(`node-fetch`);
const expressSwagger = require('express-swagger-generator')(app);

const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./connections/localMongoConnection.js');
const usersRouter = require('./routes/usersRouter.js');
const hallRouter = require('./routes/hallRouter.js');
const ticketRouter = require('./routes/ticketRouter.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send(`Test`);
});


app.use('/', usersRouter);
app.use('/', hallRouter);
app.use('/', ticketRouter);

// let options = {
//     swaggerDefinition: {
//         info: {
//             description: 'This is a sample server',
//             title: 'Hotel AOI',
//             version: '1.0.0',
//         },
//         host: 'localhost:4000',
//         basePath: '/v1',
//         produces: [
//             "application/json",
//             "application/xml"
//         ],
//         schemes: ['http', 'https'],
//         securityDefinitions: {
//             JWT: {
//                 type: 'apiKey',
//                 in: 'header',
//                 name: 'Authorization',
//                 description: "",
//             }
//         }
//     },
//     basedir: __dirname, //app absolute path
//     files: ['./routes/*.js'] //Path to the API handle folder
// };
//
// expressSwagger(options);

// var swaggerUi = require('swagger-ui-express'),
//     swaggerDocument = require('./swagger.json');
//
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);

app.listen(process.env.PORT, () => {
    console.log(`Server runs on http://localhost:${process.env.PORT}; Ctrl+C for exit `);
    connectDB();
});

// sudo docker build -t konstantindocker86/hotel .
// sudo docker run -p 4000:4000  konstantindocker86/hotel
