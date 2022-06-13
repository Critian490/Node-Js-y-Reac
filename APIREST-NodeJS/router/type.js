const { Router } = require('express');
const { formValidatorBST } = require('../helpers/formValidator');
const Type = require('../models/Type');
const router = Router();


router.get('/', async function (req, res) {
    try {
        const type = await Type.find();
        res.send(type);
    } catch {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/:typeId', async function (req, res) {
    try {
        const type = await Type.findById(req.params.typeId);
        if (!type) {
            return res.status(404).send('El tipo de equipo no existente');
        }
        res.send(type);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar el tipo de equipo');
    }
});

router.post('/', async function (req, res) {
    try {
        const validations = formValidatorBST(req);

        if (validations.length > 0) {
            return res.status(400).send(validations);
        }

        console.log('Objeto recibido', req.body);
        let type = new Type();
        type.name = req.body.name;
        type.active = req.body.active;
        type.created_at = new Date();
        type.modified_at = new Date();

        type = await type.save();
        res.send(type);

    } catch {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:typeId', async function (req, res) {
    try {

        const validations = formValidatorBST(req);

        if (validations.length > 0) {
            return res.status(400).send(validations);
        }
        console.log('Objeto recibido', req.body);

        let type = await Type.findById(req.params.typeId);

        if (!type) {
            return res.status(400).send('Ese tipo de producto no existe');
        }

        type.name = req.body.name;
        type.active = req.body.active;
        type.modified_at = new Date();

        type = await type.save();
        res.send(type);

    } catch {
        console.log(error)
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;