import React,{useContext} from 'react'
import axios from 'axios';
import {AuthContext} from '../../components/Authentication/Authentication';

const ClosePopup = (props) => {
    const auth = useContext(AuthContext);
    const removePet = (id)=>{
    if(!auth[0].user.email){
      return;
    }
        axios.delete(`http://localhost:5000/api/pets/${id}/${auth[0].user.email}`,{
          headers: {
            'Authorization': `Bearer ${auth[0].authToken}`
          }
        })
        .then((response)=>{
          props.pets.setPets(props.pets.pets.filter((pet)=> pet._id !== id));
           props.trigger(false);
      });
      } 
  return (
    <div className='m-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center' >
    <h3 className='fs-5'>Are u sure?</h3>
    <div className='my-4 w-75 d-flex justify-content-between align-items-center column-gap-4 flex-wrap ' >
    <button onClick={()=>removePet(props.pet._id)} className='btn btn-primary' style={{maxWidth:"5rem", margin:"0 auto"}}>Yes</button>
    <button onClick={()=>props.trigger(false)} className='btn btn-danger' style={{maxWidth:"5rem", margin:"0 auto"}}>No</button>
    </div>
    </div>
  )
}

export default ClosePopup