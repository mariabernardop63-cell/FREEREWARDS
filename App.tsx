
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
  User,
  Save
} from 'lucide-react';
import { Language, User as UserType } from './types';

import NativeBanner from './components/NativeBanner';

import { TRANSLATIONS, REWARD_LEVELS, OTHER_PRIZES, TESTIMONIALS } from './constants';

// --- Chaves do LocalStorage ---
const STORAGE_USER_KEY = 'freerewards_user_v1';
const STORAGE_LANG_KEY = 'freerewards_lang_v1';

// --- Mapeamento de Países para Idiomas ---
const COUNTRY_TO_LANG: Record<string, Language> = {
  'BR': 'pt', 'PT': 'pt', 'AO': 'pt', 'MZ': 'pt', 'CV': 'pt', 'ST': 'pt', 'TL': 'pt', 'GW': 'pt',
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es', 'VE': 'es', 'EC': 'es', 
  'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es', 'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 
  'CR': 'es', 'UY': 'es', 'PA': 'es', 'GQ': 'es'
};

// --- Função de Registro de ID (Simulada) ---
const registrar_id_jogo = async (id: string, game: 'ff' | 'rbx'): Promise<{ success: boolean, error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numericId = id.replace(/\D/g, '');
      
      // Validação básica de formato
      if (numericId.length < 5) {
        resolve({ success: false, error: "ID INVÁLIDO OU MUITO CURTO" });
      } else {
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
    <nav className="sticky top-0 z-50 bg-[#0a1a3a] text-white shadow-xl border-b border-white/5">   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-electric-blue p-1.5 rounded-lg">
              <Gem className="text-white w-5 h-5" />
            </div>

<NativeBanner />
            
            <span className="font-extrabold text-xl tracking-tighter">FREE<span className="text-electric-blue">REWARDS</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <a href="#inicio" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Início</a>
              <a href="#como-funciona" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">{t.howItWorks}</a>
              <a href="#premios" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">{t.prizes}</a>
              <a href="#depoimentos" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">{t.testimonials}</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-1 text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors">
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase font-bold">{lang}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-[#0d214a] border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[140px] animate-in fade-in zoom-in-95 duration-200">
                {(['pt', 'en', 'es'] as Language[]).map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`w-full text-left px-4 py-3 hover:bg-electric-blue transition-colors text-xs font-bold uppercase border-b border-white/5 last:border-0 ${lang === l ? 'bg-white/10 text-electric-blue' : 'text-gray-300'}`}
                  >
                    {l === 'pt' ? 'Português' : l === 'en' ? 'English' : 'Español'}
                  </button>
                ))}
              </div>
            </div>

            {user.isLoggedIn ? (
              <button 
                onClick={onOpenRedeem}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-gold/30 transition-all group"
              >
                <Gem className="w-4 h-4 text-gold animate-pulse" />
                <span className="text-sm font-black text-gold">{user.unclaimedDiamonds}</span>
              </button>
            ) : (
              <button 
                onClick={onLogin}
                className="bg-electric-blue hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-black transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                ENTRAR
              </button>
            )}
            
            <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-[#0d214a] border-t border-white/5 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
          <a href="#inicio" className="block px-3 py-3 rounded-xl text-base font-bold text-gray-300 hover:bg-white/5">Início</a>
          <a href="#como-funciona" className="block px-3 py-3 rounded-xl text-base font-bold text-gray-300 hover:bg-white/5">{t.howItWorks}</a>
          <a href="#premios" className="block px-3 py-3 rounded-xl text-base font-bold text-gray-300 hover:bg-white/5">{t.prizes}</a>
          {!user.isLoggedIn && (
            <button onClick={onLogin} className="w-full bg-electric-blue text-white py-3 rounded-xl font-black mt-4">ENTRAR AGORA</button>
          )}
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
    
    const result = await registrar_id_jogo(gameId, selectedGame);
    
    if (result.success) {
      setStatus('confirmed');
    } else {
      setErrorMsg(result.error || 'ID INVÁLIDO');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 relative animate-in zoom-in duration-300 shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-300 hover:text-gray-900 transition-colors"><X size={24} /></button>
        
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 transition-all duration-500 ${status === 'confirmed' ? 'bg-green-50 border-green-100 scale-110' : status === 'error' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-50'}`}>
            {status === 'confirmed' ? <Save className="w-10 h-10 text-green-500" /> : status === 'error' ? <AlertCircle className="w-10 h-10 text-red-500" /> : <Gamepad2 className="w-10 h-10 text-electric-blue" />}
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Vincular Conta</h2>
          <p className="text-gray-500 text-sm font-medium">Sincronize seu ID para receber recompensas automáticas.</p>
        </div>

        {status === 'confirmed' ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
             <div className="bg-green-50 border-2 border-green-100 rounded-3xl p-6 text-center">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">ID Salvo com Sucesso</p>
                <h3 className="text-3xl font-black text-green-900 mb-3 truncate">{gameId}</h3>
                <div className="bg-white/60 p-4 rounded-2xl border border-green-200">
                  <p className="text-[11px] text-green-800 font-bold leading-relaxed">
                    <b>Nota de Segurança:</b> Seu ID foi registrado. A validação oficial de titularidade e a transferência dos itens serão concluídas automaticamente no momento do seu <b>primeiro pedido de resgate</b>.
                  </p>
                </div>
             </div>
             <button 
                type="button"
                onClick={() => onSuccess(gameId)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-500/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                ACESSAR MEU PAINEL <ArrowRight size={20} />
              </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setSelectedGame('ff')}
                disabled={status === 'verifying'}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${selectedGame === 'ff' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 bg-gray-50'}`}
              >
                <div className="h-10 w-10 overflow-hidden rounded-lg bg-white p-1 shadow-sm">
                   <img src="https://upload.wikimedia.org/wikipedia/en/2/29/Free_Fire_Logo.png" alt="Free Fire" className="w-full h-full object-contain" />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${selectedGame === 'ff' ? 'text-orange-600' : 'text-gray-400'}`}>Free Fire</span>
              </button>
              <button 
                onClick={() => setSelectedGame('rbx')}
                disabled={status === 'verifying'}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${selectedGame === 'rbx' ? 'border-gray-900 bg-gray-100' : 'border-gray-100 bg-gray-50'}`}
              >
                <div className="h-10 w-10 overflow-hidden rounded-lg bg-white p-1 shadow-sm">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1024px-Roblox_player_icon_black.svg.png" alt="Roblox" className="w-full h-full object-contain" />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${selectedGame === 'rbx' ? 'text-gray-900' : 'text-gray-400'}`}>Roblox</span>
              </button>
            </div>
            
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="relative">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  ID de Jogador Oficial
                </label>
                <div className="relative">
                  <input 
                    required
                    disabled={status === 'verifying'}
                    type="text" 
                    placeholder={selectedGame === 'ff' ? "Ex: 159827364" : "ID do Jogador"}
                    className={`w-full px-6 py-5 rounded-2xl border-2 outline-none transition-all font-black text-xl text-center ${status === 'error' ? 'border-red-200 bg-red-50 text-red-700 focus:border-red-400' : 'border-gray-100 focus:border-electric-blue bg-gray-50 text-gray-900'}`}
                    value={gameId}
                    onChange={(e) => {
                        setGameId(e.target.value);
                        if(status === 'error') setStatus('idle');
                    }}
                  />
                  {status === 'verifying' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Loader2 className="w-6 h-6 text-electric-blue animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              {status === 'error' && (
                <div className="flex flex-col items-center gap-2 text-red-600 bg-red-50 p-5 rounded-2xl border border-red-100 animate-in shake duration-300">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="shrink-0" />
                    <span className="text-sm font-black uppercase tracking-tighter">{errorMsg}</span>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                disabled={status === 'verifying'}
                className="w-full bg-[#0a1a3a] hover:bg-gray-800 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/10 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === 'verifying' ? 'REGISTRANDO NO BANCO...' : 'SALVAR ID DO JOGADOR'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const Hero: React.FC<{ lang: Language, onStart: () => void }> = ({ lang, onStart }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="inicio" className="relative bg-[#0a1a3a] text-white pt-24 pb-36 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-blue rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full mb-10 text-electric-blue text-xs font-black uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>Plataforma de Recompensas #1</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] max-w-5xl mx-auto tracking-tight">
          {t.heroTitle.split('!')[0]}<span className="text-electric-blue">!</span>
        </h1>
        
        <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
          {t.heroSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <button 
            onClick={onStart}
            className="bg-electric-blue hover:bg-blue-600 px-10 py-5 rounded-[20px] text-xl font-black transition-all shadow-2xl shadow-blue-500/40 transform hover:-translate-y-1 active:scale-95 animate-pulse-gold"
          >
            {t.cta}
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-5 rounded-[20px] text-xl font-bold transition-all backdrop-blur-md">
            Ver Provas Reais
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Users, label: "Usuários Ativos", val: "54.218" },
            { icon: Gem, label: "Diamantes Entregues", val: "1.285.400", color: "text-gold" },
            { icon: ShieldCheck, label: "Taxa de Sucesso", val: "100%", color: "text-green-400" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <item.icon className={`w-10 h-10 mx-auto mb-4 ${item.color || 'text-electric-blue'}`} />
              <div className="text-4xl font-black text-white mb-1 tracking-tighter">{item.val}</div>
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Notification: React.FC<{ message: string, onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="bg-[#0d214a] border border-electric-blue/30 text-white px-6 py-5 rounded-2xl shadow-2xl flex items-center gap-5 animate-in slide-in-from-right duration-500 max-w-sm">
      <div className="bg-electric-blue/20 p-2.5 rounded-xl shrink-0">
        <Bell className="w-5 h-5 text-electric-blue" />
      </div>
      <p className="text-sm font-bold leading-snug">{message}</p>
      <button onClick={onClose} className="text-gray-500 hover:text-white shrink-0 transition-colors"><X size={20} /></button>
    </div>
  );
};

const RewardsSystem: React.FC<{ 
  user: UserType, 
  onShare: () => void,
  lang: Language 
}> = ({ user, onShare, lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <section id="como-funciona" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-gray-900">Sistema de Níveis</h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-lg font-medium">
            Acumule indicações compartilhando seu link. Ao atingir as metas, os bônus são liberados instantaneamente para o seu saldo de resgate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {REWARD_LEVELS.map((level) => {
            const progress = Math.min((user.shares / level.shares) * 100, 100);
            const isCompleted = user.shares >= level.shares;
            
            return (
              <div key={level.id} className={`relative p-10 rounded-[2.5rem] border-2 transition-all duration-500 ${isCompleted ? 'border-green-500 bg-green-50 shadow-2xl shadow-green-500/10' : 'border-gray-100 bg-gray-50'}`}>
                {isCompleted && (
                  <div className="absolute -top-5 -right-5 bg-green-500 text-white p-3 rounded-2xl shadow-xl animate-in zoom-in">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                )}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-white shadow-md border-2 ${level.color}`}>
                  <Gem className="w-8 h-8 text-electric-blue" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-gray-900">{level.name}</h3>
                <div className="text-4xl font-black text-[#0a1a3a] mb-8 tracking-tighter">
                  {level.diamonds} <span className="text-sm font-bold text-gray-400 uppercase ml-1">Dimas</span>
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 text-gray-500">
                    <span>Progresso Atual</span>
                    <span className={isCompleted ? 'text-green-600' : 'text-electric-blue'}>{user.shares} / {level.shares}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden p-1">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-500' : 'bg-electric-blue'}`} 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-10 font-medium leading-relaxed">
                  Desbloqueie {level.diamonds} diamantes ao alcançar {level.shares} amigos convidados.
                </p>

                <button 
                  onClick={onShare}
                  disabled={isCompleted}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all transform active:scale-95 ${isCompleted ? 'bg-green-100 text-green-600 cursor-default' : 'bg-[#0a1a3a] text-white hover:bg-gray-800 shadow-xl'}`}
                >
                  {isCompleted ? 'Nível Alcançado' : 'RESGATAR'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-[#0a1a3a] p-12 rounded-[3rem] text-center text-white shadow-2xl shadow-blue-900/20">
          <h4 className="text-2xl font-black mb-10 tracking-tight">Compartilhe e Ganhe Instantaneamente:</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: MessageCircle, label: "WhatsApp", color: "bg-[#25D366]", shadow: "shadow-[#25D366]/20" },
              { icon: Facebook, label: "Facebook", color: "bg-[#1877F2]", shadow: "shadow-[#1877F2]/20" },
              { icon: Twitter, label: "Twitter", color: "bg-[#000000]", shadow: "shadow-black/20" }
            ].map((btn, i) => (
              <button key={i} onClick={onShare} className={`flex items-center gap-3 ${btn.color} text-white px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl ${btn.shadow} active:scale-95`}>
                <btn.icon className="w-6 h-6" /> {btn.label}
              </button>
            ))}
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
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="bg-white rounded-[3rem] w-full max-w-lg overflow-hidden relative animate-in zoom-in duration-300 shadow-2xl">
        <div className="bg-[#0a1a3a] p-10 text-white relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors"><X size={28} /></button>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gold rounded-[2rem] flex items-center justify-center shadow-2xl shadow-gold/20">
              <Gem className="w-10 h-10 text-[#0a1a3a]" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Painel de Resgate</h2>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">ID: {user.email}</p>
              </div>
              <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em] mt-2">Aguardando Validação no Resgate</p>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 flex justify-between items-center backdrop-blur-sm">
            <div>
              <p className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-1">Saldo Pendente</p>
              <p className="text-4xl font-black text-gold tracking-tighter">{user.unclaimedDiamonds} <span className="text-sm font-bold opacity-50 uppercase">Dimas</span></p>
            </div>
            <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center">
               <ArrowRight className="text-white/60" />
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-1">Já Enviados</p>
              <p className="text-4xl font-black text-green-400 tracking-tighter">{user.diamonds}</p>
            </div>
          </div>
        </div>

        <div className="p-10">
          <h3 className="font-black text-gray-900 mb-8 flex items-center gap-3 text-lg uppercase tracking-wider">
            <Lock className="w-5 h-5 text-electric-blue" /> Requisitos Atuais
          </h3>

          <div className="space-y-4 mb-10">
            {REWARD_LEVELS.map((level, i) => {
              const done = user.shares >= level.shares;
              return (
                <div key={level.id} className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${done ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black ${done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {done ? <CheckCircle size={20} /> : i + 1}
                    </div>
                    <span className={`font-black text-lg ${done ? 'text-green-900' : 'text-gray-400'}`}>{level.name}</span>
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest ${done ? 'text-green-600' : 'text-gray-300'}`}>
                    {done ? 'Completo' : `${user.shares}/${level.shares}`}
                  </span>
                </div>
              );
            })}
          </div>

          {!canRedeem && (
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl mb-10 flex gap-4 items-start">
              <HelpCircle className="w-6 h-6 text-electric-blue shrink-0 mt-1" />
              <p className="text-sm text-blue-900 font-medium leading-relaxed">
                Você precisa completar todos os 3 níveis (chegar ao <b>Nível Ouro</b>) para realizar o seu primeiro resgate para a conta oficial do jogo.
              </p>
            </div>
          )}

          <button 
            disabled={!canRedeem || isProcessing}
            onClick={handleRedeemClick}
            className={`w-full py-6 rounded-3xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 transform active:scale-[0.98] ${
              canRedeem 
              ? 'bg-electric-blue text-white hover:bg-blue-600 shadow-blue-500/40' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <Gem className="w-6 h-6" />}
            {isProcessing ? 'Validando ID na Garena...' : 'SOLICITAR RESGATE AGORA'}
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // --- Sistema de Detecção de Idioma por IP ---
  const detectLanguageByIP = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) return;
      
      const data = await response.json();
      const countryCode = data.country_code;
      
      if (countryCode && COUNTRY_TO_LANG[countryCode]) {
        setLang(COUNTRY_TO_LANG[countryCode]);
        console.log(`FreeRewards: Localização detectada (${countryCode}). Idioma ajustado para ${COUNTRY_TO_LANG[countryCode]}.`);
      } else {
        setLang('en');
      }
    } catch (error) {
      console.warn("FreeRewards: Falha ao detectar idioma por IP, usando fallback.", error);
    }
  }, []);

  // --- Efeito de Inicialização ---
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_USER_KEY);
    const savedLang = localStorage.getItem(STORAGE_LANG_KEY);

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Erro ao carregar dados do usuário:", e);
      }
    }

    if (savedLang && (['pt', 'en', 'es'].includes(savedLang))) {
      setLang(savedLang as Language);
    } else {
      detectLanguageByIP();
    }
    
    setIsInitialLoad(false);
  }, [detectLanguageByIP]);

  // --- Efeito de Persistência ---
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    }
  }, [user, isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    }
  }, [lang, isInitialLoad]);

  useEffect(() => {
    if (isInitialLoad) return;
    
    const timer = setTimeout(() => {
      if (!user.isLoggedIn) setShowWelcomePopup(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [user.isLoggedIn, isInitialLoad]);

  const handleLogin = () => setShowLogin(true);

  const addNotification = useCallback((msg: string) => {
    setNotifications(prev => [...prev, msg]);
  }, []);

  const onLoginSuccess = (id: string) => {
    setUser(prev => ({ 
      ...prev, 
      isLoggedIn: true, 
      email: id, 
      unclaimedDiamonds: prev.unclaimedDiamonds > 0 ? prev.unclaimedDiamonds : 10 
    })); 
    setShowLogin(false);
    addNotification(`ID ${id} registrado com sucesso.`);
  };

  const handleRedeem = () => {
    setUser(prev => ({
      ...prev,
      diamonds: prev.diamonds + prev.unclaimedDiamonds,
      unclaimedDiamonds: 0
    }));
    addNotification("RESGATE SOLICITADO! Seu ID está em fila de processamento.");
    setTimeout(() => setShowRedeem(false), 1500);
  };

  const simulateShare = useCallback(() => {
    if (!user.isLoggedIn) {
      handleLogin();
      return;
    }
    
    const increment = Math.floor(Math.random() * 5) + 8;
    setUser(prev => {
      const newShares = prev.shares + increment;
      let addedDiamonds = 0;
      
      REWARD_LEVELS.forEach(level => {
        if (newShares >= level.shares && prev.shares < level.shares) {
          addedDiamonds += level.diamonds;
          setTimeout(() => addNotification(`Nível ${level.name} Desbloqueado! +${level.diamonds} dimas.`), 500);
        }
      });
      
      return { 
        ...prev, 
        shares: newShares, 
        unclaimedDiamonds: prev.unclaimedDiamonds + addedDiamonds 
      };
    });

    const text = TRANSLATIONS[lang].shareMessage;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }, [user.isLoggedIn, lang, addNotification]);

  return (
    <div className="min-h-screen selection:bg-electric-blue selection:text-white bg-gray-50">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        onLogin={handleLogin} 
        onOpenRedeem={() => setShowRedeem(true)} 
        user={user} 
      />
      
      <main>
        <Hero lang={lang} onStart={user.isLoggedIn ? () => document.getElementById('como-funciona')?.scrollIntoView({behavior: 'smooth'}) : handleLogin} />
        
        {user.isLoggedIn && (
          <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-md py-4 animate-in slide-in-from-top duration-500">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-0.5">ID Registrado</span>
                  <span className="text-sm font-black text-[#0a1a3a] truncate max-w-[140px]">{user.email}</span>
                </div>
                <div className="h-10 w-px bg-gray-100"></div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Convites</span>
                  <span className="text-sm font-black text-electric-blue">{user.shares} Amigos</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowRedeem(true)}
                className="flex items-center gap-4 bg-gold/5 hover:bg-gold/10 px-6 py-2.5 rounded-2xl border border-gold/20 transition-all group"
              >
                <div className="relative">
                   <Gem className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform" />
                   <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full animate-ping border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <span className="block text-2xl font-black text-[#0a1a3a] leading-none tracking-tighter">{user.unclaimedDiamonds}</span>
                  <span className="block text-[8px] text-gray-500 font-black uppercase tracking-widest mt-0.5">Saldo Disponível</span>
                </div>
              </button>
            </div>
          </div>
        )}

        <RewardsSystem user={user} onShare={simulateShare} lang={lang} />
        
        <section id="premios" className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Catálogo de Prêmios</h2>
              <p className="text-gray-500 font-medium text-lg">Troque seu saldo por outras recompensas globais.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {OTHER_PRIZES.map(prize => (
                <div key={prize.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 border border-white hover:border-electric-blue/20 transition-all group">
                   <div className="h-52 overflow-hidden">
                      <img src={prize.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="p-8">
                     <span className="text-[10px] font-black text-electric-blue uppercase tracking-widest mb-2 block">{prize.category}</span>
                     <h3 className="font-black text-2xl text-gray-900 mb-2">{prize.name}</h3>
                     <p className="text-gray-500 font-black text-xl mb-8 tracking-tighter">{prize.value}</p>
                     <button onClick={() => setShowRedeem(true)} className="w-full py-4 bg-gray-50 text-gray-600 rounded-2xl text-sm font-black border border-gray-100 hover:bg-[#0a1a3a] hover:text-white transition-all">RESGATAR AGORA</button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="depoimentos" className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Comunidade FreeRewards</h2>
              <p className="text-gray-500 font-medium text-lg">Veja quem já resgatou suas recompensas hoje.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {TESTIMONIALS.map(t => (
                <div key={t.id} className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-5 mb-6">
                    <img src={t.avatar} className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                    <div>
                      <h4 className="font-black text-lg text-gray-900">{t.name}</h4>
                      <div className="flex items-center gap-1.5 text-gold">
                         <Gem size={14} />
                         <p className="text-xs font-black uppercase tracking-widest">Resgatou {t.diamondsWon}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-lg font-medium leading-relaxed italic">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a1a3a] text-white py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="bg-electric-blue p-2 rounded-xl">
               <Gem className="text-white w-8 h-8" />
            </div>
            <span className="font-extrabold text-3xl tracking-tighter">FREE<span className="text-electric-blue">REWARDS</span></span>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 font-medium">
            A maior e mais segura plataforma de distribuição de itens para jogos mobile via ID oficial. 100% legalizado e seguro.
          </p>
          <div className="flex justify-center gap-8 mb-12">
             <a href="#" className="text-gray-500 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">Termos de Uso</a>
             <a href="#" className="text-gray-500 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">Privacidade</a>
             <a href="#" className="text-gray-500 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">Suporte</a>
          </div>
          <div className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] border-t border-white/5 pt-12">
            © 2024 FREEREWARDS INC. TODOS OS DIREITOS RESERVADOS.
          </div>
        </div>
      </footer>

      {showLogin && (
        <RegistrationModal onClose={() => setShowLogin(false)} onSuccess={onLoginSuccess} />
      )}

      {showRedeem && <RedeemModal user={user} onClose={() => setShowRedeem(false)} onRedeem={handleRedeem} />}
      
      {showWelcomePopup && (
        <div className="fixed bottom-28 left-8 z-[90] max-w-sm animate-in slide-in-from-left duration-700">
          <div className="bg-[#0a1a3a] text-white p-8 rounded-[2.5rem] shadow-2xl border border-electric-blue/40 relative backdrop-blur-xl">
             <button onClick={() => setShowWelcomePopup(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={18}/></button>
             <div className="bg-gold w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-gold/20">
                <Gem className="text-[#0a1a3a]" size={32} />
             </div>
             <p className="font-black text-xl mb-2 tracking-tight">Presente de Boas-vindas!</p>
             <p className="text-gray-400 text-sm mb-8 font-medium">Vincule seu ID agora e ganhe 10 diamantes de bônus imediato.</p>
             <button onClick={() => {setShowWelcomePopup(false); handleLogin();}} className="w-full bg-electric-blue hover:bg-blue-600 py-4 rounded-2xl text-sm font-black transition-all active:scale-95 shadow-xl shadow-blue-500/20">PEGAR MEU BÔNUS AGORA</button>
          </div>
        </div>
      )}

      <div className="fixed top-24 right-6 flex flex-col gap-4 z-[110]">
        {notifications.map((msg, idx) => (
          <Notification key={idx} message={msg} onClose={() => setNotifications(prev => prev.filter((_, i) => i !== idx))} />
        ))}
      </div>
      
      <button onClick={() => setShowRedeem(true)} className="fixed bottom-8 right-8 w-20 h-20 bg-electric-blue rounded-[2rem] shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-40 border-4 border-white animate-bounce">
        <Gem className="w-10 h-10" />
        <span className="absolute -top-2 -right-2 bg-gold text-[#0a1a3a] text-[10px] font-black px-3 py-1 rounded-full border-2 border-white shadow-lg tracking-widest">RESGATE</span>
      </button>
    </div>
  );
}
