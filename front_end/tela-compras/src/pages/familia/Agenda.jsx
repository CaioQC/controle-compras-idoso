import React, { useState } from 'react';
import './Agenda.css';

const Agenda = ({ appointments, onAddAppointment, onDeleteAppointment }) => {
  const [formData, setFormData] = useState({
    especialidade: '',
    hospital: '',
    data: '',
    hora: '',
    idoso: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.especialidade || !formData.data || !formData.idoso) return;
    
    onAddAppointment({
      id: crypto.randomUUID(),
      ...formData
    });
    
    setFormData({ especialidade: '', hospital: '', data: '', hora: '', idoso: '' });
  };

  return (
    <section className="agenda-container">
      <h2>Agenda de Consultas</h2>
      <form onSubmit={handleSubmit} className="agenda-form">
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Especialidade (Ex: Cardiologista)"
            value={formData.especialidade}
            onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
          />
        </div>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Hospital / Clínica"
            value={formData.hospital}
            onChange={(e) => setFormData({...formData, hospital: e.target.value})}
          />
        </div>
        <div className="row-group">
          <input 
            type="date" 
            value={formData.data}
            onChange={(e) => setFormData({...formData, data: e.target.value})}
          />
          <input 
            type="time" 
            value={formData.hora}
            onChange={(e) => setFormData({...formData, hora: e.target.value})}
          />
        </div>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Nome do Idoso"
            value={formData.idoso}
            onChange={(e) => setFormData({...formData, idoso: e.target.value})}
          />
        </div>
        <button type="submit" className="btn-agenda">Marcar Consulta</button>
      </form>

      <ul className="appointment-list">
        {appointments.map(appo => (
          <li key={appo.id} className="appointment-card">
            <div>
              <strong>{appo.especialidade}</strong> - {appo.idoso}
              <p>{appo.hospital}</p>
              <span>📅 {appo.data.split('-').reverse().join('/')} às {appo.hora}</span>
            </div>
            <button onClick={() => onDeleteAppointment(appo.id)} className="btn-delete">X</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Agenda;