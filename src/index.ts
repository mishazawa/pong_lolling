import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import * as EventEmitter from 'events';

const PUSH_EVENT = 'polling:push';
const TIMEOUT_POLLING = 5000;
const PORT = 7654;
const app = express();
const emitter = new EventEmitter();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.get('/pull/:room', (req, res) => {
  const fn = (data: object) => {
    clearTimeout(timer);
    emitter.removeListener(`${PUSH_EVENT}:${req.params.room}`, fn);
    return res.json(data);
  };

  const timer = setTimeout(() => {
    emitter.removeListener(`${PUSH_EVENT}:${req.params.room}`, fn);
    return res.json(["nothing"]);
  }, TIMEOUT_POLLING);

  emitter.once(`${PUSH_EVENT}:${req.params.room}`, fn)
})

app.post('/push/:room', (req, res) => {
  emitter.emit(`${PUSH_EVENT}:${req.params.room}`, req.body);
  res.sendStatus(200);
})


http.createServer(app).listen(PORT, () => {
  console.log(`Server:${PORT}:Run.`);
});
