# Monitoramento: Rastreabilidade

## Matriz de Rastreabilidade de Testes

A matriz abaixo relaciona cada teste com os requisitos funcionais (R#) e modos de falha (F#) que ele controla.

### Legenda de Estados
- **P:** Pendente
- **C:** Em construção
- **I:** Implementado
- **A:** Aprovado
- **R:** Reprovado
- **-:** Não se aplica

---

## Requisitos Funcionais (R#)

| ID | Descrição |
|---|---|
| R1 | Usuário deve fazer login com e-mail e senha válidos |
| R2 | Sistema deve validar unicidade de e-mail no cadastro |
| R3 | Sistema deve validar campos obrigatórios no cadastro de item |
| R4 | Usuário deve confirmar senha antes de excluir conta |
| R5 | Dados do usuário devem persistir após logout |
| R6 | Rotas protegidas devem exigir autenticação |
| R7 | Status de item deve ser atualizável |
| R8 | Senha deve ter mínimo de 6 caracteres |
| R9 | Exclusão de conta deve ser permanente |
| R10 | Sistema deve avisar sobre irreversibilidade da exclusão |

---

## Modos de Falha (F#)

| ID | Descrição |
|---|---|
| F1 | Usuário consegue fazer login com credenciais inválidas |
| F2 | Sistema permite cadastro com e-mail duplicado |
| F3 | Item é salvo sem preencher campos obrigatórios |
| F4 | Conta é deletada sem confirmar a senha |
| F5 | Dados do usuário são perdidos após logout |
| F6 | Usuário consegue acessar tela de configurações sem estar logado |
| F7 | Item não é marcado como comprado quando clicado |
| F8 | Sistema aceita senha com menos de 6 caracteres |
| F9 | Usuário consegue fazer login após exclusão da conta |
| F10 | Sistema não exibe aviso antes de excluir conta |

---

## Matriz de Rastreabilidade

| Teste | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | F1 | F2 | F3 | F4 | F5 | F6 | F7 | F8 | F9 | F10 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **T1** | A | - | - | - | - | - | - | - | - | - | A | - | - | - | - | - | - | - | - | - |
| **T2** | - | A | - | - | - | - | - | - | - | - | - | A | - | - | - | - | - | - | - | - |
| **T3** | - | - | A | - | - | - | - | - | - | - | - | - | A | - | - | - | - | - | - | - |
| **T4** | - | - | - | A | - | - | - | - | - | - | - | - | - | A | - | - | - | - | - | - |
| **T5** | - | - | - | - | A | - | - | - | - | - | - | - | - | - | A | - | - | - | - | - |
| **TF1** | - | - | - | - | - | A | - | - | - | - | - | - | - | - | - | A | - | - | - | - |
| **TF2** | - | - | - | - | - | - | A | - | - | - | - | - | - | - | - | - | A | - | - | - |
| **TF3** | - | - | - | - | - | - | - | A | - | - | - | - | - | - | - | - | - | A | - | - |
| **TF4** | - | - | - | - | - | - | - | - | A | - | - | - | - | - | - | - | - | - | A | - |
| **TF5** | - | - | - | - | - | - | - | - | - | A | - | - | - | - | - | - | - | - | - | A |

---

## Resumo da Rastreabilidade

### Testes de Aceite (T#)
- **T1:** Validação de Credenciais Inválidas - Controla R1 e F1
- **T2:** E-mail Único no Cadastro - Controla R2 e F2
- **T3:** Campos Obrigatórios no Cadastro de Item - Controla R3 e F3
- **T4:** Validação de Senha na Exclusão - Controla R4 e F4
- **T5:** Persistência de Dados - Controla R5 e F5

### Testes de Controle de Falha (TF#)
- **TF1:** Autenticação em Rota Protegida - Controla R6 e F6
- **TF2:** Atualização de Status de Item - Controla R7 e F7
- **TF3:** Comprimento Mínimo de Senha - Controla R8 e F8
- **TF4:** Exclusão Permanente de Conta - Controla R9 e F9
- **TF5:** Aviso de Irreversibilidade - Controla R10 e F10

### Cobertura
- **Total de Requisitos:** 10 (100% cobertos)
- **Total de Modos de Falha:** 10 (100% cobertos)
- **Total de Testes:** 10 (5 de aceite + 5 de controle)
- **Status Geral:** Todos os testes aprovados (A)

---

## Análise de Cobertura

### Requisitos Cobertos
✅ Todos os 10 requisitos funcionais possuem pelo menos um teste de aceite

### Modos de Falha Cobertos
✅ Todos os 10 modos de falha possuem pelo menos um teste de controle

### Testes Implementados
✅ 5 testes de aceite (T1-T5)
✅ 5 testes de controle de falha (TF1-TF5)

### Status de Implementação
✅ Todos os testes estão em estado "Aprovado (A)"

Esta matriz garante rastreabilidade completa entre requisitos, modos de falha e testes, assegurando que todas as funcionalidades críticas do produto são validadas.
