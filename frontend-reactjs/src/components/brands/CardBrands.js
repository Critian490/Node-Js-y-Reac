import React from 'react';
import { Link } from 'react-router-dom';

export const CardBrands = (props) => {

    const { brand } = props;

    return (
        <div className="col same">
            <div className="card" >
                <div className="card-body ">
                    <div className="text-center">
                        <h4 className="card-text">{ brand.name }</h4>
                        <h5 className="card-text text-success">{ brand.active }</h5>
                        <hr />
                    </div>
                    <div className='btn-center'>
                        <Link to={ `marcas/editar/${brand._id}` } className='btn btn-success'>Editar</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
