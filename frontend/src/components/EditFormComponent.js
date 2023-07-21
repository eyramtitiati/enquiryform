import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditFormComponent.css';

const EditFormComponent = () => {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    equipment_type: '',
    description: '',
    estimated_value: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/inquiries/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Inquiry not found');
        }
        return response.json();
      })
      .then((data) => {
        setInquiry(data);
        setFormData(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching inquiry:', error);
        setLoading(false);
      });
  }, [id]);



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        setErrorMessage('Error updating inquiry');
        setSuccessMessage('');
      } else {
        setSuccessMessage('Inquiry updated successfully!');
        setErrorMessage('');
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage('An error occurred while processing your request');
      setSuccessMessage('');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2 className="form-heading">Edit Inquiry</h2>
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input name="phone" value={formData.phone} onChange={handleInputChange} />
        </div>
        <div>
          <label>Address:</label>
          <input name="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div>
          <label>City:</label>
          <input name="city" value={formData.city} onChange={handleInputChange} />
        </div>
        <div>
          <label>State:</label>
          <input name="state" value={formData.state} onChange={handleInputChange} />
        </div>
        <div>
          <label>Zip Code:</label>
          <input name="zip_code" value={formData.zip_code} onChange={handleInputChange} />
        </div>
        <div>
          <label>Equipment Type:</label>
          <select name="equipment_type" value={formData.equipment_type} onChange={handleInputChange}>
            <option value="">Select Equipment Type</option>
            <option value="Heavy/Construction Equipment">Heavy/Construction Equipment</option>
            <option value="AG Equipment">AG Equipment</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label>Estimated Value:</label>
          <input name="estimated_value" value={formData.estimated_value} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default EditFormComponent;
