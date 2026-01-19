/**
 * PostActivityScreen - Tela pós-atividade com CTA claro
 */
import { cn } from '@/lib/utils';
import { BatatuAnimated } from '@/components/batatu';
import { CTAButton, TextLink } from '@/components/ui-custom';
import { useNavigate } from 'react-router-dom';
import type { Persona } from '@/types';

interface PostActivityScreenProps {
    persona: Persona;
    xpEarned: number;
    onContinue: () => void;
    className?: string;
}

const encouragementPhrases = [
    "E aí, topa mais uma? 😊",
    "Mandou super bem! Bora de novo?",
    "Tá no flow! Mais uma?",
    "Sensacional! Quer continuar?",
    "Show de bola! Mais um round?",
];

export function PostActivityScreen({
    persona,
    xpEarned,
    onContinue,
    className,
}: PostActivityScreenProps) {
    const navigate = useNavigate();
    const phrase = encouragementPhrases[Math.floor(Math.random() * encouragementPhrases.length)];

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center min-h-[70vh] px-6 text-center',
                'animate-fade-in',
                className
            )}
        >
            {/* Batatu celebrando */}
            <div className="mb-6 animate-bounce-soft">
                <BatatuAnimated persona={persona} mood="excited" />
            </div>

            {/* XP ganho */}
            <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-lg animate-pop">
                    <span className="text-2xl">⭐</span>
                    <span>+{xpEarned} XP</span>
                </div>
            </div>

            {/* Mensagem de encorajamento */}
            <p className="text-xl font-semibold text-foreground mb-8 max-w-xs">
                {phrase}
            </p>

            {/* CTA Principal */}
            <div className="w-full max-w-xs space-y-4">
                <CTAButton onClick={onContinue}>
                    BORA PRA MAIS UMA! 🚀
                </CTAButton>

                <TextLink onClick={() => navigate('/home')}>
                    voltar pro início
                </TextLink>
            </div>
        </div>
    );
}
