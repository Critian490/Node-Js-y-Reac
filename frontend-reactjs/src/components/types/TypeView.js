import React, { useState, useEffect } from 'react'
import { getType } from '../../services/typeService'
import { CardTypes } from './CardTypes'
import { TypeNew } from './TypeNew'

export const TypeView = () => {

    const [types, setTypes] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const listTypes = async () => {
        try {
            const { data } = await getType();
            console.log(data);
            setTypes(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listTypes();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <section className="container-fluid">
            <article className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
                {
                    types.map((type) => {
                        return <CardTypes key={ type._id } type={ type } />
                    })
                }
            </article>
            {
                openModal ? <TypeNew
                    handleOpenModal={ handleOpenModal }
                    listTypes={ listTypes } /> :
                    (<button className='btn btn-dark fab' onClick={ handleOpenModal }>
                        <i className="fa-solid fa-plus"></i>
                    </button>)
            }
        </section>
    )
}