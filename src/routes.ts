import express from 'express'

import OrfanatoController from './controller/orfanatoController'


const routes = express.Router();

//ESTOU CHAMANDO A MINHA CLASSE CRIANDO UM OBJRTO A PARTIR DISSO
const orfController = new OrfanatoController();

routes.get('/',(req,res)=>{
    res.send('inicio...')
});

routes.post('/orfanato', orfController.create)
routes.get('/orfanato/:id',orfController.findOne)
routes.get('/orfanato', orfController.index)
export default  routes;