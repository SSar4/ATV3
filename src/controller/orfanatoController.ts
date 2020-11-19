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
 
  const {nome, sobre, telefone, intrucoes,  h_visita, fim_semana, longitude, latitude } = request.body

  console.log('dados',nome)
  //inicia uma transação
  const trx = await connection.transaction()
 

  const orfanato_insert = await trx('orfanato').insert({
    nome,
    sobre,
    telefone, 
    fim_semana,
    intrucoes, 
    h_visita,
     longitude,
     latitude 
    } 

  )
  if(orfanato_insert){
    await trx.commit()
  return response.status(200).json({sucesso:'Orfanato salvo com sucesso'});
  }
  return response.status(400).json({error:'erro ao salvar'});
  //se chegou aki e pq deu tudo certo e salva no banco
  

}

}
export default orfanatoController;