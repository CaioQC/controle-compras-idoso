# Testes Robot Framework - HdU 2 (Cadastro de Novo Item)

## Estrutura

- `hdu2_cadastro_item.robot` - Arquivo com os casos de teste em formato Robot Framework
- `hdu2_keywords.py` - Biblioteca Python com as keywords personalizadas para automação
- `requirements.txt` - Dependências Python necessárias

## Pré-requisitos

- Python 3.8 ou superior
- Google Chrome instalado
- Frontend rodando em `http://localhost:5173`

## Como rodar os testes

### 1. Instalar dependências

```bash
pip install -r requirements.txt
```

### 2. Subir o frontend (se ainda não estiver rodando)

```bash
cd front_end_usuario/tela-compras
npm run dev
```

### 3. Executar os testes

Na pasta `tests/robot`:

```bash
# Rodar todos os testes
robot hdu2_cadastro_item.robot

# Rodar um teste específico
robot --test "CT-02-01: Salvar item sem preencher nenhum campo" hdu2_cadastro_item.robot

# Rodar com relatório detalhado
robot --loglevel DEBUG hdu2_cadastro_item.robot
```

## Casos de Teste

- **CT-02-01**: Salvar item sem preencher nenhum campo
- **CT-02-02**: Salvar item sem informar o nome do idoso
- **CT-02-03**: Salvar item sem informar o familiar responsável
- **CT-02-04**: Cadastro de item com sucesso

## Relatórios

Após a execução, serão gerados:
- `log.html` - Log detalhado da execução
- `report.html` - Relatório resumido dos testes
- `output.xml` - Saída em formato XML
