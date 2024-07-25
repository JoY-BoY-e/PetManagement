import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Popup from './Popup';
import Pop from '../components/Pop';
import Cookies from 'js-cookie';
// import {AuthContext} from '../components/Authentication';

const Hero = () => {
  // const auth=useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [addflag,setAddFlag]=useState(false);
  const [delFlag,setDelFlag]=useState(false);
  const [editFlag,setEditFlag]=useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/pets',{
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    })
      .then((response) => {
        setPets(()=>response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  
  const handleAddPet=async ()=>{
    setAddFlag(!addflag);
  }

  const removePet = (id)=>{
    axios.delete(`http://localhost:5000/api/pets/${id}`,{
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    })
    .then((response)=>{
      setPets(pets.filter((pet)=> pet._id !== id));
       setDelFlag(false);
  });
  } 

  return (
    

    <div className='Hero d-flex justify-content-center
    align-items-center flex-column w-100 h-100
    '>
      <div className='text-center'>
      <h1 className='my-4'>Pet Management</h1> 
      <h3>Manage your pets</h3>
      <p>Keep track of your pets and their needs</p>
      </div>
      <hr className='w-50'/>
     
      <div className="addPet d-flex flex-wrap justify-content-center text-center w-50 p-4 gap-5">
        <h2 className=''>Add a Pet</h2>
        <button onClick={handleAddPet} className='btn btn-primary w-25'>Add Pet</button>
        <h2 className='w-100'>Your Pets</h2>
      </div>
       {/* {addflag?<Popup flag={addflag} trigger={setAddFlag} pet={{pets , setPets}}/>:null} */}
       {addflag?<Pop trigger={setAddFlag} width='w-75' height='h-75'>
        <Popup title='Add a Pet' trigger={setAddFlag} pet={{pets , setPets}}/> 
        </Pop>:null}
      
      <div className='d-flex flex-wrap justify-content-evenly align-items-center gap-4'>
        {/* //The pets added should be displayed in card form, with buttons as edit and delete. */}
        { pets.length>0?(pets.map((pet,key) => {
          return (
        <div key={key} className='card'>
          <div className='card-header'>
            <h3>{pet.name}</h3>
          </div>
          <div className='card-body'>
            <p>Age: {pet.age}</p>
            <p>Breed: {pet.breed}</p>
            <p>Weight: {pet.weight}kg</p>
            <p>Price: ${pet.price}</p>
            <div className='d-flex flex-row gap-2 justify-content-around w-100'>
            <button onClick={()=>setEditFlag(true)} className='btn btn-primary'>Edit</button>
            {
              editFlag?<Pop trigger={setEditFlag} width='w-75' height='h-75' >
                <Popup title='Edit a Pet' petId={pet._id} trigger={setEditFlag} pet={{pets , setPets}}/> 
              </Pop>:null
            }
            <button onClick={()=>setDelFlag(true)} className='btn btn-danger'>Delete</button>
            </div>
            { delFlag?<Pop trigger={setDelFlag} width='w-25' height='h-25'>
            <div className='m-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center' >
            <h3 className='fs-5'>Are u sure?</h3>
            <div className='my-4 w-75 d-flex justify-content-between align-items-center column-gap-4 flex-wrap ' >
            <button onClick={()=>removePet(pet._id)} className='btn btn-primary' style={{maxWidth:"5rem", margin:"0 auto"}}>Yes</button>
            <button onClick={()=>setDelFlag(false)} className='btn btn-danger' style={{maxWidth:"5rem", margin:"0 auto"}}>No</button>
            </div>
            </div>
            </Pop>:null }
          </div>
        </div>
        )})):<h1>No pets found</h1>}
        
      </div>
     
    
    
    </ div>
  )
}

export default Hero