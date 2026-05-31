import React, { useState } from 'react';
import './Lista.css';

const Lista = ({ itens, onToggleStatus, onArchive, onDelete }) => {
  const [abaAtiva, setAbaAtiva] = useState('pendentes');
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  
  const pendentes = itens.filter(item => item.status === 'Pendente');
  const comprados = itens.filter(item => item.status === 'Comprado');

  return (
    <section className="lista-container">
      <div className="tabs-container">
        <button 
          className={`tab-button ${abaAtiva === 'pendentes' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('pendentes')}
        >
          📋 Itens Pendentes ({pendentes.length})
        </button>
        <button 
          className={`tab-button ${abaAtiva === 'historico' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('historico')}
        >
          ✅ Histórico de Comprados ({comprados.length})
        </button>
      </div>

      <div className="tab-content">
        {abaAtiva === 'pendentes' && (
          <div className="tab-panel">
            {pendentes.length === 0 ? (
              <p className="empty-msg">Nenhum item pendente no momento.</p>
            ) : (
              <ul className="lista" data-testid="itens-pendentes">
                {pendentes.map(item => (
                  <li key={item.id} className="item-card pendente" data-testid={`item-pendente-${item.id}`}>
                    <div className="item-info">
                      <strong>{item.nome}</strong> 
                      {item.idoso && <span className="badge-idoso">👴 {item.idoso}</span>}
                      <br />
                      <span className="categoria-text">({item.categoria})</span>
                      {item.urgencia === 'Urgente' && <span className="badge-urgente">🚨 Urgente</span>}
                      {item.obs && <p className="item-obs">Obs: {item.obs}</p>}
                      
                      {item.responsavel && (
                        <p className="item-responsavel">
                          👤 Por: {item.responsavel}
                        </p>
                      )}
                    </div>
                    <div className="item-actions">
                      <button onClick={() => onToggleStatus(item.id)} className="btn-comprado" data-testid="btn-marcar-comprado">
                        ✓ Comprado
                      </button>
                      <button onClick={() => setItemParaExcluir(item)} className="btn-excluir" data-testid="btn-excluir-item">
                        🗑️ Excluir
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {abaAtiva === 'historico' && (
          <div className="tab-panel">
            {comprados.length === 0 ? (
              <p className="empty-msg">Nenhum item comprado ainda.</p>
            ) : (
              <ul className="lista" data-testid="lista-comprados">
                {comprados.map(item => (
                  <li key={item.id} className="item-card comprado" data-testid={`item-comprado-${item.id}`}>
                    <div className="item-info">
                      <strong className="item-comprado-nome">{item.nome}</strong>
                      {item.idoso && <span className="badge-idoso-small">({item.idoso})</span>}
                      {item.responsavel && (
                        <p className="item-responsavel-comprado">
                          👤 Familiar: {item.responsavel}
                        </p>
                      )}
                    </div>
                    <div className="item-actions">
                      <button onClick={() => onArchive(item.id)} className="btn-arquivar" data-testid="btn-arquivar">
                        📦 Arquivar
                      </button>
                      <button onClick={() => setItemParaExcluir(item)} className="btn-excluir" data-testid="btn-excluir-historico">
                        🗑️ Excluir
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {itemParaExcluir && (
        <div className="modal-overlay" data-testid="modal-excluir-item">
          <div className="modal-content">
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir o item "<strong>{itemParaExcluir.nome}</strong>"?</p>
            <p className="modal-warning">Esta ação não pode ser desfeita.</p>
            <div className="modal-actions">
              <button onClick={() => setItemParaExcluir(null)} className="btn-cancelar">
                Cancelar
              </button>
              <button
                onClick={() => {
                  onDelete(itemParaExcluir.id);
                  setItemParaExcluir(null);
                }}
                className="btn-confirmar-excluir"
                data-testid="btn-confirmar-excluir"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Lista;