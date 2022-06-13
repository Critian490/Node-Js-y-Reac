import React, { useState, useEffect } from 'react'
import { getState } from '../../services/stateService'
import { CardStates } from './CardStates'
import { StateNew } from './StateNew'

export const StateView = () => {

    const [states, setStates] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const listStates = async () => {
        try {
            const { data } = await getState();
            console.log(data);
            setStates(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listStates();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <section className="container-fluid">
            <article className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
                {
                    states.map((state) => {
                        return <CardStates key={ state._id } state={ state } />
                    })
                }
            </article>
            {
                openModal ? <StateNew
                    handleOpenModal={ handleOpenModal }
                    listStates={ listStates } /> :
                    (<button className='btn btn-dark fab' onClick={ handleOpenModal }>
                        <i className="fa-solid fa-plus"></i>
                    </button>)
            }
        </section>
    )
}