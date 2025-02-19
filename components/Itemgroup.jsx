import React, { useState,useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function Itemgroup() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [flag, setFlag] = useState(false);
    const [group, setGroup] = useState([]);
    const [groupname, setGroupname] = useState("");

    const getGroupNames = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-group`);
        setGroup(data.data.itemGroups);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        setFlag(true);
        try {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/item-group`, {
                name: name,
                code: code
            });
            console.log(result);
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
    };

    useEffect(()=>{
        getGroupNames();
    },[])

    const searchHandler = async (e) =>{
        e.preventDefault();
    }


    return (
        <div className='p-5'>
            <div className="">
            <p className=''>Item Details</p>
                <hr/>
                <div className="w-full flex item-center justify-center p-4">
                    <form className="bg-gray-100 border border-black shadow-gray-400 shadow-md rounded-xl px-8 pt-6 pb-8 w-full md:w-1/2" onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Item group name
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item group name" value={name} onChange={e => setName(e.target.value)} required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Item group code
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="code" type="text" placeholder="Item group code" value={code} onChange={e => setCode(e.target.value)} required/>
                        </div>
                        <div className="flex items-center gap-4 justify-end">
                            <button className="btn btn-error" type="button" onClick={handleReset}>
                                Cancel
                            </button>
                            <button className={` ${flag ? 'btn btn-active' : 'btn btn-primary'}`} type="submit" disabled={flag}>
                                {flag?'wait..':'Save'}
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
                    <select onChange={(e) => setGroupname(e.target.value)} value={groupname} className="select border border-black select-bordered outline-none" required>
                    <option value="" disabled selected>select group name</option>
                        {
                            Array.isArray(group) && group.length > 0 ? (
                                group.map((item, i) => (
                                    <option value={item.GROUPNAME} key={i}>{item.GROUPNAME}</option>
                                ))
                            ) : (
                                <option>No group available</option>
                            )
                        }
                    </select>
                    <button className="btn btn-outline btn-info">Search</button>
                </form>
                <table className="w-full" id='uomtable'>
                    <thead>
                        <tr>
                            <th className='text-start'>M_ITEMGROUP_ID</th>
                            <th className='text-start'>GROUPCODE</th>
                            <th className='text-start'>GROUPNAME</th>
                            <th className='text-start'>UPDATE</th>
                            <th className='text-start'>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            group.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.M_ITEMGROUPID}</td>
                                        <td>{item.GROUPCODE}</td>
                                        <td>{item.GROUPNAME}</td>
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

export default Itemgroup;
