import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Adiciona Tailwind CSS
import './index.css';

// Importa o CSS global
const GlobalStyles = () => {
  const location = useLocation();

  // Rola para o topo quando a rota muda
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default GlobalStyles;
