import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function ItemUOM() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [flag, setFlag] = useState(false);
    const [uom, setUom] = useState([]);
    const [unitname, setUnitname] = useState("");

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
        setName('');
        setCode('');
    };

    const getUOM = async () => {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-uom`);
        setUom(data.data.data);
    }

    const searchHandler = async (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        getUOM();
    }, [])

    return (
        <div className=''>
            <h2 className='text-center text-2xl bg-gray-200 p-2'>ITEM UOM</h2>
            <div className="p-4">
                <p className=''>Item Details</p>
                <hr />
                <div className="w-full flex item-center justify-center p-4">
                    <form className="bg-gray-100 border border-black shadow-gray-400 shadow-md rounded-xl px-8 pt-6 pb-8 w-full md:w-1/2" onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Unit name
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item group name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                Unit short code
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="code" type="text" placeholder="Item group code" value={code} onChange={e => setCode(e.target.value)} required />
                        </div>
                        <div className="flex items-center gap-4 justify-end">
                            <button className="btn btn-error" type="button" onClick={handleReset}>
                                Cancel
                            </button>
                            <button className={` ${flag ? 'btn btn-active' : 'btn btn-primary'}`} type="submit" disabled={flag}>
                                {flag ? 'wait..' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ======================================= */}
            <div className="p-4">
                <p>Search</p>
                <hr />
                <form onSubmit={searchHandler} className='mt-4 mb-4 flex gap-4 items-center'>
                    <p>Unit name: </p>
                    <select onChange={(e) => setUnitname(e.target.value)} value={unitname} className="select border border-black select-bordered outline-none" required>
                        <option value="" disabled selected>select unit name</option>
                        {
                            Array.isArray(uom) && uom.length > 0 ? (
                                uom.map((item, i) => (
                                    <option value={item.DESCR} key={i}>{item.DESCR}</option>
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
                            <th className='text-start'>CODE</th>
                            <th className='text-start'>DESCR</th>
                            <th className='text-start'>SHORTCODE</th>
                            <th className='text-start'>UPDATE</th>
                            <th className='text-start'>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            uom.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.CODE}</td>
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

export default ItemUOM;

