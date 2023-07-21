
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ViewDataComponent.css';

const ViewDataComponent = () => {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/inquiries')
      .then((response) => response.json())
      .then((data) => {
        setInquiries(data);
      })
      .catch((error) => {
        console.error('Error fetching inquiries:', error);
      });
  }, []);

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`); 
  };

  const handleDeleteClick = (id) => {
    fetch(`/api/inquiries/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Delete request failed');
        }
        setInquiries((prevInquiries) =>
          prevInquiries.filter((inquiry) => inquiry.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting inquiry:', error);
      });
  };


  return (
    <div className="view-data-container">
      <h2 className="view-data-header">View Data</h2>
      <table className="view-data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Equipment Type</th>
            <th>Description</th>
            <th>Estimated Value</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {inquiries.map((inquiry) => (
          <tr key={inquiry.id}>
            <td>{inquiry.id}</td>
            <td>{inquiry.name}</td>
            <td>{inquiry.email}</td>
            <td>{inquiry.phone}</td>
            <td>{inquiry.address}</td>
            <td>{inquiry.city}</td>
            <td>{inquiry.state}</td>
            <td>{inquiry.zip_code}</td>
            <td>{inquiry.equipment_type}</td>
            <td>{inquiry.description}</td>
            <td>{inquiry.estimated_value}</td>
            <td>
              <button onClick={() => handleEditClick(inquiry.id)}>Edit</button>
            </td>
            <td>
                <button onClick={() => handleDeleteClick(inquiry.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
};

export default ViewDataComponent;
