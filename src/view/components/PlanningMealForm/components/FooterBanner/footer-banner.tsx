import { useFooterBannerHook } from './footer-banner.hook';

export function FooterBanner() {
  const { total } = useFooterBannerHook();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-800 py-4 text-center text-white">
      Total - Proteínas: {total.prot}g | Carboidratos: {total.carb}g | Gorduras:{' '}
      {total.fat}g | Calorias: {total.energy}kcal
    </div>
  );
}
