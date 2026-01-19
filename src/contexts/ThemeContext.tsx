/**
 * ThemeContext - Gerenciamento de tema dark/light
 * Usa next-themes internamente para persistência e detecção de preferência do sistema
 */
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
        >
            {children}
        </NextThemesProvider>
    );
}

// Re-export useTheme do next-themes para uso nos componentes
export { useTheme } from 'next-themes';
