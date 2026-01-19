/**
 * Layout - Layout base para páginas com Header e BottomNav
 */
import type { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface LayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showNav?: boolean;
    headerTransparent?: boolean;
    className?: string;
}

export function Layout({
    children,
    showHeader = true,
    showNav = true,
    headerTransparent = false,
    className = '',
}: LayoutProps) {
    return (
        <div className={`Layout min-h-screen flex flex-col bg-[var(--color-background)] ${className}`}>
            {showHeader && <Header transparent={headerTransparent} />}

            <main
                className={`flex-1 flex flex-col
          ${showHeader ? 'pt-14' : ''}
          ${showNav ? 'pb-20' : ''}
        `}
            >
                {children}
            </main>

            {showNav && <BottomNav />}
        </div>
    );
}
