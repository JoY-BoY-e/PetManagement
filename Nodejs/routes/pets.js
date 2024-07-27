const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Jwt=require('jsonwebtoken');
const User=require('../models/User');
/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get all pets
 *     responses:
 *       200:
 *         description: Success
 */

const verifyToken = (req, res, next) => {
  const [header, token] = req.headers.authorization.split(' ');
  if (!token) return res.status(403).json({ error: 'No token provided' });

  Jwt.verify(JSON.parse(token), 'your_secret_key', (err, decoded) => {
      if (err) return res.status(500).json({ error: 'Failed to authenticate token' });
      
      if(req.params.email === decoded.email)
          next();
      else
          return res.status(403).json({ error: 'Unauthorized' });
  });
};
router.get('/pets/:email',verifyToken, async (req, res) => {
  try { 
    const email=req.params.email;
    const pets = await Pet.find({userEmail: email});
    if (!pets) return res.status(404).json({ message: 'No pets found' });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/pets/:email',verifyToken,async (req, res) => {
 

  try {
    const pet = new Pet({
      name: req.body.name,
      age: req.body.age,
      breed: req.body.breed,
      weight: req.body.weight,
      price: req.body.price,
      userEmail:req.params.email
    });
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/pets/:id/:email',verifyToken,async (req, res) => {
  try {
    const email=req.params.email;
    const pet = await Pet.deleteOne({ _id: req.params.id,userEmail: email });
    console.log(pet);
    if (pet.deletedCount==0) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Deleted Pet' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/pets/:id/:email',verifyToken,async (req, res) => {
  try {
    
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id,userEmail:req.params.email },
      {
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed,
        weight: req.body.weight,
        price: req.body.price
      },
      { new: true }
    );
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
