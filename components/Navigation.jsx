import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import Itemgroup from './Itemgroup';
import Itemsubgroup from './Itemsubgroup';
import ItemUOM from './ItemUOM';
import LocationMaster from './LocationMaster';
import TaxMaster from './TaxMaster';


function Navigation() {
    const [flag, setFlag] = useState('group');
    return (
        <>
            <div className="flex bg-black justify-end px-8 py-2 shadow-xl">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">MENU</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-gray-100 rounded z-1 w-52 p-2 shadow-sm">
                        <li onClick={e => setFlag('group')} className={`${flag === 'group' ? 'bg-black text-white rounded' : null}`}><a>Item group</a></li>
                        <li onClick={e => setFlag('subgroup')} className={`${flag === 'subgroup' ? 'bg-black text-white rounded' : null}`}><a>Item sub-group</a></li>
                        <li onClick={e => setFlag('uom')} className={`${flag === 'uom' ? 'bg-black text-white rounded' : null}`}><a>Item UOM</a></li>
                        <li onClick={e => setFlag('location')} className={`${flag === 'location' ? 'bg-black text-white rounded' : null}`}><a>Location Master</a></li>
                        <li onClick={e => setFlag('tax')} className={`${flag === 'tax' ? 'bg-black text-white rounded' : null}`}><a>Tax Master</a></li>
                    </ul>
                </div>
            </div>
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

            <Toaster />
        </>
    )
}

export default Navigation
