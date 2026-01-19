iimport { useEffect, useRef } from 'react';

const NativeBanner = () => {
  const bannerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = "https://pl28517691.effectivegatecpm.com/878e4233857120a9a5ad99a5f373021e/invoke.js";
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    if (bannerRef.current) {
      bannerRef.current.appendChild(script);
    }

    return () => {
      if (bannerRef.current) {
        bannerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div id="container-878e4233857120a9a5ad99a5f373021e" ref={bannerRef}></div>
  );
};

export default NativeBanner;
