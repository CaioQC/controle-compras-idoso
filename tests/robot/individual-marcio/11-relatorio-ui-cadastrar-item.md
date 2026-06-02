# Relatório de execução — Teste de UI: Cadastrar item

**Ambiente:** Robot Framework + SeleniumLibrary, Chrome, frontend em `http://localhost:5173`.

| Caso | Esperado | Obtido | Status |
|---|---|---|---|
| CT01 — todos os campos | Item cadastrado | Item cadastrado | Aprovado |
| CT02 — sem nome | "O nome do item é obrigatório" | idem | Aprovado |
| CT03 — sem idoso | "O nome do idoso é obrigatório" | idem | Aprovado |
| CT04 — sem responsável | "O nome do familiar responsável é obrigatório" | idem | Aprovado |

**Conclusão:** a tela valida os três campos obrigatórios e cadastra o item quando todos são preenchidos. Os 4 casos passaram.

Arquivos gerados pelo Robot: `report.html`, `log.html`, `output.xml` (subir no repositório).
