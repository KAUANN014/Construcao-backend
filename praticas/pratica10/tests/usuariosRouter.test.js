const supertest = require('supertest');   
const app = require('../app');           

const request = supertest(app);          

describe("Testes do recurso /usuarios", () => {  

  let usuarioId = null;  
  let token = null;      

  test("POST /usuarios → deve criar usuário e retornar 201 e JSON", async () => {
    const resp = await request
      .post("/usuarios")
      .send({
        email: "usuario@email.com",
        senha: "abcd1234"
      })
      .expect(201)
      .expect("Content-Type", /json/);

    expect(resp.body).toHaveProperty("_id");
    expect(resp.body.email).toBe("usuario@email.com");

    usuarioId = resp.body._id; 
  });

  test("POST /usuarios → sem JSON deve retornar 422", async () => {
    const resp = await request
      .post("/usuarios")
      .send({})
      .expect(422)
      .expect("Content-Type", /json/);

    expect(resp.body.msg).toBe("Email e Senha são obrigatórios");
  });

  test("POST /usuarios/login → login válido deve retornar 200 e JSON", async () => {
    const resp = await request
      .post("/usuarios/login")
      .send({
        usuario: "usuario@email.com",
        senha: "abcd1234"
      })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(resp.body).toHaveProperty("token");
    token = resp.body.token; 
  });

  test("POST /usuarios/login → sem JSON deve retornar 401", async () => {
    const resp = await request
      .post("/usuarios/login")
      .send({})
      .expect(401)
      .expect("Content-Type", /json/);

    expect(resp.body.msg).toBe("Credenciais inválidas");
  });

  test("POST /usuarios/renovar → com token válido retorna 200 e JSON", async () => {
    const resp = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(resp.body).toHaveProperty("token");
  });

  test("POST /usuarios/renovar → token inválido deve retornar 401", async () => {
    const resp = await request
      .post("/usuarios/renovar")
      .set("authorization", "Bearer 123456789")
      .expect(401)
      .expect("Content-Type", /json/);

    expect(resp.body.msg).toBe("Token inválido");
  });

  test("DELETE /usuarios/:id → remover usuário retorna 204", async () => {
    await request
    .delete(`/usuarios`)
.send({ usuario: "usuario@email.com" })
      .expect(204);
  });

});
