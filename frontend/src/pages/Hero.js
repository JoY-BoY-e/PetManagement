import React,{useEffect, useState,useContext} from 'react'
import axios from 'axios'
import Footer from '../components/Footer/Footer';
import AddPetPopup from '../components/PopUps/AddPetPopup';
import EditPetPopup from '../components/PopUps/EditPetPopup';
import PopUpHoc from '../components/PopUp/PopUpHoc';
import ClosePopup from '../components/PopUps/ClosePopup';
import Card from '../components/Card/Card';
import {AuthContext} from '../components/Authentication/Authentication';

const AddPetPopupWithHoc = PopUpHoc(AddPetPopup);
const EditPetPopupWithHoc = PopUpHoc(EditPetPopup);
const ClosePopupWithHoc = PopUpHoc(ClosePopup);

const Hero = () => {
  
  const auth=useContext(AuthContext)[0];
  const [pets, setPets] = useState([]);
  const [addflag,setAddFlag]=useState(false);
  const [delFlag,setDelFlag]=useState(false);
  const [editFlag,setEditFlag]=useState(false);
  const [petEdit,setPetEdit]=useState(null);


  useEffect(() => {
    if(!auth.user.email){
      return;
    }
    axios.get(`http://localhost:5000/api/pets/${auth.user.email}`,{
      headers: {
        'Authorization': `Bearer ${auth.authToken}`
      }
    })
      .then((response) => {
        setPets(()=>response.data);
      }).catch((error) => {
        console.log(error);
        
      });
  }, [auth]);

  
  const handleAddPet=async ()=>{
    setAddFlag(!addflag);
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
       
        {addflag?<AddPetPopupWithHoc width='w-75' height='h-75' trigger={setAddFlag} pet={{pets , setPets}}/>:null}
        {editFlag?<EditPetPopupWithHoc width='w-75' height='h-75' trigger={setEditFlag} pets={{pets , setPets}} pet={petEdit}/>:null}
      <div className='d-flex flex-wrap justify-content-evenly align-items-center gap-4'>
        { pets.length>0?(pets.map((pet,key) => {
          return (
          <Card key={key} pet={pet} triggerDel={setDelFlag} triggerEdit={setEditFlag} setPetToEdit={setPetEdit} />
        )})):<h1>No pets found</h1>}
         {delFlag?<ClosePopupWithHoc trigger={setDelFlag} width='w-25' height='h-25' pets={{pets,setPets}} pet={petEdit} />:null}

         <Footer/>
        
      </div>
     
    
    
    </ div>
  )
}

export default Hero