import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Cookie from 'js-cookie';

const EditPetPopup = (props) => {
  const [name, setName] = useState(props.pet.name);
  const [age, setAge] = useState(null);
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    console.log(props.pet, 'pet' );
    if (props.pet) {
      setName(props.pet.name);
      setAge(props.pet.age);
      setBreed(props.pet.breed);
      setWeight(props.pet.weight);
      setPrice(props.pet.price);
    }
  }, [props.pet]);

  const editPet = () => {
    axios.put(`http://localhost:5000/api/pets/${props.pet._id}`, {
      name: name,
      age: age,
      breed: breed,
      weight: weight,
      price: price
    }, {
      headers: { 'Authorization': `Bearer ${Cookie.get('authToken')}` }
    })
      .then((response) => {
        props.pets.setPets([...props.pets.pets.filter(pet => pet._id !== props.pet._id), response.data]);
      });
  };

  const handleEditPet = async (e) => {
    e.preventDefault();
    await editPet();
    props.trigger(false);
  };

  return (
    <Form onSubmit={handleEditPet} className='w-75 h-100 d-flex flex-column justify-content-start align-items-center my-4'>
      <h1>Edit Pet</h1>
      <Form.Group className="mb-2 w-100" controlId="formBasicName">
        <Form.Control className='bg-dark text-white' type="text" placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          value={name || ''}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2 w-100" controlId="formBasicAge">
        <Form.Control className='bg-dark text-white' type="number" placeholder="Enter age"
          onChange={(e) => setAge(e.target.value)}
          value={age || ''}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2 w-100" controlId="formBasicBreed">
        <Form.Control className='bg-dark text-white' type="text" placeholder="Enter breed"
          onChange={(e) => setBreed(e.target.value)}
          value={breed || ''}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2 w-100" controlId="formBasicWeight">
        <Form.Control className='bg-dark text-white' type="number" placeholder="Enter weight"
          onChange={(e) => setWeight(e.target.value)}
          value={weight || ''}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 w-100" controlId="formBasicPrice">
        <Form.Control className='bg-dark text-white' type="number" placeholder="Enter price: $"
          onChange={(e) => setPrice(e.target.value)}
          value={price || ''}
          required
        />
      </Form.Group>

      <button type='submit' className='btn btn-primary w-100'>Edit Pet</button>
    </Form>
  );
};

export default EditPetPopup;
