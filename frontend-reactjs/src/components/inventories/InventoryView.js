import React, { useState, useEffect } from 'react'
import { getInventory } from '../../services/inventoryService'
import { CardInvetories } from './CardInvetories'
import { InventoryNew } from './InventoryNew'

export const InventoryView = () => {

    const [inventories, setInventories] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const listInventories = async () => {
        try {
            const { data } = await getInventory();
            console.log(data);
            setInventories(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listInventories();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <section className="container-fluid">
            <article className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
                {
                    inventories.map((invsee) => {
                        return <CardInvetories key={ invsee._id } invsee={ invsee } />
                    })
                }
            </article>
            {
                openModal ? <InventoryNew
                    handleOpenModal={ handleOpenModal }
                    listInventories={ listInventories } /> :
                    (<button className='btn btn-dark fab' onClick={ handleOpenModal }>
                        <i className="fa-solid fa-plus"></i>
                    </button>)
            }


        </section>
    )
}