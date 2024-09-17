'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/style/editarEvento.module.css'; // Caminho correto para o CSS

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
        try {
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
        } catch (error) {
          console.error('Erro ao buscar evento:', error);
          alert('Erro ao carregar evento');
        }
      }
    };

    fetchEvento();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
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
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      setMessage('Erro ao atualizar evento');
    }
  };

  const handleBack = () => {
    router.push('/dashboard/organizador'); // Redireciona de volta para a dashboard
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.backButton}>Voltar à Dashboard</button>
      
      <form className={styles.form} onSubmit={handleUpdate}>
      <h1 className={styles.title}>Editar Evento</h1>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className={styles.textarea}
        />
        <input
          type="datetime-local"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Capacidade"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Atualizar Evento</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
