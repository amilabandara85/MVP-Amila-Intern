import { Component } from 'react';
import React, {useState} from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {NavMenu} from '../../components/navmenu/NavMenu';

import AddCustmoer from './AddCustomer';


export class CustomerTable extends Component {

    static displayName = CustomerTable.name;

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            loading: true,

            showAddModal: false,

            showEditModal: false,
            customerToEdit: null,

            showDeleteModal: false,
            custmoerToDeleteId: null

        };
    }

    componentDidMount() {
        this.poplateCustomerData();
    }

    OpenAddModal = () => this.setState({ showAddModal: true });
    closeAddModal = () => this.setState({ showAddModal: false });

    openEditModal = (customer) => this.setState({ showEditModal: true, customerToEdit: customer });
    colseEditModal = () => this.setState({ showEditModal: false, customerToEdit: null });

    openDeleteModal = (id) => this.setState({ showDeleteModal: true, customerToDeleteId: id });
    clsoeDeleteModal = () => this.setState({ showDeleteModal: false, customerToDeleteId: null });

    renderCustomerTable(customers) {
        return (
            <div className="global-container">
                <table className="global-table table table-striped" aria-labelledby="tableLable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map(custmoer =>
                            <tr key={custmoer.id}>
                                <td>{custmoer.id}</td>
                                <td>{custmoer.name}</td>
                                <td>{custmoer.address}</td>

                                <td><button className="edit-btn" onClick={() => this.openEditModal(custmoer)}>Edit</button></td>
                                <td><button className="delete-btn " onClick={() => this.openDeleteModal(custmoer.id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading....</em></p>
            : this.renderCustomerTable(this.state.customers);

        return (
            <div>
                <br></br>
                <br></br>
                {/*try to add CSS*/}
                <h2 id="tableLable" className="text-lg sm:text-xl lg:text-2xl font-bold text-white-600">Customer</h2>
                <br></br>
                <button onClick={this.OpenAddModal} className="new-global-btn">Add Customer</button>
                <br></br>
                {contents}
                <br></br>
                <br></br>

                <AddCustmoer
                    show={this.state.showAddModal}
                    onClose={this.closeAddModal}
                    onAdd={this.handleAddCustomer}
                />

                {/*<EditCustmomer*/}
                {/*    show={this.state.showEditModal}*/}
                {/*    onClose={this.colseEditModal}*/}
                {/*    onUpdate={this.handleUpdateCustomer}*/}
                {/*    customerToEdit={this.state.customerToEdit}*/}
                {/*/>*/}

                {/*<DeleteCustomer*/}
                {/*    show={this.state.showDeleteModal}*/}
                {/*    onClose={this.clsoeDeleteModal}*/}
                {/*    onConfirm={this.handleConfirmDelete}*/}
                {/*/>*/}
            </div>
        );
    }

    //Add Customer
    handleAddCustomer = async (newCustomerData) => {
        await fetch('customers', {
            method: 'POST',
            handers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCustomerData),
        });

        alert('New Customer Added');
        this.closeAddModal();
        this.poplateCustomerData();
    };

    ////Edit Customer
    //handleUpdateCustomer = async (id, updatedCustomerData) => {
    //    const customerToUpdate = {
    //        id: id,
    //        name: updatedCustomerData.name,
    //        address: updatedCustomerData.address

    //    };

    //    const response = await fetch(`customer/${id}`, {
    //        method: 'PUT',
    //        headers: { 'Content-Type': 'application/json' },
    //        body: JSON.stringify(customerToUpdate),
    //    });

    //    if (response.ok) {
    //        alert('Customer Updated Successfully !');
    //        this.colseEditModal();
    //        this.poplateCustomerData();
    //    }
    //    else {
    //        console.error("Failed to Update:, response.status, response. statusText");
    //        alert('Error: Could not update the store');
    //    }

    //};

    ////Delete Customer
    //handleConfirmDelete = async () => {
    //    const { customerToDeleteId } = this.state;
    //    await fetch('customers/${customerToDeleteId}', {
    //        method: 'DELETE',
    //    });
    //    alert('Customer Deleted!');
    //    this.clsoeDeleteModal();
    //    this.poplateCustomerData();
    //};


    async poplateCustomerData() {
        const response = await fetch('customers');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }

}