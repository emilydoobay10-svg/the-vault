import { Text } from '@react-email/components';
import { EmailField, EmailLayout } from './components/EmailLayout';

export type InquiryEmailProps = {
  name: string;
  email: string;
  message: string;
};

export function InquiryEmail({ name, email, message }: InquiryEmailProps) {
  return (
    <EmailLayout preview={`New inquiry from ${name}`} title="New Inquiry">
      <Text style={intro}>A visitor submitted a question through the FAQ page.</Text>
      <EmailField label="Name" value={name} />
      <EmailField label="Email" value={email} />
      <EmailField label="Question" value={message} />
    </EmailLayout>
  );
}

const intro = {
  color: '#52525b',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 24px',
};
