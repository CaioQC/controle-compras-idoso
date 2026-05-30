import React, { useState, useEffect } from 'react';
import Cadastro from './Cadastro';
import Lista from './Lista';
import Agenda from './Agenda';

export default function Home({ onLogout, onConfig, onDeleteAccount }) {
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('cuidado_lista');
    return saved ? JSON.parse(saved) : [];
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('cuidado_agenda');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cuidado_lista', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('cuidado_agenda', JSON.stringify(appointments));
  }, [appointments]);

  const handleAddItem = (data) => {
    setShoppingList([...shoppingList, { id: crypto.randomUUID(), ...data, status: 'Pendente' }]);
  };

  const handleToggleStatus = (id) => {
    setShoppingList(
      shoppingList.map(item => item.id === id ? { ...item, status: 'Comprado' } : item)
    );
  };

  const handleArchiveItem = (id) => {
    setShoppingList(
      shoppingList.map(item => item.id === id ? { ...item, status: 'Arquivado' } : item)
    );
  };

  const handleDeleteItem = (id) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const handleAddAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(item => item.id !== id));
  };

  return (
    <main className="main-container">
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div className="header-icon-wrapper">
              <span className="header-heart">❤</span>
            </div>
            <h1 style={{ margin: 0 }}>Controle de Suprimentos do Idoso</h1>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={onConfig}
              className="btn-config"
              data-testid="btn-configuracoes"
            >
              ⚙️
            </button>
            <button
              onClick={onLogout}
              className="btn-sair"
              data-testid="btn-sair-principal"
            >
              Sair
            </button>
          </div>
        </div>
        <p>Gestão de Farmácia e Mercado</p>
      </header>

      <Cadastro onAddItem={handleAddItem} />

      <Lista
        itens={shoppingList.filter(item => item.status !== 'Arquivado')}
        onToggleStatus={handleToggleStatus}
        onArchive={handleArchiveItem}
        onDelete={handleDeleteItem}
      />

      <Agenda
        appointments={appointments}
        onAddAppointment={handleAddAppointment}
        onDeleteAppointment={handleDeleteAppointment}
      />
    </main>
  );
}
