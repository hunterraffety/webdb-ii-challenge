const express = require('express');

const db = require('../data/db-config');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cars = await db('cars');
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve cars.` });
  }
});

router.post('/', async (req, res) => {
  try {
    const carData = req.body;
    const [id] = await db('cars').insert(carData);
    const newCarEntry = await db('cars').where({ id });

    res.status(201).json(newCarEntry);
  } catch (error) {
    res.status(500).json({ message: `Failed to store data.` });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db('cars')
      .where({ id })
      .del();
    res.status(201).json({ message: 'Item Deleted.' });
  } catch (error) {
    res.status(500).json({ message: `Failed to delete data.` });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const changes = req.body;
    await db('cars')
      .where({ id })
      .update(changes);
    res.status(201).json({ message: 'Item updated.' });
  } catch (error) {
    res.status(500).json({ message: `Failed to update data.` });
  }
});

module.exports = router;
