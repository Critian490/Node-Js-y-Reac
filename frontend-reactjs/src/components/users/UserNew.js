import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { getUser, postUser } from '../../services/userService';


export const UserNew = ({ handleOpenModal, listUsers }) => {

    const [users, setUsers] = useState([]);
    const [formValues, setFormValues] = useState({})

    const { name = '', email = '', active = '' } = formValues


    const listUser = async () => {
        try {
            const { data } = await getUser();
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listUser();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setFormValues({ ...formValues, [name]: value }); //Spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name, email, active
        }

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            })
            Swal.showLoading();
            const { data } = await postUser(user);
            console.log(data)
            Swal.close();
            handleOpenModal();
            listUsers();
        } catch (error) {
            console.log(error);
            Swal.close();
            let alert;
            if (error && error.response && error.response.data) {
                alert = error.response.data;
            } else {
                alert = 'Ocurrio un error, por favor intente de nuevo'
            }
            Swal.fire('Error', alert, 'error')
        }
    }


    return (
        <div className='sidebar'>
            <div className='container-fluid mt-3 mb-2'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nuevo Usuario</h3>
                            <i className='fa-solid fa-xmark' onClick={ handleOpenModal }></i>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr></hr>
                    </div>
                </div>
                <form onSubmit={ (e) => handleOnSubmit(e) }>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input className="form-control"
                                    required
                                    placeholder='Juan'
                                    type="text"
                                    name='name'
                                    value={ name }
                                    onChange={ (e) => handleOnChange(e) } />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input className="form-control"
                                    placeholder='example@domain.com'
                                    required
                                    type="email"
                                    name='email'
                                    value={ email }
                                    onChange={ (e) => handleOnChange(e) } />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Activo</label>
                                <select className="form-select"
                                    required
                                    name='active'
                                    value={ active }
                                    onChange={ (e) => handleOnChange(e) }>

                                    <option> -- Seleccionar -- </option>
                                    <option>Activo</option>
                                    <option>Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <button className='btn btn-success'>Guardar</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}
