import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function Itemsubgroup() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [groupid, setGroupid] = useState('');
    const [accode, setAccode] = useState('');
    const [flag, setFlag] = useState(false);
    const [group, setGroup] = useState({});
    const [subgroup, setSubgroup] = useState([]);
    const [subgroupname,setSubgroupname] = useState('')

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
        try {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/item-subgroup`, {
                name: name,
                code: code,
                groupid:groupid,
                accode: accode
            });
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
        setName('');
        setCode('');
        setAccode('');
        setGroupid('');
    };

    const searchHandler = async (e) =>{
        e.preventDefault();
    }

    return (
        <div className='p-5'>
            <div className="">
                <p className=''>Item Details</p>
                <hr />
                <div className="w-full flex item-center justify-center p-4">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 border border-black shadow-gray-400 shadow-md rounded-xl px-8 pt-6 pb-8 w-full md:w-1/2" onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Sub-group name
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item sub-group name" value={name} onChange={e => setName(e.target.value)} required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Sub-group code
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="code" type="text" placeholder="Item sub-group code" value={code} onChange={e => setCode(e.target.value)} required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Item group name
                            </label>
                            <select onChange={(e) => setGroupid(e.target.value)} value={groupid} className="select w-full border border-black select-bordered outline-none" required>
                            <option value="" disabled selected>select group name</option>
                                {
                                    Array.isArray(group) && group.length > 0 ? (
                                        group.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No groups available</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Account code
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="code" type="text" placeholder="Item group code" value={accode} onChange={e => setAccode(e.target.value)} required/>
                        </div>
                        <div className="flex items-center gap-4 justify-end md:col-span-2">
                            <button className="btn btn-error" type="button" onClick={handleReset}>
                                Cancel
                            </button>
                            <button className={` ${flag ? 'bg-gray-200 text-black' : 'btn btn-primary'}`} type="submit" disabled={flag}>
                                {flag?'wait..':'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ======================================= */}
            <div className="">
                <p>Search</p>
                <hr />

                <form onSubmit={searchHandler} className='mt-4 mb-4 flex gap-4 items-center'>
                    <p>Unit name: </p>
                    <select onChange={(e) => setSubgroupname(e.target.value)} value={subgroupname} className="select border border-black select-bordered outline-none" required>
                    <option value="" disabled selected>select subgroup name</option>
                        {
                            Array.isArray(subgroup) && subgroup.length > 0 ? (
                                subgroup.map((item, i) => (
                                    <option value={item.CODE} key={i}>{item.CODE}</option>
                                ))
                            ) : (
                                <option>No unit available</option>
                            )
                        }
                    </select>
                    <button className="btn btn-outline btn-info">Search</button>
                </form>
                <table className="w-full" id='uomtable'>
                    <thead>
                        <tr>
                            <th className='text-start'>M_ITEMSUBGROUP_ID</th>
                            <th className='text-start'>DESCR</th>
                            <th className='text-start'>SHORTCODE</th>
                            <th className='text-start'>UPDATE</th>
                            <th className='text-start'>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subgroup.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.M_ITEMSUBGROUP_ID}</td>
                                        <td>{item.DESCR}</td>
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

export default Itemsubgroup;
