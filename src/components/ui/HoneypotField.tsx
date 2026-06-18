import { HONEYPOT_FIELD } from '../../lib/formSecurity';

type HoneypotFieldProps = {
  disabled?: boolean;
};

export function HoneypotField({ disabled = false }: HoneypotFieldProps) {
  return (
    <div className="honeypot-field" aria-hidden="true">
      <label htmlFor="company-website">Company Website</label>
      <input
        id="company-website"
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        disabled={disabled}
      />
    </div>
  );
}
