/**
 * ScenarioCanvas - Background SVG animado estilo "mundo do Batatu"
 * Cenários: parque, quarto_noite, quarto_dia, praia, chuvoso
 */
import type { ScenarioType } from '@/types';
import { SCENARIOS } from '@/config';

interface ScenarioCanvasProps {
    scenario: ScenarioType;
    className?: string;
}

export function ScenarioCanvas({ scenario, className = '' }: ScenarioCanvasProps) {
    const config = SCENARIOS[scenario];

    return (
        <div
            className={`ScenarioCanvas absolute inset-0 overflow-hidden ${className}`}
            style={{ background: config.bgGradient }}
            role="img"
            aria-label={`Cenário: ${config.name}`}
        >
            {/* Sky Layer */}
            <div className="absolute inset-0 opacity-60">
                {scenario === 'quarto_noite' && <NightSky />}
                {scenario === 'quarto_dia' && <DaySky />}
                {scenario === 'parque' && <DaySky />}
                {scenario === 'praia' && <BeachSky />}
                {scenario === 'chuvoso' && <RainySky />}
            </div>

            {/* Ground Layer */}
            <div className="absolute bottom-0 left-0 right-0">
                {scenario === 'parque' && <ParkGround />}
                {scenario === 'praia' && <BeachGround />}
                {(scenario === 'quarto_noite' || scenario === 'quarto_dia') && <RoomFloor />}
                {scenario === 'chuvoso' && <RainyGround />}
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {scenario === 'parque' && <Trees />}
                {scenario === 'quarto_noite' && <Stars />}
                {scenario === 'praia' && <Waves />}
                {scenario === 'chuvoso' && <RainDrops />}
            </div>
        </div>
    );
}

// Sub-components para cada elemento do cenário

function NightSky() {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
                <linearGradient id="nightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="50%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#334155" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#nightGradient)" />
        </svg>
    );
}

function DaySky() {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
                <linearGradient id="dayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="50%" stopColor="#bae6fd" />
                    <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#dayGradient)" />
            {/* Sun */}
            <circle cx="80" cy="20" r="8" fill="#fbbf24" className="animate-pulse">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

function BeachSky() {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
                <linearGradient id="beachGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="60%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#7dd3fc" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#beachGradient)" />
        </svg>
    );
}

function RainySky() {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
                <linearGradient id="rainyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#rainyGradient)" />
            {/* Clouds */}
            <ellipse cx="30" cy="20" rx="15" ry="8" fill="#64748b" opacity="0.7" />
            <ellipse cx="70" cy="15" rx="20" ry="10" fill="#64748b" opacity="0.6" />
        </svg>
    );
}

function ParkGround() {
    return (
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-32">
            <defs>
                <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
            </defs>
            <path
                d="M0 10 Q25 5 50 10 Q75 15 100 10 L100 40 L0 40 Z"
                fill="url(#grassGradient)"
            />
        </svg>
    );
}

function BeachGround() {
    return (
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-32">
            <defs>
                <linearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
            </defs>
            <path
                d="M0 15 Q25 10 50 15 Q75 20 100 15 L100 40 L0 40 Z"
                fill="url(#sandGradient)"
            />
        </svg>
    );
}

function RoomFloor() {
    return (
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-24">
            <rect width="100" height="30" fill="#78716c" opacity="0.3" />
            <line x1="0" y1="0" x2="100" y2="0" stroke="#a8a29e" strokeWidth="0.5" />
        </svg>
    );
}

function RainyGround() {
    return (
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-24">
            <rect width="100" height="30" fill="#64748b" opacity="0.4" />
        </svg>
    );
}

function Trees() {
    return (
        <svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMax meet" className="absolute bottom-16 left-0 w-full h-40 opacity-40">
            {/* Tree 1 */}
            <g transform="translate(20, 30)">
                <rect x="12" y="50" width="6" height="20" fill="#92400e" />
                <circle cx="15" cy="35" r="20" fill="#16a34a" />
            </g>
            {/* Tree 2 */}
            <g transform="translate(160, 40)">
                <rect x="12" y="40" width="6" height="15" fill="#92400e" />
                <circle cx="15" cy="28" r="15" fill="#15803d" />
            </g>
        </svg>
    );
}

function Stars() {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            {[...Array(15)].map((_, i) => (
                <circle
                    key={i}
                    cx={Math.random() * 100}
                    cy={Math.random() * 60}
                    r={0.3 + Math.random() * 0.5}
                    fill="white"
                    opacity={0.5 + Math.random() * 0.5}
                >
                    <animate
                        attributeName="opacity"
                        values={`${0.3 + Math.random() * 0.3};${0.7 + Math.random() * 0.3};${0.3 + Math.random() * 0.3}`}
                        dur={`${2 + Math.random() * 3}s`}
                        repeatCount="indefinite"
                    />
                </circle>
            ))}
            {/* Moon */}
            <circle cx="85" cy="15" r="6" fill="#fef3c7" opacity="0.9" />
        </svg>
    );
}

function Waves() {
    return (
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute bottom-24 left-0 w-full h-16">
            <path
                d="M0 10 Q10 5 20 10 Q30 15 40 10 Q50 5 60 10 Q70 15 80 10 Q90 5 100 10 L100 20 L0 20 Z"
                fill="#0ea5e9"
                opacity="0.6"
            >
                <animate
                    attributeName="d"
                    values="M0 10 Q10 5 20 10 Q30 15 40 10 Q50 5 60 10 Q70 15 80 10 Q90 5 100 10 L100 20 L0 20 Z;
                  M0 10 Q10 15 20 10 Q30 5 40 10 Q50 15 60 10 Q70 5 80 10 Q90 15 100 10 L100 20 L0 20 Z;
                  M0 10 Q10 5 20 10 Q30 15 40 10 Q50 5 60 10 Q70 15 80 10 Q90 5 100 10 L100 20 L0 20 Z"
                    dur="4s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    );
}

function RainDrops() {
    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-40">
            {[...Array(30)].map((_, i) => (
                <line
                    key={i}
                    x1={Math.random() * 100}
                    y1={-10}
                    x2={Math.random() * 100 - 5}
                    y2={Math.random() * 100}
                    stroke="#94a3b8"
                    strokeWidth="0.3"
                    opacity="0.6"
                >
                    <animate
                        attributeName="y1"
                        values="-10;110"
                        dur={`${0.5 + Math.random() * 1}s`}
                        repeatCount="indefinite"
                        begin={`${Math.random() * 2}s`}
                    />
                    <animate
                        attributeName="y2"
                        values="0;120"
                        dur={`${0.5 + Math.random() * 1}s`}
                        repeatCount="indefinite"
                        begin={`${Math.random() * 2}s`}
                    />
                </line>
            ))}
        </svg>
    );
}
