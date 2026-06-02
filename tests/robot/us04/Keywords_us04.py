from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class Keywords_us04(object):
    ROBOT_LIBRARY_SCOPE = 'SUITE'

    def __init__(self):
        self.driver = None

    # ── Navegador ──────────────────────────────────────────────────────────────

    def abrir_navegador(self, url):
        self.driver = webdriver.Chrome()
        self.driver.get(url)
        self.driver.maximize_window()

    def fechar_navegador(self):
        if self.driver:
            self.driver.quit()

    # ── Login ──────────────────────────────────────────────────────────────────

    def fazer_login_admin(self, email, senha):
        wait = WebDriverWait(self.driver, 10)
        email_input = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="login-email"]')))
        email_input.clear()
        email_input.send_keys(email)
        self.driver.find_element(By.CSS_SELECTOR, '[data-testid="login-senha"]').send_keys(senha)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="login-submit"]'))).click()
        time.sleep(1)
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.main-container')))

    # ── Navegação ──────────────────────────────────────────────────────────────

    def ir_para_gerenciar_categorias(self):
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btn-gerenciar-categorias"]'))).click()
        time.sleep(0.5)

    def voltar_para_painel_admin(self):
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btn-voltar"]'))).click()
        time.sleep(0.5)

    # ── Ações na tela de categorias ────────────────────────────────────────────

    def preencher_nome_categoria(self, nome):
        wait = WebDriverWait(self.driver, 10)
        campo = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="input-nome-categoria"]')))
        campo.clear()
        campo.send_keys(nome)

    def clicar_em_adicionar_categoria(self):
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btn-adicionar-categoria"]'))).click()
        time.sleep(0.5)

    def excluir_categoria_por_nome(self, nome):
        """Clica no botão excluir da categoria com o nome especificado."""
        wait = WebDriverWait(self.driver, 10)
        lista = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.lista-categorias')))
        itens = lista.find_elements(By.CSS_SELECTOR, '.categoria-item')
        for item in itens:
            strong = item.find_element(By.TAG_NAME, 'strong')
            if nome.lower() in strong.text.lower():
                item.find_element(By.CSS_SELECTOR, '[data-testid="btn-excluir-categoria"]').click()
                time.sleep(0.5)
                return
        raise AssertionError(f"Categoria '{nome}' não encontrada para exclusão")

    # ── Verificações ───────────────────────────────────────────────────────────

    def verificar_categoria_na_lista(self, nome):
        wait = WebDriverWait(self.driver, 10)
        lista = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.lista-categorias')))
        itens = lista.find_elements(By.TAG_NAME, 'strong')
        for item in itens:
            if nome.lower() in item.text.lower():
                return True
        raise AssertionError(f"Categoria '{nome}' não encontrada na lista")

    def verificar_mensagem_erro_categoria(self, mensagem):
        wait = WebDriverWait(self.driver, 10)
        erro = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="erro-nome-categoria"]')))
        if mensagem.lower() in erro.text.lower():
            return True
        raise AssertionError(f"Mensagem de erro esperada não encontrada: '{mensagem}'")
