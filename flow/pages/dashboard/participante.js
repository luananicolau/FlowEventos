'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/style/partiDash.module.css'; // Importa o CSS Módulo

export default function ParticipantDashboard() {
  const [userName, setUserName] = useState('');
  const [eventos, setEventos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Função para buscar os dados do usuário e eventos
    const fetchUserDataAndEvents = async () => {
      try {
        // Buscar dados do usuário
        const userResponse = await fetch('/api/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (userResponse.ok) {
          const user = await userResponse.json();
          setUserName(user.username); // Ajuste conforme o seu modelo
        } else {
          throw new Error('Erro ao obter dados do usuário');
        }

        // Buscar eventos
        const eventosResponse = await fetch('/api/eventos/listar', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (eventosResponse.ok) {
          const eventosData = await eventosResponse.json();
          setEventos(eventosData);
        } else {
          throw new Error('Erro ao obter eventos');
        }
      } catch (error) {
        console.error('Erro:', error);
        router.push('/auth/login');
      }
    };

    fetchUserDataAndEvents();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login?message=Usuario deslogado');
  };

  const renderEvents = (events) => (
    events.length > 0 ? (
      events.map(evento => (
        <div key={evento._id} className={styles.card}>
          <h3 className={styles.cardTitle}>{evento.titulo}</h3>
          <p>{evento.descricao}</p>
          <p>Data de Início: {new Date(evento.dataInicio).toLocaleDateString()}</p>
          <p>Capacidade: {evento.capacidade}</p>
          <button className={styles.subscribeButton}>Inscrever-se</button>
        </div>
      ))
    ) : (
      <div className={styles.emptyCard}>
        Você não tem eventos aqui
      </div>
    )
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo, Participante!</h1>
      <button className={styles.logoutButton} onClick={handleLogout}>Sair</button>
      <h2 className={styles.eventsTitle}>Eventos Confirmados</h2>
      <div className={styles.eventsContainer}>
        {renderEvents(eventos.filter(evento => evento.status === 'confirmado'))}
      </div>
      <h2 className={styles.eventsTitle}>Pode ser do seu Interesse</h2>
      <div className={styles.eventsContainer}>
        {renderEvents(eventos)}
      </div>
      <h2 className={styles.eventsTitle}>Eventos Passados</h2>
      <div className={styles.eventsContainer}>
        {renderEvents(eventos.filter(evento => evento.status === 'passado'))}
      </div>
    </div>
  );
}
