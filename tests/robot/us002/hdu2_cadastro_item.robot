*** Settings ***
Documentation     Testes para HdU-02 - Cadastro de Novo Item
Library           SeleniumLibrary
Suite Setup       Setup Testes
Suite Teardown    Fechar Navegador

*** Variables ***
${BASE_URL}       http://localhost:3000
${LOGIN_EMAIL}    admin@familia.com
${LOGIN_SENHA}    123456

*** Test Cases ***
CT-02-01 Salvar item sem preencher nenhum campo
    [Documentation]    Verifica se o sistema exibe erro ao tentar salvar item sem preencher campos
    [Tags]    HdU02    cadastro    validacao
    Ir Para Pagina    ${BASE_URL}
    Fazer Login    ${LOGIN_EMAIL}    ${LOGIN_SENHA}
    Clicar Em Salvar Item
    Verificar Mensagem Erro Nome Item

CT-02-02 Salvar item sem informar o nome do idoso
    [Documentation]    Verifica se o sistema exibe erro ao tentar salvar item sem nome do idoso
    [Tags]    HdU02    cadastro    validacao
    Ir Para Pagina    ${BASE_URL}
    Fazer Login    ${LOGIN_EMAIL}    ${LOGIN_SENHA}
    Preencher Nome Item    Leite
    Clicar Em Salvar Item
    Verificar Mensagem Erro Nome Idoso

CT-02-03 Salvar item sem informar o familiar responsável
    [Documentation]    Verifica se o sistema exibe erro ao tentar salvar item sem familiar responsável
    [Tags]    HdU02    cadastro    validacao
    Ir Para Pagina    ${BASE_URL}
    Fazer Login    ${LOGIN_EMAIL}    ${LOGIN_SENHA}
    Preencher Nome Item    Arroz
    Preencher Nome Idoso    Maria
    Clicar Em Salvar Item
    Verificar Mensagem Erro Familiar

CT-02-04 Cadastro de item com sucesso
    [Documentation]    Verifica se o item é salvo corretamente quando todos os campos são preenchidos
    [Tags]    HdU02    cadastro    sucesso
    Ir Para Pagina    ${BASE_URL}
    Fazer Login    ${LOGIN_EMAIL}    ${LOGIN_SENHA}
    Preencher Nome Item    Pão
    Preencher Nome Idoso    Maria
    Preencher Familiar Responsavel    João
    Clicar Em Salvar Item
    Verificar Item Na Lista    Pão

*** Keywords ***
Setup Testes
    Abrir Navegador
    Criar Idoso De Teste

Abrir Navegador
    Open Browser    ${BASE_URL}    chrome
    Set Selenium Implicit Wait    10s
    Maximize Browser Window

Fechar Navegador
    Close Browser

Criar Idoso De Teste
    Execute JavaScript    localStorage.setItem('idosos', JSON.stringify([{id: '1', nome: 'Maria'}]))

Ir Para Pagina
    [Arguments]    ${url}
    Go To    ${url}

Fazer Login
    [Arguments]    ${email}    ${senha}
    Wait Until Element Is Visible    css=[data-testid="login-email"]    10s
    Input Text    css=[data-testid="login-email"]    ${email}
    Input Text    css=[data-testid="login-senha"]    ${senha}
    Click Element    css=[data-testid="login-submit"]
    Wait Until Element Is Visible    css=.main-container    10s

Preencher Nome Item
    [Arguments]    ${nome}
    Input Text    css=[data-testid="nome-item"]    ${nome}

Preencher Nome Idoso
    [Arguments]    ${nome_idoso}
    Select From List By Value    css=[data-testid="select-idoso"]    ${nome_idoso}

Preencher Familiar Responsavel
    [Arguments]    ${familiar}
    Input Text    css=[data-testid="familiar-responsavel"]    ${familiar}

Clicar Em Salvar Item
    Click Element    css=[data-testid="salvar-item"]
    Wait Until Element Is Visible    css=.main-container    5s

Verificar Mensagem Erro Nome Item
    Element Should Be Visible    css=[data-testid="erro-nome-item"]

Verificar Mensagem Erro Nome Idoso
    Element Should Be Visible    css=[data-testid="erro-nome-idoso"]

Verificar Mensagem Erro Familiar
    Element Should Be Visible    css=[data-testid="erro-familiar-responsavel"]

Verificar Item Na Lista
    [Arguments]    ${nome_item}
    Wait Until Element Is Visible    css=.main-container    10s
    Page Should Contain    ${nome_item}
