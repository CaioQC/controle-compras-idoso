# Relatório de execução — Teste de UI: Excluir item

**Ambiente:** Robot Framework + SeleniumLibrary, Chrome, frontend em `http://localhost:5173`.

| Caso | Esperado | Obtido | Status |
|---|---|---|---|
| CT01 — confirmar exclusão | Item removido | Item removido | Aprovado |
| CT02 — cancelar exclusão | Item permanece | Item permanece | Aprovado |

**Conclusão:** a exclusão remove o item apenas após a confirmação no modal, e o cancelamento mantém o item na lista. Os 2 casos passaram.

Arquivos gerados pelo Robot: `report.html`, `log.html`, `output.xml` (subir no repositório).
