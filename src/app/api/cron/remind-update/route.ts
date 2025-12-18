import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { portfolioConfig } from '@/config/portfolio.config';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_FORM_TO_EMAIL || portfolioConfig.personal.email;

export async function GET(request: NextRequest) {
    // Verify Cron Secret to prevent unauthorized triggers
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio System <onboarding@resend.dev>',
            to: TO_EMAIL,
            subject: '📅 Reminder: Update Your LinkedIn Data',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #3b82f6;">Time for a Refresh!</h2>
          <p>Hi ${portfolioConfig.personal.fullName},</p>
          <p>This is a periodic reminder to update the LinkedIn data on your portfolio website to keep your experience and education sections current.</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <strong>Quick Steps:</strong>
            <ol>
              <li>Export <strong>Positions.csv</strong> and <strong>Education.csv</strong> from LinkedIn.</li>
              <li>Place them in <code>public/data/</code>.</li>
              <li>Commit and push to GitHub.</li>
            </ol>
          </div>
          <p>Keeping your portfolio updated ensures recruiters always see your latest achievements!</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">This is an automated reminder from your Mind Palace Portfolio system.</p>
        </div>
      `,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Reminder email sent' });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to send reminder' }, { status: 500 });
    }
}
