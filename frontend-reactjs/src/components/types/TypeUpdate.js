import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTypebyId, putType } from '../../services/typeService';
import Swal from 'sweetalert2'

export const TypeUpdate = () => {

    const { TypeId = '' } = useParams();

    const [type, setType] = useState({});
    const [formValues, setFormValues] = useState({})

    const { name = '', active = '' } = formValues

    const getType = async () => {
        try {
            const { data } = await getTypebyId(TypeId);
            console.log(data)
            setType(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getType();
    }, [TypeId]);

    useEffect(() => {
        setFormValues({
            name: type.name,
            active: type.active
        });
    }, [type])

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setFormValues({ ...formValues, [name]: value }); //Spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const type = {
            name, active
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            })
            Swal.showLoading();
            const { data } = await putType(TypeId, type);
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
                    <h5 className='card-title'>Dellate del Tipo de Equipo</h5>
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
                                            placeholder='Computo'
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