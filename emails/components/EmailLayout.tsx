import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { ReactNode } from 'react';

type EmailLayoutProps = {
  preview: string;
  title: string;
  children: ReactNode;
};

export function EmailLayout({ preview, title, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brandMark}>THE VAULT VENDING</Text>
            <Heading style={heading}>{title}</Heading>
          </Section>
          <Section style={content}>{children}</Section>
          <Hr style={divider} />
          <Text style={footer}>
            The Vault Vending Inc. · British Columbia, Canada · 19+ Licensed Venues Only
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

type FieldProps = {
  label: string;
  value: string;
};

export function EmailField({ label, value }: FieldProps) {
  return (
    <Section style={fieldBlock}>
      <Text style={fieldLabel}>{label}</Text>
      <Text style={fieldValue}>{value}</Text>
    </Section>
  );
}

const body = {
  backgroundColor: '#f4f4f5',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: '0',
  padding: '24px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e4e4e7',
  borderRadius: '8px',
  margin: '0 auto',
  maxWidth: '560px',
  overflow: 'hidden' as const,
};

const header = {
  backgroundColor: '#000000',
  padding: '28px 32px 24px',
};

const brandMark = {
  color: '#9B30FF',
  fontSize: '11px',
  fontWeight: '700' as const,
  letterSpacing: '0.2em',
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
};

const heading = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700' as const,
  letterSpacing: '0.02em',
  lineHeight: '1.2',
  margin: '0',
};

const content = {
  padding: '28px 32px 8px',
};

const fieldBlock = {
  marginBottom: '18px',
};

const fieldLabel = {
  color: '#71717a',
  fontSize: '11px',
  fontWeight: '700' as const,
  letterSpacing: '0.08em',
  margin: '0 0 4px',
  textTransform: 'uppercase' as const,
};

const fieldValue = {
  color: '#18181b',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const divider = {
  borderColor: '#e4e4e7',
  margin: '0 32px',
};

const footer = {
  color: '#a1a1aa',
  fontSize: '12px',
  lineHeight: '1.6',
  margin: '0',
  padding: '20px 32px 28px',
  textAlign: 'center' as const,
};
