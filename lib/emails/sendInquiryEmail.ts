import { createElement } from 'react';
import { sendFormEmail } from '../sendEmail';
import { InquiryEmail, type InquiryEmailProps } from './InquiryEmail';

export async function sendInquiryEmail(props: InquiryEmailProps): Promise<void> {
  await sendFormEmail(
    `Inquiry — ${props.name}`,
    createElement(InquiryEmail, props),
  );
}
