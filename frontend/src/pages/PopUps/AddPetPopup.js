import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Cookie from 'js-cookie';

const AddPetPopup = (props) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState(null);
  const [price, setPrice] = useState(null);

  const addPet = () => {
    axios.post('http://localhost:5000/api/pets', {
      name: name,
      age: age,
      breed: breed,
      weight: weight,
      price: price
    }, {
      headers: { 'Authorization': `Bearer ${Cookie.get('authToken')}` }
    })
      .then((response) => {
        props.pet.setPets([...props.pet.pets, response.data]);
      });
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    await addPet();
    props.trigger(false);
  };

  return (
    <Form onSubmit={handleAddPet} className='w-75 h-100 d-flex flex-column justify-content-start align-items-center my-4'>
      <h1>Add a Pet</h1>
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

      <button type='submit' className='btn btn-primary w-100'>Add Pet</button>
    </Form>
  );
};

export default AddPetPopup;
