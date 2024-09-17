'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/style/login.module.css'; // Importando o CSS

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token); // Armazena o token
        if (data.role === 'organizador') {
          router.push('/dashboard/organizador'); // Redireciona para o dashboard do organizador
        } else {
          router.push('/dashboard/participante'); // Redireciona para o dashboard do participante
        }
      } else {
        setMessage(`Erro: ${data.message}`);
      }
    } catch (error) {
      setMessage('Erro de conexão.');
    }
  };

  return (
    <div className={styles.page}>
      {/* Botão para voltar à Home */}
      <button 
        onClick={() => router.push('/')} 
        className={styles.backButton}
      >
        Voltar para Home
      </button>

      {/* Container do formulário */}
      <div className={styles.formContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.submitButton}
          >
            Login
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
