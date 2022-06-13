import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStatebyId, putState } from '../../services/stateService';
import Swal from 'sweetalert2'

export const StateUpdate = () => {

    const { StateId = '' } = useParams();

    const [state, setState] = useState({});
    const [formValues, setFormValues] = useState({})

    const { name = '', active = '' } = formValues

    const getState = async () => {
        try {
            const { data } = await getStatebyId(StateId);
            console.log(data)
            setState(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getState();
    }, [StateId]);

    useEffect(() => {
        setFormValues({
            name: state.name,
            active: state.active
        });
    }, [state])

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setFormValues({ ...formValues, [name]: value }); //Spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const state = {
            name, active
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            })
            Swal.showLoading();
            const { data } = await putState(StateId, state);
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

                Swal.fire('Error', alert, 'error')
            }
        }


        return (
            <section className='container-fluid mt-3 mb-2'>
                <article className='card'>
                    <div className='card-header'>
                        <h5 className='card-title'>Dellate del Estado</h5>
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
                                                placeholder='Nuevo'
                                                type="text"
                                                name='name'
                                                value={ name }
                                                onChange={ (e) => handleOnChange(e) } />
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
}