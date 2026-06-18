import { Text } from '@react-email/components';
import { EmailField, EmailLayout } from './components/EmailLayout';

export type ContactEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactEmail({ name, email, subject, message }: ContactEmailProps) {
  return (
    <EmailLayout preview={`Contact form: ${subject}`} title="New Contact Submission">
      <Text style={intro}>Someone reached out through the contact page.</Text>
      <EmailField label="Name" value={name} />
      <EmailField label="Email" value={email} />
      <EmailField label="Subject" value={subject} />
      <EmailField label="Message" value={message} />
    </EmailLayout>
  );
}

const intro = {
  color: '#52525b',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 24px',
};
