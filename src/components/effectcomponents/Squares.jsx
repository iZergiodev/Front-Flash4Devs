import { useRef, useEffect, useState } from 'react';
import './Squares.css';
import { useTheme } from '../../store/useTheme';

const Squares = ({
  direction = 'right',
  speed = 0,
  borderColor: colorSelected,
  squareSize: externalSquareSize = 40, // Valor padrão ou externo
  hoverFillColor = '#222',
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef();
  const numSquaresY = useRef();
  const gridOffset = useRef({ x: 0, y: 0 });
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [dynamicSquareSize, setDynamicSquareSize] = useState(externalSquareSize); // Estado para o tamanho dinâmico

  const { theme } = useTheme();
  const borderColor =
    colorSelected ||
    (theme === 'light' ? 'rgba(241, 115, 0, 0.2)' : 'rgba(241, 115, 0, 0.2)');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const updateSquareSize = () => {
      // Calcula o tamanho dinâmico com base na largura da janela, limitado a 40px
      const newSize = Math.min(window.innerWidth * 0.05, 40);
      setDynamicSquareSize(newSize);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / dynamicSquareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / dynamicSquareSize) + 1;
    };

    // Adiciona listeners para resize
    window.addEventListener('resize', () => {
      updateSquareSize(); // Atualiza o tamanho dos quadrados
      resizeCanvas(); // Redimensiona o canvas
    });

    // Inicializa o tamanho e o canvas
    updateSquareSize();
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / dynamicSquareSize) * dynamicSquareSize;
      const startY = Math.floor(gridOffset.current.y / dynamicSquareSize) * dynamicSquareSize;

      for (let x = startX; x < canvas.width + dynamicSquareSize; x += dynamicSquareSize) {
        for (let y = startY; y < canvas.height + dynamicSquareSize; y += dynamicSquareSize) {
          const squareX = x - (gridOffset.current.x % dynamicSquareSize);
          const squareY = y - (gridOffset.current.y % dynamicSquareSize);

          if (
            hoveredSquare &&
            Math.floor((x - startX) / dynamicSquareSize) === hoveredSquare.x &&
            Math.floor((y - startY) / dynamicSquareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, dynamicSquareSize, dynamicSquareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, dynamicSquareSize, dynamicSquareSize);
        }
      }

      const colorCenter = 'rgba(0, 0, 0, 0)';
      const colorEdge1 = 'rgba(0, 0, 0, 0)';

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2
      );
      gradient.addColorStop(0, colorCenter);
      gradient.addColorStop(1, colorEdge1);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = speed;
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + dynamicSquareSize) % dynamicSquareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + dynamicSquareSize) % dynamicSquareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + dynamicSquareSize) % dynamicSquareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + dynamicSquareSize) % dynamicSquareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + dynamicSquareSize) % dynamicSquareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + dynamicSquareSize) % dynamicSquareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / dynamicSquareSize) * dynamicSquareSize;
      const startY = Math.floor(gridOffset.current.y / dynamicSquareSize) * dynamicSquareSize;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / dynamicSquareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / dynamicSquareSize);

      setHoveredSquare({ x: hoveredSquareX, y: hoveredSquareY });
    };

    const handleMouseLeave = () => {
      setHoveredSquare(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, hoveredSquare, dynamicSquareSize]);

  return <canvas ref={canvasRef} className="squares-canvas" />;
};

export default Squares;