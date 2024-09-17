'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/style/register.module.css'; // Importando o CSS

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('participante'); // Valor padrão
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
        });

        if (response.ok) {
            setMessage('Usuário cadastrado com sucesso!');
            router.push('/auth/login'); // Redireciona para a página de login após o sucesso
        } else {
            const data = await response.json();
            setMessage(`Erro: ${data.message}`);
        }
    };

    return (
        <div className={styles.page}>
            {/* Botão para voltar à Home */}
            <button 
                onClick={() => router.push('/')} 
                className={styles.backButton} // Atualizado para o nome correto da classe
            >
                Voltar para Home
            </button>

            {/* Container do formulário */}
            <div className={styles.formContainer}>
                <h2>Cadastro de Usuário</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={styles.select}
                    >
                        <option value="participante">Participante</option>
                        <option value="organizador">Organizador</option>
                    </select>
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
