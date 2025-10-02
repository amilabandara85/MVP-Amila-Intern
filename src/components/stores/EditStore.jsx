import React, { useState } from "react";
import './store.css';

function EditStore({ show, onClose }) {
 
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');

    if (!show) {
        return null;
    }

    const handleSubmit = (event) => {
      
        event.preventDefault();

       
        alert(`Hello, ${storeName} ${storeAddress}!`);


        setStoreName('');
        setStoreAddress('');

       
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Edit Your Details</h2>
                

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="storename">Name</label>
                        <input
                            type="text"
                            id="storename"
                            placeholder="Enter your Store Name"
                            value={storeName} 
                            onChange={(e) => setStoreName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="storeaddress">Address</label>
                        <input
                            type="text"
                            id="storeaddress"
                            placeholder="Enter your Store Address"
                            value={storeAddress}
                            onChange={(e) => setStoreAddress(e.target.value)}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default EditStore;