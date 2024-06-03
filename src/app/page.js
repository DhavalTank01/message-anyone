"use client";
import styles from "./page.module.css";
import { AlertProvider } from "./hooks/useAlert";
import HomePage from "./HomePage";
import customTheme from "./theme";
import { ThemeProvider } from '@mui/material/styles';

const Home = () => {

  return (
    <AlertProvider>
      <main className={styles.main}>
        <HomePage />
      </main>
    </AlertProvider>
  );
}

export default Home;