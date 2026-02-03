// EmailJS configuration
export const emailConfig = {
  serviceId: 'service_birthday',
  templateId: 'template_birthday',
  publicKey: 'your_public_key_here'
}

export const sendBirthdayWish = async (name, message) => {
  // Simulate email sending - replace with actual EmailJS implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}