interface EyebrowProps {
  children: React.ReactNode;
  variant?: 'default' | 'purple';
}

export function Eyebrow({ children, variant = 'default' }: EyebrowProps) {
  return (
    <p className={variant === 'purple' ? 'eyebrow eyebrow-p' : 'eyebrow'}>{children}</p>
  );
}
