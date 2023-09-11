const {addRazas} = require('../controllers/addRazas');
const {apiTemp} = require('../controllers/apiTemp');
const {deleteRazas} = require('../controllers/deleteRazas');
const {idRazas} = require('../controllers/idRaza');
const {nameRazas} = require('../controllers/nameRazas');
const {newDog} = require('../controllers/newDog');

const handlerAddRazas = async (req,res)=>{
    try {
        const response = await addRazas();
        res.status(200).json(response);
    } catch (error) {
        res.status(405).json({ error: error.message });
    };
};

const handlerApiTemp = async (req,res)=>{
    try {

        res.status(200).json(await apiTemp());
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};

const handlerDeleteRazas = async (req,res)=>{
    const { id } = req.params;
    try {
        const respi = await deleteRazas(id);
        res.status(200).send(respi);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const handlerIdRazas = async (req,res)=>{
    const { idRaza } = req.params;
    try {
        const dog = await idRazas(idRaza)
        res.status(200).json(dog);
    } catch (error) {
        res.status(405).json({ error: error.message });
    };
};

const handlerNameRazas = async (req,res)=>{
    const { name } = req.query;
    try {
        const newrazas = await nameRazas(name);
        res.status(200).json(newrazas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    } 
};

const handlerNewDog = async (req,res)=>{
    const { reference_image_id,name, height, weight, life_span,temperament1,temperament2,temperament3,temperament4,temperament5 } = req.body;

    //aquie verificamos la cantidad de temperamentos que resivimos y lo filtramos pra que solo envie datos y no undefi
    const arrayDetemp = [ temperament1,temperament2,temperament3,temperament4,temperament5 ]
    const filArray = arrayDetemp.filter(s => s !== undefined);
    try {
        const newDogda = await newDog(reference_image_id, name, height, weight, life_span, filArray);
        res.status(200).json(newDogda);
    } catch (error) {
        res.status(403).json({ error: error.message });
    } 
};

module.exports= {
    handlerAddRazas,
    handlerApiTemp,
    handlerDeleteRazas,
    handlerIdRazas,
    handlerNameRazas,
    handlerNewDog
}