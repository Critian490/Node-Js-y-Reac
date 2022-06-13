const { Router } = require('express');
const { formValidatorUser } = require('../helpers/formValidator');
const User = require('../models/User');
const router = Router();


router.get('/', async function (req, res) {
    try {
        const user = await User.find();
        res.send(user);
    } catch {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar usuarios');
    }
});

router.get('/:userId', async function (req, res) {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('Usuario no existente');
        }
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar usuarios');
    }
});


router.post('/', async function (req, res) {
    try {

        const validations = formValidatorUser(req);

        if (validations.length > 0) {
            return res.status(400).send(validations);
        }

        console.log('Objeto recibido', req.body);

        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).send('El email ya existe');
        }

        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.active = req.body.active;
        user.created_at = new Date();
        user.modified_at = new Date();

        user = await user.save();
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});


router.put('/:userId', async function (req, res) {
    try {

        const validations = formValidatorUser(req);

        if (validations.length > 0) {
            return res.status(400).send(validations);
        }

        console.log('Objeto recibido', req.body);

        let user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(400).send('El usuario no existe');
        }

        const userExists = await User.findOne({ email: req.body.email, _id: { $ne: user._id } });

        console.log('Existe usuario', userExists);

        if (userExists) {
            return res.status(400).send('El email ya existe');
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.active = req.body.active;
        user.modified_at = new Date();

        user = await user.save();
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

module.exports = router;