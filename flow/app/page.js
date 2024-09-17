"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login'); // Redireciona para a página de login
  };

  const handleRegister = () => {
    router.push('/auth/register'); // Redireciona para a página de cadastro
  };

  return (
    <div className={styles.page}>
      {/* Navbar com botões de Cadastro e Login */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <h1>Flow</h1>
          <div className={styles.navButtons}>
            <button className={styles.navButton} onClick={handleRegister}>
              Cadastro
            </button>
            <button className={styles.navButton} onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Espaço principal da página */}
      <main className={styles.main}>
        {/* Espaço à esquerda para a imagem */}
        <div className={styles.imageContainer}>
        </div>

        {/* Conteúdo principal */}
        <div className={styles.content}>
          <h2>Bem-vindo ao Flow Eventos</h2>
          <p>
           Temos como compromisso facilitar o gerenciamento de inscrição em eventos.
          </p>
        </div>
      </main>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <p>© 2024 Flow. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
