const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS middleware
app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/product', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));


  // Define a schema for users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  });
  
  // Define a model based on the user schema
  const User = mongoose.model('User', userSchema);
  
  // API endpoint for user registration
  app.post('/api/register', async (req, res) => {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ error: 'User already exists' });
      }
      const newUser = new User({ username, email, password, phoneNumber });
      await newUser.save();
      res.status(201).send(newUser);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  // API endpoint for user login
app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user by email
      const user = await User.findOne({ email });
      // If user not found or password doesn't match, send error response
      if (!user || user.password !== password) {
        return res.status(401).send({ error: 'Invalid email or password' });
      }
      // If credentials are correct, send success response
      res.send({ message: 'Login successful', user });
    } catch (err) {
      // Handle any errors
      res.status(400).send(err);
    }
  });
  

// Define a schema for your product
const productSchema = new mongoose.Schema({
    productName: String,
    productTitle: String,
    productDescription: String,
    productVendor: String,
    inStock: Number,
    buyingPrice: Number,
    salePrice: Number,
    purchaseQuantity: Number,
    productType: String,
    shippingRates: String,
    refillLimit: Number,
    productLocationAddress: String,
  });

// Define a model based on the schema
const Product = mongoose.model('Product', productSchema);

// API endpoint to add a product
app.post('/api/add/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Example: API endpoint to get all products
app.get('/api/show/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Additional endpoints for other CRUD operations...
// endpoint for delete
// API endpoint to delete a product by ID
app.delete('/api/delete/products/:id', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).send({ error: 'Product not found' });
      }
      res.send(deletedProduct);
    } catch (err) {
      res.status(500).send(err);
    }
  });
//endpoint for update
// API endpoint to update a product by ID
app.put('/api/edit/products/:id', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).send({ error: 'Product not found' });
      }
      res.send(updatedProduct);
    } catch (err) {
      res.status(400).send(err);
    }
  });


  //product find by id
  // API endpoint to get a product by ID
app.get('/api/show/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send({ error: 'Product not found' });
      }
      res.send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  