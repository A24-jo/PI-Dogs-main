const { Dog,Temperament } = require('../db.js');

 
const addRazas = async () => {
  try {
    const datApi = await Dog.findAll({ include: { model: Temperament, attributes: ['id', 'name'] } });
    
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
    });
    //solicitamos la totalidad de razas
    const datos = await fetch('https://api.thedogapi.com/v1/breeds');
    const razas = await datos.json();
    //hacemos un map a razas para buscar en otra url de la api la url de la imagen 
    const newrazas = await Promise.all(razas?.map(async (raza) => {
      if(raza?.reference_image_id){
        const imges =await fetch("https://api.thedogapi.com/v1/images/" + raza.reference_image_id);
        const img= await imges.json();
        console.log(img)
        console.log(img.status)
      return {
        id: raza.id || '',
        weight: raza.weight?.metric || '',
        height: raza.height?.metric || '',
        name: raza.name || '',
        bred_for: raza.bred_for || '',
        breed_group: raza.breed_group || '',
        life_span: raza.life_span || '',
        temperament: raza.temperament || '',
        origin: raza.origin || '',
        reference_image_id: img.url || '',
      };
      }else{
        return {}
      }
    }));
    
    return [...newrazas,...newdataBD];


  } catch (error) {
    //lansamos el error hacia el manejador de erroes
    console.log('sigue el puto error ',error)
    return []
  
  };
};

module.exports = {
  addRazas,
};