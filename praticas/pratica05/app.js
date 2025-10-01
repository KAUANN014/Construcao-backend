const express = require('express');
const app = express();
const tarefaRouter = require('./routes/tarefaRouter');

app.use(express.json());


app.use('/tarefas', tarefaRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; 
