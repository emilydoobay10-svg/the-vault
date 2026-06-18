import { Text } from '@react-email/components';
import { EmailField, EmailLayout } from './components/EmailLayout';

export type ApplicationEmailProps = {
  venueName: string;
  contactName: string;
  email: string;
  venueType: string;
};

export function ApplicationEmail({
  venueName,
  contactName,
  email,
  venueType,
}: ApplicationEmailProps) {
  return (
    <EmailLayout
      preview={`New venue application from ${venueName}`}
      title="New Partner Application"
    >
      <Text style={intro}>
        A licensed BC venue has submitted a partner application through the website.
      </Text>
      <EmailField label="Venue Name" value={venueName} />
      <EmailField label="Contact Name" value={contactName} />
      <EmailField label="Email" value={email} />
      <EmailField label="Venue Type" value={venueType} />
    </EmailLayout>
  );
}

const intro = {
  color: '#52525b',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 24px',
};
