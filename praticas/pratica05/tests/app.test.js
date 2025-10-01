const request = require('supertest'); 
const app = require('../app');       

let tarefaId; 

describe('Testes da API de Tarefas', () => {

  it('GET /tarefas deve retornar status 200 e JSON', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('POST /tarefas deve criar uma tarefa e retornar status 201 e JSON', async () => {
    const res = await request(app)
      .post('/tarefas')
      .send({ nome: 'Estudar Node', concluida: false });
    
    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);

    tarefaId = res.body.id; 
  });

  it('GET /tarefas/:id deve retornar status 200 e JSON', async () => {
    const res = await request(app).get(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('GET /tarefas/1 deve retornar status 404 e JSON', async () => {
    const res = await request(app).get('/tarefas/1');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('PUT /tarefas/:id deve atualizar a tarefa e retornar status 200 e JSON', async () => {
    const res = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: 'Estudar Node e Express', concluida: true });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('PUT /tarefas/1 deve retornar status 404 e JSON', async () => {
    const res = await request(app)
      .put('/tarefas/1')
      .send({ nome: 'Teste', concluida: true });

    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('DELETE /tarefas/:id deve retornar status 204 sem conteúdo', async () => {
    const res = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});
  });

  it('DELETE /tarefas/1 deve retornar status 404 e JSON', async () => {
    const res = await request(app).delete('/tarefas/1');
    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
  });

});
