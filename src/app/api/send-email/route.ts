
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  // Proactive check for environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return NextResponse.json({ 
        message: 'Email service is not configured. Please ensure EMAIL_USER and EMAIL_PASS are set in your .env file and that the server has been restarted.'
    }, { status: 500 });
  }
    
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to you
    const mailToOwnerOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name} via portfolio`,
      html: `
        <p>You have a new contact form submission</p>
        <h3>Contact Details</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
      `,
    };

    // Confirmation email to the sender
    const mailToSenderOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for your message!',
        html: `
            <p>Hi ${name},</p>
            <p>Thank you for reaching out. I have received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br/>Fahad Kabir</p>
        `
    };

    // Send both emails
    await Promise.all([
        transporter.sendMail(mailToOwnerOptions),
        transporter.sendMail(mailToSenderOptions)
    ]);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send email. This could be due to incorrect EMAIL_USER or EMAIL_PASS credentials in your .env file.' }, { status: 500 });
  }
}
