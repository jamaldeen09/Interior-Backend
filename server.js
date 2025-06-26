const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes')
const productRoute = require('./routes/productRoutes')
const cartRoute = require('./routes/cartRoutes')
const ordersRoute = require('./routes/orderRoutes')

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', ordersRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))