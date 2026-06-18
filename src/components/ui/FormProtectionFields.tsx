import { HoneypotField } from './HoneypotField';
import { TurnstileWidget } from './TurnstileWidget';

type FormProtectionFieldsProps = {
  disabled?: boolean;
  onTurnstileTokenChange: (token: string | null) => void;
};

export function FormProtectionFields({
  disabled = false,
  onTurnstileTokenChange,
}: FormProtectionFieldsProps) {
  return (
    <>
      <HoneypotField disabled={disabled} />
      <TurnstileWidget onTokenChange={onTurnstileTokenChange} />
    </>
  );
}
