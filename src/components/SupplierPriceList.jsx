import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function SupplierPriceList() {
    const [sname, setSname] = useState('');
    const [iname, setIname] = useState('');
    const [date, setDate] = useState('2025-01-01');
    const [price, setPrice] = useState('');
    const [flag, setFlag] = useState(false);

    const [supplierData, setSupplierData] = useState([]);
    const [itemData, setItemdata] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const getGroupNames = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setGroup(data.data.itemGroups);
    }

    const getSubGroupNames = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-subgroup`);
        setSubgroup(data.data.message);
    }

    useEffect(() => {
        getGroupNames();
        getSubGroupNames();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        setFlag(true);
        let data = {
            sname: sname,
            iname: iname,
            date: date,
            price: price
        }
        console.log(data);
        try {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/item-subgroup`, data);
            toast.success(result.data.message);
            handleReset(); // reset form
            setFlag(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error('Insertion failed');
            setFlag(false);
        }
    };

    const handleReset = () => {
        setSname('');
        setIname('');
        setDate('2025-01-01');
        setPrice('');
    };

    const searchHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <div className=''>
            <h2 className='text-center text-2xl underline underline-offset-4 p-2 heading'>SUPPLIER PRICE LIST</h2>
            <div className="p-4">
                <p className='text-xs'>Details</p>
                <hr />
                <div className="w-full flex item-center justify-center p-4">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 border border-black shadow-gray-400 shadow-md rounded-xl px-8 pt-6 pb-8 w-full md:w-1/2" onSubmit={submitHandler}>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplier">
                                Supplier name
                            </label>
                            <select onChange={(e) => setSname(e.target.value)} value={sname} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select group name</option>
                                {
                                    Array.isArray(supplierData) && supplierData.length > 0 ? (
                                        supplierData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No groups available</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplier">
                                Item name
                            </label>
                            <select onChange={(e) => setIname(e.target.value)} value={iname} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select group name</option>
                                {
                                    Array.isArray(itemData) && itemData.length > 0 ? (
                                        itemData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No groups available</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                Effective date
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" placeholder="Item group code" value={date} onChange={e => setDate(e.target.value)} required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Item group code" value={price} onChange={e => setPrice(e.target.value)} required />
                        </div>
                        <div className="flex items-center gap-4 justify-end md:col-span-2">
                            <button className="btn btn-outline" type="button" onClick={handleReset}>
                                Cancel
                            </button>
                            <button className={` ${flag ? 'btn btn-active' : 'btn btn-primary'}`} type="submit" disabled={flag}>
                                {flag ? 'wait..' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ======================================= */}
            <div className="p-4">
                <p className='text-xs'>Search</p>
                <hr />
                <form onSubmit={searchHandler} className='my-6 flex gap-4 items-center'>
                    <div className="flex gap-4">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="supplier">
                            Supplier name
                        </label>
                        <select onChange={(e) => setSname(e.target.value)} value={sname} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>select group name</option>
                            {
                                Array.isArray(supplierData) && supplierData.length > 0 ? (
                                    supplierData.map((item, i) => (
                                        <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                    ))
                                ) : (
                                    <option>No groups available</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="supplier">
                            Item name
                        </label>
                        <select onChange={(e) => setIname(e.target.value)} value={iname} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>select group name</option>
                            {
                                Array.isArray(itemData) && itemData.length > 0 ? (
                                    itemData.map((item, i) => (
                                        <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                    ))
                                ) : (
                                    <option>No groups available</option>
                                )
                            }
                        </select>
                    </div>
                    <button className="btn btn-neutral">Search</button>
                </form>
                <table className="w-full" id='uomtable'>
                    <thead>
                        <tr>
                            <th className='text-start'>SUPPLIER NAME</th>
                            <th className='text-start'>ITEM NAME</th>
                            <th className='text-start'>DATE</th>
                            <th className='text-start'>PRICE</th>
                            <th className='text-start'>UPDATE</th>
                            <th className='text-start'>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterData.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.M_ITEMSUBGROUP_ID}</td>
                                        <td>{item.DESCR}</td>
                                        <td>{item.SHORTCODE}</td>
                                        <td>{item.SHORTCODE}</td>
                                        <td><button className="btn btn-warning w-full">Update</button></td>
                                        <td><button className="btn btn-error w-full">Delete</button></td>
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

export default SupplierPriceList;
