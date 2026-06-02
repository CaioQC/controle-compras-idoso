# Documentação do endpoint — Cadastrar item de compra

**Endpoint:** `POST /itens-compra`
**Descrição:** cria um novo item na lista de compras. Exige usuário autenticado.

**Headers**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Body**
```json
{ "nome": "string", "quantidade": 0, "observacao": "string", "categoriaId": 0 }
```

**Respostas**

201 — Item criado
```json
{ "id": 1, "nome": "Fralda geriátrica", "quantidade": 2, "observacao": "Tamanho G", "categoriaId": 1, "criadoPorId": 1, "comprado": false, "criadoEm": "2026-06-01T18:00:00.000Z" }
```

401 — Sem token de autenticação.
400 — Campo obrigatório ausente (resposta esperada pela validação dos DTOs).

O token vem de `POST /auth/login` com `{ "email": "...", "senha": "..." }`, que retorna `{ "access_token": "..." }`. O `categoriaId` deve existir (listados em `GET /categorias`).
