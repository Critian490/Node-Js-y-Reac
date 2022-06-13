const { Router } = require('express');
const { formValidatorInv } = require('../helpers/formValidator');
const Inventory = require('../models/Inventory');
const router = Router();


router.get('/', async function (req, res) {
    try {
        const inventories = await Inventory.find().populate([
            {
                path: 'user', select: 'name email active'
            },
            {
                path: 'brand', select: 'name active'
            },
            {
                path: 'type', select: 'name active'
            },
            {
                path: 'state', select: 'name active'
            }
        ]);
        res.send(inventories);
    } catch {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar inventarios');
    }
});

router.get('/:inventoryId', async function (req, res) {
    try {
        const inventory = await Inventory.findById(req.params.inventoryId);
        if (!inventory) {
            return res.status(404).send('Inventario no definido');
        }
        res.send(inventory);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar inventarios');
    }
});

router.post('/', async function (req, res) {
    try {
        const validations = formValidatorInv(req);

        if (validations.length > 0) {
            return res.status(400).send(validations);
        }

        console.log('Objeto recibido', req.body);

        const inventorySerialExists = await Inventory.findOne({ serial: req.body.serial });
        if (inventorySerialExists) {
            return res.status(400).send('Ya existe el serial para otro equipo');
        }

        const inventoryModelExists = await Inventory.findOne({ model: req.body.model });
        if (inventoryModelExists) {
            return res.status(400).send('Ya existe el modelo para otro equipo');
        }

        let inventory = new Inventory();
        inventory.serial = req.body.serial;
        inventory.model = req.body.model;
        inventory.description = req.body.description;
        inventory.photo = req.body.photo;
        inventory.colour = req.body.colour;
        inventory.sold_at = req.body.sold_at;
        inventory.price = req.body.price;
        inventory.created_at = new Date();
        inventory.modified_at = new Date();
        inventory.user = req.body.user._id;
        inventory.type = req.body.type._id;
        inventory.state = req.body.state._id;
        inventory.brand = req.body.brand._id;

        inventory = await inventory.save();
        res.send(inventory);

    } catch {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:inventoryId', async function (req, res) {
    try {
        const validations = formValidatorInv(req);

        if (validations.length > 0) {
            return res.status(400).send(validations);
        }

        console.log('Objeto recibido', req.body);

        let inventory = await Inventory.findById(req.params.inventoryId);

        if (!inventory) {
            res.status(400).send('El inventario buscado no existe');
        }

        const inventorySerialExists = await Inventory.findOne({ serial: req.body.serial, _id: { $ne: inventory._id } });
        if (inventorySerialExists) {
            return res.status(400).send('Ya existe el serial para otro equipo');
        }

        const inventoryModelExists = await Inventory.findOne({ model: req.body.model, _id: { $ne: inventory._id } });
        if (inventoryModelExists) {
            return res.status(400).send('Ya existe el modelo para otro equipo');
        }

        inventory.serial = req.body.serial;
        inventory.model = req.body.model;
        inventory.description = req.body.description;
        inventory.photo = req.body.photo;
        inventory.colour = req.body.colour;
        inventory.sold_at = req.body.sold_at;
        inventory.price = req.body.price;
        inventory.modified_at = new Date();
        inventory.user = req.body.user._id;
        inventory.type = req.body.type._id;
        inventory.state = req.body.state._id;
        inventory.brand = req.body.brand._id;

        inventory = await inventory.save();
        res.send(inventory);

    } catch {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;