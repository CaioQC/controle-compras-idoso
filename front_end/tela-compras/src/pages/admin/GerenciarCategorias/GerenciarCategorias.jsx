import React, { useState, useEffect } from 'react';
import './GerenciarCategorias.css';

export default function GerenciarCategorias({ onBack }) {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('categorias');
    if (saved) {
      setCategorias(JSON.parse(saved));
    } else {
      // Categorias padrão
      const padroes = [
        { id: '1', nome: 'Medicamento' },
        { id: '2', nome: 'Higiene Pessoal' },
        { id: '3', nome: 'Alimentação' },
        { id: '4', nome: 'Outros' }
      ];
      setCategorias(padroes);
      localStorage.setItem('categorias', JSON.stringify(padroes));
    }
  }, []);

  const handleAddCategoria = (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      setError('O nome da categoria é obrigatório');
      return;
    }

    const existe = categorias.some(c => c.nome.toLowerCase() === nome.trim().toLowerCase());
    if (existe) {
      setError('Esta categoria já existe');
      return;
    }

    const novaCategoria = {
      id: crypto.randomUUID(),
      nome: nome.trim()
    };

    const atualizadas = [...categorias, novaCategoria];
    setCategorias(atualizadas);
    localStorage.setItem('categorias', JSON.stringify(atualizadas));

    setNome('');
    setError('');
  };

  const handleDeleteCategoria = (id) => {
    const atualizadas = categorias.filter(c => c.id !== id);
    setCategorias(atualizadas);
    localStorage.setItem('categorias', JSON.stringify(atualizadas));
  };

  return (
    <div className="gerenciar-container">
      <div className="gerenciar-card">
        <header className="gerenciar-header">
          <h2>📁 Gerenciar Categorias</h2>
          <p>Cadastre categorias para organizar os itens de compra</p>
        </header>

        <div className="gerenciar-content">
          <form onSubmit={handleAddCategoria} className="gerenciar-form">
            <div className="input-group">
              <label htmlFor="nome-categoria">Nome da Categoria</label>
              <input
                id="nome-categoria"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Limpeza"
                className={error ? 'input-error' : ''}
                data-testid="input-nome-categoria"
              />
              {error && <p className="error-text" data-testid="erro-nome-categoria">{error}</p>}
            </div>

            <button type="submit" className="btn-add" data-testid="btn-adicionar-categoria">
              ➕ Adicionar Categoria
            </button>
          </form>

          <div className="categorias-list">
            <h3>Categorias Cadastradas ({categorias.length})</h3>
            {categorias.length === 0 ? (
              <p className="empty-msg">Nenhuma categoria cadastrada ainda.</p>
            ) : (
              <ul className="lista-categorias">
                {categorias.map(categoria => (
                  <li key={categoria.id} className="categoria-item" data-testid={`categoria-${categoria.id}`}>
                    <div className="categoria-info">
                      <strong>{categoria.nome}</strong>
                    </div>
                    <button
                      onClick={() => handleDeleteCategoria(categoria.id)}
                      className="btn-delete"
                      data-testid="btn-excluir-categoria"
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button onClick={onBack} className="btn-voltar" data-testid="btn-voltar">
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
