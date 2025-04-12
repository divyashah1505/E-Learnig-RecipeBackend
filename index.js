const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config(); // ✅ Ensures env vars like MAIL_USERNAME are loaded early

const fileUpload = require('express-fileupload');
const cloudinaryMiddleware = require('./middleware/cloudinary');
const { addCategory } = require('./Admin/Controllers/categoriesCrudController');
const { addSubcategory } = require('./Admin/Controllers/subcategoriescrudcontroller');
const plansCrudController = require('./Admin/Controllers/Planscrudscontroller');
const categoryRoutes = require('./Customer/Routes/categoryRoutes');
const paymentroutes = require('./Customer/Routes/Paymentroutes');
const categoriesCrudRoutes = require('./Admin/Routes/categoriesCrudRoutes');
const  plansCrudRoutes = require('./Admin/Routes/Planscrudroutes') 
const addCombo = require('./Admin/Routes/Combocrudroutes');
const categoriesRoutes = require('./Customer/Routes/categoryRoutes');
const videosRoutes = require('./Customer/Routes/videosRoutes');
const registerCustomer = require('./Customer/Routes/customerRoutes');
const customerRoutes = require('./Customer/Routes/customerRegistrationRoutes');
const customerRoutes2 = require('./Customer/Routes/customerLoginRoutes');
const adminLoginRoutes = require('./Admin/Routes/adminloginRoutes');
const subcategoriesCrudRoutes = require('./Admin/Routes/subcategoriescrudroutes');
const viewSubcategories = require('./Customer/Routes/viewsubcategoriesroutes');
const UploadRecipe = require('./Admin/Routes/UploadReciperoutes');
const getActiveCombos = require('./Customer/Routes/Viewcomboroutes');
const Viewplansroutes = require('./Customer/Routes/Viewplansroutes');
const recipe = require('./Customer/Routes/recipeRoutes')
const app = express();
app.use(express.json());


// Enable CORS
// app.use(cors({
//     origin: '*',
//     credentials: true,
// }));
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001','http://localhost:3002'], // Allow only requests from your frontend's origin
    credentials: true, // Allow cookies and authentication headers to be included in requests
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // Enable preflight for all routes
// const corsOptions = {
//     origin: function (origin, callback) {
//         // Check if the request's origin is from localhost on any port
//         if (/^http:\/\/localhost:\d+$/.test(origin) || !origin) {
//             callback(null, true); // Allow if it's from localhost or if origin is undefined (non-web context)
//         } else {
//             callback(new Error('Not allowed by CORS')); // Block other origins
//         }
//     },
//     credentials: true, // Allow cookies and authentication headers to be included in requests
// };

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
    limits:{
        fileSize:1000000*500,
        files:10000
    }
}))

app.use(bodyParser.json());

// Serve static files from the uploads directory
app.use('/', express.static("./uploads"));


// const fileUpload = require('express-fileupload');

// Bind routes
app.use('/', adminLoginRoutes);
customerRoutes.bind_Url(app);
customerRoutes2.bind_Url(app);
app.use('/', registerCustomer);
app.use('/', categoriesCrudRoutes);
app.use('/',UploadRecipe);
app.use('/', categoryRoutes);
app.use('/', addCombo);
app.use('/', categoriesRoutes);
app.use('/', videosRoutes);
app.use('/', subcategoriesCrudRoutes);
app.use('/', viewSubcategories);
app.use('/',recipe);
app.use('/',getActiveCombos);
app.use('/',plansCrudRoutes);
app.use('/',Viewplansroutes);
app.use('/',paymentroutes);
app.use('/api/payment', paymentroutes); // Mount payment routes



// Add routes for adding category and subcategory
app.post('/categories', cloudinaryMiddleware, addCategory);
app.post('/', cloudinaryMiddleware, addSubcategory);

// Initialize database connection and call seeder function
db.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the PostgreSQL database:', err);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Set up the server to listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
