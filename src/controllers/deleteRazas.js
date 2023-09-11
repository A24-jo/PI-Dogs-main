const {Dog} = require('../db')

const deleteRazas = async (id) =>{
    if(isFinite(id)) throw Error(`no hay una rasa con el id: ${id} en la Bd`);
 const que =  await  Dog.destroy({where:{id,}});
 if(!que ) throw Error(`no hay una rasa con el id: ${id} en la Bd`);
   return 'se elimino con exito '
};

module.exports = {
    deleteRazas
}