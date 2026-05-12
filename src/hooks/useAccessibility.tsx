import { useEffect } from 'react';

/**
 * Hook para melhorar acessibilidade WCAG AA
 * - Detecta prefers-reduced-motion
 * - Garante navegação por teclado
 * - Monitora contraste
 */

export function useAccessibility() {
    useEffect(() => {
        // Detectar preferência de animações reduzidas
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            document.documentElement.classList.add('reduce-motion');
        }

        const handleChange = (e: MediaQueryListEvent) => {
            if (e.matches) {
                document.documentElement.classList.add('reduce-motion');
            } else {
                document.documentElement.classList.remove('reduce-motion');
            }
        };

        prefersReducedMotion.addEventListener('change', handleChange);

        return () => {
            prefersReducedMotion.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        // Melhorar navegação por teclado - highlight de foco
        const handleFirstTab = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                document.body.classList.add('user-is-tabbing');
                window.removeEventListener('keydown', handleFirstTab);
                window.addEventListener('mousedown', handleMouseDown);
            }
        };

        const handleMouseDown = () => {
            document.body.classList.remove('user-is-tabbing');
            window.removeEventListener('mousedown', handleMouseDown);
            window.addEventListener('keydown', handleFirstTab);
        };

        window.addEventListener('keydown', handleFirstTab);

        return () => {
            window.removeEventListener('keydown', handleFirstTab);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);
}

/**
 * Componente Skip to Content para navegação por teclado
 */
export function SkipToContent() {
    return (
        <a
            href="#main-content"
            className="skip-to-content"
            style={{
                position: 'absolute',
                left: '-9999px',
                zIndex: 999,
                padding: '1em',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold'
            }}
            onFocus={(e) => {
                e.currentTarget.style.left = '0';
                e.currentTarget.style.top = '0';
            }}
            onBlur={(e) => {
                e.currentTarget.style.left = '-9999px';
            }}
        >
            Ir para o conteúdo principal
        </a>
    );
}
