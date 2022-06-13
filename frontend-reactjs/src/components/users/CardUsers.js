import React from 'react';
import { Link } from 'react-router-dom';

export const CardUsers = (props) => {

    const { user } = props;

    return (
        <div className="col same">
            <div className="card" >
                <div className="card-body ">
                    <div className="text-center">
                        <h4 className="card-text">{ user.name }</h4>
                        <h6 className="card-title">{ `${user.email}` }</h6>
                        <h5 className="card-text text-success">{ user.active }</h5>
                        <hr />
                    </div>
                    <div className='btn-center'>
                        <Link to={ `usuarios/editar/${user._id}` } className='btn btn-success'>Editar</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
