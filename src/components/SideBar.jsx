import React from "react";
import { Link } from "react-router";
import { FaRocket, FaChartLine, FaBook } from "react-icons/fa";
import Sidebar from "react-sidebar"; // Importe o Sidebar corretamente

export const SideBar = ({ sidebarOpen, setSidebarOpen, children }) => {
  return (
    <Sidebar
      sidebar={
        <div className="w-64 h-full bg-card p-4 shadow-lg">
          {/* Menu Personalizado */}
          <div className="space-y-2">
            {/* Link Rápido 1 */}
            <Link
              to="/quick-link-1"
              className="flex items-center p-2 text-text hover:bg-accent hover:text-white rounded-lg transition-colors duration-200"
            >
              <FaRocket className="mr-2" />
              Link Rápido 1
            </Link>

            {/* Link Rápido 2 */}
            <Link
              to="/quick-link-2"
              className="flex items-center p-2 text-text hover:bg-accent hover:text-white rounded-lg transition-colors duration-200"
            >
              <FaRocket className="mr-2" />
              Link Rápido 2
            </Link>

            {/* Link Rápido 3 */}
            <Link
              to="/quick-link-3"
              className="flex items-center p-2 text-text hover:bg-accent hover:text-white rounded-lg transition-colors duration-200"
            >
              <FaRocket className="mr-2" />
              Link Rápido 3
            </Link>
          </div>

          {/* Divisor */}
          <div className="border-b border-muted my-4"></div>

          {/* Estatísticas */}
          <div className="space-y-2">
            <h3 className="flex items-center p-2 text-text font-semibold">
              <FaChartLine className="mr-2" />
              Estatísticas
            </h3>
            <p className="p-2 text-sm text-text">Flashcards Estudados: 1.2k</p>
            <p className="p-2 text-sm text-text">Usuários Ativos: 500+</p>
            <p className="p-2 text-sm text-text">Progresso Médio: 85%</p>
          </div>

          {/* Divisor */}
          <div className="border-b border-muted my-4"></div>

          {/* Tutorial */}
          <div className="space-y-2">
            <h3 className="flex items-center p-2 text-text font-semibold">
              <FaBook className="mr-2" />
              Tutorial
            </h3>
            <p className="p-2 text-sm text-text">
              Passo 1: Escolha uma Categoria
            </p>
            <p className="p-2 text-sm text-text">
              Passo 2: Estude os Flashcards
            </p>
            <p className="p-2 text-sm text-text">
              Passo 3: Acompanhe seu Progresso
            </p>
          </div>
        </div>
      }
      open={sidebarOpen}
      onSetOpen={setSidebarOpen}
      styles={{
        sidebar: {
          background: "var(--color-card)",
          width: "16rem",
          zIndex: 20,
        },
        root: { overflow: "hidden", position: "relative", zIndex: 10 },
        content: { position: "relative", zIndex: 15 }, // Ajuste para o conteúdo principal
      }}
    >
      {/* Conteúdo principal da página */}
      {children}
    </Sidebar>
  );
};
