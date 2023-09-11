const { Dog, Temperament } = require('../db.js');

      
const idRazas = async (idRaza) => {
    if (!Number.isNaN(Number(idRaza))) {
        const data = await fetch(`https://api.thedogapi.com/v1/breeds/${idRaza}`);
        const resultApi = await data.json();
        if(resultApi.reference_image_id){
            const image = await fetch(`https://api.thedogapi.com/v1/images/${resultApi.reference_image_id}`)
        const newdato=await image.json();
        const resultado = {
            id: resultApi.id,
             reference_image_id: newdato.url,
             name: resultApi.name,
             height: resultApi.height.metric,
             weight: resultApi.weight.metric,
             temperament: resultApi.temperament,
             life_span: resultApi.life_span
        };
        return resultado;
    }else{
        const resultado = {
            id: resultApi.id,
             reference_image_id:'https://cdn2.thedogapi.com/images/BJa4kxc4X_1280.jpg',
             name: resultApi.name,
             height: resultApi.height.metric,
             weight: resultApi.weight.metric,
             temperament: resultApi.temperament,
             life_span: resultApi.life_span
        };
        const result = { ...resultado, BD: 'nose encontro en la base de datos ' };
        return result;
    }
        
    } else {
        const resultBD = await Dog.findByPk(idRaza, { include: [{ model: Temperament, attributes: ['name'] }] });
        const temperamen = resultBD.temperaments.map(a => a.name).join(', ');
        const resul = { ...resultBD.get(), temperament: temperamen }
        return resul;
    }


};

module.exports = {
    idRazas
}