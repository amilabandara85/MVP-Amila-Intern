import React, {useState} from "react";
import './store.css';

function DeleteStore({ show, onClose }) {
    // 2. Create state variables to hold the text from the input boxes
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    if (!show) {
        return null;
    }

    // 3. This function runs when the form is submitted
    const handleSubmit = (event) => {
        // Prevents the browser from reloading the page
        event.preventDefault();

        // Show the captured data in an alert
        alert(`Hello, ${firstName} ${lastName}!`);

        // You can also add logic here to send the data to a server

        // Clear the input fields after submission
        setFirstName('');
        setLastName('');

        // Close the modal after submission
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Delete Store</h2>
                <p>Are you syre?</p>
              

                {/* 4. Create the form with an onSubmit handler */}
                <form onSubmit={handleSubmit}>
                    
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="delete-btn ">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default DeleteStore;