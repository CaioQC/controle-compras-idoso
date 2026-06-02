# Documentação do endpoint — Excluir item de compra

**Endpoint:** `DELETE /itens-compra/:id`
**Descrição:** remove um item da lista pelo id. Exige usuário autenticado.

**Headers**
```
Authorization: Bearer <token>
```

**Parâmetro de rota:** `id` — número, id do item.

**Respostas**

200 — Item excluído (retorna o item removido)
```json
{ "id": 5, "nome": "Item para exclusão", "quantidade": 1, "categoriaId": 1, "comprado": false }
```

401 — Sem token de autenticação.
404 — Item não encontrado (resposta esperada quando o id não existe).
