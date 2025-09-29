import { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './store.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavMenu } from '../navmenu/NavMenu';
import AddStore from './AddStore';

 

export class StoreTable extends Component {

    static dispalyName = StoreTable.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true };
        this.addStores = this.addStores.bind(this);
    }

    componentDidMount() {
        this.populateStoresData();
    }

    static renderStoresTable(stores) {
        return (
      
            
            
            <div className="stores-container">
            <table className="stores-table table table-striped" aria-aria-labelledby="tableLabel">
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


                            <td><button onClick={this.openModal} className="edit-btn ">Edit</button></td>
                                
                           
                            
                                <td><button onClick={this.deletestores}className="delete-btn ">Delete</button></td>
                         
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
            : StoreTable.renderStoresTable(this.state.stores);

        return (
            <div>

                <br></br>
                 <br></br>
              
                <h2 id="tableLablel" className="text-lg sm:text-xl lg:text-2xl font-bold text-white-600">Stores</h2>
                
                <br></br>
                <button onClick={this.addStores} className="new-store-btn ">Add Store</button>
                 
                
                
                {contents}
                <br></br>
                <br></br>

        
            </div>
            
        );

    }

    //Add data 
    async addStores() {

    

        const data = await fetch(
            'stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                name: 'Countdown',
                address: 'Northcote'
            })
        }).then((data) => data.json());

        this.setState({ stores: data, loading: false });

        this.populateStoresData();
    }
////Edit data 
//    async editStore(store) {
//        try {
//            const response = await fetch(`stores/${store.id}`, {
//                method: "PUT",
//                headers: { "Content-Type": "application/json" },
//                body: JSON.stringify({
//                    name: "New",
//                    address: "Mel"
//                })
//            });
//            if (!response.ok) throw new Error(`response status is ${response.status}`);
//            await this.populateStoresData();
//        } catch (err) {
//            console.error(err);
//        }
//    }

//    //DELETE data

//    async deleteStore(storeId) {
//    const response = await fetch('stores', {
//        method: 'DELETE',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ id: storeId })
//    });
//    const data = await response.json();

//    this.setState({ stores: data, loading: false });
//    this.populateStoresData();
//}

      async populateStoresData() {
          const response = await fetch('stores');
          const data = await response.json();
          this.setState({ stores: data, loading: false });
    }

     

    
}

