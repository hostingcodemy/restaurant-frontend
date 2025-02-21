import React, { useState, useEffect } from 'react'; // Corrected import
import axios from 'axios';
import toast from 'react-hot-toast';

function TaxMaster() {
    const [name, setName] = useState('');
    const [ledger, setLedger] = useState('');
    const [rate, setRate] = useState('');
    const [type, setType] = useState('');
    const [scode, setScode] = useState('');
    const [exempted, setExempted] = useState('');
    const [inPA, setInpa] = useState('');
    const [fromAmt, setFromamt] = useState('');
    const [toAmt, setToamt] = useState('');
    const [pTax, setPtax] = useState('');
    const [remarks, setRemarks] = useState('');
    const [flag, setFlag] = useState(false);
    const [taxName, setTaxname] = useState('');

    const [ledgerData, setLedgerData] = useState([])
    const [pTaxData, setPtaxData] = useState([])
    const [taxData, setTaxData] = useState([])

    // const getSubGroupNames = async () => {
    //     const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/all-item-subgroup`);
    //     setSubgroupdata(data.data.message);
    // }

    useEffect(() => {
        // getSubGroupNames();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        setFlag(true);
        try {
            const data = {
                name: name,
                ledger: ledger,
                rate: rate,
                type: type,
                scode: scode,
                exempted: exempted,
                inPA: inPA,
                fromAmt: fromAmt,
                toAmt: toAmt,
                pTax: pTax,
                remarks: remarks
            }
            console.log(data);
            const result = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/tax-master`, data);
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
        setLedger('');
        setRate('');
        setType('');
        setScode('');
        setExempted('');
        setInpa('');
        setFromamt('');
        setToamt('');
        setPtax('');
        setRemarks('');
    };

    const searchHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <div className=''>
            <h2 className='text-center text-2xl underline underline-offset-4 p-2 heading'>TAX MASTER</h2>
            <div className="p-4">
                <p className='text-xs'>Details</p>
                <hr className='rounded-2xl' />
                <div className="w-full flex item-center justify-center p-4">
                    <form className="bg-gray-100 border border-black shadow-gray-400 shadow-md rounded-xl px-8 pt-6 pb-8 w-full grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={submitHandler}>
                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Tax name
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Tax name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ledger">
                                Ledger
                            </label>
                            <select onChange={(e) => setLedger(e.target.value)} value={ledger} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select ledger</option>
                                {
                                    Array.isArray(ledgerData) && ledgerData.length > 0 ? (
                                        ledgerData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No ledger available</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
                                Rate
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rate" type="number" placeholder="Rate" value={rate} onChange={e => setRate(e.target.value)} required />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                Type
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type" type="text" placeholder="Type" value={type} onChange={e => setType(e.target.value)} required />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scode">
                                S-code
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="scode" type="text" placeholder="S-code" value={scode} onChange={e => setScode(e.target.value)} required />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exmp">
                                Exempted
                            </label>
                            <select onChange={(e) => setExempted(e.target.value)} value={exempted} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select exempted</option>
                                <option value="yes">Yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="method">
                                In % or Amount
                            </label>
                            <select onChange={(e) => setInpa(e.target.value)} value={inPA} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select method</option>
                                <option value="percentage">Percentage</option>
                                <option value="amount">Amount</option>
                            </select>
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromamt">
                                From amount
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fromamt" type="number" placeholder="From amount" value={fromAmt} onChange={e => setFromamt(e.target.value)} required />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toamt">
                                To amount
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="toamt" type="number" placeholder="To amount" value={toAmt} onChange={e => setToamt(e.target.value)} required />
                        </div>

                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ledger">
                                Parent tax
                            </label>
                            <select onChange={(e) => setPtax(e.target.value)} value={pTax} className="select w-full border border-black select-bordered outline-none" required>
                                <option value="" disabled selected>select parent tax</option>
                                {
                                    Array.isArray(pTaxData) && pTaxData.length > 0 ? (
                                        pTaxData.map((item, i) => (
                                            <option value={item.M_ITEMGROUPID} key={i}>{item.GROUPNAME}</option>
                                        ))
                                    ) : (
                                        <option>No parent tax available</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
                                Remarks
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="remarks" type="text" placeholder="Remarks" value={remarks} onChange={e => setRemarks(e.target.value)} required />
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
                    <p>Tax name: </p>
                    <select onChange={(e) => setTaxname(e.target.value)} value={taxName} className="select border border-black select-bordered outline-none" required>
                        <option value="" disabled selected>select tax name</option>
                        {
                            Array.isArray(taxData) && taxData.length > 0 ? (
                                taxData.map((item, i) => (
                                    <option value={item.CODE} key={i}>{item.CODE}</option>
                                ))
                            ) : (
                                <option>No tax name available</option>
                            )
                        }
                    </select>
                    <button className="btn btn-neutral">Search</button>
                </form>
                <table className="w-full" id='uomtable'>
                    <thead>
                        <tr>
                            <th className='text-start'>TAX NAME</th>
                            <th className='text-start'>RATE</th>
                            <th className='text-start'>TYPE</th>
                            <th className='text-start'>LEDGER</th>
                            <th className='text-start'>SHORT NAME</th>
                            <th className='text-start'>EXEMPTED</th>
                            <th className='text-start'>IN % OR AMT</th>
                            <th className='text-start'>UPDATE</th>
                            <th className='text-start'>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taxData.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.M_ITEMSUBGROUP_ID}</td>
                                        <td>{item.DESCR}</td>
                                        <td>{item.SHORTCODE}</td>
                                        <td>{item.SHORTCODE}</td>
                                        <td>{item.SHORTCODE}</td>
                                        <td>{item.SHORTCODE}</td>
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

export default TaxMaster;
