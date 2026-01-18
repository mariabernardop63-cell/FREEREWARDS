
import React from 'react';
import { Prize, Testimonial } from './types';

export const REWARD_LEVELS = [
  { id: 'bronze', name: 'Nível Bronze', shares: 100, diamonds: 100, color: 'border-orange-500' },
  { id: 'prata', name: 'Nível Prata', shares: 200, diamonds: 250, color: 'border-slate-300' },
  { id: 'ouro', name: 'Nível Ouro', shares: 500, diamonds: 750, color: 'border-yellow-400' },
];

export const OTHER_PRIZES: Prize[] = [
  { 
    id: '1', 
    name: 'Roblox Robux', 
    category: 'Gaming', 
    value: '800 Robux', 
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '2', 
    name: 'GTA V Online', 
    category: 'Gaming', 
    value: '$1.000.000 Cash', 
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '3', 
    name: 'Netflix Premium', 
    category: 'Streaming', 
    value: '6 Meses Premium', 
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '4', 
    name: 'Spotify Family', 
    category: 'Music', 
    value: '3 Meses Grátis', 
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '5', 
    name: 'Amazon Gift Card', 
    category: 'Cards', 
    value: '$50 USD', 
    image: 'https://images.unsplash.com/photo-1615915468538-0fbd857888ca?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: '6', 
    name: 'Steam Wallet', 
    category: 'Gaming', 
    value: 'R$ 100 Créditos', 
    image: 'https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?auto=format&fit=crop&q=80&w=800' 
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Lucas S.', text: 'Consegui os 500 compartilhamentos e recebi meus 750 diamantes em menos de 24h! Recomendo demais.', diamondsWon: '750', avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: 2, name: 'Bia Oliveira', text: 'Melhor site que já usei. Os cards da Amazon também funcionam. Obrigada FreeRewards!', diamondsWon: '250', avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: 3, name: 'Marcos V.', text: 'No começo não acreditei, mas o suporte me ajudou e já resgatei 3 vezes. Nota 10.', diamondsWon: '1000+', avatar: 'https://picsum.photos/seed/user3/100/100' },
];

export const TRANSLATIONS = {
  pt: {
    heroTitle: "Ganhe Diamantes Free Fire 100% Grátis!",
    heroSubtitle: "Basta compartilhar com seus amigos e resgatar suas recompensas. Processo 100% seguro e garantido.",
    distributed: "Já distribuímos mais de 1.250.000 diamantes!",
    cta: "Quero Meus Diamantes Agora!",
    howItWorks: "Como Funciona",
    prizes: "Prêmios",
    testimonials: "Depoimentos",
    support: "Suporte",
    shareMessage: "Ganhe diamantes Free Fire 100% Grátis! Acesse: https://freerewards.io"
  },
  en: {
    heroTitle: "Get 100% Free Free Fire Diamonds!",
    heroSubtitle: "Just share with your friends and redeem your rewards. 100% safe and guaranteed process.",
    distributed: "We've already distributed over 1,250,000 diamonds!",
    cta: "I Want My Diamonds Now!",
    howItWorks: "How It Works",
    prizes: "Prizes",
    testimonials: "Testimonials",
    support: "Support",
    shareMessage: "Get 100% Free Free Fire Diamonds! Access: https://freerewards.io"
  },
  es: {
    heroTitle: "¡Obtén Diamantes de Free Fire 100% Gratis!",
    heroSubtitle: "Solo comparte con tus amigos y canjea tus recompensas. Proceso 100% seguro y garantizado.",
    distributed: "¡Ya hemos distribuido más de 1,250,000 diamantes!",
    cta: "¡Quiero Mis Diamantes Ahora!",
    howItWorks: "Cómo Funciona",
    prizes: "Premios",
    testimonials: "Testimonios",
    support: "Soporte",
    shareMessage: "¡Obtén Diamantes de Free Fire 100% Gratis! Accede: https://freerewards.io"
  }
};
