import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function SubstoreOpening() {
    const [location, setlocation] = useState('');
    const [item, setItem] = useState('');
    const [storeData, setStoreData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [flag, setFlag] = useState(false);

    const getSubstore = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setStoreData(data.data.itemGroups);
    }

    const searchHandler = async (e) => {
        e.preventDefault();
        setFlag(true);
        try {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
            setTableData(data.data.itemGroups);
            setFlag(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error('Insertion failed');
            setFlag(false);
        }
    };

    useEffect(() => {
        getSubstore();
    }, [])

    return (
        <div className=''>
            <div className="p-4">
                <form onSubmit={searchHandler} className='mt-4 mb-4 flex gap-4 items-end'>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="substore">
                            Sub-store/Location
                        </label>
                        <select onChange={(e) => setlocation(e.target.value)} value={location} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>select Sub-store/Location</option>
                            {
                                Array.isArray(storeData) && storeData.length > 0 ? (
                                    storeData.map((item, i) => (
                                        <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                    ))
                                ) : (
                                    <option>No store/location available</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prefix">
                                Item name
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="prefix" type="text" placeholder="Item sub-group name" value={item} onChange={e => setItem(e.target.value)} required />
                        </div>

                    <div className="flex items-center gap-4 justify-end">
                        <button className={` ${flag ? 'btn btn-active' : 'btn btn-neutral'}`} type="submit" disabled={flag}>
                            {flag ? 'wait..' : 'Search'}
                        </button>

                    </div>
                </form>

                <p className='text-xs'>Main info</p>
                <hr />
                <table className="w-full" id='uomtable'>
                    <thead>
                        <tr>
                            <th className='text-start'>DESCR</th>
                            <th className='text-start'>OPQTY</th>
                            <th className='text-start'>RATE</th>
                            <th className='text-start'>UOM</th>
                            <th className='text-start'>CONQTY</th>
                            <th className='text-start'>UPDATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.M_ITEMGROUPID}</td>
                                        <td>{item.GROUPCODE}</td>
                                        <td>{item.GROUPNAME}</td>
                                        <td><button className="btn btn-warning w-full">Update</button></td>
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

export default SubstoreOpening;
