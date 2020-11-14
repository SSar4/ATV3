import { Request, Response, NextFunction } from 'express';

import connection from '../database/conection'

class orfanatoController {
  async index(request: Request, response: Response, next: NextFunction){
   
    const {page = 1} = request.query;
    const [count] = await connection('orfanato').count();
    
   const orfanato = await connection('orfanato').limit(10).
   offset((page -1)*10).select('id','nome');
   
   response.header('X-Total-Count',count['count(*)']);
    response.json({orfanato})

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