*** Settings ***
Library           SeleniumLibrary

Suite Setup       Abrir navegador na aplicacao
Suite Teardown    Close Browser
Test Setup        Preparar lista com um item pendente

*** Variables ***
${URL}              http://localhost:5173
${BROWSER}          chrome

${BTN_EXCLUIR}      css=[data-testid="btn-excluir-item"]
${MODAL}            css=[data-testid="modal-excluir-item"]
${BTN_CONFIRMAR}    css=[data-testid="btn-confirmar-excluir"]
${BTN_CANCELAR}     xpath=//button[normalize-space()='Cancelar']

*** Test Cases ***
CT01 - Excluir item confirmando a acao
    [Documentation]    Particao P1: ao confirmar, o item e removido da lista
    Wait Until Element Is Visible        ${BTN_EXCLUIR}
    Click Element                        ${BTN_EXCLUIR}
    Wait Until Element Is Visible        ${MODAL}
    Click Element                        ${BTN_CONFIRMAR}
    Wait Until Page Does Not Contain Element    ${BTN_EXCLUIR}
    Page Should Contain                  Nenhum item pendente
    Page Should Not Contain              Arroz

CT02 - Cancelar a exclusao mantem o item
    [Documentation]    Particao P2: ao cancelar, o item permanece na lista
    Wait Until Element Is Visible        ${BTN_EXCLUIR}
    Click Element                        ${BTN_EXCLUIR}
    Wait Until Element Is Visible        ${MODAL}
    Click Element                        ${BTN_CANCELAR}
    Wait Until Page Does Not Contain Element    ${MODAL}
    Page Should Contain                  Arroz
    Element Should Be Visible            ${BTN_EXCLUIR}

*** Keywords ***
Abrir navegador na aplicacao
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

Preparar lista com um item pendente
    # Define usuario familia autenticado e um item pendente "Arroz" na lista
    Execute Javascript    window.localStorage.setItem('currentUser', JSON.stringify({nome:'Familiar',email:'familia@teste.com',role:'familia',token:'t'}))
    Execute Javascript    window.localStorage.setItem('cuidado_lista', JSON.stringify([{id:'item-1',nome:'Arroz',categoria:'Alimentação',urgencia:'Normal',obs:'',responsavel:'Joao',idoso:'Maria',status:'Pendente'}]))
    Reload Page
    Wait Until Element Is Visible    ${BTN_EXCLUIR}
