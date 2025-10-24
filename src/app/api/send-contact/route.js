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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ec1839, #f39c12); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📧 New Contact Message</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #ec1839; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; border-left: 4px solid #ec1839;">
            <h3 style="color: #ec1839; margin-top: 0;">Message:</h3>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e8f4fd; border-radius: 10px;">
            <p style="margin: 0; color: #666; font-size: 14px;">Reply to: <a href="mailto:${email}" style="color: #ec1839;">${email}</a></p>
            <p style="margin: 5px 0 0 0; color: #999; font-size: 12px;">Sent from Portfolio Contact Form</p>
          </div>
        </div>
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
