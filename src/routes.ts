import  express from 'express'
const routes = express.Router();

routes.get('/', (req,res)=>{
    res.json({'test':'test'})
});
module.exports = routes;