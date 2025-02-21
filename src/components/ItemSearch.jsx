import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function ItemSearch() {
    const [type, setType] = useState('');
    const [item, setItem] = useState('');
    const [location, setlocation] = useState('');
    const [typeData, setTypeData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [flag, setFlag] = useState(false);

    const getType = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setTypeData(data.data.itemGroups);
    }

    const getItem = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setItemData(data.data.itemGroups);
    }

    const getLocation = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setLocationData(data.data.itemGroups);
    }

    useEffect(() => {
        getItem();
        getType();
        getLocation();
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
        setType('');
        setItem('');
        setlocation('');
    };

    return (
        <div className=''>
            <div className="p-4">
                <p className='text-xs'>Search</p>
                <hr />
                <form onSubmit={submitHandler} className='mt-4 mb-4 flex gap-4 items-end'>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="type">
                            Item type
                        </label>
                        <select onChange={(e) => setType(e.target.value)} value={type} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>select type</option>
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

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="location">
                            Location
                        </label>
                        <select onChange={(e) => setlocation(e.target.value)} value={location} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>select location</option>
                            {
                                Array.isArray(locationData) && locationData.length > 0 ? (
                                    locationData.map((item, i) => (
                                        <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                    ))
                                ) : (
                                    <option>No location available</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="flex items-center gap-4 justify-end">
                        <button className={` ${flag ? 'btn btn-active' : 'btn btn-neutral'}`} type="submit" disabled={flag}>
                            {flag ? 'wait..' : 'Search'}
                        </button>
                        <button className="btn btn-outline" type="button" onClick={handleReset}>
                            Cancel
                        </button>

                    </div>
                </form>

                <p className='text-xs'>Main info</p>
                <hr />
                <table className="w-full" id='uomtable'>
                    <thead>
                        <tr>
                            <th className='text-start'>ITEMCD</th>
                            <th className='text-start'>ITEMNAME</th>
                            <th className='text-start'>ITEMTYPE</th>
                            <th className='text-start'>UPDATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemData.map((item, i) => {
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

export default ItemSearch;
