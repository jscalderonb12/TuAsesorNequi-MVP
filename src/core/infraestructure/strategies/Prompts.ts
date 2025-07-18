import { buildOperationsContext } from '@/core/infraestructure/datasources/FinancialOperations';
import { ConversationMessage } from '@/core/domain/types';

const buildContext = (history: ConversationMessage[]): string => {
  if (history.length === 0) return '';

  const recent = history.slice(-3);
  const lines = recent.map((msg) => {
    if (msg.operation) {
      return `Usuario: "${msg.userMessage}" → ${msg.operation}`;
    }
    return `Usuario: "${msg.userMessage}" → conversación`;
  });

  return `\nCONVERSACIÓN RECIENTE:\n${lines.join('\n')}\n`;
};

const getContextDates = (history: ConversationMessage[]) => {
  const lastFinancial = history
    .slice()
    .reverse()
    .find((msg) => msg.params);
  return lastFinancial?.params || null;
};

export const analyzeIntentPrompt = (
  userMessage: string,
  history: ConversationMessage[] = []
) => {
  const operations = buildOperationsContext();
  const context = buildContext(history);
  const contextDates = getContextDates(history);
  const today = new Date().toISOString().split('T')[0];

  return `
Convierte este mensaje en una operación financiera válida:

OPERACIONES DISPONIBLES:
${operations}

${context}

REGLAS:
1. Si NO es una consulta financiera (saludos, preguntas personales, etc.) → responde: null
2. Si SÍ es financiera → responde JSON:
{
  "operation": "nombreOperacion",
  "params": {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  }
}

CONTEXTO ESPECIAL:
- Hoy: ${today}
- ${
    contextDates
      ? `Última consulta: ${contextDates.startDate} a ${contextDates.endDate}`
      : 'Sin contexto previo'
  }
- Si dice "detalles", "más info", etc. y hay contexto → usa getTransactionDetails con fechas del contexto

MENSAJE: "${userMessage}"
`.trim();
};

export const explanationPrompt = (
  userMessage: string,
  result: any,
  history: ConversationMessage[] = []
) => {
  const context = buildContext(history);

  return `
Explica estos datos financieros de forma natural y bien organizada:

${context}

DATOS:
${JSON.stringify(result, null, 2)}

MENSAJE USUARIO: "${userMessage}"

INSTRUCCIONES DE FORMATO:
📊 ESTRUCTURA DE RESPUESTA:
- Usa espacios en blanco para separar secciones
- Agrupa información relacionada
- Presenta datos de forma clara y visual

💰 FORMATO DE MONTOS:
- Montos legibles: "$250.000" (con puntos como separadores)
- Usa emojis relevantes: 💸 para gastos, 💰 para ingresos, 📈 para totales

📝 ORGANIZACIÓN:
- Títulos con emojis: "💸 Gastos del período"
- Listas con viñetas: "• Categoría ($monto)"
- Separa cada categoría o sección con líneas en blanco
- Usa emojis contextuales: 🏪 comercio, 🍕 comida, ⛽ transporte, 🏠 hogar

🎯 ESTRUCTURA SUGERIDA:
1. Resumen general con emoji principal
2. \n
3. Detalles por categoría/período
4. \n
5. Conclusión o recomendación

REGLAS GENERALES:
- Si no hay datos, di que no se encontraron con emoji 🔍
- Tono profesional pero cercano
- Respuesta clara y directa en español
- Usa emojis para hacer la respuesta más visual y amigable

EJEMPLOS DE EMOJIS POR CONTEXTO:
- Gastos: 💸 📉 🛒
- Ingresos: 💰 📈 💵
- Categorías: 🍕🏪🚗⛽🏠📱💊🎓
- Análisis: 📊 📈 📉 🔍 💡
- Alertas: ⚠️ 🚨 ⚡
- Éxito: ✅ 🎉 👍
`.trim();
};

export const conversationalPrompt = (
  userMessage: string,
  history: ConversationMessage[] = []
) => {
  const context = buildContext(history);

  return `
Responde de forma conversacional sobre finanzas con buen formato:

${context}

MENSAJE: "${userMessage}"

INSTRUCCIONES DE RESPUESTA:
🤖 IDENTIDAD Y SALUDOS:
- Si es saludo → saluda naturalmente con emoji 👋
- Si pregunta qué eres → "Soy Tu Asesor Nequi 🏦, te ayudo con tus finanzas personales"
- Si pide ayuda → explica qué puedes hacer brevemente con emojis

📋 FORMATO DE RESPUESTA:
- Usa espacios en blanco para separar ideas
- Incluye emojis relevantes para hacer la respuesta más amigable
- Estructura clara con separación entre conceptos
- Tono amigable y profesional

🔍 MANEJO DE CONSULTAS:
- Si es ambiguo → pide que sea más específico con emoji 🤔
- Si no entiendes → usa emoji ❓ y pide clarificación
- Respuesta breve pero completa

📱 EMOJIS PARA DIFERENTES SITUACIONES:
- Saludo: 👋 😊
- Ayuda: 🤝 💡 📊
- Consultas: 🔍 📈 💰
- Confusión: 🤔 ❓
- Despedida: 👋 😊

EJEMPLOS DE AYUDA CON FORMATO:
💡 "Te puedo ayudar con consultas como:"

🔍 "¿Cuánto gasté esta semana?"
📊 "Dame un resumen del mes pasado"  
📈 "Muestra mis gastos por categoría"
💰 "¿Cuáles fueron mis ingresos este mes?"

 \n

"¿En qué te puedo ayudar hoy? 😊"

REGLAS GENERALES:
- Respuesta breve pero útil
- Usa emojis para hacer la conversación más cálida
- Separa conceptos con espacios en blanco
`.trim();
};
