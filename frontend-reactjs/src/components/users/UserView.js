import React, { useState, useEffect } from 'react'
import { getUser } from '../../services/userService'
import { CardUsers } from './CardUsers'
import { UserNew } from './UserNew'

export const UserView = () => {

    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const listUsers = async () => {
        try {
            const { data } = await getUser();
            console.log(data);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listUsers();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <section className="container-fluid">
            <article className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
                {
                    users.map((user) => {
                        return <CardUsers key={ user._id } user={ user } />
                    })
                }
            </article>
            {
                openModal ? <UserNew
                    handleOpenModal={ handleOpenModal }
                    listUsers={ listUsers } /> :
                    (<button className='btn btn-dark fab' onClick={ handleOpenModal }>
                        <i className="fa-solid fa-plus"></i>
                    </button>)
            }
        </section>
    )
}