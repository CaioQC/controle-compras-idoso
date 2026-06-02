# Modelagem de Teste - US10: Exclusão de Conta e Dados Permanentemente

## 1. Identificação

| Atributo | Valor |
|----------|-------|
| **User Story** | US10 |
| **Título** | Exclusão de Conta e Dados Permanentemente |
| **Descrição** | Como usuário, desejo excluir minha conta e todos os meus dados permanentemente do sistema |
| **Prioridade** | Alta |
| **Técnica de Teste** | Partição de Equivalência (PE) + Análise de Valores Limites (BVA) |
| **Tipo de Teste** | Teste de Interface de Usuário (UI) |
| **Ferramenta** | Robot Framework + SeleniumLibrary |

---

## 2. Objetivo

Validar que o sistema permite ao usuário excluir sua conta e todos os seus dados de forma permanente e irreversível, garantindo que:
- O usuário receba avisos claros sobre a irreversibilidade da ação
- A exclusão seja confirmada com a senha do usuário
- A conta seja removida completamente do sistema
- O usuário não consiga fazer login com as credenciais anteriores

---

## 3. Requisitos Relacionados

| ID | Descrição | Tipo |
|----|-----------|------|
| R10.1 | Exibir aviso de irreversibilidade | Funcional |
| R10.2 | Solicitar confirmação com senha | Funcional |
| R10.3 | Validar senha antes de excluir | Funcional |
| R10.4 | Remover conta do banco de dados | Funcional |
| R10.5 | Remover dados associados à conta | Funcional |
| R10.6 | Redirecionar para login após exclusão | Funcional |

---

## 4. Modos de Falha (FMEA)

| ID | Modo de Falha | Efeito | Severidade | Detecção |
|----|---------------|--------|-----------|----------|
| F10.1 | Aviso não exibido | Usuário não sabe que é irreversível | Alta | Teste visual |
| F10.2 | Senha não validada | Conta excluída sem confirmação | Crítica | Teste funcional |
| F10.3 | Dados não removidos | Dados permanecem no banco | Crítica | Teste de banco |
| F10.4 | Usuário consegue fazer login | Conta não foi excluída | Crítica | Teste de login |
| F10.5 | Modal não fecha | Interface fica travada | Média | Teste de UI |

---

## 5. Partições de Equivalência

### Classe 1: Exclusão com Dados Válidos (Válida)
- **Descrição:** Usuário autenticado tenta excluir conta com senha correta
- **Dados:** Email válido, senha correta
- **Resultado Esperado:** ✅ Conta excluída com sucesso

### Classe 2: Exclusão com Senha Incorreta (Inválida)
- **Descrição:** Usuário autenticado tenta excluir conta com senha errada
- **Dados:** Email válido, senha incorreta
- **Resultado Esperado:** ❌ Exclusão bloqueada, mensagem de erro

### Classe 3: Cancelamento de Exclusão (Válida)
- **Descrição:** Usuário inicia exclusão mas cancela antes de confirmar
- **Dados:** Email válido, clica em cancelar
- **Resultado Esperado:** ✅ Conta mantida, usuário retorna ao dashboard

### Classe 4: Exclusão Sem Autenticação (Inválida)
- **Descrição:** Usuário não autenticado tenta acessar exclusão
- **Dados:** Sem token/sessão
- **Resultado Esperado:** ❌ Redirecionado para login

---

## 6. Análise de Valores Limites (BVA)

| Aspecto | Limite Inferior | Valor Válido | Limite Superior |
|---------|-----------------|--------------|-----------------|
| Comprimento Senha | 0 caracteres | 6+ caracteres | Sem limite |
| Tentativas | 0 tentativas | 1 tentativa | Múltiplas tentativas |
| Tempo de Espera | 0 segundos | 2 segundos | Timeout |

---

## 7. Casos de Teste

### TC10.1: Criar Usuário de Teste
**Objetivo:** Preparar ambiente com usuário para testes de exclusão

**Dados de Entrada:**
- Nome: "João Silva Teste"
- Email: "joao.silva.teste@email.com"
- Senha: "Senha123@"

**Passos:**
1. Acessar página de cadastro
2. Preencher formulário com dados válidos
3. Submeter cadastro
4. Verificar redirecionamento para login

**Resultado Esperado:** ✅ Usuário criado com sucesso

---

### TC10.2: Aviso de Irreversibilidade
**Objetivo:** Validar que o sistema exibe aviso claro sobre irreversibilidade

**Dados de Entrada:**
- Email: "joao.silva.teste@email.com"
- Senha: "Senha123@"

**Passos:**
1. Fazer login com credenciais de teste
2. Acessar configurações/perfil
3. Clicar em "Excluir Conta"
4. Observar modal/diálogo de confirmação

**Resultado Esperado:** ✅ Modal exibido com:
- Título destacado
- Mensagem clara sobre irreversibilidade
- Aviso em vermelho ou com ícone de alerta
- Botões "Cancelar" e "Confirmar"

---

### TC10.3: Confirmar com Senha Incorreta
**Objetivo:** Validar que sistema rejeita exclusão com senha errada

**Dados de Entrada:**
- Senha Inserida: "SenhaErrada123"
- Senha Correta: "Senha123@"

**Passos:**
1. Estar na tela de exclusão (após TC10.2)
2. Digitar senha incorreta no campo
3. Clicar em "Confirmar Exclusão"
4. Observar resposta do sistema

**Resultado Esperado:** ✅ Sistema exibe:
- Mensagem de erro "Senha incorreta"
- Modal permanece aberto
- Conta não é excluída
- Campo de senha é limpo

---

### TC10.4: Cancelar Exclusão de Conta
**Objetivo:** Validar que usuário pode cancelar exclusão

**Dados de Entrada:**
- Nenhum (apenas ação de cancelamento)

**Passos:**
1. Estar na tela de exclusão (após TC10.2)
2. Clicar em "Cancelar"
3. Observar retorno à tela anterior

**Resultado Esperado:** ✅ Sistema:
- Fecha modal/diálogo
- Retorna à tela de configurações
- Conta permanece ativa
- Usuário pode fazer login normalmente

---

### TC10.5: Excluir Conta com Sucesso
**Objetivo:** Validar exclusão completa de conta e dados

**Dados de Entrada:**
- Email: "joao.silva.teste@email.com"
- Senha: "Senha123@"

**Passos:**
1. Estar na tela de exclusão (após TC10.2)
2. Digitar senha correta
3. Clicar em "Confirmar Exclusão"
4. Aguardar processamento
5. Observar redirecionamento

**Resultado Esperado:** ✅ Sistema:
- Processa exclusão
- Redireciona para página de login
- Exibe mensagem de sucesso (opcional)
- Conta é removida do banco de dados

---

### TC10.6: Validar Exclusão Permanente
**Objetivo:** Confirmar que conta excluída não pode fazer login

**Dados de Entrada:**
- Email: "joao.silva.teste@email.com"
- Senha: "Senha123@"

**Passos:**
1. Estar na página de login
2. Preencher email da conta excluída
3. Preencher senha
4. Clicar em "Entrar"
5. Observar resposta do sistema

**Resultado Esperado:** ✅ Sistema:
- Rejeita login
- Exibe mensagem "Credenciais inválidas" ou "Usuário não encontrado"
- Não cria nova sessão
- Confirma exclusão permanente

---

## 8. Matriz de Rastreabilidade

| Caso de Teste | Requisito | Modo de Falha | Técnica | Prioridade |
|---------------|-----------|---------------|---------|-----------|
| TC10.1 | R10.1 | - | Setup | Alta |
| TC10.2 | R10.1 | F10.1 | PE | Alta |
| TC10.3 | R10.2, R10.3 | F10.2 | PE + BVA | Crítica |
| TC10.4 | R10.1 | F10.5 | PE | Alta |
| TC10.5 | R10.3, R10.4, R10.5 | F10.2, F10.3 | PE | Crítica |
| TC10.6 | R10.4, R10.5 | F10.4 | PE | Crítica |

---

## 9. Fluxo de Execução

```
┌─────────────────────────────────────────────────────────┐
│ TC10.1: Criar Usuário de Teste                          │
│ ✅ Usuário criado com sucesso                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ TC10.2: Aviso de Irreversibilidade                      │
│ ✅ Modal exibido com aviso claro                        │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐    ┌──────────────────┐
│ TC10.3:          │    │ TC10.4:          │
│ Senha Incorreta  │    │ Cancelar Exclusão│
│ ❌ Bloqueado     │    │ ✅ Conta Mantida │
└──────────────────┘    └──────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│ TC10.5: Excluir com Senha Correta                       │
│ ✅ Conta excluída, redirecionado para login             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ TC10.6: Validar Exclusão Permanente                     │
│ ✅ Login rejeitado, exclusão confirmada                 │
└─────────────────────────────────────────────────────────┘
```

---

## 10. Dados de Teste

### Usuário de Teste
```json
{
  "nome": "João Silva Teste",
  "email": "joao.silva.teste@email.com",
  "senha": "Senha123@"
}
```

### Senhas para Teste
```
Senha Correta: Senha123@
Senha Incorreta: SenhaErrada123
Senha Vazia: (campo vazio)
```

---

## 11. Critérios de Aceitação

✅ Sistema exibe aviso claro sobre irreversibilidade  
✅ Sistema solicita confirmação com senha  
✅ Sistema valida senha antes de excluir  
✅ Sistema remove conta completamente  
✅ Sistema remove dados associados  
✅ Sistema redireciona para login após exclusão  
✅ Sistema rejeita login com credenciais excluídas  
✅ Usuário pode cancelar exclusão a qualquer momento  

---

## 12. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Exclusão acidental | Crítico | Aviso claro + confirmação com senha |
| Dados não removidos | Crítico | Teste de banco de dados |
| Usuário consegue login | Crítico | Teste de login pós-exclusão |
| Modal não fecha | Médio | Teste de UI |
| Timeout na exclusão | Médio | Aguardar 5 segundos |

---

## 13. Ambiente de Teste

| Componente | Especificação |
|-----------|---------------|
| Navegador | Chrome 90+ |
| Sistema Operacional | Windows 10/11, macOS, Linux |
| Servidor | localhost:3000 |
| Banco de Dados | SQLite (desenvolvimento) |
| Ferramenta de Automação | Robot Framework 6.1.1 |

---

## 14. Conclusão

A modelagem de teste para US10 cobre todos os cenários críticos de exclusão de conta, utilizando técnicas de Partição de Equivalência e Análise de Valores Limites. Os testes garantem que a exclusão é permanente, segura e irreversível, protegendo tanto o usuário quanto o sistema.

**Status:** ✅ Modelagem Completa e Pronta para Automação

---

**Preparado por:** Kevin  
**Data:** 01/06/2026  
**Versão:** 1.0
