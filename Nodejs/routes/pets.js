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
router.get('/pets', async (req, res) => {
  try {
    const [header,token]=req.headers.authorization.split(' ');
    // console.log(token);
    const decoded=Jwt.verify(JSON.parse(token),'your_secret_key');
    // console.log(decoded);
    if(!decoded){
      return res.status(401).json({message:'Unauthorized'});
    }
    const user= await User.findOne({name:decoded.username});
    console.log(user);
    const pets = await Pet.find({userEmail:user.email});
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
router.post('/pets', async (req, res) => {
 

  try {
    const [header,token]=req.headers.authorization.split(' ');
    console.log(token);
    const decoded=Jwt.verify(JSON.parse(token),'your_secret_key');
    // console.log(decoded);
    if(!decoded){
      return res.status(401).json({message:'Unauthorized'});
    }
    const user= await User.findOne({name:decoded.username});
    const pet = new Pet({
      name: req.body.name,
      age: req.body.age,
      breed: req.body.breed,
      weight: req.body.weight,
      price: req.body.price,
      userEmail:user.email
    });
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/pets/:id', async (req, res) => {
  try {
    const [header,token]=req.headers.authorization.split(' ');
    // console.log(token);
    const decoded=Jwt.verify(JSON.parse(token),'your_secret_key');
    console.log(decoded);
    if(!decoded){
      return res.status(401).json({message:'Unauthorized'});
    }
    const user= await User.findOne({name:decoded.username});
    const pet = await Pet.deleteOne({ _id: req.params.id,userEmail:user.email });
    console.log(pet);
    if (pet.deletedCount==0) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Deleted Pet' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/pets/:id', async (req, res) => {
  try {
    const [header,token]=req.headers.authorization.split(' ');
    // console.log(token);
    const decoded=Jwt.verify(JSON.parse(token),'your_secret_key');
    // console.log(decoded);
    if(!decoded){
      return res.status(401).json({message:'Unauthorized'});
    }
    const user= await User.findOne({name:decoded.username});
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id,userEmail:user.email },
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
