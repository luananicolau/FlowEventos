'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditarEvento() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEvento = async () => {
      if (id) {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/eventos/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTitulo(data.titulo);
          setDescricao(data.descricao);
          setDataInicio(new Date(data.dataInicio).toISOString().slice(0, 16));
          setCapacidade(data.capacidade);
        } else {
          alert('Erro ao carregar evento');
        }
      }
    };

    fetchEvento();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch(`/api/eventos/atualizar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ titulo, descricao, dataInicio, capacidade })
    });

    if (response.ok) {
      setMessage('Evento atualizado com sucesso!');
      router.push('/dashboard/organizador');
    } else {
      const data = await response.json();
      setMessage(`Erro: ${data.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Editar Evento</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="datetime-local"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="number"
          placeholder="Capacidade"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button type="submit">Atualizar Evento</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
