import { AvatarFallback } from './Fallback';
import { AvatarImage } from './Image';
import { AvatarRoot } from './Root';

interface AvatarProps {
  className?: string;
  src?: string;
  name: string;
}

export function Avatar(props: AvatarProps) {
  const { name, className, src } = props;

  function initials(name: string) {
    const names = name.trim().split(' ');
    const firstName = names[0] ?? '';
    const lastName = names.length > 1 ? names[names.length - 1] : '';
    return firstName && lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`
      : firstName.charAt(0);
  }

  return (
    <AvatarRoot className={className}>
      <AvatarImage src={src || ''} alt={name} />
      <AvatarFallback>{initials(name)}</AvatarFallback>
    </AvatarRoot>
  );
}
