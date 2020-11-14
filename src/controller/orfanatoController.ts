import { Request, Response, NextFunction } from 'express';

import connection from '../database/conection'

class orfanatoController {
  async index(request: Request, response: Response){
    const result = await connection('orfanato').select('orfanato.*')
    return response.json(result)   
    

 }
  
  async findOne(request: Request, response: Response,next: NextFunction){
    const {id} =  request.params;
    const orfanato = await connection('orfanato').
    where('id',id).select('nome','sobre','telefone','intrucoes','h_visita','fim_semana');
     response.json({orfanato})
 }
 async create(request: Request, response:Response){
 
  const {nome,sobre,telefone,intrucoes,h_visita,fim_semana,longitude,latitude} = request.body

  const project = {
    nome,sobre,telefone,intrucoes,h_visita,fim_semana,longitude,latitude
  }
  //inicia uma transação
  const trx = await connection.transaction()
  const docExists = await trx('orfanato').where({'longitude': longitude, 'latitude': latitude}).first()

  if(docExists){
      await trx.rollback()
      return response.json({error:'error user already exist'})
  }

  const orfanato_insert = await trx('orfanato').insert(project)
  //se chegou aki e pq deu tudo certo e salva no banco
  await trx.commit()
  return response.json(docExists)

}

}
export default orfanatoController;