import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
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
      subject: `🎉 Birthday Wishes from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ec1839, #f39c12); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Birthday Wishes! 🎂</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ec1839;">
            <p style="font-size: 18px; line-height: 1.6; margin: 0; color: #333;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 16px; color: #666;">Best wishes,</p>
            <p style="font-size: 20px; font-weight: bold; color: #ec1839; margin: 5px 0;">${name}</p>
            <p style="font-size: 14px; color: #999; margin-top: 20px;">Sent from sundram's Portfolio Website</p>
          </div>
        </div>
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