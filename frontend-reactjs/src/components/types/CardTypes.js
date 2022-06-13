import React from 'react';
import { Link } from 'react-router-dom';

export const CardTypes = (props) => {

    const { type } = props;

    return (
        <div className="col same">
            <div className="card" >
                <div className="card-body ">
                    <div className="text-center">
                        <h4 className="card-text">{ type.name }</h4>
                        <h5 className="card-text text-success">{ type.active }</h5>
                        <hr />
                    </div>
                    <div className='btn-center'>
                        <Link to={ `tipos/editar/${type._id}` } className='btn btn-success'>Editar</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
