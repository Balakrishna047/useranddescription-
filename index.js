
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb+srv://bala:Bala1999@cluster0.nsdhrx4.mongodb.net/nodejs';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const itemSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).send(newItem);
});

app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
  res.send(updatedItem);
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  const deletedItem = await Item.findByIdAndDelete(id);
  res.send(deletedItem);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/ successfully started`);
});
