import logo from '@godiet-assets/logo.svg';

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <img src={logo} alt="logo" />
      <p className="hidden sm:block">
        go<span className="font-bold">Diet</span>
      </p>
    </span>
  );
}
