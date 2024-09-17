'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/style/CadEvento.module.css'; // Adicione o caminho correto para o arquivo CSS

export default function CadastrarEvento() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleCadastrar = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Obtém o token do armazenamento local

    const response = await fetch('/api/eventos/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Inclui o token no header
      },
      body: JSON.stringify({ titulo, descricao, dataInicio, capacidade })
    });

    if (response.ok) {
      setMessage('Evento cadastrado com sucesso!');
      router.push('/dashboard/organizador'); // Redireciona para a dashboard do organizador
    } else {
      const data = await response.json();
      setMessage(`Erro: ${data.message}`);
    }
  };

  const handleBack = () => {
    router.push('/dashboard/organizador'); // Redireciona de volta para a dashboard
  };

  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <button onClick={handleBack} className={styles.backButton}>Voltar à Dashboard</button>
        <h2>Cadastrar Evento</h2>
        <form onSubmit={handleCadastrar}>
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
            className={styles.datetime}
          />
          <input
            type="number"
            placeholder="Capacidade"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
            className={styles.number}
          />
          <button
            type="submit"
            className={styles.submitButton}
          >
            Cadastrar
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
