const { Dog } = require("../db.js")

const newDog = async (reference_image_id, name, height, weight, life_span,filArray) => {
    if (!name || !height || !weight || !life_span || !reference_image_id) throw Error('al parecer no llego los datos completos');
    if(filArray.length === 0) throw Error('deves celecionar almenos un temperamento');

    const prueva  =await Dog.findOne({where:{name:name}});

    if(prueva) throw Error(false);

  const doggg =   await Dog.create({
    reference_image_id,
        name,
        height,
        weight,
        life_span, 
    });   
  
await doggg.addTemperament(filArray);

    return {mensaje:true}
}; 

module.exports = {
    newDog
}