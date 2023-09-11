const { Dog, Temperament } = require('../db.js');
const { Op } = require('sequelize');
   
const nameRazas = async (name) => {
    if (!name) throw Error('deves pasar por query la rasa ');
    //solicitud a la Api
    const data = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
    const result = await data.json();
    const newResult = await Promise.all(result.map(async (a) => {
     if(a.reference_image_id){ 
        const urlImg = await (await fetch(`https://api.thedogapi.com/v1/images/${a.reference_image_id}`)).json();
        
        return {
            id: a.id,
            reference_image_id: urlImg.url,
            name: a.name,
            height: a.height.metric,
            weight: a.weight.metric,
            temperament: a.temperament,
            life_span: a.life_span
        };
       }
    }));
    //solicitud a la Bd
    const datApi = await Dog.findAll({ where: { name: { [Op.iLike]: `%${name}%` } }, include: { model: Temperament, attributes: ['id', 'name'] } });
    const newdataBD = datApi.map(va => {
        const ese = va.temperaments.map(s => s.name);
        const newdato = {
            id: va.id,
            name: va.name,
            reference_image_id: va.reference_image_id,
            height: va.height,
            weight: va.weight,
            life_span: va.life_span,
            temperament: ese.join(',')
        }
        return newdato
    })

    if (newdataBD.length === 0) {
        console.log('bsd')
        newdataBD.push(`nose encontro la raza ${name} en la base de datos`)
    }
    if (newResult.length === 0) {
        console.log('dfd')
        newResult.push(`nose encontro la raza ${name} en la api`)
    }
    const total = [...newResult, ...newdataBD];
    return total;
}

module.exports = {
    nameRazas
}