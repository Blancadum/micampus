import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SpringBootQuizGame from './SpringBootQuizGame.jsx';
import './SpringBootQuiz.css';

/**
 * ============================================================================
 * @file        SpringBootQuizPage.jsx
 * @description Página dedicada y apartada para la Arena de Tests, Juegos y
 *              Autoevaluación de Spring Boot. Coherente con el tema claro,
 *              limpio y de alto contraste de Campus.
 *              Totalmente libre de estilos inline; estilizado en SpringBootQuiz.css.
 * ============================================================================
 */
export default function SpringBootQuizPage() {
  const [searchParams] = useSearchParams();
  const tutoriaParam = searchParams.get('tutoria') || 'all';
  const modoParam = searchParams.get('modo') || 'quiz';

  return (
    <div className="quiz-page-container">
      {/* Barra de Miga de Pan (Breadcrumbs) */}
      <nav aria-label="Miga de pan" className="quiz-page-nav">
        <div className="quiz-page-nav-inner">
          <div className="quiz-breadcrumb-list">
            <Link to="/" className="quiz-breadcrumb-link">
              🏠 Inicio
            </Link>
            <span className="quiz-breadcrumb-sep">›</span>
            <Link to="/accenture" className="quiz-breadcrumb-link">
              Accenture
            </Link>
            <span className="quiz-breadcrumb-sep">›</span>
            <Link to="/java" className="quiz-breadcrumb-link">
              Java Hub
            </Link>
            <span className="quiz-breadcrumb-sep">›</span>
            <span className="quiz-breadcrumb-current">
              🎮 Arena de Tests & Juegos
            </span>
          </div>

          {/* Accesos Rápidos Complementarios */}
          <div className="quiz-quick-links">
            <Link
              to="/petete"
              className="quiz-quick-link quiz-quick-link-petete"
              title="Abrir la Guía Integrada Petete"
            >
              📖 Guía Petete
            </Link>
            <Link
              to="/java/studio/tutorias"
              className="quiz-quick-link quiz-quick-link-tutorias"
              title="Ver el código fuente de los 14 proyectos Java"
            >
              💻 Tutorías en Código
            </Link>
            <Link
              to="/java/springboot"
              className="quiz-quick-link quiz-quick-link-teoria"
              title="Consultar la Guía Teórica oficial de Spring Boot"
            >
              🧠 Teoría Spring Boot
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenido Principal con el Motor de Juegos y Tests */}
      <main className="quiz-page-main">
        <SpringBootQuizGame 
          key={`${tutoriaParam}-${modoParam}`}
          initialTutoriaId={tutoriaParam} 
          initialMode={modoParam}
          embeddedInPetete={false} 
        />
      </main>
    </div>
  );
}
