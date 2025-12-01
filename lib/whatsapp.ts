/**
 * Genera una URL de WhatsApp con el mensaje formateado
 * @param formData - Objeto con los datos del formulario
 * @returns URL de WhatsApp con el mensaje codificado
 */
export function generateWhatsAppUrl(formData: Record<string, string>): string {
  const phoneNumber = '528126902979'
  
  // Construir el mensaje
  let message = '¡Hola! Me interesa tu servicio.\n\n'
  
  // Agregar cada campo al mensaje
  Object.entries(formData).forEach(([key, value]) => {
    if (value && value.trim() !== '') {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
      message += `${label}: ${value}\n`
    }
  })
  
  message += '\nGracias por tu atención.'
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message)
  
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

/**
 * Maneja el envío del formulario a WhatsApp
 * @param formData - Objeto con los datos del formulario
 */
export function handleWhatsAppSubmit(formData: Record<string, string>): void {
  const url = generateWhatsAppUrl(formData)
  window.open(url, '_blank')
}

