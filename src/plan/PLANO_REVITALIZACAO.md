# 🎮 Plano de Revitalização - Batatu's Buddy

**Versão:** 1.0  
**Data:** Janeiro 18, 2026  
**Status:** 🟡 AGUARDANDO APROVAÇÃO

> **DOCUMENTO VIVO** - Fonte única de verdade para implementação do projeto

---

## 📋 Sumário Executivo

Transformar o Batatu's Buddy de um app básico de autocuidado em uma **experiência premium, divertida e gamificada** para adolescentes, com:

- 🎨 Animações ricas (PNG dinâmico → Rive futuro)
- 🔊 Sistema de áudio imersivo
- 🎮 Gamificação estilo Duolingo
- 🌙 Theme dark/light
- 📱 PWA completo

---

## 🎨 Conceito UX: Mundo do Batatu

> **Inspiração Principal**: App [Finch](https://finchcare.com) - Pet virtual em ambiente customizável
>
> **Filosofia**: Minimalista ≠ Pobre. Clean + Rico em detalhes sutis.

### Princípios de Design

| Princípio | Descrição |
|-----------|-----------|
| **Uma Tela Principal** | Tudo acontece no "mundo" do Batatu - sem navegações excessivas |
| **Cenário Imersivo** | Background SVG animado que muda conforme contexto/hora |
| **Interação Natural** | Tocar no Batatu, no cenário, arrastar elementos |
| **Feedback Sutil** | Micro-animações, sons suaves, partículas leves |
| **Conforto Visual** | Paleta quente/fria conforme mood, gradientes suaves |

### Cenários SVG Propostos

```
🌳 Parque         → Contextos: dia_tenso, neutro (dia)
🌙 Quarto Noite   → Contextos: sem_sono, familia (noite)
🏠 Quarto Dia     → Contextos: crush, entrevista (dia)
🌊 Praia          → Exercícios de respiração (waves)
🌧️ Dia Chuvoso    → Contextos: triste, reflexivo
```

### Fluxo Simplificado (1 Tela Principal)

```
┌─────────────────────────────────────────────────────┐
│                   [🔊] [☀️/🌙] [⚙️]                 │  ← Mini header
├─────────────────────────────────────────────────────┤
│                                                     │
│              ╭──────────────────╮                  │
│              │   CENÁRIO SVG    │                  │
│              │   (parallax)     │                  │
│              │                  │                  │
│              │     🥚 BATATU    │  ← Tappable      │
│              │                  │                  │
│              ╰──────────────────╯                  │
│                                                     │
│    ╭────────────────────────────────────────╮      │
│    │  "Oi {username}! Como tá hoje?"       │      │  ← Dialog bubble
│    ╰────────────────────────────────────────╯      │
│                                                     │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐     │  ← Mood pills
│   │ Tenso  │ │ Ansioso│ │Sem sono│ │ Neutro │     │
│   └────────┘ └────────┘ └────────┘ └────────┘     │
│                                                     │
├─────────────────────────────────────────────────────┤
│     [🏠 Home]    [🎮 Jogar]    [👤 Perfil]         │  ← Bottom nav
└─────────────────────────────────────────────────────┘
```

### Cenário SVG - Estrutura de Camadas

```tsx
// Exemplo de parallax layers
<ScenarioCanvas scene="parque">
  <Layer depth={0} className="sky" />        {/* Céu - mais lento */}
  <Layer depth={1} className="clouds" />      {/* Nuvens - lento */}
  <Layer depth={2} className="mountains" />   {/* Montanhas */}
  <Layer depth={3} className="trees" />       {/* Árvores - médio */}
  <Layer depth={4} className="ground" />      {/* Chão */}
  <Layer depth={5}>
    <BatatuMascot />                          {/* Batatu - frente */}
  </Layer>
</ScenarioCanvas>
```

### Navegação Mínima (3 áreas)

| Área | Conteúdo | Navegação |
|------|----------|-----------|
| **Home** | Mundo do Batatu + Mood selection | Tela principal |
| **Jogar** | Exercícios (overlay/modal) | Sheet de baixo |
| **Perfil** | XP, Badges, Settings | Sheet de baixo |

> ⚠️ **Exercícios acontecem NA MESMA TELA** - o cenário muda, não navega para outra página!

---

## 🔧 Stack Atualizada

| Tecnologia | Atual | → Nova |
|------------|-------|--------|
| React | 18.3.1 | **19.x** |
| Tailwind CSS | 3.4.19 | **4.1.x** |
| Áudio | ❌ Nenhum | **use-sound** + howler.js |
| Animações | CSS keyframes | CSS + **Framer Motion** |
| PWA | ❌ Nenhum | **vite-plugin-pwa** |

---

## 📁 Arquitetura de Pastas Proposta

```
src/
├── assets/
│   ├── images/           # Batatu PNGs, backgrounds
│   └── sounds/           # MP3/WebM para áudio
│
├── types/                # [NOVO] Types centralizados
│   ├── user.types.ts     # UserPreferences, GamificationState
│   ├── session.types.ts  # Session, Exercise, Feedback
│   ├── audio.types.ts    # SoundConfig, AudioState
│   └── index.ts          # Re-exports
│
├── config/               # [NOVO] Constantes e configurações
│   ├── sounds.config.ts  # Mapeamento de sons
│   ├── gamification.config.ts # XP values, levels, badges
│   └── theme.config.ts   # Cores, gradientes por persona
│
├── contexts/             # [NOVO] Contexts globais
│   ├── ThemeContext.tsx  # Dark/Light mode
│   ├── AudioContext.tsx  # Volume, mute, current sounds
│   └── UserContext.tsx   # Dados do usuário e gamificação
│
├── services/             # [NOVO] Lógica de negócio
│   ├── gamification.service.ts  # XP, levels, badges
│   ├── storage.service.ts       # localStorage abstraction
│   └── audio.service.ts         # Wrapper do use-sound
│
├── hooks/
│   ├── useAudio.ts       # [NOVO] Hook para sons
│   ├── useGamification.ts # [NOVO] XP, streaks, badges
│   ├── useTheme.ts       # [NOVO] Toggle dark/light
│   ├── useMobile.tsx     # [EXISTE]
│   ├── useToast.ts       # [EXISTE]
│   └── useUserPreferences.ts # [REFATORAR]
│
├── data/                 # Dados mockados
│   ├── phrases.ts        # [EXISTE] Frases do Batatu
│   ├── badges.data.ts    # [NOVO] Badges disponíveis
│   └── exercises.data.ts # [NOVO] Configuração de exercícios
│
├── components/
│   ├── ui/               # [EXISTE] Shadcn components
│   │
│   ├── batatu/           # [NOVO] Mascote isolado
│   │   ├── BatatuMascot.tsx
│   │   ├── BatatuMood.tsx    # Lógica de mood separada
│   │   └── batatu.utils.ts
│   │
│   ├── exercises/        # [EXISTE] Cada < 150 linhas
│   │   ├── BreathingCircle.tsx
│   │   ├── BalloonExercise.tsx
│   │   ├── BubblesExercise.tsx
│   │   ├── WaveExercise.tsx
│   │   └── ExerciseSelector.tsx # [NOVO]
│   │
│   ├── gamification/     # [NOVO]
│   │   ├── XPBar.tsx
│   │   ├── StreakDisplay.tsx
│   │   ├── BadgeCard.tsx
│   │   └── LevelUpModal.tsx
│   │
│   └── shared/           # [NOVO] Componentes reutilizáveis
│       ├── Layout.tsx
│       ├── Header.tsx
│       ├── BottomNav.tsx     # PWA navigation
│       ├── VolumeControl.tsx
│       └── ThemeToggle.tsx
│
├── pages/                # Cada página < 200 linhas
│   ├── Index.tsx         # [REFATORAR]
│   ├── Onboarding.tsx    # [REFATORAR]
│   ├── Home.tsx          # [REFATORAR]
│   ├── Session.tsx       # [DIVIDIR] 275 → ~150 linhas
│   ├── Settings.tsx      # [REFATORAR]
│   ├── Profile.tsx       # [NOVO] XP, badges, histórico
│   └── NotFound.tsx      # [MANTER]
│
├── test/                 # [EXPANDIR]
│   ├── setup.ts
│   ├── gamification.test.ts
│   ├── audio.test.ts
│   └── components/
│
└── plan/                 # Documentação viva
    └── PLANO_REVITALIZACAO.md
```

---

## 🎵 Sistema de Áudio

### Biblioteca Recomendada

**`use-sound`** (~1KB) + **howler.js** (assíncrono)

```bash
npm install use-sound howler
```

### Categorias de Sons

| Categoria | Sons | Uso |
|-----------|------|-----|
| **UI Feedback** | click, pop, toggle, error | Botões, cards, switches |
| **Success** | chime, sparkle, fanfare | Exercício completo, badge |
| **Ambient** | waves, rain, forest, night | Durante exercícios |
| **Batatu** | greeting, happy, sad, sleepy | Reações do mascote |

### Fontes Gratuitas de Sons (Royalty-Free)

1. **Mixkit** - [mixkit.co](https://mixkit.co) - UI e game sounds
2. **Uppbeat** - [uppbeat.io](https://uppbeat.io) - Success e notifications
3. **SONNISS GDC** - [sonniss.com](https://sonniss.com) - 27GB de sons grátis
4. **Freesound** - [freesound.org](https://freesound.org) - Community sounds
5. **itch.io** - Packs de indie devs

---

## 🎮 Sistema de Gamificação

### XP e Níveis

| Ação | XP |
|------|-----|
| Completar exercício | +10 XP |
| Exercício sem pausar | +5 XP (bônus) |
| Primeiro do dia | +15 XP |
| Streak preservado | +20 XP |
| Badge conquistado | +50 XP |

### Níveis de Amizade com Batatu

| Nível | Nome | XP Necessário | Visual |
|-------|------|---------------|--------|
| 1 | Conhecidos | 0 | Neutro |
| 2 | Colegas | 100 | Pisca mais |
| 3 | Amigos | 300 | Acena ao ver você |
| 4 | Melhores Amigos | 600 | Animação especial |
| 5 | Companheiros | 1000 | Todas as expressões |

### Badges Iniciais

- 🔥 **Primeira Chama** - Complete 1 sessão
- 📅 **Semana de Ouro** - 7 dias de streak
- 🌙 **Coruja Noturna** - Exercício após 22h
- ☀️ **Madrugador** - Exercício antes das 7h
- 🎯 **Focado** - 5 exercícios sem trocar tipo
- 🫧 **Estourador** - 50 bolhas no BubbleGame
- 💚 **Veterano** - 30 dias usando o app

---

## 📱 PWA Configuration

### Requisitos

- `manifest.json` com ícones
- Service Worker para cache
- Instalação no home screen
- Bottom navigation nativa

### Dependência

```bash
npm install -D vite-plugin-pwa
```

---

## 🚀 Fases de Implementação

### Fase 0: Preparação (Pré-requisito)

- [ ] Atualizar React 18 → 19
- [ ] Atualizar Tailwind 3 → 4.1
- [ ] Criar estrutura de pastas
- [ ] Migrar types para `/types`
- [ ] Criar configs em `/config`

### Fase 1: Fundação

- [ ] Implementar ThemeContext (dark/light)
- [ ] Implementar AudioContext + useAudio
- [ ] Baixar sons iniciais (UI feedback)
- [ ] Criar Layout e BottomNav

### Fase 2: Gamificação

- [ ] Implementar gamification.service.ts
- [ ] Criar XPBar, StreakDisplay, BadgeCard
- [ ] Integrar XP nas sessões
- [ ] Criar página Profile

### Fase 3: Polish Visual

- [ ] Adicionar Framer Motion para transições
- [ ] Melhorar animações do BatatuMascot
- [ ] Confetti/partículas em celebrações
- [ ] Skeleton loading

### Fase 4: PWA

- [ ] Configurar vite-plugin-pwa
- [ ] Criar manifest.json
- [ ] Implementar service worker
- [ ] Testar instalação mobile

### Fase 5: Refinamento

- [ ] Refatorar Session.tsx (dividir)
- [ ] Adicionar mais sons ambientes
- [ ] Testes automatizados
- [ ] Performance optimization

---

## ✅ Plano de Verificação

### Testes Automatizados

```bash
npm run test
```

- Testes unitários para services (gamification, storage)
- Testes de integração para hooks

### Verificação Manual

1. **Theme Toggle**
   - Abrir Settings → Toggle dark/light
   - Verificar persistência após reload

2. **Sistema de Áudio**
   - Clicar em botões → ouvir feedback
   - Ajustar volume → slider funcional
   - Mute → silencia tudo

3. **Gamificação**
   - Completar exercício → ver XP subir
   - Verificar streak → exibido no header
   - Atingir badge → modal de celebração

4. **PWA**
   - Abrir no Chrome Mobile
   - Verificar banner "Adicionar à tela inicial"
   - Instalar e abrir offline

---

## 📚 Referências da Pesquisa

### Apps de Bem-estar

- **Finch** - Pet virtual gamificado
- **Headspace** - Streaks, XP, sons relaxantes
- **SuperBetter** - Quests e power-ups
- **Calm** - UI minimalista e sons ambientes

### Gamificação

- **Duolingo** - Streaks, freeze, XP, leaderboards
- **Forest** - Gamificação leve e satisfatória

### Tecnologia

- **use-sound** - [github.com/joshwcomeau/use-sound](https://github.com/joshwcomeau/use-sound)
- **howler.js** - [howlerjs.com](https://howlerjs.com)
- **Rive** - [rive.app](https://rive.app) (futuro)
- **vite-plugin-pwa** - [vite-pwa-org.netlify.app](https://vite-pwa-org.netlify.app)

---

## ❓ Decisões Pendentes

1. **Ordem de Implementação**: Qual fase começar primeiro?
2. **Sons Específicos**: Preciso baixar e adicionar ao projeto - confirma que posso usar Mixkit/Uppbeat?
3. **Rive Timeline**: Quando pretende finalizar as animações Rive?

---

**Próximo Passo**: Após aprovação, iniciar Fase 0 (atualização de stack e reestruturação de pastas).
