# Implementação no Postman — Excluir item de compra

**Base URL:** `http://localhost:3000`
**Coleção:** `US09-Excluir-Item-Compra.postman_collection.json` (neste mesmo diretório).

Setup: Login (salva `admin_token`), Pegar categoria (salva `categoria_id`) e Criar item para excluir (salva `item_id`).

### CT-09-01 — Excluir com sucesso
`DELETE {{base_url}}/itens-compra/{{item_id}}` com header Authorization.
```javascript
pm.test("Status code deve ser 200", function () { pm.response.to.have.status(200); });
```

### CT-09-02 — Confirmar que não existe mais
`GET {{base_url}}/itens-compra/{{item_id}}`
```javascript
pm.test("Corpo vazio", function () { var t = pm.response.text(); pm.expect(t === "" || t === "null").to.be.true; });
```

### CT-09-03 — Excluir item inexistente
`DELETE {{base_url}}/itens-compra/999999`
```javascript
pm.test("Status code deve ser 404", function () { pm.response.to.have.status(404); });
```

### CT-09-04 — Excluir sem token
`DELETE {{base_url}}/itens-compra/{{item_id}}` sem header Authorization.
```javascript
pm.test("Status code deve ser 401", function () { pm.response.to.have.status(401); });
```

**Executar:** importar no Postman, ou `newman run US09-Excluir-Item-Compra.postman_collection.json`.
