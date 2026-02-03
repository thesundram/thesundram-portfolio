import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📧 Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
          <style>
            body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fce4ec; color: #333333; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #ec1839, #ff4b2b); padding: 40px 20px; text-align: center; }
            .header-icon { font-size: 48px; margin-bottom: 10px; display: block; }
            .header h1 { margin: 0; color: white; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
            .content { padding: 40px 30px; }
            
            .sender-card { background-color: #f8f9fa; border-left: 4px solid #ec1839; border-radius: 8px; padding: 20px; margin-bottom: 30px; }
            .info-row { margin-bottom: 12px; font-size: 15px; }
            .info-row:last-child { margin-bottom: 0; }
            .label { font-weight: 600; color: #555; width: 70px; display: inline-block; }
            .value { color: #000; font-weight: 500; }
            
            .message-section { margin-top: 30px; }
            .section-title { font-size: 16px; font-weight: 700; color: #ec1839; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
            .message-box { background-color: #fff; border: 1px solid #eee; border-radius: 12px; padding: 25px; line-height: 1.6; color: #555; position: relative; }
            .quote-icon { position: absolute; top: 15px; left: 15px; font-size: 40px; color: #f0f0f0; font-family: serif; line-height: 1; z-index: 0; }
            .message-text { position: relative; z-index: 1; font-style: italic; }
            
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee; }
            .action-btn { display: inline-block; background: #ec1839; color: white; text-decoration: none; padding: 12px 30px; border-radius: 30px; font-weight: bold; margin-bottom: 20px; transition: background 0.3s; }
            .action-btn:hover { background: #d00f2d; }
            .meta { font-size: 12px; color: #999; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div className="container">
            <div className="header">
              <span className="header-icon">📬</span>
              <h1>New Message Received!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">From your portfolio contact form</p>
            </div>
            
            <div className="content">
              
              <div className="sender-card">
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">${name}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value"><a href="mailto:${email}" style="color: #ec1839; text-decoration: none;">${email}</a></span>
                </div>
                <div className="info-row">
                  <span className="label">Subject:</span>
                  <span className="value">${subject}</span>
                </div>
              </div>
              
              <div className="message-section">
                <div className="section-title">Message Content</div>
                <div className="message-box">
                  <span className="quote-icon">“</span>
                  <div className="message-text">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
              </div>
              
            </div>
            
            <div className="footer">
              <a href="mailto:${email}?subject=Re: ${subject}" className="action-btn">Reply Now</a>
              <div className="meta">
                Received via <strong>thesundram.vercel.app</strong><br>
                ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    })

    return NextResponse.json({ success: true, message: 'Message sent successfully!' })

  } catch (error) {
    console.error('Contact email error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
