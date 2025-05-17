const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config(); // ✅ Load .env

const fileUpload = require('express-fileupload');
const cloudinaryMiddleware = require('./middleware/cloudinary');

// Controller functions
const { addCategory } = require('./Admin/Controllers/categoriesCrudController');
const { addSubcategory } = require('./Admin/Controllers/subcategoriescrudcontroller');

// Routes
const adminLoginRoutes = require('./Admin/Routes/adminloginRoutes');
const customerRegisterRoutes = require('./Customer/Routes/customerRoutes');
const customerRoutes = require('./Customer/Routes/customerRegistrationRoutes');
const customerLoginRoutes = require('./Customer/Routes/customerLoginRoutes');
const categoriesCrudRoutes = require('./Admin/Routes/categoriesCrudRoutes');
const plansCrudRoutes = require('./Admin/Routes/Planscrudroutes');
const comboRoutes = require('./Admin/Routes/Combocrudroutes');
const subcategoriesCrudRoutes = require('./Admin/Routes/subcategoriescrudroutes');
const uploadRecipeRoutes = require('./Admin/Routes/UploadReciperoutes');
const categoryRoutes = require('./Customer/Routes/categoryRoutes');
const viewSubcategoriesRoutes = require('./Customer/Routes/viewsubcategoriesroutes');
const videosRoutes = require('./Customer/Routes/videosRoutes');
const recipeRoutes = require('./Customer/Routes/recipeRoutes');
const viewCombosRoutes = require('./Customer/Routes/Viewcomboroutes');
const viewPlansRoutes = require('./Customer/Routes/Viewplansroutes');
const paymentRoutes = require('./Customer/Routes/Paymentroutes');

const app = express();

// ✅ CORS config
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        "https://your-ngrok-url.ngrok-free.app",
        'https://customerdashboard-phi.vercel.app'
    ],
    credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: {
        fileSize: 1000000 * 500, // 500MB
        files: 10000
    }
}));

// ✅ Serve static files
app.use('/', express.static('./uploads'));

// ✅ Bind routes
app.use('/', adminLoginRoutes);
customerRoutes.bind_Url(app);
customerLoginRoutes.bind_Url(app);
app.use('/', customerRegisterRoutes);
app.use('/', categoriesCrudRoutes);
app.use('/', uploadRecipeRoutes);
app.use('/', categoryRoutes);
app.use('/', comboRoutes);
app.use('/', videosRoutes);
app.use('/', subcategoriesCrudRoutes);
app.use('/', viewSubcategoriesRoutes);
app.use('/', recipeRoutes);
app.use('/', viewCombosRoutes);
app.use('/', plansCrudRoutes);
app.use('/', viewPlansRoutes);
app.use('/', paymentRoutes);
app.use('/api/payment', paymentRoutes);

// ✅ Custom routes
app.post('/categories', cloudinaryMiddleware, addCategory);
app.post('/', cloudinaryMiddleware, addSubcategory);

// ✅ Health Check
app.get('/ping', (req, res) => {
    res.send('pong');
});

// ✅ Connect to PostgreSQL
db.connect()
    .then(() => console.log('Connected to PostgreSQL database successfully.'))
    .catch(err => console.error('Unable to connect to the PostgreSQL database:', err));

// ✅ Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
