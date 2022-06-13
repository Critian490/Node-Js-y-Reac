const { Router } = require('express');
const { formValidatorBST } = require('../helpers/formValidator');
const Brand = require('../models/Brand');
const router = Router();


router.get('/', async function (req, res) {
    try {
        const brand = await Brand.find();
        res.send(brand);
    } catch {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/:brandId', async function (req, res) {
    try {
        const brand = await Brand.findById(req.params.brandId);
        if (!brand) {
            return res.status(404).send('La marca no existe');
        }
        res.send(brand);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar la marca');
    }
});

router.post('/', async function (req, res) {
    try {
        const validations = formValidatorBST(req);

        if (validations.length > 0) {
            return res.status(400).send(validations);
        }

        console.log('Objeto recibido', req.body);
        let brand = new Brand();
        brand.name = req.body.name;
        brand.active = req.body.active;
        brand.created_at = new Date();
        brand.modified_at = new Date();

        brand = await brand.save();
        res.send(brand);

    } catch {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:brandId', async function (req, res) {
    try {
        const validations = formValidatorBST(req);

        if (validations.length > 0) {
            return res.status(400).send(validations);
        }

        console.log('Objeto recibido', req.body);

        let brand = await Brand.findById(req.params.brandId);

        if (!brand) {
            res.status(400).send('Ocurrió un error');
        }

        brand.name = req.body.name;
        brand.active = req.body.active;
        brand.modified_at = new Date();

        brand = await brand.save();
        res.send(brand);

    } catch {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;