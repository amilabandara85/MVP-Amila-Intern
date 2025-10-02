import { Component } from 'react';
import React, {useState} from 'react';  
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './store.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavMenu } from '../navmenu/NavMenu';

import DeleteStore from './DeleteStore';
import EditStore from './EditStore';
import AddStore from './AddStore';

 

export class StoreTable extends Component {

    
    static dispalyName = StoreTable.name;

    constructor(props) {
        super(props);
        this.state = { 
            stores: [], 
            loading: true,

            showAddModal: false,
            showEditModal: false,
            showDeleteModal: false,
            

            storeToEdit: null,
            storeToDeleteId: null
         };
   
    }

    componentDidMount() {
        this.populateStoresData();
    }

   openAddModal = () => this.setState({ showAddModal: true });
   closeAddModal = () => this.setState({ showAddModal: false});

   openEditModal = (store) => this.setState({ showEditModal: true, storeToEdit:store });
   closeEditModal = () => this.setState({ showEditModal: false, storeToEdit: null});

   openDeleteModal = (id) => this.setState({ showDeleteModal: true, storeToDeleteId:id });
   closeDeleteModal = () => this.setState({ showDeleteModal: false, storeToDeleteId: null});

   
    renderStoresTable(stores) {
        return (
            
            <div className="stores-container">
            <table className="stores-table table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Action</th>
                   
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.address}</td>


                            <td><button className="edit-btn " onClick={() => this.openEditModal(store)}>Edit</button></td>
                                                         
                            <td><button className="delete-btn " onClick={() => this.openDeleteModal(store.id)}>Delete</button></td>

                                                     
                        </tr>
                    )}
                </tbody>
            </table>

          
         
            </div>
           
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderStoresTable(this.state.stores);


        return (
            <div>
 
                <br></br>
                 <br></br>
                
                <h2 id="tableLablel" className="text-lg sm:text-xl lg:text-2xl font-bold text-white-600">Stores</h2>
                
                <br></br>
                <button onClick={this.openAddModal} className="new-store-btn ">Add Store</button>
                <br></br>
                
      
                {contents}
                <br></br>
                <br></br>

               
              {/*} <AddStore
                show={this.state.showAddModal}
                onClose={this.closeAddModal}
                onAdd={this.handleAddStore}
                />*/}
                
                <EditStore
                    show={this.state.showEditModal}
                    onClose={this.closeEditModal}
                    onUpdate={this.handleUpdateStore}
                    storeToEdit={this.state.storeToEdit}
                    />

                <DeleteStore
                    show={this.state.showDeleteModal}
                    onClose={this.closeDeleteModal}
                    onConfirm={this.handleConfirmDelete}

                    />

                
            </div>
            
        );

    }

    handleAddStore = async (newStoreData) => {
    await fetch('stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStoreData),
    });
    this.closeAddModal();
    this.populateStoresData();
};

handleUpdateStore = async (id, updatedStoreData) => {
    await fetch(`stores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStoreData),
    });
    this.closeEditModal();
    this.populateStoresData();
};

handleConfirmDelete = async () => {
    const { storeToDeleteId } = this.state;
    await fetch(`stores/${storeToDeleteId}`, {
        method: 'DELETE',
    });
    this.closeDeleteModal();
    this.populateStoresData();
};


      async populateStoresData() {
          const response = await fetch('stores');
          const data = await response.json();
          this.setState({ stores: data, loading: false });
    }

     

    
}


