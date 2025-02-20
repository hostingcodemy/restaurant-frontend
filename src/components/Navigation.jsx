import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import Itemgroup from './Itemgroup';
import Itemsubgroup from './Itemsubgroup';
import ItemUOM from './ItemUOM';
import LocationMaster from './LocationMaster';
import TaxMaster from './TaxMaster';
import SupplierPriceList from './SupplierPriceList';
import ItemOpening from './ItemOpening';
import ItemSearch from './ItemSearch';
import MinimumStock from './MinimumStock';
import SubstoreOpening from './SubstoreOpening.jsx';
import PurchaseTax from './PurchaseTax.jsx';
import Indent from './Indent.jsx';


function Navigation() {
    const [flag, setFlag] = useState('group');
    return (
        <>
            <div className="md:hidden flex bg-black justify-end px-8 py-2 shadow-xl">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">MENU</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-gray-100 rounded z-1 w-52 p-2 shadow-sm">
                        <li onClick={e => setFlag('group')} className={`${flag === 'group' ? 'bg-black text-white rounded' : null}`}><a>Item group</a></li>
                        <li onClick={e => setFlag('subgroup')} className={`${flag === 'subgroup' ? 'bg-black text-white rounded' : null}`}><a>Item sub-group</a></li>
                        <li onClick={e => setFlag('uom')} className={`${flag === 'uom' ? 'bg-black text-white rounded' : null}`}><a>Item UOM</a></li>
                        <li onClick={e => setFlag('location')} className={`${flag === 'location' ? 'bg-black text-white rounded' : null}`}><a>Location Master</a></li>
                        <li onClick={e => setFlag('tax')} className={`${flag === 'tax' ? 'bg-black text-white rounded' : null}`}><a>Tax Master</a></li>
                        <li onClick={e => setFlag('supplier')} className={`${flag === 'supplier' ? 'bg-black text-white rounded' : null}`}><a>Supplier Price List</a></li>
                        <li onClick={e => setFlag('opening')} className={`${flag === 'opening' ? 'bg-black text-white rounded' : null}`}><a>item Opening</a></li>
                        <li onClick={e => setFlag('search')} className={`${flag === 'search' ? 'bg-black text-white rounded' : null}`}><a>item Search</a></li>
                        <li onClick={e => setFlag('stock')} className={`${flag === 'stock' ? 'bg-black text-white rounded' : null}`}><a>Minimum stock item</a></li>
                        <li onClick={e => setFlag('ptax')} className={`${flag === 'ptax' ? 'bg-black text-white rounded' : null}`}><a>Setup purchase tax</a></li>
                        <li onClick={e => setFlag('indent')} className={`${flag === 'indent' ? 'bg-black text-white rounded' : null}`}><a>Indent</a></li>
                    </ul>
                </div>
            </div>

            <div className="grid md:grid-cols-4">
                <div className="hidden md:block p-4 h-screen border-r border-gray-300">
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">Master</div>
                        <div className="collapse-content text-sm">
                            <p onClick={e => setFlag('group')} className={`${flag === 'group' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>Item group</a></p>
                            <p onClick={e => setFlag('subgroup')} className={`${flag === 'subgroup' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>Item sub-group</a></p>
                            <p onClick={e => setFlag('uom')} className={`${flag === 'uom' ? 'bg-black text-white rounded' : null}`}><a>Item UOM</a></p>
                            <p onClick={e => setFlag('location')} className={`${flag === 'location' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>Location Master</a></p>
                            <p onClick={e => setFlag('tax')} className={`${flag === 'tax' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>Tax Master</a></p>
                            <p onClick={e => setFlag('supplier')} className={`${flag === 'supplier' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>Supplier Price List</a></p>
                            <p onClick={e => setFlag('opening')} className={`${flag === 'opening' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>item Opening</a></p>
                            <p onClick={e => setFlag('search')} className={`${flag === 'search' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>item Search</a></p>
                            <p onClick={e => setFlag('stock')} className={`${flag === 'stock' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>Minimum stock item</a></p>
                            <p onClick={e => setFlag('ptax')} className={`${flag === 'ptax' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>Setup purchase tax</a></p>
                            <p onClick={e => setFlag('indent')} className={`${flag === 'indent' ? 'bg-black text-white rounded' : null} p-1 cursor-pointer`}><a>Requisition/Indent</a></p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">test</div>
                        <div className="collapse-content text-sm">test content</div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold">test</div>
                        <div className="collapse-content text-sm">test content</div>
                    </div>
                </div>

                <div className="md:col-span-3 col-span-1">
                    {
                        flag === 'group' && <Itemgroup />
                    }
                    {
                        flag === 'subgroup' && <Itemsubgroup />
                    }
                    {
                        flag === 'uom' && <ItemUOM />
                    }
                    {
                        flag === 'location' && <LocationMaster />
                    }
                    {
                        flag === 'tax' && <TaxMaster />
                    }
                    {
                        flag === 'supplier' && <SupplierPriceList />
                    }
                    {
                        flag === 'opening' && <ItemOpening />
                    }
                    {
                        flag === 'search' && <ItemSearch />
                    }
                    {
                        flag === 'stock' && <MinimumStock />
                    }
                    {
                        flag === 'sopening' && <SubstoreOpening />
                    }
                    {
                        flag === 'ptax' && <PurchaseTax />
                    }
                    {
                        flag === 'indent' && <Indent />
                    }
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Navigation
