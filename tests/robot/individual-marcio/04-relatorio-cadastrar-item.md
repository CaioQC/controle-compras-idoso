# Relatório de execução — Cadastrar item de compra

**Ambiente:** Postman / Newman, localhost, Base URL `http://localhost:3000`.

| Caso | Esperado | Obtido | Status |
|---|---|---|---|
| CT-05-01 — sucesso | 201 | 201 | Aprovado |
| CT-05-02 — sem nome | 400 | 500 | Reprovado |
| CT-05-03 — sem categoria | 400 | 500 | Reprovado |
| CT-05-04 — sem token | 401 | 401 | Aprovado |

**Defeito encontrado:** a API não rejeita itens sem campos obrigatórios. Ao enviar requisição sem `nome` ou sem `categoriaId`, em vez de 400 ela retorna 500 (erro estoura no banco). Causa: ausência de `ValidationPipe` global, então as validações dos DTOs não são aplicadas.

**Conclusão:** os casos positivos passaram; os negativos de validação reprovaram e apontam um defeito de validação de entrada a ser corrigido.
