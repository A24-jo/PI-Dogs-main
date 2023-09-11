const { Temperament } = require("../db.js");

const apiTemp = async () => {   
  try {
    const datos = await fetch('https://api.thedogapi.com/v1/breeds');
    const result = await datos.json();

    for (const iterator of result) {
      const arrraay = iterator.temperament?.split(',') || [];

      for (const dato of arrraay) {
        const vart = await Temperament.findOne({ where: { name: dato } })
        if (!vart) {
          await Temperament.create({ name: dato })
        }

      }
    }
    const tem = await  Temperament.findAll({attributes:['name','id']});
    return tem;
  } catch (error) {
    throw Error('Hay un errro al optener los temperamentos de la api : ' + error.message)
  }
};

module.exports = {
  apiTemp
}