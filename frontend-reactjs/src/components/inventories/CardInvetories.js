import React from 'react';
import { Link } from 'react-router-dom';

export const CardInvetories = (props) => {

    const { invsee } = props;

    return (
        <div className="col same">
            <div className="card" >
                <div className='product-image'>
                    <img src={ invsee.photo } className="card-img-top same" alt="..." />
                </div>
                <hr />
                <div className="card-body ">
                    <div className="text-center">
                        <h4 className="card-text">{ invsee.description }</h4>
                        <h6 className="card-title">{ `${invsee.serial} | ${invsee.model}` }</h6>
                        <h5 className="card-text text-success">${ invsee.price }</h5>
                        <hr />
                    </div>
                    <p className="card-text"><strong>Marca: </strong>{ invsee.brand.name }</p>
                    <p className="card-text"><strong>Color: </strong>{ invsee.colour }</p>
                    <p className="card-text"><strong>Estado: </strong>{ invsee.state.name }</p>
                    <p className="card-text"><strong>Propietario: </strong>{ invsee.user.name }</p>
                    <div className='btn-center'>
                        <Link to={ `inventarios/editar/${invsee._id}` } className='btn btn-success'>Editar</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
