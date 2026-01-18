export type Persona = 'empolgado' | 'ouvinte' | 'conselheiro';
export type Contexto = 'dia_tenso' | 'entrevista' | 'sem_sono' | 'crush' | 'familia' | 'neutro';
export type Momento = 'intro' | 'durante' | 'recompensa';

export interface Frase {
  persona: Persona;
  contexto: Contexto;
  momento: Momento;
  texto: string;
}

export const FRASES: Frase[] = [
  // EMPOLGADO - Dia Tenso
  { persona: 'empolgado', contexto: 'dia_tenso', momento: 'intro', texto: 'Dia tenso, né? Respira comigo que a gente dá um jeito nisso. 😌' },
  { persona: 'empolgado', contexto: 'dia_tenso', momento: 'intro', texto: 'Ok, hoje foi puxado… mas você ainda tá aqui, e isso já é vitória.' },
  { persona: 'empolgado', contexto: 'dia_tenso', momento: 'durante', texto: 'Inspira como se estivesse puxando coragem… solta devagar como se jogasse o peso embora.' },
  { persona: 'empolgado', contexto: 'dia_tenso', momento: 'durante', texto: 'Cada respiração é tipo um resetzinho no cérebro. Bora mais uma?' },
  { persona: 'empolgado', contexto: 'dia_tenso', momento: 'recompensa', texto: 'Olha só, você ficou aqui até o fim. Mandou muito!' },
  { persona: 'empolgado', contexto: 'dia_tenso', momento: 'recompensa', texto: 'Orgulho de você, sério. Não é todo mundo que topa cuidar de si assim.' },

  // EMPOLGADO - Entrevista
  { persona: 'empolgado', contexto: 'entrevista', momento: 'intro', texto: 'Frio na barriga? Normal. Vamos ensinar esse frio a dançar.' },
  { persona: 'empolgado', contexto: 'entrevista', momento: 'intro', texto: 'Você não precisa ser perfeito, só presente. Bora ajustar o coração?' },
  { persona: 'empolgado', contexto: 'entrevista', momento: 'durante', texto: 'Imagina que cada respiração é um botão de volume baixando o nervosismo.' },
  { persona: 'empolgado', contexto: 'entrevista', momento: 'durante', texto: 'Pensa na primeira frase que você quer dizer, e guarda ela no peito enquanto inspira.' },
  { persona: 'empolgado', contexto: 'entrevista', momento: 'recompensa', texto: 'Se você aguentou esse treino, aguenta a entrevista. Confia.' },
  { persona: 'empolgado', contexto: 'entrevista', momento: 'recompensa', texto: 'Seu cérebro agradece esse mini pit stop. Ele funciona melhor assim.' },

  // EMPOLGADO - Crush
  { persona: 'empolgado', contexto: 'crush', momento: 'intro', texto: 'Aaaaa, crush alert! Respira antes de surtar. 😅' },
  { persona: 'empolgado', contexto: 'crush', momento: 'intro', texto: 'Coração fazendo parkour, né? Vamos alinhar esse ritmo.' },
  { persona: 'empolgado', contexto: 'crush', momento: 'durante', texto: 'Inspira pensando na mensagem legal que você quer passar…' },
  { persona: 'empolgado', contexto: 'crush', momento: 'durante', texto: 'Solta o ar levando embora o medo de falar bobagem. Você pode.' },
  { persona: 'empolgado', contexto: 'crush', momento: 'recompensa', texto: 'Você é muito mais interessante do que acha. E isso já é muita coisa.' },
  { persona: 'empolgado', contexto: 'crush', momento: 'recompensa', texto: 'Crush é legal, mas você continua sendo o personagem principal.' },

  // OUVINTE - Dia Tenso
  { persona: 'ouvinte', contexto: 'dia_tenso', momento: 'intro', texto: 'Parece que hoje não foi fácil. E tá tudo bem sentir isso.' },
  { persona: 'ouvinte', contexto: 'dia_tenso', momento: 'intro', texto: 'Você não é fraco por estar cansado. Vamos só respirar um pouco juntos.' },
  { persona: 'ouvinte', contexto: 'dia_tenso', momento: 'durante', texto: 'Inspira… como se estivesse abrindo espaço dentro de você.' },
  { persona: 'ouvinte', contexto: 'dia_tenso', momento: 'durante', texto: 'Solta o ar devagar, deixando ir um pedacinho desse peso.' },
  { persona: 'ouvinte', contexto: 'dia_tenso', momento: 'recompensa', texto: 'Obrigado por ficar aqui comigo. Você merece esse cuidado.' },
  { persona: 'ouvinte', contexto: 'dia_tenso', momento: 'recompensa', texto: 'Mesmo nos dias ruins, você continua sendo importante.' },

  // OUVINTE - Família
  { persona: 'ouvinte', contexto: 'familia', momento: 'intro', texto: 'É muito chato quando a gente sente que ninguém entende. Eu tô te ouvindo.' },
  { persona: 'ouvinte', contexto: 'familia', momento: 'intro', texto: 'Você não é exagerado. Suas emoções fazem sentido.' },
  { persona: 'ouvinte', contexto: 'familia', momento: 'durante', texto: 'Enquanto respira, tenta só notar o que sente, sem julgar.' },
  { persona: 'ouvinte', contexto: 'familia', momento: 'durante', texto: 'Não precisa resolver tudo agora. Só fica aqui um pouco comigo.' },
  { persona: 'ouvinte', contexto: 'familia', momento: 'recompensa', texto: 'Você não está sozinho por sentir isso. Muita gente passa por algo parecido.' },
  { persona: 'ouvinte', contexto: 'familia', momento: 'recompensa', texto: 'Valeu por confiar em mim nesse momento.' },

  // OUVINTE - Sem Sono
  { persona: 'ouvinte', contexto: 'sem_sono', momento: 'intro', texto: 'Quando a cabeça não desliga, o corpo sofre junto. Vamos tentar desacelerar.' },
  { persona: 'ouvinte', contexto: 'sem_sono', momento: 'intro', texto: 'Não precisa forçar o sono. Vamos primeiro ficar um pouco mais tranquilos.' },
  { persona: 'ouvinte', contexto: 'sem_sono', momento: 'durante', texto: 'Imagina que o ar que entra traz calma… e o que sai leva embora um pouquinho da pressa.' },
  { persona: 'ouvinte', contexto: 'sem_sono', momento: 'durante', texto: 'Se vier um pensamento, tudo bem. Repara nele e volta pra respiração.' },
  { persona: 'ouvinte', contexto: 'sem_sono', momento: 'recompensa', texto: 'Se o sono não vier agora, pelo menos seu corpo ganhou uma pausa.' },
  { persona: 'ouvinte', contexto: 'sem_sono', momento: 'recompensa', texto: 'Você merece descansar, mesmo que o mundo lá fora não pare.' },

  // CONSELHEIRO - Dia Tenso
  { persona: 'conselheiro', contexto: 'dia_tenso', momento: 'intro', texto: 'Ok, hoje foi punk. Mas vamos separar o dia em partes pra ficar menos pesado.' },
  { persona: 'conselheiro', contexto: 'dia_tenso', momento: 'intro', texto: 'Você não precisa resolver tudo agora. Só o próximo passo.' },
  { persona: 'conselheiro', contexto: 'dia_tenso', momento: 'durante', texto: 'Enquanto respira, pensa em UMA coisa que você conseguiu fazer hoje, mesmo pequeno.' },
  { persona: 'conselheiro', contexto: 'dia_tenso', momento: 'durante', texto: 'Na próxima expiração, solta o que não depende de você.' },
  { persona: 'conselheiro', contexto: 'dia_tenso', momento: 'recompensa', texto: 'Amanhã você não precisa ser outra pessoa. Só precisa dar um passo a mais.' },
  { persona: 'conselheiro', contexto: 'dia_tenso', momento: 'recompensa', texto: 'Você já passou por dias ruins antes. E está aqui. Isso diz muito.' },

  // CONSELHEIRO - Entrevista
  { persona: 'conselheiro', contexto: 'entrevista', momento: 'intro', texto: 'Bora organizar esse nervosismo em vez de deixar ele espalhado?' },
  { persona: 'conselheiro', contexto: 'entrevista', momento: 'intro', texto: 'Ansiedade é seu cérebro tentando te proteger, só exagerando na dose.' },
  { persona: 'conselheiro', contexto: 'entrevista', momento: 'durante', texto: 'Inspira pensando no começo da entrevista… solta o ar jogando fora o medo de errar tudo.' },
  { persona: 'conselheiro', contexto: 'entrevista', momento: 'durante', texto: 'Foca em uma coisa que você domina e lembra desse ponto enquanto respira.' },
  { persona: 'conselheiro', contexto: 'entrevista', momento: 'recompensa', texto: 'Você não precisa saber tudo, só o suficiente pra mostrar quem você é.' },
  { persona: 'conselheiro', contexto: 'entrevista', momento: 'recompensa', texto: 'Ter nervoso significa que você se importa. Isso é força, não fraqueza.' },

  // CONSELHEIRO - Sem Sono
  { persona: 'conselheiro', contexto: 'sem_sono', momento: 'intro', texto: 'Seu corpo quer descansar, mas sua cabeça tá em modo reunião. Vamos negociar com ela.' },
  { persona: 'conselheiro', contexto: 'sem_sono', momento: 'intro', texto: 'Se não der pra desligar, dá pra colocar em modo silencioso.' },
  { persona: 'conselheiro', contexto: 'sem_sono', momento: 'durante', texto: 'A cada expiração, imagina que você está diminuindo 1% a velocidade dos pensamentos.' },
  { persona: 'conselheiro', contexto: 'sem_sono', momento: 'durante', texto: 'Não tenta controlar o sono. Só organiza a respiração. O resto vem depois.' },
  { persona: 'conselheiro', contexto: 'sem_sono', momento: 'recompensa', texto: 'Mesmo sem dormir ainda, você acabou de cuidar de você por alguns minutos.' },
  { persona: 'conselheiro', contexto: 'sem_sono', momento: 'recompensa', texto: 'Se precisar, volta aqui rápido antes de pegar no sono, a gente faz mais um round.' },

  // NEUTRO - Para todos
  { persona: 'empolgado', contexto: 'neutro', momento: 'intro', texto: 'E aí! Bora dar uma pausa no mundo um pouquinho?' },
  { persona: 'ouvinte', contexto: 'neutro', momento: 'intro', texto: 'Às vezes a gente não sabe o que sente. E tá tudo bem.' },
  { persona: 'conselheiro', contexto: 'neutro', momento: 'intro', texto: 'Mesmo sem saber exatamente o que tá pegando, respirar ajuda.' },
];

export function getRandomPhrase(persona: Persona, contexto: Contexto, momento: Momento): string {
  const elegibles = FRASES.filter(
    f => f.persona === persona && f.contexto === contexto && f.momento === momento
  );
  
  if (elegibles.length === 0) {
    // Fallback para neutro
    const fallback = FRASES.filter(
      f => f.persona === persona && f.contexto === 'neutro' && f.momento === momento
    );
    if (fallback.length === 0) return 'Respira comigo. 💚';
    return fallback[Math.floor(Math.random() * fallback.length)].texto;
  }
  
  return elegibles[Math.floor(Math.random() * elegibles.length)].texto;
}

export const PERSONAS_INFO = {
  empolgado: {
    nome: 'Empolgado',
    descricao: 'Energia alta, gírias leves, celebra progressos',
    cor: 'batatu-empolgado',
    emoji: '🔥',
    breathingSpeed: 'fast', // 4s
  },
  ouvinte: {
    nome: 'Ouvinte',
    descricao: 'Calmo, acolhedor, valida sentimentos',
    cor: 'batatu-ouvinte',
    emoji: '💙',
    breathingSpeed: 'slow', // 8s
  },
  conselheiro: {
    nome: 'Conselheiro',
    descricao: 'Direto, gentil, foca em ações práticas',
    cor: 'batatu-conselheiro',
    emoji: '🌿',
    breathingSpeed: 'normal', // 6s
  },
} as const;

export const CONTEXTOS_INFO = {
  dia_tenso: {
    label: 'Dia tenso na escola',
    emoji: '😓',
    icon: 'school',
  },
  entrevista: {
    label: 'Entrevista / apresentação',
    emoji: '🎤',
    icon: 'presentation',
  },
  sem_sono: {
    label: 'Sem sono',
    emoji: '😴',
    icon: 'moon',
  },
  crush: {
    label: 'Meu crush falou comigo',
    emoji: '💕',
    icon: 'heart',
  },
  familia: {
    label: 'Minha mãe/pai não me entende',
    emoji: '🏠',
    icon: 'home',
  },
  neutro: {
    label: 'Não sei, só tô estranho',
    emoji: '🤷',
    icon: 'help',
  },
} as const;
