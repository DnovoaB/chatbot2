const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// Flujo principal
const flowPrincipal = addKeyword(['hola', 'menu', 'inicio', 'ayuda', 'bot'])
    .addAnswer('🎓 *Bienvenido al Asistente Virtual de Prácticas Profesionales* 🎓')
    .addAnswer(
        [
            'Por favor, selecciona una opción escribiendo el número correspondiente:',
            '',
            '1️⃣ Información sobre prácticas',
            '2️⃣ Requisitos y proceso de aplicación',
            '3️⃣ Documentación y formatos',
            '4️⃣ Preguntas frecuentes (FAQ)',
            '5️⃣ Contactar a un asesor',
            '',
            '💡 Puedes volver a este menú en cualquier momento escribiendo *menu*.'
        ]
    )

// Flujo de información sobre prácticas
const flowInfoPracticas = addKeyword(['1', 'información', 'info'])
    .addAnswer('📚 *Información sobre prácticas*')
    .addAnswer(
        [
            'Selecciona el tema que te interesa:',
            '',
            '1️⃣ Duración de las prácticas',
            '2️⃣ Sedes disponibles',
            '3️⃣ Horarios de práctica',
            '4️⃣ Beneficios de las prácticas',
            '5️⃣ Volver al menú principal'
        ]
    )
    .addAnswer('Escribe el número de tu elección.', { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const option = ctx.body
        switch (option) {
            case '1':
                await flowDynamic('⏳ La duración estándar de las prácticas es de 6 meses a tiempo completo. En algunos casos, puede variar entre 4 y 12 meses, dependiendo de tu programa académico y la empresa.')
                break
            case '2':
                await flowDynamic('🏢 Las sedes disponibles incluyen empresas locales, nacionales, instituciones gubernamentales, ONGs y empresas internacionales. Consulta la lista actualizada en el portal de prácticas.')
                break
            case '3':
                await flowDynamic('🕰️ Los horarios pueden ser: tiempo completo (8 horas diarias), medio tiempo (4 horas diarias) o flexible (mínimo 20 horas semanales). El horario específico se acuerda con la empresa y debe ser aprobado por el coordinador.')
                break
            case '4':
                await flowDynamic('🌟 Las prácticas te ofrecen experiencia laboral real, desarrollo de habilidades profesionales, networking y la posibilidad de ser contratado al finalizar.')
                break
            case '5':
                return gotoFlow(flowPrincipal)
            default:
                await flowDynamic('⚠️ Opción no válida. Por favor, elige un número del 1 al 5.')
        }
    })

// Flujo de requisitos y proceso de aplicación
const flowRequisitos = addKeyword(['2', 'requisitos', 'aplicación'])
    .addAnswer('📋 *Requisitos y proceso de aplicación*')
    .addAnswer(
        [
            'Selecciona la información que necesitas:',
            '',
            '1️⃣ Requisitos para iniciar prácticas',
            '2️⃣ Proceso de aplicación',
            '3️⃣ Afiliación a la ARL',
            '4️⃣ Volver al menú principal'
        ]
    )
    .addAnswer('Escribe el número de tu elección.', { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const option = ctx.body
        switch (option) {
            case '1':
                await flowDynamic([
                    '📌 Requisitos para iniciar prácticas:',
                    '• Ser estudiante activo',
                    '• Haber completado el 70% de los créditos',
                    '• Tener un promedio acumulado mínimo de 3.5',
                    '• No tener sanciones disciplinarias',
                    '• Haber aprobado el curso de preparación para prácticas'
                ])
                break
            case '2':
                await flowDynamic([
                    '🔄 Proceso de aplicación:',
                    '1. Verifica que cumples los requisitos',
                    '2. Asiste a la charla informativa de prácticas',
                    '3. Actualiza tu hoja de vida',
                    '4. Aplica a las ofertas en el portal de prácticas',
                    '5. Asiste a las entrevistas programadas',
                    '6. Una vez seleccionado, realiza los trámites de legalización'
                ])
                break
            case '3':
                await flowDynamic([
                    '🏥 Afiliación a la ARL:',
                    '1. Solicita el formulario en la oficina de prácticas',
                    '2. Completa el formulario con tus datos y los de la empresa',
                    '3. Adjunta copia de tu cédula y carné estudiantil',
                    '4. Entrega los documentos en la oficina de prácticas',
                    '5. Espera la confirmación (aprox. 3 días hábiles)',
                    '6. Renueva mensualmente, 5 días antes del vencimiento'
                ])
                break
            case '4':
                return gotoFlow(flowPrincipal)
            default:
                await flowDynamic('⚠️ Opción no válida. Por favor, elige un número del 1 al 4.')
        }
    })

// Flujo de documentación y formatos
const flowDocumentacion = addKeyword(['3', 'documentación', 'formatos'])
    .addAnswer('📄 *Documentación y formatos*')
    .addAnswer(
        [
            'Selecciona la información que necesitas:',
            '',
            '1️⃣ Dónde encontrar los formatos',
            '2️⃣ Dónde entregar los formatos',
            '3️⃣ Lista de documentos requeridos',
            '4️⃣ Volver al menú principal'
        ]
    )
    .addAnswer('Escribe el número de tu elección.', { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const option = ctx.body
        switch (option) {
            case '1':
                await flowDynamic([
                    '📁 Los formatos se encuentran en:',
                    '• Portal estudiantil, sección "Prácticas Profesionales"',
                    '• Página web de la facultad, apartado "Documentos de Prácticas"',
                    '• Oficina de prácticas (copias físicas disponibles)',
                    'Asegúrate de utilizar siempre la versión más reciente.'
                ])
                break
            case '2':
                await flowDynamic([
                    '📬 Entrega de formatos:',
                    '• En la oficina de prácticas de tu facultad (entrega física)',
                    '• A través del portal estudiantil, sección "Entrega de Documentos de Prácticas" (entrega digital)',
                    '• Por correo electrónico al coordinador de prácticas (si las opciones anteriores no están disponibles)',
                    'Guarda una copia de todos los documentos entregados y obtén un comprobante de recepción.'
                ])
                break
            case '3':
                await flowDynamic([
                    '📋 Documentos requeridos:',
                    '1. Formulario de inscripción a prácticas',
                    '2. Hoja de vida actualizada',
                    '3. Carta de presentación de la universidad',
                    '4. Acuerdo de prácticas firmado por la empresa',
                    '5. Constancia de afiliación a la ARL',
                    '6. Copia de la cédula',
                    '7. Copia del carné estudiantil',
                    '8. Certificado de notas (si es requerido por la empresa)'
                ])
                break
            case '4':
                return gotoFlow(flowPrincipal)
            default:
                await flowDynamic('⚠️ Opción no válida. Por favor, elige un número del 1 al 4.')
        }
    })

// Flujo de preguntas frecuentes
const flowFAQ = addKeyword(['4', 'faq', 'preguntas'])
    .addAnswer('❓ *Preguntas Frecuentes (FAQ)*')
    .addAnswer(
        [
            'Selecciona la pregunta que te interesa:',
            '',
            '1️⃣ ¿Puedo hacer prácticas en el extranjero?',
            '2️⃣ ¿Qué pasa si no encuentro práctica?',
            '3️⃣ ¿Puedo hacer prácticas en mi propia empresa?',
            '4️⃣ ¿Las prácticas son remuneradas?',
            '5️⃣ ¿Qué hago si tengo problemas en mi lugar de práctica?',
            '6️⃣ Volver al menú principal'
        ]
    )
    .addAnswer('Escribe el número de tu elección.', { capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const option = ctx.body
        switch (option) {
            case '1':
                await flowDynamic('🌎 Sí, es posible realizar prácticas en el extranjero. Debes tener un promedio mínimo de 4.0, demostrar dominio del idioma requerido, y cumplir con los requisitos migratorios del país de destino. Consulta con la oficina de relaciones internacionales para más detalles.')
                break
            case '2':
                await flowDynamic('🔍 Si no encuentras práctica, la universidad te asignará un proyecto especial o te ayudará a buscar oportunidades adicionales. Es importante que mantengas comunicación constante con tu coordinador de prácticas.')
                break
            case '3':
                await flowDynamic('💼 En algunos casos, es posible hacer prácticas en tu propia empresa. Deberás presentar un plan de trabajo detallado y obtener aprobación del comité de prácticas. Se evaluará cada caso individualmente.')
                break
            case '4':
                await flowDynamic('💰 La remuneración de las prácticas depende de la empresa. Algunas ofrecen un estipendio, otras cubren gastos de transporte y alimentación, y algunas no ofrecen compensación económica. La universidad promueve prácticas remuneradas, pero no es un requisito.')
                break
            case '5':
                await flowDynamic('🆘 Si tienes problemas en tu lugar de práctica, comunícate inmediatamente con tu tutor académico y el coordinador de prácticas. Ellos te guiarán sobre los pasos a seguir y, si es necesario, mediarán con la empresa o considerarán un cambio de lugar de práctica.')
                break
            case '6':
                return gotoFlow(flowPrincipal)
            default:
                await flowDynamic('⚠️ Opción no válida. Por favor, elige un número del 1 al 6.')
        }
    })

// Flujo de contacto con asesor
const flowContacto = addKeyword(['5', 'contacto', 'asesor'])
    .addAnswer('👤 *Contacto con un asesor*')
    .addAnswer(
        [
            '📞 Información de contacto:',
            'Oficina de Prácticas Profesionales',
            'Teléfono: +57 1234567890',
            'Email: practicas@universidad.edu.co',
            '',
            '🕰️ Horario de atención:',
            'Lunes a Viernes: 8:00 AM - 5:00 PM',
            'Sábados: 9:00 AM - 12:00 PM',
            '',
            '📍 Ubicación: Edificio Principal, Oficina 205',
            '',
            '💡 Para una atención más rápida, te recomendamos agendar una cita previa a través del portal estudiantil.'
        ]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([
        flowPrincipal,
        flowInfoPracticas,
        flowRequisitos,
        flowDocumentacion,
        flowFAQ,
        flowContacto
    ])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()