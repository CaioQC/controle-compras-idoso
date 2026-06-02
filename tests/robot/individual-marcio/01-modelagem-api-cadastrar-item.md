# Modelagem — Teste de API: Cadastrar item de compra (Particionamento de Equivalência)

Técnica: **Particionamento de Equivalência**.
Endpoint: `POST /itens-compra`

A entrada tem três fatores que definem o resultado: o nome do item, a categoria e o token de autenticação.

| Índice | Partição | Descrição | Resultado esperado |
|---|---|---|---|
| P1 | Dados válidos + autenticado | nome preenchido, categoria existente, token válido | 201 — item criado |
| P2 | Nome ausente | sem o campo `nome` | 400 — nome obrigatório |
| P3 | Categoria ausente | sem o campo `categoriaId` | 400 — categoria obrigatória |
| P4 | Sem autenticação | requisição sem token | 401 — não autorizado |

Casos de teste:
- CT-05-01 (P1): nome, quantidade, observação e categoria válida -> 201
- CT-05-02 (P2): sem o nome -> 400
- CT-05-03 (P3): sem a categoria -> 400
- CT-05-04 (P4): sem token -> 401
