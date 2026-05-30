import React, { useState, useEffect } from 'react';
import './Cadastro.css';

const Cadastro = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    urgencia: 'Normal',
    obs: '',
    responsavel: '',
    idoso: ''
  });

  const [errors, setErrors] = useState({ nome: '', idoso: '', responsavel: '' });
  const [idosos, setIdosos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const savedIdosos = localStorage.getItem('idosos');
    if (savedIdosos) {
      setIdosos(JSON.parse(savedIdosos));
    }

    const savedCategorias = localStorage.getItem('categorias');
    if (savedCategorias) {
      setCategorias(JSON.parse(savedCategorias));
    } else {
      setCategorias([
        { id: '1', nome: 'Medicamento' },
        { id: '2', nome: 'Higiene Pessoal' },
        { id: '3', nome: 'Alimentação' },
        { id: '4', nome: 'Outros' }
      ]);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = { nome: '', idoso: '', responsavel: '' };
    let hasError = false;

    if (!formData.nome.trim()) {
      newErrors.nome = 'O nome do item é obrigatório';
      hasError = true;
    }
    if (!formData.idoso.trim()) {
      newErrors.idoso = 'O nome do idoso é obrigatório';
      hasError = true;
    }
    if (!formData.responsavel.trim()) {
      newErrors.responsavel = 'O nome do familiar responsável é obrigatório';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    onAddItem(formData);
    setFormData({ nome: '', categoria: '', urgencia: 'Normal', obs: '', responsavel: '', idoso: '' });
    setErrors({ nome: '', idoso: '', responsavel: '' });
  };

  return (
    <section className="cadastro-container">
      <h2>Cadastrar Novo Item</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        
        <div className="input-group">
          <div className="input-with-icon">
            <span className="field-icon">📦</span>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Nome do item (Ex: Losartana 50mg)"
              className={errors.nome ? 'input-error' : ''}
              data-testid="nome-item"
            />
          </div>
          {errors.nome && <p className="error-text" data-testid="erro-nome-item">{errors.nome}</p>}
        </div>

        <div className="input-group">
          <div className="input-with-icon">
            <span className="field-icon">👴</span>
            <select
              name="idoso"
              value={formData.idoso}
              onChange={handleInputChange}
              className={errors.idoso ? 'input-error' : ''}
              data-testid="select-idoso"
            >
              <option value="">Selecione o idoso</option>
              {idosos.map(idoso => (
                <option key={idoso.id} value={idoso.nome}>{idoso.nome}</option>
              ))}
            </select>
          </div>
          {errors.idoso && <p className="error-text" data-testid="erro-nome-idoso">{errors.idoso}</p>}
        </div>

        <div className="input-group">
          <div className="input-with-icon">
            <span className="field-icon">👤</span>
            <input
              type="text"
              name="responsavel"
              value={formData.responsavel}
              onChange={handleInputChange}
              placeholder="Seu nome (Familiar responsável)"
              className={errors.responsavel ? 'input-error' : ''}
              data-testid="familiar-responsavel"
            />
          </div>
          {errors.responsavel && <p className="error-text" data-testid="erro-familiar-responsavel">{errors.responsavel}</p>}
        </div>

        <div className="row-group">
          <div className="input-with-icon">
            <span className="field-icon">📁</span>
            <select name="categoria" value={formData.categoria} onChange={handleInputChange} data-testid="select-categoria">
              <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.nome}>{cat.nome}</option>
              ))}
            </select>
          </div>

          <div className="input-with-icon">
            <span className="field-icon">⚡</span>
            <select name="urgencia" value={formData.urgencia} onChange={handleInputChange}>
              <option value="Normal">Normal</option>
              <option value="Urgente">🚨 Urgente (Acabou!)</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <div className="input-with-icon">
            <span className="field-icon">📝</span>
            <input
              type="text"
              name="obs"
              value={formData.obs}
              onChange={handleInputChange}
              placeholder="Observações adicionais"
            />
          </div>
        </div>

        <button type="submit" data-testid="salvar-item">
          Salvar Item
        </button>
      </form>
    </section>
  );
};

export default Cadastro;