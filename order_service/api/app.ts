import * as config from './config.json';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import clientRouter from "./src/routes/clientRoutes";
import orderRouter from "./src/routes/orderRoutes";
const app = express();
const portHost = config.HOST;

app.use(bodyParser.json());
app.use(cors());
app.use(clientRouter);
app.use(orderRouter);

app.post('/', (request: express.Request, response: express.Response) => {
  response.send(request.body);
});

app.get('/', (request: express.Request, response: express.Response) => {
  response.send('order service');
});

const port = config.HOST ;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
