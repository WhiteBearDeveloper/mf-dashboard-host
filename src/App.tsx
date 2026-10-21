import React, { lazy, Suspense, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import type { DashboardDate } from "@whitebeardeveloper/contracts";
import { DateFilter, getDashboardDate } from "@whitebeardeveloper/ui";
import styles from "./App.module.scss";

const WeatherWidget = lazy(() => import("weatherWidget/WeatherWidget"));

function App() {
  const [selectedDate, setSelectedDate] = useState<DashboardDate>(() =>
    getDashboardDate(),
  );
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Боковая панель">
        <a className={styles.brand} href="#overview">
          <span className={styles.brandMark} aria-hidden="true">
            D
          </span>
          <span>Dayboard</span>
        </a>

        <nav className={styles.navigation} aria-label="Основная навигация">
          <a
            className={`${styles.navLink} ${styles.navLinkActive}`}
            href="#overview"
            aria-current="page"
          >
            <span className={styles.navIcon} aria-hidden="true">
              ⌂
            </span>
            <span>Обзор</span>
          </a>

          <a className={styles.navLink} href="#widgets">
            <span className={styles.navIcon} aria-hidden="true">
              ▦
            </span>
            <span>Виджеты</span>
          </a>
        </nav>

        <div className={styles.sidebarFooter}>
          <span>УЧЕБНЫЙ ПРОЕКТ</span>
          <strong>Module Federation</strong>
        </div>
      </aside>
      <main className={styles.main} id="overview">
        <header className={styles.pageHeader}>
          <p className={styles.eyebrow}>ПАНЕЛЬ УПРАВЛЕНИЯ</p>
          <h1>Добро пожаловать</h1>
          <p className={styles.pageDescription}>
            Соберите важные данные в одном месте.
          </p>
        </header>
        <section
          className={styles.widgetSection}
          id="widgets"
          aria-labelledby="widgets-title"
        >
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>РАБОЧЕЕ ПРОСТРАНСТВО</p>
              <h2 id="widgets-title">Мои виджеты</h2>
            </div>
            <span className={styles.widgetCount}>1 виджет</span>
          </div>
          <DateFilter value={selectedDate} onChange={setSelectedDate} />
          <ErrorBoundary fallback={<p>Виджет погоды временно недоступен.</p>}>
            <Suspense fallback={<p>Загружаем виджет погоды…</p>}>
              <WeatherWidget date={selectedDate} />
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
}

export default App;
