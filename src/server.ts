import  express from 'express'
const routes = require('./routes')
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3333;
app.use(routes);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));