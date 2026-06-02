*** Settings ***
Library           SeleniumLibrary

Suite Setup       Abrir navegador na aplicacao
Suite Teardown    Close Browser
Test Setup        Preparar tela da familia com idoso disponivel

*** Variables ***
${URL}                http://localhost:5173
${BROWSER}            chrome

${INPUT_NOME}         css=[data-testid="nome-item"]
${SELECT_IDOSO}       css=[data-testid="select-idoso"]
${INPUT_RESPONSAVEL}  css=[data-testid="familiar-responsavel"]
${BOTAO_SALVAR}       css=[data-testid="salvar-item"]
${ERRO_NOME}          css=[data-testid="erro-nome-item"]
${ERRO_IDOSO}         css=[data-testid="erro-nome-idoso"]
${ERRO_RESPONSAVEL}   css=[data-testid="erro-familiar-responsavel"]

*** Test Cases ***
CT01 - Cadastrar item com todos os campos preenchidos
    [Documentation]    Regra R1: nome, idoso e responsavel preenchidos -> item cadastrado
    Input Text                   ${INPUT_NOME}           Pao
    Select From List By Label    ${SELECT_IDOSO}         Maria
    Input Text                   ${INPUT_RESPONSAVEL}    Joao
    Click Element                ${BOTAO_SALVAR}
    Wait Until Page Contains     Pao
    Page Should Contain          Pao

CT02 - Nao cadastrar item sem o nome
    [Documentation]    Regra R2: nome vazio -> erro de nome obrigatorio
    Select From List By Label    ${SELECT_IDOSO}         Maria
    Input Text                   ${INPUT_RESPONSAVEL}    Joao
    Click Element                ${BOTAO_SALVAR}
    Wait Until Element Is Visible    ${ERRO_NOME}
    Element Text Should Be       ${ERRO_NOME}    O nome do item é obrigatório

CT03 - Nao cadastrar item sem o idoso
    [Documentation]    Regra R3: idoso nao selecionado -> erro de idoso obrigatorio
    Input Text                   ${INPUT_NOME}           Arroz
    Input Text                   ${INPUT_RESPONSAVEL}    Joao
    Click Element                ${BOTAO_SALVAR}
    Wait Until Element Is Visible    ${ERRO_IDOSO}
    Element Text Should Be       ${ERRO_IDOSO}    O nome do idoso é obrigatório

CT04 - Nao cadastrar item sem o familiar responsavel
    [Documentation]    Regra R4: responsavel vazio -> erro de responsavel obrigatorio
    Input Text                   ${INPUT_NOME}           Leite
    Select From List By Label    ${SELECT_IDOSO}         Maria
    Click Element                ${BOTAO_SALVAR}
    Wait Until Element Is Visible    ${ERRO_RESPONSAVEL}
    Element Text Should Be       ${ERRO_RESPONSAVEL}    O nome do familiar responsável é obrigatório

*** Keywords ***
Abrir navegador na aplicacao
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

Preparar tela da familia com idoso disponivel
    # Define um usuario familia autenticado e um idoso "Maria" no dropdown, e limpa a lista
    Execute Javascript    window.localStorage.setItem('currentUser', JSON.stringify({nome:'Familiar',email:'familia@teste.com',role:'familia',token:'t'}))
    Execute Javascript    window.localStorage.setItem('idosos', JSON.stringify([{id:'1',nome:'Maria'}]))
    Execute Javascript    window.localStorage.removeItem('cuidado_lista')
    Reload Page
    Wait Until Element Is Visible    ${INPUT_NOME}
