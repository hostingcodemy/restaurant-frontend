import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function ItemOpening() {
    const [description, setDescription] = useState('');
    const [group, setGroup] = useState('');
    const [groupData, setGroupData] = useState([]);
    const [itemData, setItemData] = useState([]);

    const getGroupNames = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setGroupData(data.data.itemGroups);
    }
    const searchHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/item-group`, {
                name: name,
                code: code
            });
            console.log(result);
            setItemData(result);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    useEffect(() => {
        getGroupNames();
    }, [])

    return (
        <div className=''>
            <div className="p-4">
                <form onSubmit={searchHandler} className='mt-4 mb-4 flex gap-4 items-center'>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="group">
                            Filter group wise
                        </label>
                        <div className="">
                            <select onChange={(e) => setGroup(e.target.value)} value={group} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select group</option>
                                {
                                    Array.isArray(groupData) && groupData.length > 0 ? (
                                        groupData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No group data available</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="location">
                            item description
                        </label>
                        <div className="">
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Item description" value={description} onChange={e => setDescription(e.target.value)} required />
                        </div>
                    </div>
                </form>
                <table className="w-full" id='uomtable'>
                    <thead>
                        <tr>
                            <th className='text-start'>ITEMCODE</th>
                            <th className='text-start'>DESCR</th>
                            <th className='text-start'>UNIT</th>
                            <th className='text-start'>QUANTITY</th>
                            <th className='text-start'>RATE</th>
                            <th className='text-start'>VALUE</th>
                            <th className='text-start'>GROUP-NAME</th>
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

export default ItemOpening;
