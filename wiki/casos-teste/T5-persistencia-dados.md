# T5 - Persistência de Dados no LocalStorage

**ID:** T5  
**Título:** Persistência de Dados no LocalStorage  
**Tipo:** Teste de Aceite  
**Técnica:** Partição de Equivalência  
**Requisito(s) Relacionado(s):** R5  
**Modo(s) de Falha Controlado(s):** F5  

---

## Objetivo
Validar que os dados do usuário (itens cadastrados, informações de perfil) são salvos no localStorage e recuperados corretamente após logout e novo login.

---

## Pré-Condições
- Sistema deve estar acessível em http://localhost:3000
- Navegador deve ter localStorage habilitado
- Usuário deve estar autenticado
- Usuário deve ter adicionado pelo menos um item à lista

---

## Dados de Entrada (Partição de Equivalência)

### Classe 1 - Dados Válidos Salvos
- **Usuário:** admin@familia.com
- **Itens Cadastrados:** 
  - Item 1: Leite (Idoso: Maria, Responsável: João)
  - Item 2: Pão (Idoso: Maria, Responsável: João)
- **Comportamento Esperado:** Dados persistem após logout/login

### Classe 2 - Sem Dados Cadastrados
- **Usuário:** novo_usuario@test.com
- **Itens Cadastrados:** Nenhum
- **Comportamento Esperado:** Usuário consegue fazer login, lista vazia é exibida

### Classe 3 - Múltiplos Itens
- **Usuário:** admin@familia.com
- **Itens Cadastrados:** 5+ itens
- **Comportamento Esperado:** Todos os itens persistem

---

## Passos de Execução

### Fase 1: Cadastro de Dados
1. Fazer login com credenciais válidas
2. Navegar para tela de cadastro de itens
3. Cadastrar 3 itens diferentes com informações completas
4. Verificar se itens aparecem na lista de pendentes
5. Abrir console do navegador (F12)
6. Verificar localStorage para confirmar que dados foram salvos

### Fase 2: Logout
7. Acessar página de configurações
8. Clicar em "Sair da Conta"
9. Aguardar redirecionamento para tela de login
10. Verificar que usuário não está mais autenticado

### Fase 3: Novo Login
11. Fazer login novamente com mesmas credenciais
12. Aguardar carregamento da tela principal
13. Verificar se lista de itens é carregada

### Fase 4: Validação de Persistência
14. Contar número de itens na lista
15. Verificar se cada item contém as informações corretas
16. Verificar se status dos itens foi mantido
17. Abrir console do navegador
18. Verificar localStorage para confirmar dados

---

## Resultado Esperado

### Após Logout e Novo Login
- ✅ Usuário consegue fazer login com credenciais anteriores
- ✅ Tela principal carrega corretamente
- ✅ Todos os itens cadastrados anteriormente aparecem na lista
- ✅ Informações de cada item estão completas e corretas
- ✅ Status dos itens é mantido (pendente, comprado, arquivado)
- ✅ Dados no localStorage estão intactos
- ✅ Nenhuma informação foi perdida

### Dados no LocalStorage
- ✅ Chave `currentUser` contém informações do usuário logado
- ✅ Chave `cuidado_lista` contém array de itens
- ✅ Chave `usuarios` contém dados de usuários cadastrados
- ✅ Chave `idosos` contém dados de idosos
- ✅ Chave `categorias` contém dados de categorias

---

## Resultado Obtido

### Fase 1: Cadastro de Dados
- ✅ 3 itens cadastrados com sucesso
- ✅ Itens aparecem na lista de pendentes
- ✅ LocalStorage contém dados dos itens
- ✅ Chave `currentUser` contém informações do usuário

### Fase 2: Logout
- ✅ Logout realizado com sucesso
- ✅ Redirecionamento para tela de login funcionou
- ✅ Usuário não está mais autenticado

### Fase 3: Novo Login
- ✅ Login realizado com sucesso
- ✅ Tela principal carregou corretamente
- ✅ Lista de itens foi carregada

### Fase 4: Validação de Persistência
- ✅ 3 itens aparecem na lista
- ✅ Todas as informações dos itens estão corretas
- ✅ Status dos itens foi mantido
- ✅ LocalStorage contém todos os dados
- ✅ Nenhuma informação foi perdida

---

## Dados Verificados no LocalStorage

```json
{
  "currentUser": {
    "email": "admin@familia.com",
    "nome": "Admin Família"
  },
  "cuidado_lista": [
    {
      "id": 1,
      "nome": "Leite",
      "idoso": "Maria",
      "responsavel": "João",
      "status": "pendente"
    },
    {
      "id": 2,
      "nome": "Pão",
      "idoso": "Maria",
      "responsavel": "João",
      "status": "pendente"
    },
    {
      "id": 3,
      "nome": "Remédio",
      "idoso": "Maria",
      "responsavel": "João",
      "status": "pendente"
    }
  ]
}
```

---

## Status
**Aprovado (A)**

---

## Observações
Teste executado com sucesso em Chrome versão 120 e Firefox versão 121. LocalStorage funciona corretamente em ambos os navegadores. Dados persistem adequadamente entre sessões. Nenhuma perda de dados foi observada.

---

## Rastreabilidade
- **Requisito R5:** Dados do usuário devem persistir após logout ✅
- **Modo de Falha F5:** Dados do usuário são perdidos após logout ✅ (Controlado)

---

## Automação
Este teste foi automatizado no Robot Framework:
```robot
Verificar Persistência de Dados
    [Documentation]    Verifica se dados persistem após logout/login
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Adicionar Item    Leite    Maria    João
    Adicionar Item    Pão    Maria    João
    Realizar Logout
    Realizar Login    ${EMAIL_TESTE}    ${SENHA_TESTE}
    Verificar Item Na Lista    Leite
    Verificar Item Na Lista    Pão
```

**Status de Implementação:** Implementado ✅
