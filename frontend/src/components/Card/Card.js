import React from 'react'

const Card = (props) => {
  return (
    <div  className='card'>
          <div className='card-header'>
            <h3>{props.pet.name}</h3>
          </div>
          <div className='card-body'>
            <p>Age: {props.pet.age}</p>
            <p>Breed: {props.pet.breed}</p>
            <p>Weight: {props.pet.weight}kg</p>
            <p>Price: ${props.pet.price}</p>
            <div className='d-flex flex-row gap-2 justify-content-around w-100'>
            <button onClick={()=>{props.triggerEdit(true)
            props.setPetToEdit(props.pet)
            }} className='btn btn-primary'>Edit</button>

            <button onClick={()=>{props.triggerDel(true)
              props.setPetToEdit(props.pet)
            }} className='btn btn-danger'>Delete</button>
            </div>
            
          </div>
        </div>

  )
}

export default Card