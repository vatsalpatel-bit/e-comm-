const express = require('express');
const cors = require('cors');

require('./db/config.js'); // MongoDB connection file
const User = require('./db/user.js'); // Mongoose model(user)
const Product = require('./db/product.js'); // product Schema

const app = express();

app.use(express.json());
app.use(cors());

// --- Register API ---
app.post('/regi', async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.status(201).send({
      message: 'User registered successfully',
      data: result
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error saving user',
      error: error.message
    });
  }
});

// ---login API---
app.post('/login', async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select('-password');
    if (user) {
      res.send(user);
    } else {
      res.send('User not found');
    }
  } else {
    res.send('fill the detail');
  }
});

//---product API---
app.post('/productAdd', async (req, resp) => {
  try {
    let product = new Product(req.body);
    const result = await product.save();
    resp.status(201).send({
      message: 'Product added successfully',
      data: result
    });
  } catch (error) {
    resp.status(500).send({
      message: 'Error saving product',
      error: error.message
    });
  }
});

// ---product-List---
app.get('/products-list', async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send("product not found");
  }
});

// --- Get Single Product by ID (ADDED FOR AUTO-FILL) ---
app.get('/product/:id', async (req, resp) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
      resp.send(product);
    } else {
      resp.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    resp.status(500).send({ error: error.message });
  }
});

// ---delete product---
app.delete('/deleteproduct/:id', async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// ---Update---
app.put("/updateproduct/:id", async (req, resp) => {
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (err) {
    resp.status(500).send({ error: err.message });
  }
});

// ---Search-Product---
app.get("/search/:key", async (req, resp) => {
  try {
    let result = await Product.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } },
        { category: { $regex: req.params.key, $options: "i" } },
        { company: { $regex: req.params.key, $options: "i" } }
      ]
    });
    resp.send(result);
  } catch (error) {
    resp.status(500).send({ error: error.message });
  }
});

// ---get username ---
app.get("/username", async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }
    
    const user = await User.findById(userId).select("name -_id");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ username: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching username" });
  }
});


// --- Start Server ---
app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
