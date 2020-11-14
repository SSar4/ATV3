import { Request, Response, NextFunction } from 'express';
import conection from '../database/conection'

class orfanatoController {
  
  async index(request: Request, response: Response, next: NextFunction){
    const {page = 1} = request.query;
    const [count] = await conection('orfanato').count();
    
   const orfanato = await conection('orfanato').limit(10).
   offset((page -1)*10).
   select('id','nome');
   response.header('X-Total-Count',count['count(*)']);
    response.json({orfanato})

 }
  async findOne(request: Request, response: Response,next: NextFunction){
    const {id} =  request.params;
    const orfanato = await conection('orfanato').
    where('id',id).select('nome','sobre','telefone','intrucoes','h_visita','fim_semana');
     response.json({orfanato})
 }
 async create(request: Request, response:Response, next:NextFunction){
 
    const {nome,sobre,telefone,instrucao,h_visita,fim_semana,longitude,latitude } = request.body;

  const result = await conection('orfanato').insert({
    nome,sobre,telefone,instrucao,h_visita,fim_semana,longitude,latitude
    })
 
}

}
export default orfanatoController;