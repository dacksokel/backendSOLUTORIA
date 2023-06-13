
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { make_get_request } from './util/axios.js';
import Model from './model/uf.js'
dotenv.config();
const app = express();
const port = 3000;

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));
app.use(express.json());

//CRUD endpoints
app.get('/', async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting data');
  }
});

app.get('/:id', async (req, res) => {
  try {
    const data = await Model.findOne({id: req.params.id});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting data');
  }
});

app.get('/import', async (req, res) => {
  try {
    await make_get_request();
    res.json({
      status: 'success'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error importing data');
  }
});

app.post('/', async (req, res) => {
  try {
    if (!req.body.id) {
      const lastData = await Model.find().sort({id: -1}).limit(1);
      req.body.id = lastData[0].id + 1;
    }
    const data = await Model.create(req.body);
    res.json({message: 'Creado correctamente', data});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating data');
  }
});



app.put('/:id', async (req, res) => {
  try {
    const data = await Model.findOneAndUpdate({id: req.params.id}, req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data');
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const data = await Model.findOneAndDelete({id: req.params.id});
    res.json({message: 'Borrado exitoso'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
