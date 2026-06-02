# Modelagem — Teste de API: Excluir item de compra (Tabela de Decisão)

Técnica: **Tabela de Decisão**.
Endpoint: `DELETE /itens-compra/:id`

O resultado depende de o usuário estar autenticado e de o item existir.

| Condição / Regra | CT01 | CT02 | CT03 |
|---|---|---|---|
| R1 — Usuário autenticado | S | S | N |
| R2 — Item existe | S | N | — |
| **Resultado esperado** | 200 — excluído | 404 — não encontrado | 401 — não autorizado |

Casos de teste:
- CT-09-01: token válido + item existe -> 200
- CT-09-03: token válido + item inexistente -> 404
- CT-09-04: sem token -> 401
- CT-09-02: GET após excluir para confirmar que o item não existe mais
