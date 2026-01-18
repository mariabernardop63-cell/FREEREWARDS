
export type Language = 'pt' | 'en' | 'es';

export interface Prize {
  id: string;
  name: string;
  category: string;
  image: string;
  value: string;
}

export interface User {
  isLoggedIn: boolean;
  shares: number;
  diamonds: number; // Diamantes já enviados para a conta
  unclaimedDiamonds: number; // Diamantes no saldo do app (pendentes)
  email?: string; // ID ou Email do usuário
  nickname?: string; // Apelido verificado no jogo
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  avatar: string;
  diamondsWon: string;
}
