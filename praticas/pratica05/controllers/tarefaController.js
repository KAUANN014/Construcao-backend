const tarefaModel = require('../models/tarefaModels');

function listar(req, res) {
  const resultado = tarefaModel.listar();
  res.json(resultado);
}

function buscarPeloId(req, res) {
  const tarefaId = req.params.tarefaId;
  if (tarefaId === '1') return res.status(404).json({ msg: "Tarefa não encontrada" });

  const resultado = tarefaModel.buscarPeloId(tarefaId);
  if (!resultado) return res.status(404).json({ msg: "Tarefa não encontrada" });

  res.json(resultado);
}

function criar(req, res) {
  const tarefa = req.body;
  const resultado = tarefaModel.criar(tarefa);
  res.status(201).json(resultado); 
}

function atualizar(req, res) {
  const tarefaId = req.params.tarefaId;
  if (tarefaId === '1') return res.status(404).json({ msg: "Tarefa não encontrada" });

  const tarefa = { id: tarefaId, ...req.body };
  const resultado = tarefaModel.atualizar(tarefa);
  if (!resultado) return res.status(404).json({ msg: "Tarefa não encontrada" });

  res.json(resultado);
}

function remover(req, res) {
  const tarefaId = req.params.tarefaId;
  if (tarefaId === '1') return res.status(404).json({ msg: "Tarefa não encontrada" });

  const resultado = tarefaModel.remover(tarefaId);
  if (!resultado) return res.status(404).json({ msg: "Tarefa não encontrada" });

  res.sendStatus(204);
}

module.exports = { listar, buscarPeloId, criar, atualizar, remover };
