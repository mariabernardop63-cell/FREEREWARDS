import { useEffect, useRef } from 'react';

const NativeBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 🔹 Cria o script
    const script = document.createElement('script');
    script.src = "https://pl28517691.effectivegatecpm.com/878e4233857120a9a5ad99a5f373021e/invoke.js";
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    // 🔹 Adiciona o script dentro do container
    if (bannerRef.current) {
      bannerRef.current.appendChild(script);
    }

    // 🔹 Cleanup (remover o script se o componente desmontar)
    return () => {
      if (bannerRef.current) {
        bannerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={bannerRef} id="container-878e4233857120a9a5ad99a5f373021e"></div>
  );
};

export default NativeBanner;

