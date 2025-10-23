const request = require("supertest");
const app = require("../app");

let produtoId;

describe("/produtos", () => {
  it("POST /produtos deve criar um produto e retornar 201", async () => {
    const res = await request(app)
      .post("/produtos")
      .send({ nome: "Laranja", preco: "10.0" });

    expect(res.statusCode).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.nome).toBe("Laranja");
    expect(res.body.preco).toBe("10.0");

    produtoId = res.body._id;
  });

  it("POST /produtos sem JSON retorna 422", async () => {
    const res = await request(app).post("/produtos");
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty(
      "msg",
      "Nome e preço do produto são obrigatórios"
    );
  });

  it("GET /produtos retorna 200 e array de produtos", async () => {
    const res = await request(app).get("/produtos");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /produtos/:id retorna 200 com produto correto", async () => {
    const res = await request(app).get(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", produtoId);
    expect(res.body).toHaveProperty("nome", "Laranja");
    expect(res.body).toHaveProperty("preco", "10.0");
  });

  it("GET /produtos/0 retorna 400", async () => {
    const res = await request(app).get("/produtos/0");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  it("GET /produtos/00000000000000000000000 retorna 404", async () => {
    const res = await request(app).get("/produtos/00000000000000000000000");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("msg", "Produto não encontrado");
  });

  it("PUT /produtos/:id atualiza produto e retorna 200", async () => {
    const res = await request(app)
      .put(`/produtos/${produtoId}`)
      .send({ nome: "Laranja Pera", preco: 18.0 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", produtoId);
    expect(res.body).toHaveProperty("nome", "Laranja Pera");
    expect(res.body).toHaveProperty("preco", 18.0);
  });

  it("PUT /produtos/:id sem JSON retorna 422", async () => {
    const res = await request(app).put(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty(
      "msg",
      "Nome e preço do produto são obrigatórios"
    );
  });

  it("PUT /produtos/0 retorna 400", async () => {
    const res = await request(app).put("/produtos/0");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  it("PUT /produtos/00000000000000000000000 retorna 404", async () => {
    const res = await request(app)
      .put("/produtos/00000000000000000000000")
      .send({ nome: "Teste", preco: 1 });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("msg", "Produto não encontrado");
  });

  it("DELETE /produtos/:id retorna 204", async () => {
    const res = await request(app).delete(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});
  });

  it("DELETE /produtos/0 retorna 400", async () => {
    const res = await request(app).delete("/produtos/0");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  it("DELETE /produtos/:id retorna 404", async () => {
    const res = await request(app).delete(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("msg", "Produto não encontrado");
  });
});
