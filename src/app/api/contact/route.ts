import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { portfolioConfig } from '@/config/portfolio.config';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_FORM_TO_EMAIL || portfolioConfig.personal.email;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * HTML email template for contact form submission
 */
function generateEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Montserrat', 'Poppins', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            border-bottom: 3px solid #00ff41;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          h1 {
            margin: 0;
            color: #00ff41;
            font-size: 24px;
          }
          .content {
            margin-bottom: 30px;
          }
          .field {
            margin-bottom: 20px;
          }
          .field-label {
            font-weight: bold;
            color: #64b5f6;
            margin-bottom: 8px;
            display: block;
          }
          .field-value {
            background-color: #f9f9f9;
            padding: 12px;
            border-left: 4px solid #64b5f6;
            border-radius: 4px;
            word-wrap: break-word;
            white-space: pre-wrap;
          }
          .footer {
            border-top: 1px solid #ddd;
            padding-top: 20px;
            color: #888;
            font-size: 12px;
          }
          .meta {
            color: #999;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Contact Form Submission</h1>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="field-label">From Name:</span>
              <div class="field-value">${escapeHTML(data.name)}</div>
            </div>
            
            <div class="field">
              <span class="field-label">From Email:</span>
              <div class="field-value">
                <a href="mailto:${escapeHTML(data.email)}">${escapeHTML(data.email)}</a>
              </div>
            </div>
            
            <div class="field">
              <span class="field-label">Message:</span>
              <div class="field-value">${escapeHTML(data.message)}</div>
            </div>
          </div>
          
          <div class="footer">
            <p class="meta">
              Submitted via Mind Palace Portfolio<br>
              ${new Date().toLocaleString()}
            </p>
            <p>
              <a href="mailto:${escapeHTML(data.email)}">Reply to ${escapeHTML(data.name)}</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Escape HTML special characters
 */
function escapeHTML(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Validate contact form data
 */
function validateContactForm(data: any): {
  valid: boolean;
  errors: string[];
  data?: ContactFormData;
} {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (
    !data.message ||
    typeof data.message !== 'string' ||
    data.message.trim().length === 0
  ) {
    errors.push('Message is required');
  }

  if (data.message && data.message.length > 5000) {
    errors.push('Message is too long (max 5000 characters)');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    },
  };
}

/**
 * Basic email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * POST /api/contact
 * Handle contact form submission
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate form data
    const validation = validateContactForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const contactData = validation.data!;

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email service not configured',
          message: 'Please set RESEND_API_KEY in environment variables',
        },
        { status: 500 }
      );
    }

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: TO_EMAIL,
      replyTo: contactData.email,
      subject: `New Contact Form: Message from ${contactData.name}`,
      html: generateEmailHTML(contactData),
      text: `Name: ${contactData.name}\nEmail: ${contactData.email}\n\nMessage:\n${contactData.message}`,
    });

    if (emailResponse.error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email',
          message: emailResponse.error.message,
        },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: 'Mind Palace <onboarding@resend.dev>',
        to: contactData.email,
        subject: 'Thank you for reaching out!',
        html: `
          <p>Hi ${escapeHTML(contactData.name)},</p>
          <p>Thank you for your message! I've received your contact form submission and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Rajhans More</p>
        `,
      });
    } catch (confirmError) {
      // Ignore confirmation email failures
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        emailId: emailResponse.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process contact form',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/contact
 * CORS preflight for contact form
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
