# Análise e Controle de Risco de Produto

## Tabela FMEA - Análise de Modos de Falha e Efeitos

| ID | Função | Modo de Falha | Efeito da Falha | Causa Raiz | S | O | D | RPN | Ação Recomendada |
|---|---|---|---|---|---|---|---|---|---|
| F1 | Autenticação de usuário | Usuário consegue fazer login com credenciais inválidas | Acesso não autorizado ao sistema | Validação inadequada de e-mail/senha no backend | 9 | 3 | 4 | 108 | Implementar teste de validação de credenciais (T1) |
| F2 | Cadastro de usuário | Sistema permite cadastro com e-mail duplicado | Conflito de identidade, perda de dados | Falta de verificação de unicidade no banco de dados | 8 | 4 | 3 | 96 | Implementar teste de e-mail único (T2) |
| F3 | Cadastro de item | Item é salvo sem preencher campos obrigatórios | Dados incompletos na lista de compras | Validação de campos não implementada corretamente | 7 | 5 | 2 | 70 | Implementar teste de campos obrigatórios (T3) |
| F4 | Exclusão de conta | Conta é deletada sem confirmar a senha | Exclusão acidental de dados do usuário | Falta de validação de senha antes da exclusão | 10 | 2 | 2 | 40 | Implementar teste de validação de senha (T4) |
| F5 | Persistência de dados | Dados do usuário são perdidos após logout | Perda de informações importantes | LocalStorage não salva corretamente ou é limpo | 9 | 2 | 3 | 54 | Implementar teste de persistência (T5) |
| F6 | Navegação entre telas | Usuário consegue acessar tela de configurações sem estar logado | Acesso não autorizado a funcionalidades | Falta de verificação de autenticação nas rotas | 8 | 3 | 3 | 72 | Implementar teste de autenticação de rota (TF1) |
| F7 | Atualização de status de item | Item não é marcado como comprado quando clicado | Funcionalidade não funciona | Erro na atualização do estado no React | 6 | 4 | 3 | 72 | Implementar teste de atualização de status (TF2) |
| F8 | Validação de senha | Sistema aceita senha com menos de 6 caracteres | Segurança comprometida | Validação de comprimento mínimo não implementada | 8 | 3 | 2 | 48 | Implementar teste de comprimento de senha (TF3) |
| F9 | Exclusão de conta | Usuário consegue fazer login após exclusão da conta | Conta não foi deletada corretamente | Exclusão incompleta do banco de dados | 9 | 2 | 4 | 72 | Implementar teste de exclusão permanente (TF4) |
| F10 | Aviso de irreversibilidade | Sistema não exibe aviso antes de excluir conta | Usuário não sabe que ação é permanente | Modal de confirmação não aparece | 10 | 3 | 2 | 60 | Implementar teste de aviso de exclusão (TF5) |

## Legenda
- **S (Severidade):** 1-10 (1=mínimo, 10=crítico)
- **O (Ocorrência):** 1-10 (1=raramente, 10=frequentemente)
- **D (Detecção):** 1-10 (1=fácil detectar, 10=difícil detectar)
- **RPN (Risk Priority Number):** S × O × D

---

## Matriz FMEA - Severidade × Ocorrência

```
Ocorrência
    10 |     F3
       |
     8 |     F2
       |
     6 |     F7
       |
     4 |     F8
       |
     2 | F4 F5 F9 F10
       |
     1 |
       |_________________________________
         1  2  3  4  5  6  7  8  9  10
                    Severidade
```

### Distribuição de Risco

| Nível de Risco | Modos de Falha | Ação |
|---|---|---|
| **Alto (RPN > 80)** | F1 (108), F2 (96), F6 (72), F7 (72), F9 (72) | Implementar testes imediatamente |
| **Médio (40 < RPN ≤ 80)** | F3 (70), F5 (54), F8 (48), F10 (60), F4 (40) | Implementar testes em curto prazo |
| **Baixo (RPN ≤ 40)** | Nenhum | Monitorar |

---

## Resumo da Análise

- **Total de Modos de Falha Identificados:** 10
- **Modos de Falha de Alto Risco:** 5
- **Modos de Falha de Médio Risco:** 5
- **Modos de Falha de Baixo Risco:** 0

A análise indica que o produto possui riscos significativos principalmente em:
1. Autenticação e autorização
2. Validação de dados
3. Segurança de exclusão de dados
4. Persistência de informações

Todos os modos de falha identificados possuem ações de controle baseadas em testes automatizados.
