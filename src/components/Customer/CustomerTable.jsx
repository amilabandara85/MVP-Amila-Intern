import { Component } from 'react';

export class CustomerTable extends Component {

    static dispalyName = CustomerTable.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true };
        this.addCustomers = this.addCustomers.bind(this);
    }

    componentDidMount() {
        this.populateCustomersData();
    }

    static renderCustomersTable(custmoers) {
        return (
            <table className="table table-striped" aria-aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                   
                    </tr>
                </thead>
                <tbody>
                    {stores.map(customer =>
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td><button>Edit </button></td>
                            <td><button>Delete </button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CustomerTable.renderCustomersTable(this.state.customers);

        return (
            <div>
                
                <h2 id="tableLablel">Customer</h2>
                <br></br>
                <button onClick={this.addCustomers}>New Customer</button>
                {contents}
                <br></br>
                <br></br>
            </div>
        );

    }

    async addCustomers() {

        const data = await fetch(
            'custmoers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                name: 'Daisy',
                address: 'New Lynn'
            })
        }).then((data) => data.json());

        this.setState({ customers: data, loading: false });

        this.populateCustomersData();
    }


      async populateCustomersData() {
          const response = await fetch('custmoers');
          const data = await response.json();
          this.setState({ customers: data, loading: false });
    }

     

    
}

