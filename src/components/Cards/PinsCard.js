import React from 'react';
import { Link } from 'react-router-dom';

export default function PinsCard({ pin, removePin }) {
  return (
    <div className='card m-2'>
      <img className='card-img-top' src={pin.imageUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>
          {pin.description}
        </p>
        <Link className='btn btn-primary' to={`/pin-edit/${pin.firebaseKey}`}>
          Edit Pin
        </Link>
        <button className='btn btn-danger' id={pin.firebaseKey} onClick={(e) => removePin(e)}>Delete</button>
      </div>
    </div>
  );
}
