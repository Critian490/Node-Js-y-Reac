import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { getUser } from '../../services/userService';
import { getType } from '../../services/typeService';
import { getState } from '../../services/stateService';
import { getBrand } from '../../services/brandService';
import { postInventory } from '../../services/inventoryService';


export const InventoryNew = ({ handleOpenModal, listInventories }) => {

    const [users, setUsers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [states, setStates] = useState([]);
    const [types, setTypes] = useState([]);
    const [formValues, setFormValues] = useState({})

    const { serial = '', model = '', description = '', photo = '', colour = '', sold_at = '',
        price = '', user = '', type = '', state = '', brand = '' } = formValues


    const listUsers = async () => {
        try {
            const { data } = await getUser();
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listUsers();
    }, []);


    const listBrands = async () => {
        try {
            const { data } = await getBrand();
            setBrands(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listBrands();
    }, []);


    const listStates = async () => {
        try {
            const { data } = await getState();
            setStates(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listStates();
    }, []);


    const listTypes = async () => {
        try {
            const { data } = await getType();
            setTypes(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listTypes();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setFormValues({ ...formValues, [name]: value }); //Spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventory = {
            serial, model, description, photo, colour, sold_at, price,
            user: {
                _id: user
            },
            type: {
                _id: type
            },
            state: {
                _id: state
            },
            brand: {
                _id: brand
            }

        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            })
            Swal.showLoading();
            const { data } = await postInventory(inventory);
            console.log(data)
            Swal.close();
            handleOpenModal();
            listInventories();
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
                            <h3>Nuevo Inventario</h3>
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
                                <label className="form-label">Descripción</label>
                                <input className="form-control"
                                    required
                                    placeholder='TV de 50 pulgadas'
                                    type="text"
                                    name='description'
                                    value={ description }
                                    onChange={ (e) => handleOnChange(e) } />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input className="form-control"
                                    placeholder='50″TVSmsg'
                                    required
                                    type="text"
                                    name='serial'
                                    value={ serial }
                                    onChange={ (e) => handleOnChange(e) } />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Modelo</label>
                                <input className="form-control"
                                    placeholder='v9000Smart'
                                    required
                                    type="text"
                                    name='model'
                                    value={ model }
                                    onChange={ (e) => handleOnChange(e) } />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input className="form-control"
                                    placeholder='1950000'
                                    required
                                    type="number"
                                    name='price'
                                    value={ price }
                                    onChange={ (e) => handleOnChange(e) } />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Imagen URL</label>
                                <input className="form-control"
                                    placeholder='https://img.png/'
                                    required
                                    type="url"
                                    name='photo'
                                    value={ photo }
                                    onChange={ (e) => handleOnChange(e) } />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Color</label>
                                <input className="form-control"
                                    placeholder='Blanco'
                                    required
                                    type="text"
                                    name='colour'
                                    value={ colour }
                                    onChange={ (e) => handleOnChange(e) } />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Marca</label>
                                <select className="form-select"
                                    required
                                    name='brand'
                                    value={ brand }
                                    onChange={ (e) => handleOnChange(e) }>

                                    <option> -- Seleccionar -- </option>
                                    {

                                        brands.map(({ _id, name }) => {
                                            return <option key={ _id } value={ _id }>{ name }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Fecha de compra</label>
                                <input className="form-control"
                                    required
                                    type="date"
                                    name='sold_at'
                                    value={ sold_at }
                                    onChange={ (e) => handleOnChange(e) } />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <select className="form-select"
                                    required
                                    name='user'
                                    value={ user }
                                    onChange={ (e) => handleOnChange(e) }>

                                    <option> -- Seleccionar -- </option>
                                    {
                                        users.map(({ _id, name }) => {
                                            return <option
                                                key={ _id } value={ _id }> { name } </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Tipo de Equipo</label>
                                <select className="form-select"
                                    required
                                    name='type'
                                    value={ type }
                                    onChange={ (e) => handleOnChange(e) }>

                                    <option> -- Seleccionar -- </option>
                                    {
                                        types.map(({ _id, name }) => {
                                            return <option key={ _id } value={ _id }>{ name }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Estado de equipo</label>
                                <select className="form-select"
                                    required
                                    name='state'
                                    value={ state }
                                    onChange={ (e) => handleOnChange(e) }>

                                    <option> -- Seleccionar -- </option>
                                    {
                                        states.map(({ _id, name }) => {
                                            return <option key={ _id } value={ _id }>{ name }</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
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
