import { createElement } from 'react';
import { sendFormEmail } from '../sendEmail';
import { ApplicationEmail, type ApplicationEmailProps } from './ApplicationEmail';

export async function sendApplicationEmail(props: ApplicationEmailProps): Promise<void> {
  await sendFormEmail(
    `Partner Application — ${props.venueName}`,
    createElement(ApplicationEmail, props),
  );
}
