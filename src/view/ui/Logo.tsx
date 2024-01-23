import logo from '@godiet-assets/logo.svg';
import { cn } from '@godiet-utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <span className="flex items-center gap-2">
      <img src={logo} alt="logo" />
      <p className={cn(' hidden sm:block', className)}>
        go<span className="font-bold">Diet</span>
      </p>
    </span>
  );
}
