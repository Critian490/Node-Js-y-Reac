// Validador de formulario POST para Inventory
const formValidatorInv = (req) => {
    const validationsInv = [];

    if(!req.body.serial){
        validationsInv.push('Serial es requerido');
    }

    if(!req.body.model){
        validationsInv.push('Modelo es requerido');
    }

    if(!req.body.description){
        validationsInv.push('Descripción es requerida');
    }

    if(!req.body.photo){
        validationsInv.push('Foto es requerida');
    }

    if(!req.body.colour){
        validationsInv.push('Color es requerido');
    }

    if(!req.body.sold_at){
        validationsInv.push('Fecha de venta es requerida');
    }

    if(!req.body.price){
        validationsInv.push('Precio es requerido');
    }

    if(!req.body.user){
        validationsInv.push('Usuario es requerido');
    }

    if(!req.body.type){
        validationsInv.push('Estado es requerido es requerido');
    }

    if(!req.body.state){
        validationsInv.push('Estado del equipo es requerido');
    }

    if(!req.body.brand){
        validationsInv.push('Marca del equipo es requerida');
    }

    return validationsInv;
}


// Validador de formulario POST para Brand, State y Type
const formValidatorBST = (req) => {
    const validationsBST = [];

    if(!req.body.name){
        validationsBST.push('Nombre es requerido');
    }

    if(!req.body.active){
        validationsBST.push('Estado es requerido');
    }

    return validationsBST;
}


// Validador de formulario POST para User
const formValidatorUser = (req) => {
    const validationsUser = [];

    if(!req.body.name){
        validationsUser.push('Nombre es requerido');
    }

    if(!req.body.email){
        validationsUser.push('Email es requerido');
    }

    if(!req.body.active){
        validationsUser.push('Estado es requerido');
    }

    return validationsUser;
}

module.exports = {
    formValidatorInv,
    formValidatorBST,
    formValidatorUser,
}