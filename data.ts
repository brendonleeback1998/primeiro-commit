
import { Section, BeltRequirement, KataInfo, BaseInfo } from './types';

export const HISTORY_CONTENT = {
  title: "Um Pouco da História do Karatê",
  founders: [
    { name: "Sakugawa Satunushi", period: "1733-1815" },
    { name: "Matsumura Sokon", period: "1798-1890" },
    { name: "Higaonna Kanryo", period: "1853-1916" },
    { name: "Itosu Yasutsune", period: "1832-1915" },
    { name: "Miyagi Chojun", period: "Goju Ryu" },
    { name: "Mabuni Kenwa", period: "Shito Ryu" },
    { name: "Gichin Funakoshi", period: "Shotokan Ryu (1868-1957)" },
    { name: "Otsuka Hironori", period: "Wado Ryu" }
  ],
  funakoshiQuote: "Karatê NI Sente Nashi – No Karatê não existe atitude ofensiva."
};

export const MEANING_CONTENT = {
  title: "Significado Karatê-Do",
  parts: [
    { kanji: "空", romaji: "Kara", meaning: "Vazio" },
    { kanji: "手", romaji: "Te", meaning: "Mão" },
    { kanji: "道", romaji: "Do", meaning: "Caminho" }
  ]
};

export const OATH_CONTENT = [
  "Eu prometo",
  "Ser paciente",
  "Manter o respeito",
  "Manter a disciplina",
  "Ser justo",
  "Ter força de vontade",
  "Respeitar instrutores e professores",
  "Não fazer mau uso do karatê",
  "Assim prometo!"
];

export const COUNTING_CONTENT = [
  { n: 1, name: "Ichi" }, { n: 2, name: "Ni" }, { n: 3, name: "San" },
  { n: 4, name: "Shi" }, { n: 5, name: "Go" }, { n: 6, name: "Roku" },
  { n: 7, name: "Shichi" }, { n: 8, name: "Hachi" }, { n: 9, name: "Kyuu" },
  { n: 10, name: "Juu" }
];

export const BELTS: BeltRequirement[] = [
  {
    color: "Branca",
    kyu: "7º",
    trainingTime: "4 a 6 meses",
    meaning: "Espírito",
    characteristic: "Movimentos básicos, executados de forma parada e com foco na base correta.",
    chutes: [
      "Mae Geri – Chute frontal.",
      "Mawashi Geri – Chute circular com o peito do pé.",
      "Yoko Geri – Chute lateral utilizando a faca do pé.",
      "Soto Mawashi Geri – Chute circular de fora para dentro.",
      "Uchi Mawashi Geri – Chute circular de dentro para fora.",
      "Kizami Mae Geri – Mae Geri executado com a perna da frente.",
      "Kizami Yoko Geri em Kiba Dachi – Em base Kiba Dachi, executar Yoko Geri com a perna da frente."
    ],
    socos: [
      "Seiken Zuki – Soco direto, executado na base Kiba Dachi.",
      "Morote Zuki Jodan – Soco duplo na altura da cabeça.",
      "Teisho Zuki – Soco com a palma da mão, dedos unidos.",
      "Shuto Soto Zuki – Faca da mão de fora para dentro.",
      "Shuto Uchi Zuki – Faca da mão de dentro para fora.",
      "Nukite Zuki – Ataque com a ponta dos dedos.",
      "Uraken Zuki – Ataque com as costas da mão."
    ],
    defesas: [
      "Age Uke Jodan – Defesa alta ascendente, mão fechada, na altura da cabeça.",
      "Soto Uke Jodan – Defesa alta de fora para dentro.",
      "Uchi Uke Jodan – Defesa alta de dentro para fora.",
      "Juji Uke Jodan – Defesa alta com os braços cruzados.",
      "Soto Uke Chudan – Defesa média de fora para dentro, na altura do tronco.",
      "Teisho Soto Uke – Defesa com a palma da mão, de cima para baixo, de fora para dentro.",
      "Gedan Barai – Defesa baixa, de cima para baixo, protegendo a perna."
    ],
    ataqueBraco: [
      "Oi Zuki – Soco avançando com a mesma perna e braço (soco em passada).",
      "Gyaku Zuki – Soco com o braço contrário à perna da frente.",
      "Kizami Zuki – Soco com a mão da frente."
    ],
    ataqueDefesaSequences: [
      { 
        ataque: "Oi Zuki Jodan", 
        defesa: "Recuar para Zenkutsu Dachi, executar Age Uke Jodan", 
        contraAtaque: "Gyaku Zuki Chudan" 
      },
      { 
        ataque: "Oi Zuki Jodan", 
        defesa: "Recuar para Zenkutsu Dachi, executar Soto Uke Jodan", 
        contraAtaque: "Gyaku Zuki Chudan" 
      },
      { 
        ataque: "Oi Zuki Jodan", 
        defesa: "Recuar para Zenkutsu Dachi, executar Uchi Uke Jodan", 
        contraAtaque: "Gyaku Zuki Chudan" 
      },
      { 
        ataque: "Oi Zuki Jodan", 
        defesa: "Recuar para Zenkutsu Dachi, executar Juji Uke Jodan", 
        contraAtaque: "Morote Zuki Chudan" 
      },
      { 
        ataque: "Oi Zuki Chudan", 
        defesa: "Recuar para Zenkutsu Dachi, executar Soto Uke Chudan", 
        contraAtaque: "Gyaku Zuki Chudan" 
      },
      { 
        ataque: "Oi Zuki Chudan", 
        defesa: "Recuar para Zenkutsu Dachi, executar Teisho Soto Uke", 
        contraAtaque: "Gyaku Zuki Chudan" 
      },
      { 
        ataque: "Oi Zuki Chudan", 
        defesa: "Recuar para Zenkutsu Dachi, executar Gedan Barai", 
        contraAtaque: "Gyaku Zuki Chudan" 
      }
    ],
    kataDetails: {
      name: "Heian Shodan",
      bases: "Zenkutsu Dachi e Kokutsu Dachi",
      defesas: "Gedan Barai, Age Uke e Shuto Uke",
      ataques: "Oi Zuki e Tetsui",
      duracao: "Aproximadamente 40 segundos",
      kyodos: 21,
      kiai: "No 9º e no 17º movimento"
    },
    kihon: [],
    kumite: "Gohon Kumite (Ataque Oi-zuki Jodan/Chudan, Defesa Age-uke/Gedan-barai)",
    kata: "Heian Shodan"
  },
  {
    color: "Amarela",
    kyu: "6º",
    trainingTime: "6 meses",
    meaning: "Paciência",
    characteristic: "Execução de chutes e defesas duplas, com maior coordenação e controle corporal.",
    chutes: [
      "Mae Geri Chudan + Mae Geri Jodan (Dois chutes com a mesma perna)",
      "Mawashi Geri Chudan + Mawashi Geri Jodan",
      "Yoko Geri Chudan + Yoko Geri Jodan",
      "Mae Geri + Mawashi Geri",
      "Mae Geri + Yoko Geri",
      "Soto Mawashi Geri + Yoko Geri",
      "Mae Geri frontal + Yoko Geri lateral"
    ],
    socos: [
      "Mawashi Zuki – Soco cruzado.",
      "Ura Zuki (Kagi Zuki) – Soco curto de baixo para cima (gancho).",
      "Nihon Nukite (Wasai) – Ataque com dois dedos (indicador e médio).",
      "Empi – Ataque com o cotovelo.",
      "Tetsui – Ataque em martelo, de dentro para fora.",
      "Ippon Ken – Soco utilizando o nó do dedo indicador.",
      "Haito – Golpe com a parte interna da mão (lado do polegar).",
      "Hira Ken – Ataque com os nós dos dedos."
    ],
    trocaPerna: [
      "Mae Geri – Chute frontal",
      "Mawashi Geri – Chute circular",
      "Yoko Geri – Chute lateral",
      "Soto Mawashi Geri – Chute circular de fora para dentro",
      "Uchi Mawashi Geri – Chute circular de dentro para fora",
      "Kakato Geri – Chute com o calcanhar",
      "Ushiro Sokuto Geri – Giro e chute com a lateral externa do pé"
    ],
    defesas: [
      "Age Uke + Gedan Barai",
      "Soto Uke + Uchi Uke",
      "Kakuto Uke + Teisho Uke",
      "Waki Uchi Uke + Teisho Uke (defesa em meia-lua)",
      "Empi Uke + Hiza Geri Uke",
      "Shuto Uke",
      "Uchi Uke com apreensão (segurando o braço)"
    ],
    ataqueBraco: [
      "Oi Zuki + Gyaku Zuki",
      "Kizami Zuki + Gyaku Zuki",
      "Kizami Zuki avançando + Gyaku Zuki (escorregando)"
    ],
    sequenciasTecnicas: [
      "Zenkutsu Dachi: Kizami Mae Geri + Gyaku Zuki Chudan",
      "Zenkutsu Dachi: Kizami Mawashi Geri + Gyaku Zuki Chudan",
      "Zenkutsu Dachi: Kizami Yoko Geri + Gyaku Zuki Chudan",
      "Zenkutsu Dachi: Age Uke Jodan + Gyaku Zuki Chudan + Mae Geri",
      "Zenkutsu Dachi: Soto Uke Jodan + Gyaku Zuki Chudan + Mawashi Geri",
      "Zenkutsu Dachi: Uchi Uke Jodan + Gyaku Zuki Chudan + Yoko Geri",
      "Zenkutsu Dachi: Gedan Barai + Gyaku Zuki Chudan + Mawashi Geri"
    ],
    ataqueDefesaSequences: [
      { 
        ataque: "Oi Zuki Jodan", 
        acao: "Esquiva em diagonal, avança uma perna, aplica Shuto Soto Zuki no pescoço enquanto executa Uchi Uke Jodan. Segura o braço e finaliza com Shuto Uchi Zuki no pescoço." 
      },
      { 
        ataque: "Oi Zuki Jodan", 
        acao: "Esquiva em diagonal, aplica Mawashi Zuki na cabeça com Uchi Uke Jodan, seguido de Gyaku Ura Zuki, segura os ombros e aplica Hiza Geri." 
      },
      { 
        ataque: "Oi Zuki Jodan", 
        acao: "Avança em Zenkutsu Dachi, defende com Shuto Juji Uke Jodan, segura o punho, força o cotovelo e aplica Uraken Jodan." 
      },
      { 
        ataque: "Oi Zuki Jodan", 
        acao: "Esquiva lateral, Mae Geri (perna frente), Gyaku Zuki Chudan e Kizami Zuki Jodan." 
      },
      { 
        ataque: "Oi Zuki Jodan", 
        acao: "Esquiva lateral, Mawashi Geri Chudan, Gyaku Zuki Chudan e Uraken Jodan." 
      },
      { 
        ataque: "Oi Zuki Jodan", 
        acao: "Esquiva lateral, Yoko Geri Chudan, cai em Kiba Dachi e aplica Tetsui na nuca." 
      },
      { 
        ataque: "Mawashi Geri Chudan", 
        acao: "Esquiva lateral, Gedan Barai, conduz a perna do adversário e mantém controle." 
      }
    ],
    kataDetails: {
      name: "Heian Nidan",
      bases: "Zenkutsu Dachi e Kokutsu Dachi",
      defesas: "Haiwan Uke, Shuto Uke, Uchi Uke, Morote Uke, Gedan Barai e Age Uke",
      ataques: "Gyaku Zuki, Mae Keage, Yoko Geri, Uchi Komi e Yonhon Nukite",
      duracao: "Aproximadamente 40 segundos",
      kyodos: 26,
      kiai: "No 11º e no 26º movimento"
    },
    observacaoKata: "Além de executar o Heian Nidan, o aluno deverá executar e explicar o bunkai do Heian Shodan.",
    kihon: [],
    kumite: "Kihon Ippon Kumite (Ataque Jodan/Chudan)",
    kata: "Heian Nidan"
  },
  {
    color: "Vermelha",
    kyu: "5º",
    trainingTime: "6 meses",
    meaning: "Motivação",
    characteristic: "Chutes com salto (Tobi), caindo à frente, e uso do Kakato Geri com the perna de trás.",
    chutes: [
      "Mae Geri + Kakato Geri (Dois chutes com a mesma perna)",
      "Mawashi Geri + Kakato Geri",
      "Yoko Geri + Kakato Geri",
      "Soto Mawashi Geri + Kakato Geri",
      "Kakato Geri + Mae Geri Jodan",
      "Kakato Geri + Mawashi Geri Jodan",
      "Kakato Geri + Yoko Geri Jodan"
    ],
    trocaPerna: [
      "Tobi Mae Geri (Caindo à frente, Zenkutsu Dachi)",
      "Tobi Mawashi Geri",
      "Tobi Yoko Geri",
      "Tobi Soto Mawashi Geri",
      "Tobi Ushiro Yoko Geri"
    ],
    recuos: [
      "Tobi Mae Geri + Gyaku Zuki Chudan",
      "Tobi Mawashi Geri + Gyaku Zuki Chudan",
      "Tobi Yoko Geri + Gyaku Zuki Chudan",
      "Tobi Soto Mawashi Geri + Gyaku Zuki Chudan",
      "Recuar pela frente: Kizami Mae Geri + Gyaku Zuki Chudan",
      "Recuar pela frente: Kizami Mawashi Geri + Gyaku Zuki Chudan",
      "Recuar pela frente: Kizami Yoko Geri + Gyaku Zuki Chudan"
    ],
    sequenciasTecnicas: [
      "Avança: Kizami Mae Geri + Mae Geri",
      "Avança: Kizami Mawashi Geri + Mawashi Geri",
      "Avança: Kizami Yoko Geri + Yoko Geri",
      "Mae Geri + Tobi Mae Geri (Ambos caindo à frente)",
      "Mawashi Geri + Tobi Mawashi Geri",
      "Yoko Geri + Tobi Yoko Geri",
      "Soto Mawashi Geri + Tobi Soto Mawashi Geri"
    ],
    ataqueDefesaSequences: [
      {
        ataque: "Oi Zuki Jodan",
        acao: "Recuar para Kokutsu Dachi, Age Uke Jodan, aplicar Gyaku Zuki Chudan, Kizami Zuki Jodan, Kizami Mae Geri Chudan e Mawashi Geri Jodan."
      },
      {
        ataque: "Oi Zuki Jodan",
        acao: "Recuar para Kokutsu Dachi, Soto Uke Jodan, aplicar Gyaku Zuki Chudan, Kizami Zuki Jodan, Kizami Uchi Mawashi Geri e Mae Geri Chudan."
      },
      {
        ataque: "Oi Zuki Jodan",
        acao: "Recuar para Kokutsu Dachi, Uchi Uke Jodan, aplicar Gyaku Zuki Chudan, Kizami Zuki Jodan, recuar escorregando e retornar com Soto Otoshi."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Recuar para Kokutsu Dachi, Soto Uke Chudan, aplicar Gyaku Zuki Chudan, Kizami Zuki Jodan, Kizami Yoko Geri Chudan e Yoko Geri Jodan."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Recuar para Kokutsu Dachi, Gedan Barai, aplicar Gyaku Zuki Jodan e Hiza Geri."
      },
      {
        ataque: "Oi Zuki Jodan",
        acao: "Recuar para Kokutsu Dachi, Shuto Juji Uke Jodan, segurar braço, aplicar torção e finalizar com Kizami Empi Zuki."
      },
      {
        ataque: "Mae Geri ascendente (entre as pernas)",
        acao: "Recuar uma perna, Shuto Juji Uke Gedan, segurar tornozelo, elevar a perna, avançar com Teisho Zuki no peito e finalizar com Gyaku Zuki no solo."
      }
    ],
    kataDetails: {
      name: "Heian Sandan",
      bases: "Zenkutsu Dachi, Kokutsu Dachi, Heisoku Dachi e Kiba Dachi",
      defesas: "Uchi Uke, Gedan Uke, Morote Uke, Osae Uke e Shuto Uke",
      ataques: "Oi Zuki, Yonhon Nukite, Tetsui, Uraken, Kentsui Age e Empi Ushiro Ate",
      duracao: "Aproximadamente 40 segundos",
      kyodos: 20,
      kiai: "No 10º e no 20º movimento"
    },
    observacaoKata: "Além de executar o Heian Sandan, o aluno deverá executar e explicar o bunkai dos katas anteriores.",
    socos: [],
    defesas: [],
    kihon: [],
    kumite: "Kihon Ippon Kumite (Jodan, Chudan, Mae-geri)",
    kata: "Heian Sandan"
  },
  {
    color: "Laranja",
    kyu: "4º",
    trainingTime: "6 meses",
    meaning: "Vontade",
    characteristic: "Uso de Ura Mawashi Geri e chutes com salto (Tobi) caindo com a perna de trás.",
    chutes: [
      "Kizami Mae Geri + Kizami Kakato Geri",
      "Kizami Mawashi Geri + Kizami Kakato Geri",
      "Kizami Yoko Geri + Kizami Kakato Geri",
      "Kizami Kakato Geri + Kizami Mae Geri",
      "Kizami Kakato Geri + Kizami Mawashi Geri",
      "Kizami Kakato Geri + Kizami Yoko Geri",
      "Kizami Kakato Geri + Kizami Soto Mawashi Geri"
    ],
    trocaPerna: [
      "Tobi Mae Geri (Caindo atrás, Zenkutsu Dachi)",
      "Tobi Mawashi Geri",
      "Tobi Yoko Geri",
      "Tobi Soto Mawashi Geri",
      "Tobi Ushiro Sokuto Geri"
    ],
    recuos: [
      "Recua: Tobi Mae Geri + Kizami Uraken Jodan",
      "Recua: Tobi Mawashi Geri + Kizami Uraken Jodan",
      "Recua: Tobi Yoko Geri + Kizami Uraken Jodan",
      "Recua: Tobi Soto Mawashi Geri + Kizami Uraken Jodan",
      "Recua: Tobi Uchi Mawashi Geri + Kizami Uraken Jodan",
      "Recua pela frente: Uchi Otoshi + Gyaku Zuki",
      "Recua pela frente: Tobi Ushiro Yoko Geri + Gyaku Zuki"
    ],
    sequenciasTecnicas: [
      "Avança Kizami Mae Geri: Kizami Zuki, Gyaku Zuki e Mae Geri.",
      "Avança Kizami Mawashi Geri: Kizami Zuki, Gyaku Zuki e Mawashi Geri.",
      "Avança Kizami Yoko Geri: Kizami Zuki, Gyaku Zuki e Yoko Geri.",
      "Avança Kizami Uchi Otoshi Geri: Kizami Zuki, Gyaku Zuki e Uchi Mawashi Geri.",
      "Avança perna frente: Kizami Zuki, Gyaku Zuki, Mae Geri e Mae Geri.",
      "Avança perna frente: Kizami Zuki, Gyaku Zuki, Mawashi Geri e Mawashi Geri.",
      "Avança perna frente: Kizami Zuki, Gyaku Zuki, Yoko Geri e Yoko Geri."
    ],
    ataqueDefesaSequences: [
      {
        ataque: "Oi Zuki Jodan",
        acao: "Recuar em Kokutsu Dachi, Age Uke Jodan, aplicar Gyaku Zuki, Kizami Zuki, Koshi Mawashi Geri Chudan e Koshi Mawashi Geri Jodan with a outra perna."
      },
      {
        ataque: "Oi Zuki Jodan",
        acao: "Recuar em Kokutsu Dachi, Uchi Uke Jodan, aplicar Kizami Zuki Jodan, Shuto Uchi no pescoço e Ushiro Kizami Yoko Geri Chudan."
      },
      {
        ataque: "Oi Zuki Jodan",
        acao: "Recuar em Kokutsu Dachi, Soto Uke Jodan, avançar em Kiba Dachi, aplicar Empi, recuar base e finalizar with Uraken Jodan segurando o pulso."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Recuar em Kokutsu Dachi, Uchi Uke Chudan, aplicar Kizami Zuki Jodan, mudar para Kiba Dachi, Tetsui Jodan e finalizar with Ushiro Yoko Geri Jodan."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Recuar em Kokutsu Dachi, Gedan Barai, avançar with soco duplo (costelas/rosto), aplicar Ashi Barai e finalizar with Mawashi Geri."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Recuar em Kokutsu Dachi, Gedan Barai, avançar with Kizami Empi em Kiba Dachi, Hiraken e finalizar with Ushiro Empi Jodan."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Avançar em Sanchin Dachi, Soto Uke Jodan, Kizami Uraken Jodan, Kizami Shuto Uchi no pescoço e finalizar with Ushiro Yoko Geri Chudan."
      }
    ],
    kataDetails: {
      name: "Heian Yondan",
      bases: "Zenkutsu Dachi, Ashi Dachi, Kosa Dachi e Kokutsu Dachi",
      defesas: "Haiwan Uke, Juji Uke, Morote Uke, Shuto Gedan Barai, Jodan Uke e Kakiwake Uke",
      ataques: "Uraken, Yoko Geri Kekomi, Empi Uchi, Mae Geri, Oi Zuki, Gyaku Zuki e Hiza Age Ate",
      duracao: "Aproximadamente 50 segundos",
      kyodos: 27,
      kiai: "No 13º e no 25º movimento"
    },
    observacaoKata: "Além de executar o Heian Yondan, o aluno deverá executar e explicar o bunkai dos katas anteriores.",
    socos: [],
    defesas: [],
    kihon: [],
    kumite: "Jiyu Ippon Kumite (Semi-livre básico)",
    kata: "Heian Yondan"
  },
  {
    color: "Verde",
    kyu: "3º",
    trainingTime: "1 ano",
    meaning: "Perseverança",
    characteristic: "Ênfase em chutes com Otoshi e Kin Geri, exigindo maior controle, precisão e coordenação.",
    chutes: [
      "Kin Geri – Perna sobe reta e desce estendendo os dedos (pisão).",
      "Uchi Otoshi Geri – Pisão girando de dentro para fora.",
      "Soto Otoshi Geri – Pisão girando de fora para dentro.",
      "Tobi Kizami Uchi Otoshi Geri – Pisão com salto (dentro/fora).",
      "Tobi Kizami Soto Otoshi Geri – Pisão com salto (fora/dentro).",
      "Tobi Ushiro Sokuto Geri – Salto com giro (lateral do pé), caindo atrás.",
      "Tobi Ushiro Yoko Geri – Salto com giro (faca do pé), caindo atrás."
    ],
    sequenciasTecnicas: [
      "Mawashi Geri Gedan seguido de Soto Otoshi Geri.",
      "Mawashi Geri Gedan seguido de Uchi Otoshi Geri.",
      "Mawashi Geri Gedan seguido de Kizami Kakato Geri.",
      "Mawashi Geri Gedan seguido de Tobi Ushiro Mawashi Geri.",
      "Mawashi Geri Gedan + Tobi Ushiro Yoko Geri (outra perna).",
      "Mawashi Geri Gedan + Tobi Ushiro Kakato Geri (outra perna).",
      "Avança Soto Mawashi Geri + Ushiro Sokuto Geri 360°."
    ],
    recuos: [
      "Recua executando Tobi Kizami Soto Otoshi Geri.",
      "Recua executando Tobi Kizami Uchi Otoshi Geri.",
      "Recua executando Tobi Mae Geri.",
      "Recua executando Tobi Mawashi Geri.",
      "Recua executando Tobi Yoko Geri.",
      "Recua pela frente + Tobi Ushiro Sokuto Geri 360°.",
      "Recua pela frente + Tobi Ushiro Kakato Geri 360°."
    ],
    trocaPerna: [
      "Kin Geri",
      "Soto Otoshi Geri",
      "Uchi Otoshi Geri",
      "Kizami Kakato Geri",
      "Tobi Ushiro Yoko Geri 360°",
      "Tobi Ushiro Sokuto Geri 360°",
      "Tobi Ushiro Kakato Geri 360°"
    ],
    ataqueDefesaSequences: [
      {
        ataque: "Oi Zuki Jodan",
        acao: "Recuar em Kokutsu Dachi, Kakuto Uke (braço frente), aplicar Teisho Zuki Chudan no peito, recuar mantendo a base e finalizar with Soto Otoshi Geri."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Recuar em Kokutsu Dachi, Soto Uke Chudan (mão aberta), segurar pulso, aplicar Toho no pescoço, trocar as mãos e finalizar with Hiza Geri nas costelas."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Avançar em Kokutsu Dachi, defender antebraço por dentro, aplicar Empi no peito, segurar pulso, aplicar Uraken Jodan, recuar e finalizar with Tobi Mae Geri Chudan."
      },
      {
        ataque: "Mawashi Geri Chudan",
        acao: "Avançar em Kiba Dachi, defender with os dois braços segurando the perna, aplicar Uraken genital e quebrar o joelho with o antebraço."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Recuar em Kokutsu Dachi, Gedan Barai, aplicar Kizami Empi no rosto, Ashi Barai e finalizar with Ushiro Sokuto Geri."
      },
      {
        ataque: "Oi Zuki Jodan",
        acao: "Recuar em Kokutsu Dachi, Juji Uke Jodan, segurar braço, aplicar torção apoiando no ombro, Empi Geri Chudan (costas/frente), finalizar with Ura Zuki e Empi Jodan."
      }
    ],
    kataDetails: {
      name: "Heian Godan",
      bases: "Zenkutsu Dachi, Kosa Dachi, Heisoku Dachi e Kokutsu Dachi",
      defesas: "Uchi Uke, Mizu Nagare, Morote Uke, Gedan Jiju Uke, Jodan Jiju Uke, Osae Uke, Kake Uke e Manji Uke",
      ataques: "Gyaku Zuki, Chudan Zuki, Oi Zuki, Mizazuki Geri, Empi Uchi e Koho Tsuki Age",
      duracao: "Aproximadamente 50 segundos",
      kyodos: 23,
      kiai: "No 12º e no 19º movimento"
    },
    observacaoKata: "Além de executar o Heian Godan, o aluno deverá executar e explicar o bunkai dos katas anteriores.",
    socos: [],
    defesas: [],
    kihon: [],
    kumite: "Jiyu Ippon Kumite (Ataque livre avisado)",
    kata: "Heian Godan"
  },
  {
    color: "Roxa",
    kyu: "2º",
    trainingTime: "1 ano",
    meaning: "Responsabilidade",
    characteristic: "Ênfase em chutes giratórios (Ushiro), saltos (Tobi) e combinações com Sokuto e Kakato Geri, exigindo alto nível de coordenação e controle.",
    chutes: [
      "Kakato Geri + Tobi Mae Geri (Consecutivos)",
      "Kakato Geri + Tobi Mawashi Geri",
      "Kakato Geri + Tobi Yoko Geri",
      "Ushiro Sokuto Geri 360° + Tobi Kizami Mae Geri",
      "Ushiro Sokuto Geri 180° + Tobi Kizami Mae Geri",
      "Ushiro Kakato Geri + Tobi Kizami Uchi Otoshi Geri",
      "Ushiro Yoko Geri + Tobi Kizami Uchi Otoshi Geri"
    ],
    trocaPerna: [
      "Uchi Otoshi Geri (Retornando a perna para trás)",
      "Mae Geri + Tobi Ushiro Sokuto Geri",
      "Mawashi Geri + Tobi Ushiro Sokuto Geri",
      "Yoko Geri + Tobi Ushiro Kakato Geri"
    ],
    sequenciasTecnicas: [
      "Mae Geri + Tobi Ushiro Mae Geri (Avançando)",
      "Mawashi Geri + Tobi Ushiro Mawashi Geri (Avançando)",
      "Yoko Geri + Tobi Ushiro Yoko Geri (Avançando)",
      "Soto Mawashi Geri + Tobi Ushiro Soto Mawashi Geri",
      "Soto Otoshi Geri + Tobi Ushiro Soto Otoshi Geri",
      "Avança Perna Frente: Kizami Zuki, Gyaku Zuki, Uchi Otoshi + Uchi Otoshi (Passada)",
      "Avança Perna Trás: Mae Geri + Mae Geri",
      "Avança Perna Trás: Mawashi Geri + Mawashi Geri",
      "Avança Perna Trás: Yoko Geri + Yoko Geri",
      "Avança Perna Trás: Uchi Otoshi Geri + Uchi Otoshi Geri"
    ],
    recuos: [
      "Recua Perna Frente: Kizami Mae Geri + Ushiro Sokuto Geri (Caindo à frente)",
      "Recua Perna Frente: Kizami Mae Geri + Ushiro Sokuto Geri (Caindo atrás)",
      "Recua Perna Frente: Mae Geri + Ushiro Kakato Geri",
      "Recua Perna Frente: Kizami Kin Geri",
      "Recua mesma base: Kizami Soto Otoshi Geri",
      "Recua mesma base: Kizami Uchi Otoshi Geri",
      "Recua pela frente: Ushiro Uchi Otoshi Geri"
    ],
    ataqueDefesaSequences: [
      {
        ataque: "Oi Zuki Chudan",
        acao: "Esquiva lateral externa, Shuto Uchi Uke, segura braço, Mawashi Geri, cai em Kiba Dachi, Empi + Uraken (mesmo braço), Ashi Barai e Yoko Geri Jodan no solo."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Esquiva lateral externa, Shuto Uchi Uke, segura braço, Yoko Geri, cai em Kiba Dachi, Empi + Uraken, Ashi Barai e Yoko Geri Jodan."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Esquiva lateral, Shuto Uchi Uke, segura braço, Yoko Geri Chudan, puxa Kakato Geri Jodan e finalizar with Mawashi Geri Jodan (mesma perna)."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Esquiva lateral, Shuto Uchi Uke, segura braço, chuta Yoko Geri no posterior do joelho, derruba e pisa lateralmente no rosto mantendo controle."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Esquiva lateral, Teisho Uke, aplica Haito no pescoço, derruba o adversário e finaliza com Gyaku Zuki."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Esquiva lateral, Teisho Uke, aplica Gyaku Zuki, derruba o adversário e finaliza com Gyaku Zuki."
      },
      {
        ataque: "Oi Zuki Chudan",
        acao: "Avançar, executar Soto Uke Chudan e finalizar with Ushiro Sokuto Geri."
      }
    ],
    katasDetails: [
      {
        name: "Empi",
        bases: "Kiba Dachi, Zenkutsu Dachi, Kokutsu Dachi e Kosa Dachi",
        duracao: "Aproximadamente 60 segundos",
        kyodos: 37,
        kiai: "No 16º e no 36º movimento"
      },
      {
        name: "Tekki Shodan",
        bases: "Kiba Dachi e Kosa Dachi",
        defesas: "Gedan Barai, Age Uke, Soto Uke e Uchi Uke",
        ataques: "Empi, Tetsui e Hiza Geri",
        duracao: "Aproximadamente 50 segundos",
        kyodos: 29,
        kiai: "No 15º e no 29º movimento"
      }
    ],
    observacaoKata: "Além de executar os katas Tekki Shodan e Empi, o aluno deverá executar e explicar o bunkai dos katas anteriores.",
    socos: [],
    defesas: [],
    kihon: [],
    kumite: "Jiyu Kumite (Luta Livre controlada)",
    kata: "Tekki Shodan / Empi"
  },
  {
    color: "Marrom",
    kyu: "1º",
    trainingTime: "2 anos",
    meaning: "Disciplina",
    characteristic: "Todos os trabalhos devem ser executados with rigor técnico, resistência física e controle, demonstrando maturidade marcial.",
    chutes: [
      "Ameaça de Mae Geri + Tobi Ushiro Sokuto Geri",
      "Ameaça de Mae Geri + Tobi Ushiro Yoko Geri",
      "Ameaça de Mae Geri + Tobi Ushiro Kakato Geri",
      "Ameaça de Mae Geri + Tobi Ushiro Uchi Otoshi Geri"
    ],
    trocaPerna: [
      "Mae Geri, sair with giro e executar Mae Geri.",
      "Mawashi Geri, sair with giro e executar Mawashi Geri.",
      "Yoko Geri, sair with giro e executar Yoko Geri.",
      "Soto Mawashi Geri, sair with giro e executar Ushiro Sokuto Geri.",
      "Soto Otoshi Geri, sair with giro e executar Ushiro Uchi Otoshi Geri.",
      "Uchi Otoshi Geri, sair with giro e executar Ushiro Uchi Otoshi Geri.",
      "Kizami Soto Otoshi Geri, seguido de Ushiro Uchi Otoshi Geri."
    ],
    sequenciasTecnicas: [
      "Mae Geri + Uchi Otoshi Geri + Mawashi Geri",
      "Mae Geri + Mawashi Geri + Kakato Geri",
      "Mae Geri + Tobi Ushiro Soto Mawashi Geri (mesma perna)"
    ],
    recuos: [
      "Recuar with Mae Geri, cair atrás + Tobi Uchi Otoshi Geri.",
      "Recuar with Mawashi Geri, cair atrás + Tobi Mawashi Geri.",
      "Recuar with Yoko Geri, cair atrás + Tobi Yoko Geri."
    ],
    ataqueDefesaSequences: [
      {
        ataque: "Oi Zuki Jodan",
        acao: "Esquiva lateral, aplicar Gyaku Zuki nas costelas e Hiza Geri Chudan."
      },
      {
        ataque: "Oi Zuki Jodan",
        acao: "Esquiva lateral, segurar o braço, aplicar Hiza Geri, retornar perna e finalizar with quebra de braço utilizando o cotovelo."
      },
      {
        ataque: "Oi Zuki Jodan ou Chudan",
        acao: "Esquiva lateral e executar Ushiro Yoko Geri Chudan with a perna de trás."
      },
      {
        ataque: "Oi Zuki Jodan ou Chudan",
        acao: "Esquiva para dentro, Shuto Uchi Uke, Gyaku Zuki Chudan, derrubar with Ashi Barai e finalizar with Gyaku Zuki."
      },
      {
        ataque: "Oi Zuki Jodan ou Chudan",
        acao: "Esquiva lateral with a perna de trás e executar Ushiro Kakato Geri Jodan na nuca."
      },
      {
        ataque: "Oi Zuki Jodan ou Chudan",
        acao: "Entrada por dentro, executar Mawashi Geri Chudan seguido de Soto Otoshi Geri."
      },
      {
        ataque: "Oi Zuki Jodan ou Chudan",
        acao: "Saída lateral, executar Mae Geri seguido de Ushiro Kakato Geri Jodan no rosto."
      },
      {
        ataque: "Oi Zuki Jodan ou Chudan",
        acao: "Esquiva para trás, executar Ushiro Ashi Barai (rasteira giratória) e finalizar with Mawashi Geri."
      },
      {
        ataque: "Oi Zuki Jodan ou Chudan",
        acao: "Recuar, escorar with Yoko Geri Chudan e finalizar with Mawashi Geri Jodan ou Chudan."
      },
      {
        ataque: "Oi Zuki Jodan ou Chudan",
        acao: "Recuar, executar defesa baixa with Shuto Uke e finalizar with Tobi Gyaku Zuki Jodan."
      }
    ],
    katasDetails: [
      {
        name: "Bassai Dai",
        bases: "Kiba Dachi, Zenkutsu Dachi, Kokutsu Dachi e Kosa Dachi",
        duracao: "Aproximadamente 50 segundos",
        kyodos: 42,
        kiai: "No 19º e no 42º movimento"
      },
      {
        name: "Kanku Dai",
        bases: "Kiba Dachi, Zenkutsu Dachi, Kokutsu Dachi, Renoji Dachi e Ashi Dachi",
        duracao: "Aproximadamente 90 segundos",
        kyodos: 65,
        kiai: "No 15º e no 64º movimento"
      }
    ],
    observacaoKata: "Além de executar os katas Bassai Dai e Kanku Dai, o aluno deverá executar e explicar o bunkai dos katas anteriores.",
    socos: [],
    defesas: [],
    kihon: [],
    kumite: "Jiyu Kumite (Luta Livre com foco em estratégia)",
    kata: "Bassai Dai / Kanku Dai"
  },
  {
    color: "Preta",
    kyu: "Dan",
    trainingTime: "Varia",
    meaning: "Respeito",
    characteristic: "Demonstração de domínio técnico, controle emocional, precisão, leitura de combate e aplicação prática do Karatê-Do.",
    chutes: [],
    socos: [],
    defesas: [],
    ataqueDefesaSequences: [
      {
        ataque: "Avanço em passada com soco Jodan",
        acao: "Recuar, executar Uchi Uke Jodan, segurar o braço do adversário e aplicar Yoko Geri Chudan seguido de Yoko Geri Jodan."
      },
      {
        ataque: "Avanço em passada com soco Chudan",
        acao: "Recuar, executar Uchi Uke Chudan, segurar o braço do adversário, aplicar Empi Chudan nas costelas, projetar ao solo e finalizar with Gyaku Zuki."
      },
      {
        ataque: "Avanço em duas passadas com soco Chudan",
        acao: "Recuar, executar Chuto Uchi Uke Chudan duas vezes, segurar o braço e aplicar Yoko Geri Chudan seguido de Kakato Geri Jodan (mesma perna)."
      },
      {
        ataque: "Avanço em duas passadas com soco Jodan",
        acao: "Recuar, executar Soto Uke Jodan duas vezes e finalizar with Ushiro Yoko Geri Chudan."
      },
      {
        ataque: "Mawashi Geri Jodan",
        acao: "Em Kiba Dachi, defender with Empi (braço frente) no joelho atacante, segurar the perna, aplicar Ashi Barai na perna de apoio e finalizar with Gyaku Zuki ou pisada."
      },
      {
        ataque: "Bastão de cima para baixo",
        acao: "Avançar, executar Juji Uke Jodan, segurar o bastão, puxar sobre o ombro, projetar ao solo e finalizar with Gyaku Zuki."
      },
      {
        ataque: "Bastão lateral",
        acao: "Recuar, executar Chuto Uke Jodan (dois braços), segurar o bastão e aplicar Mawashi Geri Chudan seguido de Yoko Geri Chudan."
      },
      {
        ataque: "Bastão direcionado às pernas",
        acao: "Recuar with salto e aplicar Yoko Geri Chudan seguido de Kakato Geri Jodan with the mesma perna."
      },
      {
        ataque: "Bastão em estocada frontal (abdômen)",
        acao: "Recuar em Kiba Dachi, segurar o bastão, aplicar Yoko Geri Chudan por baixo do braço, projetando o adversário de costas ao solo."
      }
    ],
    kata: "Hangetsu, Jiin, Tekki Nidan, Tekki Sandan, Gankaku, Sochin, Kanku Sho, Bassai Sho, Nijushiho, Gojushiho Dai, Gojushiho Sho, Chinte, Unsu, Meikyo, Jitte, Wankan",
    observacaoKata: "O exame de faixa preta evidencia: Postura marcial e autocontrole; Precisão técnica; Fluidez e eficiência; Capacidade de adaptação; Conhecimento teórico e prático dos katas e bunkais anteriores.",
    kihon: [],
    kumite: "Jiyu Kumite (Luta Livre total with controle)"
  }
];

export const BASES: BaseInfo[] = [
  { 
    name: "Heisoku-dachi", 
    description: "Pés unidos, calcanhares e dedos se tocando. Postura de meditação inicial e atenção.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/heisoku-dachi.jpg"
  },
  { 
    name: "Musubi-dachi", 
    description: "Calcanhares unidos, dedos voltados para fora em 45 graus. Postura padrão de saudação (Rei).",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/musubi-dachi.jpg"
  },
  { 
    name: "Hachinoji-dachi", 
    description: "Postura natural (Shizentai), pés na largura dos ombros voltados 45 graus para fora.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/hachinoji-dachi.jpg"
  },
  { 
    name: "Heiko-dachi", 
    description: "Pés paralelos na largura dos ombros. Postura de prontidão e início de muitos Kihons.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/heiko-dachi.jpg"
  },
  { 
    name: "Uchi-hachinoji-dachi", 
    description: "Pés na largura dos ombros, mas voltados para dentro. Fortalece a parte interna das pernas.",
    imageUrl: "https://shotokankarate-do.weebly.com/uploads/1/3/6/5/13658535/uchi-hachinoji-dachi_orig.jpg"
  },
  { 
    name: "Renoji-dachi", 
    description: "Postura em 'L'. O pé da frente aponta para frente, o de trás em ângulo reto lateral.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/renoji-dachi.jpg"
  },
  { 
    name: "Shiko-dachi", 
    description: "Similar à Kiba-dachi, mas os pés estão voltados 45 graus para fora. Base de Sumo usada para estabilidade e força.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/shiko-dachi.jpg"
  },
  { 
    name: "Kosa-dachi", 
    description: "Base cruzada. Uma perna cruza por trás da outra, apoiando no metatarso. Usada em saltos e giros rápidos.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/kosa-dachi.jpg"
  },
  { 
    name: "Neko-ashi-dachi", 
    description: "Base do Gato. 90% do peso na perna de trás, calcanhar da frente elevado para chute rápido.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/neko-ashi-dachi.jpg"
  },
  { 
    name: "Tsuru-ashi-dachi", 
    description: "Base da Garça. Equilíbrio em uma perna só, a outra protegendo o joelho. Famosa no Kata Gankaku.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/tsuru-ashi-dachi.jpg"
  },
  { 
    name: "Hangetsu-dachi", 
    description: "Base da Meia-lua. Pés voltados para dentro, joelhos tensionados para estabilidade interna.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/hangetsu-dachi.jpg"
  },
  { 
    name: "Kokutsu-dachi", 
    description: "Base recuada. 70% do peso na perna de trás. Essencial para técnicas de defesa fluida.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/kokutsu-dachi.jpg"
  },
  { 
    name: "Kiba-dachi", 
    description: "Base do Cavaleiro. Pernas abertas, joelhos para fora, costas eretas. Foca no fortalecimento lateral.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/kiba-dachi.jpg"
  },
  { 
    name: "Sanchin-dachi", 
    description: "Base de Ampulheta. Foca no enraizamento e controle respiratório extremo.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/sanchin-dachi.jpg"
  },
  { 
    name: "Fudo-dachi", 
    description: "Base Inabalável. Uma mistura equilibrada entre Zenkutsu e Kiba dachi, focada em combate.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/fudo-dachi.jpg"
  },
  { 
    name: "Zenkutsu-dachi", 
    description: "Base avançada. 60% do peso na frente. A base mais fundamental e poderosa para ataques diretos.",
    imageUrl: "https://www.karateshotokan.ca/wp-content/uploads/2018/10/zenkutsu-dachi.jpg"
  }
];

export const KATAS_DETAILED: KataInfo[] = [
  {
    name: "Heian Shodan",
    translation: "Paz e Tranquilidade Nível 1",
    kyodos: 21,
    kiai: [9, 21],
    description: "O primeiro Kata da série Heian. Foca em bases estáveis (Zenkutsu-dachi) e defesas básicas (Gedan Barai e Age Uke).",
    focus: "Estabilidade nas bases, precisão nos socos e força na defesa Gedan Barai.",
    videoUrl: "https://www.youtube.com/embed/gX8mU_m_mYk",
    diagramUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Heian_Shodan.png"
  },
  {
    name: "Heian Nidan",
    translation: "Paz e Tranquilidade Nível 2",
    kyodos: 26,
    kiai: [11, 26],
    description: "Introduz a base Kokutsu-dachi e técnicas de mão aberta (Shuto Uke) e chutes (Mae Geri e Yoko Geri).",
    focus: "Coordenação entre braços e pernas, e transição suave entre Zenkutsu e Kokutsu.",
    videoUrl: "https://www.youtube.com/embed/v7vBv_6_7-Y",
    diagramUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Heian_Nidan.png"
  },
  {
    name: "Heian Sandan",
    translation: "Paz e Tranquilidade Nível 3",
    kyodos: 20,
    kiai: [10, 20],
    description: "Introduz Kiba-dachi (base do cavaleiro) e técnicas de cotovelo (Empi) e defesas simultâneas.",
    focus: "Flexibilidade nos movimentos de rotação e força na base Kiba-dachi.",
    videoUrl: "https://www.youtube.com/embed/5m0z6eP0-zQ",
    diagramUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Heian_Sandan.png"
  },
  {
    name: "Heian Yondan",
    translation: "Paz e Tranquilidade Nível 4",
    kyodos: 27,
    kiai: [13, 27],
    description: "Foca em técnicas de braço duplo e ataques simultâneos. Considerado um dos mais dinâmicos da série.",
    focus: "Ritmo, equilíbrio e controle de respiração.",
    videoUrl: "https://www.youtube.com/embed/9_Xf_r951WpY",
    diagramUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Heian_Yondan.png"
  },
  {
    name: "Heian Godan",
    translation: "Paz e Tranquilidade Nível 5",
    kyodos: 23,
    kiai: [12, 23],
    description: "O último da série Heian. Introduz um salto e diversas variações de tempo e altura.",
    focus: "O salto (Tobi), aterrissagem estável e agilidade nos giros.",
    videoUrl: "https://www.youtube.com/embed/M23v8i8D_48",
    diagramUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Heian_Godan.png"
  },
  {
    name: "Tekki Shodan",
    translation: "Cavaleiro de Ferro Nível 1",
    kyodos: 29,
    kiai: [15, 29],
    description: "Realizado inteiramente na base Kiba-dachi em uma linha reta lateral.",
    focus: "Tensão nas pernas, conexão com o solo e potência nos golpes laterais.",
    videoUrl: "https://www.youtube.com/embed/K841u0P_FqI",
    diagramUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Tekki_Shodan.png"
  },
  {
    name: "Tekki Nidan",
    translation: "Cavaleiro de Ferro Nível 2",
    kyodos: 24,
    kiai: [16, 24],
    description: "Continua a série Tekki, focando em ataques laterais e movimentos de mãos cruzadas, mantendo a base Kiba-dachi.",
    focus: "Potência em movimentos curtos e coordenação de braços em base estável.",
    videoUrl: "https://www.youtube.com/embed/G8_j_0D0VlM",
    diagramUrl: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Diagrama+Tekki+Nidan"
  },
  {
    name: "Tekki Sandan",
    translation: "Cavaleiro de Ferro Nível 3",
    kyodos: 36,
    kiai: [16, 36],
    description: "O nível mais avançado da série Tekki, com trocas de ritmo rápidas e defesas complexas.",
    focus: "Agilidade dentro da limitação da base lateral e precisão nos contra-ataques.",
    videoUrl: "https://www.youtube.com/embed/E-0Ccl5M6yI",
    diagramUrl: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Diagrama+Tekki+Sandan"
  },
  {
    name: "Bassai Dai",
    translation: "Romper a Fortaleza (Grande)",
    kyodos: 42,
    kiai: [19, 42],
    description: "Um Kata poderoso que simboliza a força necessária para romper uma fortaleza. Introduz movimentos de troca rápida de base e defesas pesadas.",
    focus: "Potência, foco (Kime) e transições estáveis entre bases.",
    videoUrl: "https://www.youtube.com/embed/p17H-Uu4X8Y",
    diagramUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Bassai_Dai.png"
  },
  {
    name: "Kanku Dai",
    translation: "Olhar para o Céu (Grande)",
    kyodos: 65,
    kiai: [15, 64],
    description: "Um dos Katas mais longos do Shotokan. Começa com as mãos erguidas em direção ao céu, simbolizando a união com o universo.",
    focus: "Mudanças de ritmo, equilíbrio e controle de respiração em uma sequência longa.",
    videoUrl: "https://www.youtube.com/embed/fD_h4-N7L6M",
    diagramUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Kanku_Dai.png"
  },
  {
    name: "Enpi",
    translation: "Voo da Andorinha",
    kyodos: 37,
    kiai: [16, 36],
    description: "Caracterizado por movimentos rápidos, mudanças de nível (alto/baixo) e saltos, lembrando o voo ágil de uma andorinha.",
    focus: "Agilidade, velocidade e precisão nos ataques de cotovelo e saltos.",
    videoUrl: "https://www.youtube.com/embed/I_vA4xTPlP8",
    diagramUrl: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Diagrama+Enpi"
  },
  {
    name: "Jion",
    translation: "Amor e Gratidão (ou Templo Budista)",
    kyodos: 47,
    kiai: [17, 47],
    description: "Um Kata clássico que demonstra uma postura marcial austera e movimentos diretos e poderosos.",
    focus: "Domínio das bases básicas e execução correta de técnicas fundamentais em nível avançado.",
    videoUrl: "https://www.youtube.com/embed/5F_SREz1L28",
    diagramUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Jion.png"
  },
  {
    name: "Hangetsu",
    translation: "Meia Lua",
    kyodos: 41,
    kiai: [11, 40],
    description: "Foca na respiração forçada e em movimentos lentos e tensionados, seguidos de explosões rápidas.",
    focus: "Controle respiratório (Ibuki) e força muscular na base Hangetsu-dachi.",
    videoUrl: "https://www.youtube.com/embed/rP9B6YwG60Y",
    diagramUrl: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Diagrama+Hangetsu"
  },
  {
    name: "Gankaku",
    translation: "Garça sobre a Rocha",
    kyodos: 42,
    kiai: [28, 42],
    description: "Simboliza uma garça equilibrada sobre uma rocha, pronta para atacar. Introduz a base Tsuru-ashi-dachi.",
    focus: "Equilíbrio extremo em uma perna só e velocidade de ataque lateral.",
    videoUrl: "https://www.youtube.com/embed/V6XnB9Lq6c8",
    diagramUrl: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Diagrama+Gankaku"
  },
  {
    name: "Sochin",
    translation: "Espírito Inabalável",
    kyodos: 40,
    kiai: [27, 39],
    description: "Executado quase inteiramente na base Fudo-dachi (Sochin-dachi). Transmite uma sensação de força e estabilidade monumental.",
    focus: "Estabilidade enraizada e força muscular constante.",
    videoUrl: "https://www.youtube.com/embed/N-0_Q8V_V9Q",
    diagramUrl: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Diagrama+Sochin"
  },
  {
    name: "Unsu",
    translation: "Mãos nas Nuvens",
    kyodos: 48,
    kiai: [36, 48],
    description: "O Kata mais avançado do Shotokan. Contém movimentos que representam afastar nuvens e inclui um salto complexo de 360 graus.",
    focus: "Maestria técnica completa, variação extrema de ritmo e o salto (Tobi).",
    videoUrl: "https://www.youtube.com/embed/Y03XyF070q4",
    diagramUrl: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Diagrama+Unsu"
  }
];
