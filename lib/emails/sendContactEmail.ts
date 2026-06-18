import { createElement } from 'react';
import { sendFormEmail } from '../sendEmail';
import { ContactEmail, type ContactEmailProps } from './ContactEmail';

export async function sendContactEmail(props: ContactEmailProps): Promise<void> {
  await sendFormEmail(
    `Contact — ${props.subject}`,
    createElement(ContactEmail, props),
  );
}
