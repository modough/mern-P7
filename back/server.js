const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes.js');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middlewares/auth.middleware');

const cors = require('cors')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'content-type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
  'preFlightContinue': false
}
app.use(cors(corsOptions) );


//jwt for secure connection
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res, next) => {
    res.status(200).send(res.locals.user._id)
});

  
//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


// multer.middleware pour les ressources d'images static
app.use('/images', express.static(path.join(__dirname, 'images')));


//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})
