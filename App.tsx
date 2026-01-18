
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Gem, 
  Share2, 
  ShieldCheck, 
  Users, 
  CheckCircle, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Send, 
  Instagram,
  ChevronRight,
  HelpCircle,
  Menu,
  X,
  Globe,
  Bell,
  Clock,
  Lock,
  ArrowRight,
  Loader2,
  Search,
  UserCheck,
  AlertCircle,
  Gamepad2,
  Gamepad
} from 'lucide-react';
import { Language, User as UserType } from './types';
import { TRANSLATIONS, REWARD_LEVELS, OTHER_PRIZES, TESTIMONIALS } from './constants';

// --- Função de Simulação de Consulta (API do Jogo) ---
const consultar_id_jogo = async (id: string, game: 'ff' | 'rbx'): Promise<{ success: boolean, error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id.length < 8) {
        resolve({ success: false, error: `O ID do ${game === 'ff' ? 'Free Fire' : 'Roblox'} deve ter pelo menos 8 dígitos.` });
      } else if (id === "00000000" || id === "11111111") {
        resolve({ success: false, error: "Jogador não encontrado neste jogo. Verifique o ID e tente novamente." });
      } else {
        // Removida geração de nicknames
        resolve({ success: true });
      }
    }, 1500);
  });
};

// --- Subcomponents ---

const Navbar: React.FC<{ 
  lang: Language, 
  setLang: (l: Language) => void,
  onLogin: () => void,
  onOpenRedeem: () => void,
  user: UserType
}> = ({ lang, setLang, onLogin, onOpenRedeem, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a1a3a] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Gem className="text-electric-blue w-8 h-8" />
            <span className="font-extrabold text-xl tracking-tighter">FREE<span className="text-electric-blue">REWARDS</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#inicio" className="hover:text-electric-blue px-3 py-2 text-sm font-medium">Início</a>
              <a href="#como-funciona" className="hover:text-electric-blue px-3 py-2 text-sm font-medium">{t.howItWorks}</a>
              <a href="#premios" className="hover:text-electric-blue px-3 py-2 text-sm font-medium">{t.prizes}</a>
              <a href="#depoimentos" className="hover:text-electric-blue px-3 py-2 text-sm font-medium">{t.testimonials}</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                <Globe className="w-4 h-4" />
                <span className="uppercase">{lang}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-[#0a1a3a] border border-gray-700 rounded-lg shadow-xl overflow-hidden min-w-[120px]">
                {(['pt', 'en', 'es'] as Language[]).map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`w-full text-left px-4 py-2 hover:bg-electric-blue transition-colors text-sm uppercase ${lang === l ? 'bg-gray-800' : ''}`}
                  >
                    {l === 'pt' ? 'Português' : l === 'en' ? 'English' : 'Español'}
                  </button>
                ))}
              </div>
            </div>

            {user.isLoggedIn ? (
              <button 
                onClick={onOpenRedeem}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-full border border-gray-700 transition-colors"
              >
                <Gem className="w-4 h-4 text-gold animate-pulse" />
                <span className="text-sm font-bold text-gold">{user.unclaimedDiamonds}</span>
              </button>
            ) : (
              <button 
                onClick={onLogin}
                className="bg-electric-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-blue-500/30"
              >
                Entrar
              </button>
            )}
            
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-[#0d214a] border-t border-gray-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#inicio" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-electric-blue">Início</a>
          <a href="#como-funciona" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-electric-blue">{t.howItWorks}</a>
          <a href="#premios" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-electric-blue">{t.prizes}</a>
        </div>
      )}
    </nav>
  );
};

const RegistrationModal: React.FC<{ onClose: () => void, onSuccess: (id: string) => void }> = ({ onClose, onSuccess }) => {
  const [gameId, setGameId] = useState('');
  const [selectedGame, setSelectedGame] = useState<'ff' | 'rbx'>('ff');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'confirmed' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameId) return;
    
    setStatus('verifying');
    setErrorMsg('');
    
    const result = await consultar_id_jogo(gameId, selectedGame);
    
    if (result.success) {
      setStatus('confirmed');
    } else {
      setErrorMsg(result.error || 'Erro desconhecido');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative animate-in zoom-in duration-300 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
        
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border transition-all ${status === 'confirmed' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
            {status === 'confirmed' ? <UserCheck className="w-8 h-8 text-green-500" /> : <Gamepad2 className="w-8 h-8 text-electric-blue" />}
          </div>
          <h2 className="text-2xl font-black mb-1">Vincular Sua Conta</h2>
          <p className="text-gray-500 text-xs">Selecione seu jogo e valide seu ID para continuar.</p>
        </div>

        {status !== 'confirmed' && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              onClick={() => setSelectedGame('ff')}
              disabled={status === 'verifying'}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${selectedGame === 'ff' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-gray-50'}`}
            >
              <img src="https://upload.wikimedia.org/wikipedia/en/2/29/Free_Fire_Logo.png" alt="Free Fire" className="h-8 object-contain" />
              <span className={`text-[10px] font-black uppercase ${selectedGame === 'ff' ? 'text-orange-600' : 'text-gray-400'}`}>Free Fire</span>
            </button>
            <button 
              onClick={() => setSelectedGame('rbx')}
              disabled={status === 'verifying'}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${selectedGame === 'rbx' ? 'border-gray-900 bg-gray-100' : 'border-gray-100 bg-gray-50'}`}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1024px-Roblox_player_icon_black.svg.png" alt="Roblox" className="h-8 object-contain" />
              <span className={`text-[10px] font-black uppercase ${selectedGame === 'rbx' ? 'text-gray-900' : 'text-gray-400'}`}>Roblox</span>
            </button>
          </div>
        )}
        
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="relative">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
              ID do {selectedGame === 'ff' ? 'Free Fire' : 'Roblox'}
            </label>
            <input 
              required
              disabled={status === 'verifying' || status === 'confirmed'}
              type="text" 
              placeholder={selectedGame === 'ff' ? "Ex: 159827364" : "ID do Jogador Roblox"}
              className={`w-full px-5 py-4 rounded-xl border-2 outline-none transition-all font-bold text-lg ${status === 'error' ? 'border-red-100 bg-red-50 text-red-900 focus:border-red-300' : 'border-gray-100 focus:border-electric-blue'}`}
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />
            {status === 'verifying' && (
              <div className="absolute right-4 bottom-4">
                <Loader2 className="w-6 h-6 text-electric-blue animate-spin" />
              </div>
            )}
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-xs font-bold border border-red-100 animate-in shake">
              <AlertCircle size={14} />
              {errorMsg}
            </div>
          )}

          {status === 'confirmed' && (
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center animate-in fade-in slide-in-from-top-2">
              <span className="text-xl font-black text-green-900 block mb-2">Verificação Concluída</span>
              <span className="text-[11px] text-green-600 font-bold uppercase tracking-wider">O seu ID foi validado e está pronto para receber bônus</span>
            </div>
          )}

          {status !== 'confirmed' ? (
            <button 
              type="submit"
              disabled={status === 'verifying'}
              className="w-full bg-electric-blue hover:bg-blue-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              {status === 'verifying' ? 'Verificando API...' : 'VERIFICAR ID AGORA'}
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => onSuccess(gameId)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-black text-lg shadow-lg shadow-green-500/30 transition-all"
            >
              CONTINUAR E GANHAR BÔNUS
            </button>
          )}

          {status === 'error' && (
            <button 
              type="button"
              onClick={() => { setStatus('idle'); setGameId(''); }}
              className="w-full text-gray-500 text-xs font-bold hover:underline"
            >
              Tentar outro ID
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

const Hero: React.FC<{ lang: Language, onStart: () => void }> = ({ lang, onStart }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="inicio" className="relative bg-[#0a1a3a] text-white pt-20 pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-electric-blue/20 border border-electric-blue/30 px-4 py-2 rounded-full mb-8 text-electric-blue text-sm font-bold">
          <CheckCircle className="w-4 h-4" />
          <span>Plataforma Oficial Verificada</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto">
          {t.heroTitle}
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          {t.heroSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onStart}
            className="bg-electric-blue hover:bg-blue-600 px-8 py-4 rounded-xl text-lg font-extrabold transition-all shadow-xl shadow-blue-500/40 transform hover:-translate-y-1 animate-pulse-gold"
          >
            {t.cta}
          </button>
          <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl text-lg font-bold transition-all backdrop-blur-sm">
            Ver Provas de Pagamento
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <Users className="w-8 h-8 text-electric-blue mx-auto mb-3" />
            <div className="text-3xl font-black text-white">50k+</div>
            <div className="text-gray-400 text-sm">Usuários Ativos</div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <Gem className="w-8 h-8 text-gold mx-auto mb-3" />
            <div className="text-3xl font-black text-white">1.2M+</div>
            <div className="text-gray-400 text-sm">Diamantes Entregues</div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <ShieldCheck className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-black text-white">100%</div>
            <div className="text-gray-400 text-sm">Seguro e Grátis</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RewardsSystem: React.FC<{ 
  user: UserType, 
  onShare: () => void,
  lang: Language 
}> = ({ user, onShare, lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="recompensas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Sistema de Recompensas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o nível de bônus que deseja e compartilhe seu link único com amigos. Quanto mais você compartilha, mais saldo acumula para resgate!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {REWARD_LEVELS.map((level) => {
            const progress = Math.min((user.shares / level.shares) * 100, 100);
            const isCompleted = user.shares >= level.shares;
            
            return (
              <div key={level.id} className={`relative p-8 rounded-3xl border-2 bg-gray-50 transition-all ${isCompleted ? 'border-green-500 shadow-xl' : 'border-gray-100'}`}>
                {isCompleted && (
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-full shadow-lg">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                )}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-white shadow-sm border ${level.color}`}>
                  <Gem className="w-6 h-6 text-electric-blue" />
                </div>
                <h3 className="text-xl font-black mb-2">{level.name}</h3>
                <div className="text-3xl font-black text-[#0a1a3a] mb-6">
                  {level.diamonds} <span className="text-sm font-normal text-gray-500 uppercase">Dimas</span>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-bold">{user.shares} / {level.shares}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-electric-blue h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-8">
                  Compartilhe com {level.shares} amigos para desbloquear este bônus.
                </p>

                <button 
                  onClick={onShare}
                  disabled={isCompleted}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${isCompleted ? 'bg-green-100 text-green-600 cursor-default' : 'bg-[#0a1a3a] text-white hover:bg-gray-800 shadow-lg'}`}
                >
                  {isCompleted ? 'Nível Concluído' : 'Obter bônus'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-100 p-8 rounded-3xl text-center">
          <h4 className="text-lg font-bold mb-6">Compartilhe em suas redes para progredir:</h4>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={onShare} className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </button>
            <button onClick={onShare} className="flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
              <Facebook className="w-5 h-5" /> Facebook
            </button>
            <button onClick={onShare} className="flex items-center gap-2 bg-[#1DA1F2] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
              <Twitter className="w-5 h-5" /> Twitter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const RedeemModal: React.FC<{ 
  user: UserType, 
  onClose: () => void,
  onRedeem: () => void 
}> = ({ user, onClose, onRedeem }) => {
  const isBronze = user.shares >= REWARD_LEVELS[0].shares;
  const isSilver = user.shares >= REWARD_LEVELS[1].shares;
  const isGold = user.shares >= REWARD_LEVELS[2].shares;
  const canRedeem = isBronze && isSilver && isGold;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRedeemClick = () => {
    if (!canRedeem) return;
    setIsProcessing(true);
    setTimeout(() => {
      onRedeem();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden relative animate-in zoom-in duration-300">
        <div className="bg-[#0a1a3a] p-8 text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X /></button>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center shadow-lg shadow-gold/20">
              <Gem className="w-8 h-8 text-[#0a1a3a]" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Central de Resgate</h2>
              <p className="text-gray-400 text-sm">Perfil: <span className="text-gold font-bold">{user.nickname || 'Jogador Verificado'}</span></p>
              <p className="text-[10px] text-gray-500 uppercase font-black">ID: {user.email}</p>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Saldo Pendente</p>
              <p className="text-3xl font-black text-gold">{user.unclaimedDiamonds} <span className="text-sm font-normal">Dimas</span></p>
            </div>
            <ArrowRight className="text-gray-600" />
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Enviado para Jogo</p>
              <p className="text-3xl font-black text-green-400">{user.diamonds}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Lock className="w-4 h-4 text-electric-blue" /> Requisitos de Desbloqueio
          </h3>

          <div className="space-y-4 mb-8">
            {REWARD_LEVELS.map((level, i) => {
              const done = user.shares >= level.shares;
              return (
                <div key={level.id} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${done ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {done ? <CheckCircle size={16} /> : i + 1}
                    </div>
                    <span className={`font-bold ${done ? 'text-green-700' : 'text-gray-600'}`}>{level.name}</span>
                  </div>
                  <span className={`text-xs font-black uppercase ${done ? 'text-green-600' : 'text-gray-400'}`}>
                    {done ? 'Completo' : `${user.shares}/${level.shares} Amigos`}
                  </span>
                </div>
              );
            })}
          </div>

          {!canRedeem && (
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-8 flex gap-3">
              <HelpCircle className="w-5 h-5 text-electric-blue shrink-0" />
              <p className="text-sm text-blue-800">
                Você precisa atingir o <b>Nível Ouro</b> para realizar seu primeiro resgate para a conta do jogo.
              </p>
            </div>
          )}

          <button 
            disabled={!canRedeem || isProcessing}
            onClick={handleRedeemClick}
            className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
              canRedeem 
              ? 'bg-electric-blue text-white hover:bg-blue-600 shadow-blue-500/30' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <Gem className="w-5 h-5" />}
            {isProcessing ? 'Processando...' : 'RESGATAR PARA MINHA CONTA'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [user, setUser] = useState<UserType>({
    isLoggedIn: false,
    shares: 0,
    diamonds: 0,
    unclaimedDiamonds: 0
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showRedeem, setShowRedeem] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user.isLoggedIn) setShowWelcomePopup(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, [user.isLoggedIn]);

  const handleLogin = () => setShowLogin(true);

  const onLoginSuccess = (id: string) => {
    setUser(prev => ({ 
      ...prev, 
      isLoggedIn: true, 
      email: id, 
      nickname: "Jogador Verificado", // Usando nome genérico
      unclaimedDiamonds: 10 
    })); 
    setShowLogin(false);
    addNotification(`ID validado com sucesso! Bônus de 10 dimas adicionado ao seu saldo.`);
  };

  const addNotification = (msg: string) => {
    setNotifications(prev => [...prev, msg]);
  };

  const handleRedeem = () => {
    setUser(prev => ({
      ...prev,
      diamonds: prev.diamonds + prev.unclaimedDiamonds,
      unclaimedDiamonds: 0
    }));
    addNotification("RESGATE SUCESSO! Diamantes enviados para sua conta oficial.");
    setTimeout(() => setShowRedeem(false), 1000);
  };

  const simulateShare = useCallback(() => {
    if (!user.isLoggedIn) {
      handleLogin();
      return;
    }
    
    const increment = Math.floor(Math.random() * 8) + 12;
    setUser(prev => {
      const newShares = prev.shares + increment;
      let addedDiamonds = 0;
      
      REWARD_LEVELS.forEach(level => {
        if (newShares >= level.shares && prev.shares < level.shares) {
          addedDiamonds += level.diamonds;
          addNotification(`Nível ${level.name} atingido! +${level.diamonds} dimas pendentes.`);
        }
      });
      
      return { 
        ...prev, 
        shares: newShares, 
        unclaimedDiamonds: prev.unclaimedDiamonds + addedDiamonds 
      };
    });

    const text = TRANSLATIONS[lang].shareMessage;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  }, [user.isLoggedIn, lang]);

  return (
    <div className="min-h-screen selection:bg-electric-blue selection:text-white">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        onLogin={handleLogin} 
        onOpenRedeem={() => setShowRedeem(true)} 
        user={user} 
      />
      
      <main>
        <Hero lang={lang} onStart={user.isLoggedIn ? () => {} : handleLogin} />
        
        {user.isLoggedIn && (
          <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm py-3 animate-in slide-in-from-top">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID</span>
                  <span className="text-sm font-black text-[#0a1a3a] truncate max-w-[120px]">{user.email}</span>
                </div>
                <div className="h-8 w-px bg-gray-100"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Progresso</span>
                  <span className="text-sm font-black text-electric-blue">{user.shares} Amigos</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowRedeem(true)}
                className="flex items-center gap-2 bg-gold/10 hover:bg-gold/20 px-4 py-2 rounded-xl border border-gold/20 transition-all group"
              >
                <div className="relative">
                   <Gem className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform" />
                   <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                </div>
                <div className="text-left">
                  <span className="block text-lg font-black text-[#0a1a3a] leading-none">{user.unclaimedDiamonds}</span>
                  <span className="block text-[8px] text-gray-500 font-bold uppercase">Saldo Pendente</span>
                </div>
              </button>
            </div>
          </div>
        )}

        <RewardsSystem user={user} onShare={simulateShare} lang={lang} />
        
        <section id="premios" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Outros Prêmios</h2>
              <p className="text-gray-600">Troque seus diamantes por Gift Cards e créditos em outros jogos.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {OTHER_PRIZES.map(prize => (
                <div key={prize.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-6">
                   <img src={prize.image} className="w-full h-40 object-cover rounded-xl mb-4" />
                   <h3 className="font-bold text-lg">{prize.name}</h3>
                   <p className="text-electric-blue font-black mb-4">{prize.value}</p>
                   <button onClick={() => setShowRedeem(true)} className="w-full py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-bold border border-gray-200">Ver Requisitos</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="depoimentos" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Depoimentos Reais</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {TESTIMONIALS.map(t => (
                <div key={t.id} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 max-w-sm w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={t.avatar} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-xs text-gold font-bold">Resgatou {t.diamondsWon} dimas</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a1a3a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Gem className="text-electric-blue w-8 h-8" />
            <span className="font-extrabold text-2xl tracking-tighter">FREE<span className="text-electric-blue">REWARDS</span></span>
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
            A plataforma mais segura para ganhar itens oficiais via ID de jogador.
          </p>
          <div className="text-gray-600 text-xs border-t border-white/10 pt-8">
            © 2024 FreeRewards. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {showLogin && (
        <RegistrationModal onClose={() => setShowLogin(false)} onSuccess={onLoginSuccess} />
      )}

      {showRedeem && <RedeemModal user={user} onClose={() => setShowRedeem(false)} onRedeem={handleRedeem} />}
      
      {showWelcomePopup && (
        <div className="fixed bottom-24 left-6 z-[90] max-w-xs animate-in slide-in-from-left">
          <div className="bg-[#0a1a3a] text-white p-6 rounded-2xl shadow-2xl border border-electric-blue relative">
             <button onClick={() => setShowWelcomePopup(false)} className="absolute top-2 right-2 text-gray-500"><X size={14}/></button>
             <div className="bg-gold w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <Gem className="text-[#0a1a3a]" size={20} />
             </div>
             <p className="font-bold text-sm mb-4">Ganhe 10 diamantes de bônus agora mesmo!</p>
             <button onClick={() => {setShowWelcomePopup(false); handleLogin();}} className="w-full bg-electric-blue py-2 rounded-lg text-xs font-black">PEGAR MEU BÔNUS</button>
          </div>
        </div>
      )}

      <div className="fixed top-20 right-4 flex flex-col gap-2 z-[110]">
        {notifications.map((msg, idx) => (
          <Notification key={idx} message={msg} onClose={() => setNotifications(prev => prev.filter((_, i) => i !== idx))} />
        ))}
      </div>
      
      <button onClick={() => setShowRedeem(true)} className="fixed bottom-24 right-6 w-16 h-16 bg-electric-blue rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-40 border-4 border-white animate-bounce">
        <Gem className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 bg-gold text-[#0a1a3a] text-[10px] font-black px-2 py-0.5 rounded-full border border-white">RESGATE</span>
      </button>
    </div>
  );
}

const Notification: React.FC<{ message: string, onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="bg-[#0a1a3a] border border-electric-blue text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right duration-500 max-w-xs">
      <div className="bg-electric-blue p-2 rounded-full shrink-0">
        <Bell className="w-4 h-4 text-white" />
      </div>
      <p className="text-xs font-bold leading-tight">{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-white shrink-0"><X size={16} /></button>
    </div>
  );
};
