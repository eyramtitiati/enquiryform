import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './FormComponent.css';
import Popup from './Popup';


const FormComponent = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // State to hold equipment types fetched from the API
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  useEffect(() => {
    fetch('/api/equipment_types')
      .then((response) => response.json())
      .then((data) => {
        setEquipmentTypes(data);
      })
      .catch((error) => {
        console.error('Error fetching equipment types:', error);
      });
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(data);
  
      if (!response.ok) {
        setPopupMessage('Error saving inquiry. Please try again.');
      } else {
        setPopupMessage('Inquiry submitted successfully!');
      }
  
      setShowPopup(true);
    } catch (error) {
      console.error(error.message);
      setPopupMessage('An error occurred while processing your request. Please try again.');
      setShowPopup(true);
    }
  };
  

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Submit an Inquiry</h2>
      <form className="inquiry-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input {...register('name', { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label>Email:</label>
          <input {...register('email')} />
        </div>
        <div>
          <label>Phone:</label>
          <input {...register('phone')} />
        </div>
        <div>
          <label>Address:</label>
          <input {...register('address')} />
        </div>
        <div>
          <label>City:</label>
          <input {...register('city')} />
        </div>
        <div>
          <label>State:</label>
          <input {...register('state', { required: true })} />
          {errors.state && <span>This field is required</span>}
        </div>
        <div>
          <label>Zip Code:</label>
          <input {...register('zipCode')} />
        </div>
        <div>
          <label>Equipment Type:</label>
          <select {...register('equipmentType', { required: true })}>
            <option value="">Select Equipment Type</option>
            {equipmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.equipmentType && <span>This field is required</span>}
        </div>
        <div>
          <label>Description:</label>
          <textarea {...register('description', { required: true })}></textarea>
          {errors.description && <span>This field is required</span>}
        </div>
        <div>
          <label>Estimated Value:</label>
          <input
            type="number"
            {...register('estimatedValue', {
              pattern: /^[0-9]+$/,
            })}
          />
          {errors.estimatedValue?.type === 'pattern' && (
            <span>Please enter a valid numeric value</span>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      <Popup show={showPopup} message={popupMessage} onClose={closePopup} />
    </div>
  );
};

export default FormComponent;
