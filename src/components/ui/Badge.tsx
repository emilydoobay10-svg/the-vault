interface BadgeProps {
  variant: 'pk' | 'pu';
  label: string;
}

export function Badge({ variant, label }: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`}>
      <span className={`bdot bdot-${variant}`} />
      {label}
    </span>
  );
}
