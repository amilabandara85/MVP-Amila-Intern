import React, { useState } from 'react';
import './store.css';

function AddStore({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && address) { // Basic validation
      onCreate({ name, address }); // Pass the new store data
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create store</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">ADDRESS</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              cancel
            </button>
            <button type="submit" className="create-btn">
              create 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStore;