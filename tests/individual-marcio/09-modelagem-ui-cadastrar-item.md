# Modelagem — Teste de UI: Cadastrar item (Tabela de Decisão)

Técnica: **Tabela de Decisão**.
Tela: formulário "Cadastrar Novo Item" (home da família). A validação dos campos obrigatórios é feita na tela.

| Condição / Regra | CT01 | CT02 | CT03 | CT04 |
|---|---|---|---|---|
| R1 — Nome do item preenchido | S | N | S | S |
| R2 — Idoso selecionado | S | S | N | S |
| R3 — Familiar responsável preenchido | S | S | S | N |
| **Resultado esperado** | Item cadastrado | "O nome do item é obrigatório" | "O nome do idoso é obrigatório" | "O nome do familiar responsável é obrigatório" |

Casos:
- CT01: todos preenchidos -> item aparece na lista de pendentes
- CT02: nome vazio -> erro de nome
- CT03: idoso não selecionado -> erro de idoso
- CT04: responsável vazio -> erro de responsável

Implementação: arquivo `cadastrar_item.robot` (neste mesmo diretório).
