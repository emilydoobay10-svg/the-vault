import type { SubmitStatus } from '../../lib/submitForm';

type FormFeedbackProps = {
  status: SubmitStatus;
  errorMessage?: string;
  successMessage: string;
};

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

function toErrorMessage(value: unknown): string {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || DEFAULT_ERROR_MESSAGE;
  }
  return DEFAULT_ERROR_MESSAGE;
}

export function FormFeedback({ status, errorMessage, successMessage }: FormFeedbackProps) {
  if (status === 'success') {
    return (
      <p className="form-feedback form-feedback-success" role="status">
        {successMessage}
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p className="form-feedback form-feedback-error" role="alert">
        {toErrorMessage(errorMessage)}
      </p>
    );
  }

  return null;
}
