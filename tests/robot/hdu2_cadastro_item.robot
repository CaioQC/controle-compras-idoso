*** Settings ***
Library           SeleniumLibrary
Library           keywords.py

*** Variables ***
${BASE_URL}       http://localhost:3000
${LOGIN_EMAIL}    admin@familia.com
${LOGIN_SENHA}    123456

*** Test Cases ***
CT-02-01: Salvar item sem preencher nenhum campo
  [Documentation]    Verifica se o sistema exibe erro ao tentar salvar item sem preencher campos
  Abrir navegador e fazer login
  Clicar em salvar item sem preencher campos
  Verificar se erro nome item e exibido
  Fechar navegador

CT-02-02: Salvar item sem informar o nome do idoso
  [Documentation]    Verifica se o sistema exibe erro ao tentar salvar item sem nome do idoso
  Abrir navegador e fazer login
  Preencher nome do item    Leite
  Clicar em salvar item
  Verificar se erro nome idoso e exibido
  Fechar navegador

CT-02-03: Salvar item sem informar o familiar responsável
  [Documentation]    Verifica se o sistema exibe erro ao tentar salvar item sem familiar responsável
  Abrir navegador e fazer login
  Preencher nome do item    Arroz
  Preencher nome do idoso    Maria
  Clicar em salvar item
  Verificar se erro familiar responsavel e exibido
  Fechar navegador

CT-02-04: Cadastro de item com sucesso
  [Documentation]    Verifica se o item é salvo corretamente quando todos os campos são preenchidos
  Abrir navegador e fazer login
  Preencher nome do item    Pão
  Preencher nome do idoso    Maria
  Preencher familiar responsavel    João
  Clicar em salvar item
  Verificar se item foi adicionado na lista
  Fechar navegador

*** Keywords ***
Abrir navegador e fazer login
  Abrir navegador    ${BASE_URL}
  Preencher campo de login    ${LOGIN_EMAIL}    ${LOGIN_SENHA}
  Clicar em entrar

Clicar em salvar item sem preencher campos
  Clicar no botao salvar

Preencher nome do item
  [Arguments]    ${nome}
  Preencher campo nome item    ${nome}

Preencher nome do idoso
  [Arguments]    ${nome_idoso}
  Preencher campo nome idoso    ${nome_idoso}

Preencher familiar responsavel
  [Arguments]    ${familiar}
  Preencher campo familiar    ${familiar}

Clicar em salvar item
  Clicar no botao salvar
