import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserbyId, putUser } from '../../services/userService';
import Swal from 'sweetalert2'

export const UserUpdate = () => {

    const { UserId = '' } = useParams();

    const [user, setUser] = useState({});
    const [formValues, setFormValues] = useState({})

    const { name = '', email = '', active = '' } = formValues

    const getUser = async () => {
        try {
            const { data } = await getUserbyId(UserId);
            console.log(data)
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [UserId]);

    useEffect(() => {
        setFormValues({
            name: user.name,
            email: user.email,
            active: user.active
        });
    }, [user])

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
            const { data } = await putUser(UserId, user);
            console.log(data)
            Swal.close();
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
        <section className='container-fluid mt-3 mb-2'>
            <article className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Dellate del usuario</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
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
                            <div className='col'>
                                <button className='btn btn-success'>Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </article>
        </section >
    )
}
