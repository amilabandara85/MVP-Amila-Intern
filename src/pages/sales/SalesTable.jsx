import { Component } from "react";
import React, {useState} from "react";
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavMenu } from "../../components/navmenu/NavMenu";

import AddSales from './AddSales';


export class SalesTable extends Component {

    static displayName = SalesTable.name;

    constructor(porps) {
        super(porps);
        this.state = {
            saless: [],
            loading: true,

            showAddModal: false,

            showEditModal: false,
            salesToEdit:null,

            showDeleteModal: false,
            salesToDeleteId: null
        };
    }

    componentDidMount(){
        this.populateSalesData();
    }

   openAddModal = () => this.setState({ showAddModal:true});
   closeAddModal = () => this.setState({ showAddModal:false});
   
   openEditModal = () => this.setState({openEditModal:true, salesToEdit: sales});
   closeEditModal = () => this.setState({showEditModal: false, salesToEdit: null});

   openDeleteModal = (id) => this.setState({showDeleteModal:true, salesToDeleteId: id});
   closeDeleteModal = () => this.setState({showDeleteModal:false, salesToDeleteId});

   renderSalessTable(saless) {
    return (
        <div className="global-con">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>DateSold</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {saless.map(sales =>
                        <tr key={sales.id}>
                          <td>{sales.id}</td>
                          <td>{sales.customer}</td>
                          <td>{sales.product}</td>
                          <td>{sales.store}</td>
                          <td>{sales.DateSold}</td> 

                          <td><button className="edit-btn" onClick={() => this.openEditModal(sales)}>Edit</button></td>
                          <td><button className="delete-btn" onClick={() => this.openDeleteModal(sales.id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
   }

   render () {
    let contents = this.state.loading
    ? <p><em>Loading....</em></p>
    : this.renderSalessTable(this.state.saless);

    return(
        <div>
            <br></br>
            <br></br>
            <h2 id="tableLablel" className="text=lg sm:text-xl lg:text-2xl font-bold text-wite-600">Sales</h2>
            <br></br>
            <button onClick={this.openAddModal} className="new-global-btn">New Sales</button>
            <br></br>
            {contents}
            <br></br>
            <br></br>

            {/*<AddSales*/}
            {/*show={this.state.showAddModal}*/}
            {/*onClose={this.closeAddModal}*/}
            {/*onAdd={this.handleAddSales}*/}
            {/*/>*/}

            {/*<EditSales*/}
            {/*show={this.state.showEditModal}*/}
            {/*onClose={this.closeEditModal}*/}
            {/*onUpdate={this.handleUpdateSales}*/}
            {/*salesToEdit={this.state.salesToEdit}*/}
            {/*/>*/}

            {/*<DeleteSales*/}
            {/*show={this.state.showDeleteModal}*/}
            {/*onClose={this.closeDeleteModal}*/}
            {/*onConfirm={this.handleConfirmDelete}*/}
            {/*/>*/}
        </div>
        );
    }

    //Add
    handleAddSales = async (newSalesData) =>{
        await fetch('saless', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(newSalesData),
        });
        alert('New Sales added');
        this.closeAddModal();
        this.populateSalesData();
    };

    //Edit
    handleUpdateSales =async (id, updatedSalesData) => {
        const salesToUpdate={
            id: id,
            customer: updatedSalesData.customer,
            product: updatedSalesData.product,
            store: updatedSalesData.store,
            dateSold: updatedSalesData.dateSold
        };

        const response = await fetch(`saless/${Id}`, {
            methods: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(salesToUpdate),
        });

        if (response.ok) {
            alert('Sales Updated Successfully!');
            this.closeEditModal();
            this.populateSalesData();
        }
        else{
            console.error("Failed to Update:, status, response.status, response. statusText");
            alert('Error: Could not update the Sales');
        }
    };

    //Delete
    handleConfirmDelete = async () => {
        const {salesToDeleteId} = this.state;
        await fetch(`saless/${salesToDeleteId}`,{
            method: 'DELETE',
        });
        alert('Sales Deleted!');
        this.closeDeleteModal();
        this.populateSalesData();
    };

    async populateSalesData () {
        const response = await fetch('saless');
        const data = await response.json();
        this.setState({saless: data, loading:false});
    }

}