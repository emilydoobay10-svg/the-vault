import type { SubmitStatus } from '../../lib/submitForm';

type FormFeedbackProps = {
  status: SubmitStatus;
  errorMessage?: string;
  successMessage: string;
};

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
        {errorMessage ?? 'Something went wrong. Please try again.'}
      </p>
    );
  }

  return null;
}
