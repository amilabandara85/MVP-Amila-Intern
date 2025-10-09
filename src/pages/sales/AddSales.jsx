import React, { useEffect, useState } from 'react';
import '../../styles/globalcolour.css';
import '../../styles/globalcomponents.css';

const API_BASE_URL = 'https://localhost:55676';



export function AddSales({ show, OnClose, OnAdd}) {
    //Droup down data
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);

    //input
    const [customer, setCustomer] = useState('');
    const [product, setProduct] = useState('');
    const [store, setStore] = useState('');
    const [date, setDate] =useState(new Date(). toISOString().substring(0, 10));// today

    const CUSTOMER = `${API_BASE_URL}/customers`;
    const PRODUCT = `${API_BASE_URL}/products`;
    const STORES = `${API_BASE_URL}/stores`;
    
    useEffect (() => {
        if (!show) return;

        const fetchData = async (url, setDate) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error !`)
                }
                const data = await response.json();
                setDate(date);
            } catch (err) {
                console.error("Fails to set Date", err);
                SpeechSynthesisErrorEvent("Faild");
            }
        };

        const loadAllData =async () => {
            setLoading(true);
            setError(null);

            await Promise.all([
                fetchData(CUSTOMER, setCustomers),
                fetchData(PRODUCT, setProducts),
                fetchData(STORES, setStores)

            ]);

            setLoading(false);
        };

        loadAllData();
    }, [show]);

    //-----

    

}

export default AddSales;

