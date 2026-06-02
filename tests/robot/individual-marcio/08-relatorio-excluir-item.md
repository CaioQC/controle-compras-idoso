# Relatório de execução — Excluir item de compra

**Ambiente:** Postman / Newman, localhost, Base URL `http://localhost:3000`.

| Caso | Esperado | Obtido | Status |
|---|---|---|---|
| CT-09-01 — excluir com sucesso | 200 | 200 | Aprovado |
| CT-09-02 — item não existe mais | corpo vazio | corpo vazio | Aprovado |
| CT-09-03 — excluir item inexistente | 404 | 500 | Reprovado |
| CT-09-04 — excluir sem token | 401 | 401 | Aprovado |

**Defeito encontrado:** ao excluir um item inexistente a API retorna 500 em vez de 404. O caso "registro não encontrado" não é tratado, então o erro do banco sobe direto para a resposta.

**Conclusão:** a exclusão funciona para itens existentes e a autenticação é exigida. O tratamento de id inexistente está com defeito (deveria ser 404).
