import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function LocationMaster() {
    const [name, setName] = useState('');
    const [prefix, setPrefix] = useState('');
    const [subgroup, setSubgroup] = useState('');
    const [sales, setSales] = useState('');
    const [account, setAccount] = useState('');
    const [department, setDepartment] = useState('');
    const [store, setStore] = useState('');
    const [remarks, setRemarks] = useState('');
    const [flag, setFlag] = useState(false);
    const [locationName, setLocationName] = useState('');

    const [subgroupData, setSubgroupdata] = useState([])
    const [salesData, setSalesdata] = useState([])
    const [accountData, setAccountdata] = useState([])
    const [departmentData, setDepartmentdata] = useState([])
    const [storeData, setStoredata] = useState([])
    const [locationData, setLocationdata] = useState([])

    const getSubGroupNames = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-subgroup`);
        setSubgroupdata(data.data.message);
    }

    useEffect(() => {
        getSubGroupNames();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        setFlag(true);
        let data = {
            name: name,
            prefix: prefix,
            subgroup: subgroup,
            sales: sales,
            acount: account,
            department: department,
            store: store,
            remarks: remarks
        }
        console.log(data);
        try {
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/location-master`, data);
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
        setPrefix('');
        setSubgroup('');
        setSales('');
        setAccount('');
        setDepartment('');
        setStore('');
        setRemarks('');
    };

    const searchHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <div className=''>
            <h2 className='text-center text-2xl underline underline-offset-4 p-2 heading'>LOCATION MASTER</h2>
            <div className="p-4">
                <p className='text-xs'>Details</p>
                <hr />
                <div className="w-full flex item-center justify-center p-4">
                    <form className="bg-gray-100 border border-black shadow-gray-400 shadow-md rounded-xl px-8 pt-6 pb-8 w-full grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={submitHandler}>
                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Location name
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item sub-group name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prefix">
                                Bill prefix
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="prefix" type="text" placeholder="Item sub-group name" value={prefix} onChange={e => setPrefix(e.target.value)} required />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Item sub-group
                            </label>
                            <select onChange={(e) => setSubgroup(e.target.value)} value={subgroup} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select sub-group name</option>
                                {
                                    Array.isArray(subgroupData) && subgroupData.length > 0 ? (
                                        storeData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No sub-groups available</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Location sales
                            </label>
                            <select onChange={(e) => setSales(e.target.value)} value={sales} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select location sales</option>
                                {
                                    Array.isArray(salesData) && salesData.length > 0 ? (
                                        salesData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No location sales available</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Suspense account
                            </label>
                            <select onChange={(e) => setAccount(e.target.value)} value={account} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select suspense account</option>
                                {
                                    Array.isArray(accountData) && accountData.length > 0 ? (
                                        accountData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No suspense account available</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Department
                            </label>
                            <select onChange={(e) => setDepartment(e.target.value)} value={department} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select department</option>
                                {
                                    Array.isArray(departmentData) && departmentData.length > 0 ? (
                                        departmentData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No department available</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Sub-store
                            </label>
                            <select onChange={(e) => setStore(e.target.value)} value={store} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select Sub-store</option>
                                {
                                    Array.isArray(storeData) && storeData.length > 0 ? (
                                        storeData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No Sub-store available</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
                                Remarks
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="remarks" type="text" placeholder="remarks" value={remarks} onChange={e => setRemarks(e.target.value)} required />
                        </div>

                        <div className="flex items-center gap-4 justify-end md:col-span-3">
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

                <form onSubmit={searchHandler} className='mt-4 mb-4 flex gap-4 items-center'>
                    <p>Location name: </p>
                    <select onChange={(e) => setLocationName(e.target.value)} value={locationName} className="select border border-black select-bordered outline-none" required>
                        <option value="" disabled selected>select location name</option>
                        {
                            Array.isArray(locationData) && locationData.length > 0 ? (
                                locationData.map((item, i) => (
                                    <option value={item.CODE} key={i}>{item.CODE}</option>
                                ))
                            ) : (
                                <option>No location available</option>
                            )
                        }
                    </select>
                    <button className="btn btn-neutral">Search</button>
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
                            locationData.map((item, i) => {
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

export default LocationMaster;
