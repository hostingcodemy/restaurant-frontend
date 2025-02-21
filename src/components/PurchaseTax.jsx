import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function PurchaseTax() {
    const [groupName, setGroupName] = useState('');
    const [item, setItem] = useState('');
    const [groupData, setGroupData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [flag, setFlag] = useState(false);

    const getGroupdata = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setGroupData(data.data.itemGroups);
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
        getGroupdata();
    }, [])

    return (
        <div className=''>
            <h2 className='text-center text-2xl underline underline-offset-4 p-2 heading'>LOCATION MASTER</h2>
            <div className="p-4">
                <form onSubmit={searchHandler} className='mt-4 mb-4 flex gap-4 items-end'>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="groupname">
                            Group name
                        </label>
                        <select onChange={(e) => setGroupName(e.target.value)} value={groupName} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>select group name</option>
                            {
                                Array.isArray(groupData) && groupData.length > 0 ? (
                                    groupData.map((item, i) => (
                                        <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                    ))
                                ) : (
                                    <option>No group name available</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item">
                            Item
                        </label>
                        <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="item" type="text" placeholder="Item sub-group name" value={item} onChange={e => setItem(e.target.value)} required />
                    </div>

                    <div className="flex items-center gap-4 justify-end">
                        <button className={` ${flag ? 'btn btn-active' : 'btn btn-neutral'}`} type="submit" disabled={flag}>
                            {flag ? 'wait..' : 'Find'}
                        </button>

                    </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <table className="w-full border">
                        <thead>
                            <tr><th className='text-start'><input type="checkbox" name="" id="" /> All</th></tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className='text-center border'><input type="checkbox" name="" id="" /></th>
                                <th className='text-start border'>DESCR</th>
                                <th className='text-start border'>RATE</th>
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
                <div className="flex items-center gap-4 justify-center p-4">
                    <button className="btn btn-outline" type="button">
                        Cancel
                    </button>
                    <button className={` ${flag ? 'btn btn-active' : 'btn btn-primary'}`} type="submit" disabled={flag}>
                        {flag ? 'wait..' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PurchaseTax;
