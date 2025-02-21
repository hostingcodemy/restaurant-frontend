import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function MinimumStock() {
    const [store, setStore] = useState('');
    const [outlet, setOutlet] = useState('');
    const [type, setType] = useState('');
    const [item, setItem] = useState('');
    const [storeData, setStoreData] = useState([]);
    const [outletData, setoutletData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [flag, setFlag] = useState(false);

    const getStore = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setStoreData(data.data.itemGroups);
    }

    const getOutlet = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setoutletData(data.data.itemGroups);
    }

    const getType = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setTypeData(data.data.itemGroups);
    }

    const getItem = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setItemData(data.data.itemGroups);
    }

    useEffect(() => {
        getStore();
        getOutlet();
        getItem();
        getType();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        setFlag(true);
        try {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/item-uom`, {
                name: name,
                code: code
            });
            if (result.status == 201) {
                toast.error(result.data.message);
            }
            else {
                toast.success(result.data.message);
            }
            handleReset(); // reset form
            setFlag(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error('Insertion failed');
            setFlag(false);
        }
    };

    const handleReset = () => {
        setStore('');
        setOutlet('');
        setType('');
        setItem('');
    };

    return (
        <div className=''>
            <div className="p-4">
                <form onSubmit={submitHandler} className='mt-4 mb-4 flex gap-4 items-end'>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="store">
                            Store
                        </label>
                        <select onChange={(e) => setStore(e.target.value)} value={store} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>select type</option>
                            {
                                Array.isArray(storeData) && storeData.length > 0 ? (
                                    storeData.map((item, i) => (
                                        <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                    ))
                                ) : (
                                    <option>No store available</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="outlet">
                            Outlet
                        </label>
                        <select onChange={(e) => setOutlet(e.target.value)} value={outlet} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>Select outlet</option>
                            {
                                Array.isArray(outletData) && outletData.length > 0 ? (
                                    outletData.map((item, i) => (
                                        <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                    ))
                                ) : (
                                    <option>Nooutlet available</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="type">
                            Type
                        </label>
                        <select onChange={(e) => setType(e.target.value)} value={type} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>Select type</option>
                            {
                                Array.isArray(typeData) && typeData.length > 0 ? (
                                    typeData.map((item, i) => (
                                        <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                    ))
                                ) : (
                                    <option>No type available</option>
                                )
                            }
                        </select>
                    </div>
                </form>
                <hr />

                <form onSubmit={submitHandler} className='mt-4 mb-4 flex gap-4 items-end'>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="item">
                            Item
                        </label>
                        <select onChange={(e) => setItem(e.target.value)} value={item} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>select item</option>
                            {
                                Array.isArray(itemData) && itemData.length > 0 ? (
                                    itemData.map((item, i) => (
                                        <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                    ))
                                ) : (
                                    <option>No item available</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="flex items-center gap-4 justify-end">
                        <button className={` ${flag ? 'btn btn-active' : 'btn btn-neutral'}`} type="submit" disabled={flag}>
                            {flag ? 'wait..' : 'Check'}
                        </button>
                    </div>
                </form>

                <table className="w-full" id='uomtable'>
                    <thead>
                        <tr>
                            <th className='text-start'><input type="checkbox" name="" id="" /> ALL</th>
                            <th className='text-start'>DESCR</th>
                            <th className='text-start'>CLQTY</th>
                            <th className='text-start'>MINSTOCK</th>
                            <th className='text-start'>QTY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemData.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td><input type="checkbox" name="" id="" /></td>
                                        <td>{item.M_ITEMGROUPID}</td>
                                        <td>{item.GROUPCODE}</td>
                                        <td>{item.GROUPNAME}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MinimumStock;
