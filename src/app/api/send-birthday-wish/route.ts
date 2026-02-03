import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, message, to } = await request.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: `🎂 New Birthday Wish from ${name}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #FF416C, #FF4B2B); padding: 40px 20px; text-align: center; }
            .header h1 { margin: 0; color: white; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
            .content { padding: 40px 30px; background-color: #ffffff; }
            .message-box { background-color: #fff5f6; border-left: 5px solid #FF416C; padding: 25px; border-radius: 8px; margin: 20px 0; }
            .message-text { font-size: 18px; line-height: 1.6; color: #333; font-style: italic; margin: 0; }
            .sender-info { text-align: center; margin-top: 30px; padding-top: 30px; border-top: 1px solid #efefef; }
            .sender-name { font-size: 24px; font-weight: bold; color: #FF416C; margin: 5px 0; }
            .footer { background-color: #333; color: #888; text-align: center; padding: 20px; font-size: 12px; }
            .emoji { font-size: 40px; margin-bottom: 10px; display: block; }
          </style>
        </head>
        <body>
          <div className="container">
            <div className="header">
              <span className="emoji">🎉</span>
              <h1>You received a Birthday Wish!</h1>
            </div>
            <div className="content">
              <p style="color: #666; font-size: 16px; text-align: center;">Someone visited your portfolio and left a sweet message for your special day!</p>
              
              <div className="message-box">
                <p className="message-text">"${message}"</p>
              </div>
              
              <div className="sender-info">
                <p style="color: #999; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Sent with ❤️ by</p>
                <p className="sender-name">${name}</p>
              </div>
            </div>
            <div className="footer">
              <p>Sent from your Portfolio Website • Celebration Mode 🎊</p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    return NextResponse.json({ success: true, message: 'Birthday wish sent successfully!' })

  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send birthday wish' },
      { status: 500 }
    )
  }
}