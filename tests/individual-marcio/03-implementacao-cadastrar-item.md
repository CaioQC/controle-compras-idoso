# Implementação no Postman — Cadastrar item de compra

**Base URL:** `http://localhost:3000`
**Coleção:** `US05-Cadastrar-Item-Compra.postman_collection.json` (neste mesmo diretório).

Setup: Login (`POST /auth/login`, salva `admin_token`) e Pegar categoria (`GET /categorias`, salva `categoria_id`).

### CT-05-01 — Sucesso
Body:
```json
{ "nome": "Fralda geriátrica", "quantidade": 2, "observacao": "Tamanho G", "categoriaId": {{categoria_id}} }
```
Tests:
```javascript
pm.test("Status code deve ser 201", function () { pm.response.to.have.status(201); });
pm.test("Resposta contém id", function () { pm.expect(pm.response.json()).to.have.property("id"); });
```

### CT-05-02 — Sem o nome
Body: `{ "quantidade": 2, "observacao": "Sem nome", "categoriaId": {{categoria_id}} }`
```javascript
pm.test("Status code deve ser 400", function () { pm.response.to.have.status(400); });
```

### CT-05-03 — Sem a categoria
Body: `{ "nome": "Item sem categoria", "quantidade": 1, "observacao": "teste" }`
```javascript
pm.test("Status code deve ser 400", function () { pm.response.to.have.status(400); });
```

### CT-05-04 — Sem token
Body igual ao CT-05-01, sem o header Authorization.
```javascript
pm.test("Status code deve ser 401", function () { pm.response.to.have.status(401); });
```

**Executar:** importar no Postman e rodar na ordem, ou `newman run US05-Cadastrar-Item-Compra.postman_collection.json`.
