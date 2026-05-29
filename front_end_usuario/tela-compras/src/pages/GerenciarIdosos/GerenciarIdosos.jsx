import React, { useState, useEffect } from 'react';
import './GerenciarIdosos.css';

export default function GerenciarIdosos({ onBack }) {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [idosos, setIdosos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('idosos');
    if (saved) {
      setIdosos(JSON.parse(saved));
    }
  }, []);

  const handleAddIdoso = (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      setError('O nome do idoso é obrigatório');
      return;
    }

    if (nome.trim().split(' ').length < 2) {
      setError('Informe nome e sobrenome');
      return;
    }

    const novoIdoso = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      dataCadastro: new Date().toISOString()
    };

    const atualizados = [...idosos, novoIdoso];
    setIdosos(atualizados);
    localStorage.setItem('idosos', JSON.stringify(atualizados));

    setNome('');
    setError('');
  };

  const handleDeleteIdoso = (id) => {
    const atualizados = idosos.filter(i => i.id !== id);
    setIdosos(atualizados);
    localStorage.setItem('idosos', JSON.stringify(atualizados));
  };

  return (
    <div className="gerenciar-container">
      <div className="gerenciar-card">
        <header className="gerenciar-header">
          <h2>👴 Gerenciar Idosos</h2>
          <p>Cadastre os idosos assistidos pelo sistema</p>
        </header>

        <div className="gerenciar-content">
          <form onSubmit={handleAddIdoso} className="gerenciar-form">
            <div className="input-group">
              <label htmlFor="nome-idoso">Nome do Idoso</label>
              <input
                id="nome-idoso"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: João Silva"
                className={error ? 'input-error' : ''}
                data-testid="input-nome-idoso"
              />
              {error && <p className="error-text" data-testid="erro-nome-idoso">{error}</p>}
            </div>

            <button type="submit" className="btn-add" data-testid="btn-adicionar-idoso">
              ➕ Adicionar Idoso
            </button>
          </form>

          <div className="idosos-list">
            <h3>Idosos Cadastrados ({idosos.length})</h3>
            {idosos.length === 0 ? (
              <p className="empty-msg">Nenhum idoso cadastrado ainda.</p>
            ) : (
              <ul className="lista-idosos">
                {idosos.map(idoso => (
                  <li key={idoso.id} className="idoso-item" data-testid={`idoso-${idoso.id}`}>
                    <div className="idoso-info">
                      <strong>{idoso.nome}</strong>
                      <span className="idoso-date">
                        Cadastrado em: {new Date(idoso.dataCadastro).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteIdoso(idoso.id)}
                      className="btn-delete"
                      data-testid="btn-excluir-idoso"
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
