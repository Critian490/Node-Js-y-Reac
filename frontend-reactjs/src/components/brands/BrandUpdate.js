import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getBrandbyId, putBrand } from '../../services/brandService';

export const BrandUpdate = () => {

    const { BrandId = '' } = useParams();

    const [brand, setBrand] = useState({});
    const [formValues, setFormValues] = useState({})

    const { name = '', active = '' } = formValues

    const getBrand = async () => {
        try {
            const { data } = await getBrandbyId(BrandId);
            console.log(data)
            setBrand(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBrand();
    }, [BrandId]);

    useEffect(() => {
        setFormValues({
            name: brand.name,
            active: brand.active
        });
    }, [brand])

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
            const { data } = await putBrand(BrandId, brand);
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
                    <h5 className='card-title'>Dellate de la Marca</h5>
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
