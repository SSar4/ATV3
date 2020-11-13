import  express from 'express'
import routes from './routes'
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3333;
app.use(routes);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));