interface CompliancePillProps {
  variant: 'pu' | 'pk' | 'gr';
  label: string;
}

export function CompliancePill({ variant, label }: CompliancePillProps) {
  return (
    <span className={`pill pill-${variant}`}>
      <span className={`pdot pdot-${variant}`} />
      {label}
    </span>
  );
}
