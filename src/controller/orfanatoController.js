const conection = require('../database/conection');
module.exports = {
    async index(request, response, next){
        const {page = 1} = request.query;
        const [count] = await conection('orfanato').count();
        
       const orfanato = await conection('orfanato').limit(10).
       offset((page -1)*10).
       select('id','nome');
       response.header('X-Total-Count',count['count(*)']);
        response.json({orfanato})

     },
      async findOne(request, response,next){
        const {id} =  request.params;
        const orfanato = await conection('orfanato').
        where('id',id).select('nome','sobre','telefone','intrucoes','h_visita','fim_semana');
         response.json({orfanato})
     },
     async create(request, response, next){
     
        const {nome,sobre,telefone,instrucao,h_visita,fim_semana,longitude,latitude } = request.body;

      const result = await conection('orfanato').insert({
          nome,
          sobre,
          telefone,
          intrucoes,
          h_visita,
          fim_semana,
          latitude,
          longitude
        }).then(message =>{
          return  response.status(200).json({success:'success'});
        }).catch(err =>{
          return  response.status(201).json({error:err});
        });
   
     
    },


};