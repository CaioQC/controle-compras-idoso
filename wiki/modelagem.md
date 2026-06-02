# Modelagem de Casos de Teste

Este documento centraliza a documentação de todos os casos de teste modelados utilizando técnicas de teste de caixa preta.

## Índice de Casos de Teste

### Testes de Aceite (T#)

| ID | Título | Técnica | Requisito | Modo de Falha | Link |
|---|---|---|---|---|---|
| T1 | Validação de Credenciais Inválidas | Partição de Equivalência | R1 | F1 | [T1-validacao-credenciais](./casos-teste/T1-validacao-credenciais.md) |
| T2 | E-mail Único no Cadastro | Partição de Equivalência | R2 | F2 | [T2-email-unico](./casos-teste/T2-email-unico.md) |
| T3 | Campos Obrigatórios no Cadastro | Análise de Valor de Borda | R3 | F3 | [T3-campos-obrigatorios](./casos-teste/T3-campos-obrigatorios.md) |
| T4 | Validação de Senha na Exclusão | Tabela de Decisão | R4 | F4 | [T4-validacao-senha-exclusao](./casos-teste/T4-validacao-senha-exclusao.md) |
| T5 | Persistência de Dados | Partição de Equivalência | R5 | F5 | [T5-persistencia-dados](./casos-teste/T5-persistencia-dados.md) |

### Testes de Controle de Falha (TF#)

| ID | Título | Técnica | Requisito | Modo de Falha | Link |
|---|---|---|---|---|---|
| TF1 | Autenticação em Rota Protegida | Partição de Equivalência | R6 | F6 | [TF1-autenticacao-rota](./casos-teste/TF1-autenticacao-rota.md) |
| TF2 | Atualização de Status de Item | Análise de Valor de Borda | R7 | F7 | [TF2-atualizacao-status](./casos-teste/TF2-atualizacao-status.md) |
| TF3 | Comprimento Mínimo de Senha | Análise de Valor de Borda | R8 | F8 | [TF3-comprimento-senha](./casos-teste/TF3-comprimento-senha.md) |
| TF4 | Exclusão Permanente de Conta | Tabela de Decisão | R9 | F9 | [TF4-exclusao-permanente](./casos-teste/TF4-exclusao-permanente.md) |
| TF5 | Aviso de Irreversibilidade | Partição de Equivalência | R10 | F10 | [TF5-aviso-irreversibilidade](./casos-teste/TF5-aviso-irreversibilidade.md) |

---

## Resumo de Técnicas Utilizadas

### Partição de Equivalência
Técnica que divide os dados de entrada em classes onde o sistema deve se comportar de forma similar.

**Casos que utilizam esta técnica:**
- T1: Validação de Credenciais Inválidas
- T2: E-mail Único no Cadastro
- T5: Persistência de Dados
- TF1: Autenticação em Rota Protegida
- TF5: Aviso de Irreversibilidade

### Análise de Valor de Borda
Técnica que testa os valores nos limites das classes de equivalência.

**Casos que utilizam esta técnica:**
- T3: Campos Obrigatórios no Cadastro
- TF2: Atualização de Status de Item
- TF3: Comprimento Mínimo de Senha

### Tabela de Decisão
Técnica que documenta combinações de condições e suas ações resultantes.

**Casos que utilizam esta técnica:**
- T4: Validação de Senha na Exclusão
- TF4: Exclusão Permanente de Conta

---

## Estatísticas de Cobertura

| Métrica | Quantidade |
|---|---|
| Total de Casos de Teste | 10 |
| Testes de Aceite | 5 |
| Testes de Controle de Falha | 5 |
| Técnicas Utilizadas | 3 |
| Requisitos Cobertos | 10 |
| Modos de Falha Cobertos | 10 |

---

## Fluxo de Desenvolvimento de Caso de Teste

1. **Identificação:** Requisito ou modo de falha a ser testado
2. **Seleção de Técnica:** Escolher técnica apropriada de caixa preta
3. **Modelagem:** Documentar caso de teste seguindo template padrão
4. **Implementação:** Criar teste automatizado (se aplicável)
5. **Execução:** Rodar teste e registrar resultado
6. **Aprovação:** Validar se teste passou

---

## Padrão de Nomenclatura

- **Testes de Aceite:** T# (ex: T1, T2, T3...)
- **Testes de Controle:** TF# (ex: TF1, TF2, TF3...)
- **Arquivos:** [ID]-[descricao-em-kebab-case].md

---

## Como Adicionar Novo Caso de Teste

1. Criar novo arquivo em `casos-teste/` com nome `[ID]-[descricao].md`
2. Seguir template definido em "Modelo de Caso de Teste"
3. Adicionar entrada na tabela de índice acima
4. Atualizar estatísticas de cobertura
5. Fazer commit e push das alterações

---

## Próximos Passos

- [ ] Implementar testes automatizados para todos os casos
- [ ] Executar testes e validar resultados
- [ ] Documentar bugs encontrados
- [ ] Refinar casos de teste conforme necessário
- [ ] Manter rastreabilidade atualizada

---

## Referências

- Modelo de Caso de Teste: [modelo-caso-teste.md](./modelo-caso-teste.md)
- Análise FMEA: [analise-controle-risco-produto.md](./analise-controle-risco-produto.md)
- Controle de Risco: [controle-risco.md](./controle-risco.md)
- Rastreabilidade: [rastreabilidade.md](./rastreabilidade.md)
