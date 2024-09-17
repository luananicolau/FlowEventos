'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/style/orgDash.module.css'; 

export default function DashboardOrganizador() {
  const [eventos, setEventos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEventos = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/eventos/listar', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEventos(data);
      } else {
        if (response.status === 401) {
          alert('Sessão expirada. Por favor, faça login novamente.');
          router.push('/auth/login');
        } else {
          alert('Erro ao carregar eventos');
        }
      }
    };

    fetchEventos();
  }, [router]);

  const handleCadastrarEvento = () => {
    router.push('/dashboard/cadastrar-evento');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login?message=Usuário deslogado');
  };

  const handleEditEvento = (id) => {
    router.push(`/dashboard/editar-evento/${id}`);
  };

  const handleDeleteEvento = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/eventos/deletar/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      setEventos(eventos.filter(evento => evento._id !== id));
    } else {
      alert('Erro ao deletar evento');
    }
  };

  return (
    <div className={styles.page}>
      <button onClick={() => router.push('/')} className={styles.backButton}>
        Voltar para Home
      </button>
      <div className={styles.formContainer}>
        <h1>Bem-vindo, Organizador!</h1>
        <button onClick={handleCadastrarEvento} className={styles.submitButton}>
          Cadastrar Evento
        </button>
        <button onClick={handleLogout} className={styles.submitButton} style={{ marginLeft: '10px' }}>
          Sair
        </button>

        <h2>Eventos</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Data de Início</th>
              <th>Capacidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map(evento => (
              <tr key={evento._id}>
                <td>{evento.titulo}</td>
                <td>{evento.descricao}</td>
                <td>{new Date(evento.dataInicio).toLocaleDateString()}</td>
                <td>{evento.capacidade}</td>
                <td>
                  <button onClick={() => handleEditEvento(evento._id)} className={styles.submitButton}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteEvento(evento._id)} className={styles.submitButton}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
