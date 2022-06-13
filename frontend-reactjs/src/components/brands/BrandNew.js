import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { getBrand, postBrand } from '../../services/brandService';


export const BrandNew = ({ handleOpenModal, listBrands }) => {

    const [brands, setBrands] = useState([]);
    const [formValues, setFormValues] = useState({})

    const { name = '', active = '' } = formValues


    const listBrand = async () => {
        try {
            const { data } = await getBrand();
            setBrands(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listBrand();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setFormValues({ ...formValues, [name]: value }); //Spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const brand = {
            name, active
        }

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            })
            Swal.showLoading();
            const { data } = await postBrand(brand);
            console.log(data)
            Swal.close();
            handleOpenModal();
            listBrands();
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
                            <h3>Nueva Marca</h3>
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
                                    placeholder='Nuevo'
                                    type="text"
                                    name='name'
                                    value={ name }
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
