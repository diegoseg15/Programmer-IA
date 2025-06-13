db = db.getSiblingDB('programmer-ia');
db.createCollection('user');

// Ejemplos de usuarios
const users = [
  {
    _id: ObjectId('68470f8b612d4a16b33b8074'),
    names: 'Diego',
    lastnames: 'Segovia',
    username: 'dieferse@alumni.uv.es',
    password: '$2b$12$V.lMhRAE/f4.NBbFY6o8kOeKK5oLgm9k/.7f8Z2uOAycL/qt/hPPG'
  },
  {
    _id: ObjectId('68470fe7612d4a16b33b8075'),
    names: 'Mario',
    lastnames: 'Bros',
    username: 'mbros@gmail.com',
    password: '$2b$12$71fONjTW2Qm0FFerog120OSGjY/gLtLUNFVEIbOU1EsSmPuk67nM.'
  },
  {
    _id: ObjectId('68470ffe612d4a16b33b8076'),
    names: 'Juan',
    lastnames: 'Pérez',
    username: 'jperez@example.com',
    password: '$2b$12$rEhOzNHCYC3y2T.h4ba/HO87rAYDoolB/JUys2pUrbOtVE.mNllvG'
  }
];

// Ejemplos de mensajes

// const messages = [
//   {
//     _id: ObjectId('684b60a9e64acc29ebff07d9'),
//     "userId": "68470f8b612d4a16b33b8074",
//     "model": "o4-mini",
//     "messages": [
//       {
//         "role": "system",
//         "content": `${"Eres un sistema experto en revisión de código. Tu **ÚNICA** salida debe ser siempre un bloque **JSON VÁLIDO y COMPLETO**. **NO** incluyas texto o caracteres fuera de este bloque JSON. **NO** uses bloques de código Markdown (```) fuera del JSON. El formato obligatorio es: ```json\n{\"lenguaje\": \"<nombre del lenguaje, ej: 'python', 'cpp', 'csharp', 'java'>\", \"code\": \"<código fuente original, corregido o con comentarios, **codificado en Base64**>\", \"mensaje\": \"<análisis técnico, recomendaciones de seguridad y mejoras, **codificado en Base64**. El texto ANTES de la codificación Base64 debe contener los caracteres especiales (como tildes, ñ) **directamente**, NO uses secuencias de escape Unicode (ej. 'á' en lugar de '\á'). Este contenido puede ser Markdown una vez decodificado, incluyendo listas con viñetas estándar de Markdown (usando '-' o '*' seguido de un espacio). Para listas generales, EVITA la sintaxis '[]' en las viñetas.**>\"}\n```. Tu respuesta comenzará y terminará exactamente con el bloque JSON."}`
//       },
//       {
//         "role": "user",
//         "content": "Escribe un hola mundo en python"
//       },
//       {
//         "role": "assistant",
//         "content": `${"```json\n{\"lenguaje\": \"python\", \"code\": \"cHJpbnQoIkhvbGEgTXVuZG8hIik=\", \"mensaje\": \"U2UgcmVjb21pZW5kYSBlbXBlemFyIGVsIGNvZGlnbyB1c29sbyBkZSBpw6ltcHJlc2nDs24gZW50cmUgbG9zIG1vZG9zdHViaWRvc2VuIHByb3llY3RvcyBlbiBQeXRob24uIENvbnNpZGVyYSBhZGVt77+kcyBoYSBzaWRvIHN1Zm5pZG8gZGVsIHZlcnRpZ2/Fvi4gVGVuIGVuIGN1ZW50YSB0ZW5lciBlbiBjdWVudGEgdGVybWluYWwgZWwgY29tYW5kbyBxdWUgZXN0J8OhIGVuIGxhIHByb2R1Y2Npw7NuIHJlYWwgcGFyYSBlc2NyaWIsb3JiZXJ2YXIgbG9zIHJlZ3Vpc3Ryb3MgZGVwZW5kaWVudGUgZGVsIGNvbnRleHRvLg==\"}\n```"}`
//       },
//       {
//         "role": "user",
//         "content": "<div class=\"main-layout\">\n  <app-header></app-header>\n\n  <div class=\"main-content\">\n    <app-chat [messages]=\"parsedMessages\" [isLoading]=\"isLoading\" (chatSubmit)=\"onChatSubmit($event)\">\n\n    </app-chat>\n\n    <app-visual-code [messages]=\"assistantResponses\" [isLoading]=\"isLoading\">\n    </app-visual-code>\n  </div>\n\n  <app-footer></app-footer>\n</div>"
//       },
//       {
//         "role": "assistant",
//         "content": `${"{\"lenguaje\":\"html\",\"code\":\"PGRpdjxtYWluLXBvdHk+CiAgPGRpdiBjbGFzcz0ibWFpbi1sYXlvdXQiPgogICAgPGFwcC1oZWFkZXI+PC9hcHAtaGVhZGVyPgogICAgPGRpdiBjbGFzcz0ibWFpbi1jb250ZW50Ij4KICAgICAgPGFwcC1jaGF0IFttZXNzYWdlc109InBhcnNlZE1lc3NhZ2VzIiAbaXNMb2FkaW5nXT0iaXNMb2FkaW5nIiAoY2hhdFN1Ym1pdCk9IixvbjJQcmVwYXJlU3VibWl0PyhtZXNzYWdlKSI+PC9hcHAtY2hhdD4KICAgICAgPGFwcC12aXN1YWwtY29kZSBbbWVzc2FnZXNdPSJhc3Npc3RhbnRSZXNwb25zZXMiIFtpc0xvYWRpbmddPSJpc0xvYWRpbmciPjw vYXBwLXZpc3VhbC1jb2RlPgogICAgPC9kaXY+CiAgICA8YXBwLWZvb3Rlci48L2FwcC1mb290ZXI+CiAgPC9kaXY+Cg==\",\"mensaje\":\"QW7DoWxpc2lzIHRlY25pY28geSByZWNvbWVuZGFjaW9uZXM6CgotIFNhbml0aXphIGRhdG9zIGRpbmFtaWNvcyBwYXJhIHByZXZl bmluciBYU1MuCi0gVXNhIGV0aXNhcyBzZW3DoW50aWNhcyAoeG1sLCBhcnJpYS1sYWJlbCkgcGFyYSBtZWpvcmFyIGFjY2VzaXZp bGlkYWQuCi0gQXBsaWNhIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCB5IExhenlMb2FkaW5nIGZvciByZW5kaW1pZW50bw==\"}"}`
//       }
//     ]
//   },
//   {
//     _id: ObjectId('684b5ef2e64acc29ebff07d7'),
//     "userId": "68470f8b612d4a16b33b8074",
//     "model": "deepseek-chat",
//     "messages": [
//       {
//         "role": "system",
//         "content": `${"Eres un sistema experto en revisión de código. Tu **ÚNICA** salida debe ser siempre un bloque **JSON VÁLIDO y COMPLETO**. **NO** incluyas texto o caracteres fuera de este bloque JSON. **NO** uses bloques de código Markdown (```) fuera del JSON. El formato obligatorio es: ```json\n{\"lenguaje\": \"<nombre del lenguaje, ej: 'python', 'cpp', 'csharp', 'java'>\", \"code\": \"<código fuente original, corregido o con comentarios, **codificado en Base64**>\", \"mensaje\": \"<análisis técnico, recomendaciones de seguridad y mejoras, **codificado en Base64**. El texto ANTES de la codificación Base64 debe contener los caracteres especiales (como tildes, ñ) **directamente**, NO uses secuencias de escape Unicode (ej. 'á' en lugar de '\á'). Este contenido puede ser Markdown una vez decodificado, incluyendo listas con viñetas estándar de Markdown (usando '-' o '*' seguido de un espacio). Para listas generales, EVITA la sintaxis '[]' en las viñetas.**>\"}\n```. Tu respuesta comenzará y terminará exactamente con el bloque JSON."}`
//       },
//       {
//         "role": "user",
//         "content": "Escribe un hola mundo en java script"
//       },
//       {
//         "role": "assistant",
//         "content": `${"```json\n{\"lenguaje\": \"javascript\", \"code\": \"Y29uc29sZS5sb2coJ0hvbGEgTXVuZG8nKTs=\", \"mensaje\": \"RXMgdW4gc2NyaXB0IGJcdTAwZTFzaWNvIGRlIEphdmFTY3JpcHQgcXVlIG11ZXN0cmEgJ0hvbGEgTXVuZG8nIGVuIGxhIGNvbnNvbGEuIFB1ZWRlcyBlamVjdXRhcmxvIGVuIHVuIG5hdmVnYWRvciBvIGVuIE5vZGUuanMuCgogLSBTZWd1cmlkYWQ6IE5vIGhhYmlsaWRhY2lvbmVzIGRlIHNlZ3VyaWRhZCBjb25jcmV0YXMgcGFyYSBlc3RlIGVqZW1wbG8gc2ltcGxlLgogLSBNZWpvcmFzOiBTaSBzZSB1c2EgZW4gdW4gZW50b3JubyBkZSBwcm9kdWNjaVx1MDBmM24sIGNvbnNpZGVyYSBhXHUwMGYxYWRpciBtYW5lam8gZGUgZXJyb3JlcyB5IGxvZ2dpbmcu\"}\n```"}`
//       }
//     ]
//   },
//   {
//     _id: ObjectId('684b5934d03cf5abaa41cad1'),
//     "userId": "68470f8b612d4a16b33b8074",
//     "model": "gemini-2.0-flash",
//     "messages": [
//       {
//         "role": "system",
//         "content": `${"Eres un sistema experto en revisión de código. Tu **ÚNICA** salida debe ser siempre un bloque **JSON VÁLIDO y COMPLETO**. **NO** incluyas texto o caracteres fuera de este bloque JSON. **NO** uses bloques de código Markdown (```) fuera del JSON. El formato obligatorio es: ```json\n{\"lenguaje\": \"<nombre del lenguaje, ej: 'python', 'cpp', 'csharp', 'java'>\", \"code\": \"<código fuente original, corregido o con comentarios, **codificado en Base64**>\", \"mensaje\": \"<análisis técnico, recomendaciones de seguridad y mejoras, **codificado en Base64**. El texto ANTES de la codificación Base64 debe contener los caracteres especiales (como tildes, ñ) **directamente**, NO uses secuencias de escape Unicode (ej. 'á' en lugar de '\á'). Este contenido puede ser Markdown una vez decodificado, incluyendo listas con viñetas estándar de Markdown (usando '-' o '*' seguido de un espacio). Para listas generales, EVITA la sintaxis '[]' en las viñetas.**>\"}\n```. Tu respuesta comenzará y terminará exactamente con el bloque JSON."}`
//       },
//       {
//         "role": "user",
//         "content": "Escribe un hola mundo en java"
//       },
//       {
//         "role": "assistant",
//         "content": `${"```json\n{\"lenguaje\": \"java\", \"code\": \"cHVibGljIGNsYXNzIEhlbGxvV29ybGQgeyBwdWJsaWMgc3RhdGljIHZvaWQgbWFpbiggc3RyaW5nW10gYXJncykgeyBTeXN0ZW0ub3V0LnByaW50bG4oIkhvbGEgTXVuZG8hIik7IH19\", \"mensaje\": \"LSBIYXkgdmFyaWFzIGFsIGNyZWFyIHVuIHByb2dyYW1hIGRlIGNvbnNvbGEsIGxhIGZ1bmNpb24gbWFpbigpLCBlcyBlbCBwdW50byBkZSBsYSBlamVjdWNpw7NuLg0KLSBFbCBtZXNzYWplIGxhIG1ldG9kaMOzdGhpYSBTdXN0ZW0ub3V0LnByaW50bG4oKSBlcyB1dGlsaXphZG8gcGFyYSBpbXByaW1pciBlbiBjb25zb2xhIGRlIGNvbW1hbmRvLg0KLSBUZW5lIGN1aWRhZG8gY29uIGxvcyBuZXZvcyBnZXJtZW50YXRvcmVzIGxhIGphcmFyZSB5IGNvbXByZW5kZXIgdMOtbmljYXMgZW4gamF2YS4gQXNlZ3VyYXIgcXVlIGVsIHByb2dyYW1hIHRlbmdhIHVuIG1vZG8gZGUgZWplY3VjacOzbiBjb3JyZWN0YS4NCi0gR3VhcmRhIGNvbiBsYSBjb2RpZmljYWNpw7NuIGVuIGVsIGZpbG8gcGFyYSBlbGltaW5hciBlcmVycm9yZXMgZGUgcmVkb3BhbnRlbyB5IGVjbyBtaWVudHJhcyBlamVjdXRhcyBleHRyYXPDrSBkdXJhbnRlIGxhIGVsZW1lbnRhY2nDs24u\"}\n```"}`
//       },
//       {
//         "role": "user",
//         "content": "Escribe un hola mundo en java script"
//       },
//       {
//         "role": "assistant",
//         "content": `${"```json\n{\"lenguaje\": \"javascript\", \"code\": \"Y29uc29sZS5sb2coJ0hvbGEgTXVuZG8hJyk7\", \"mensaje\": \"LSBFc3RlIGVzIHVuIGVqZW1wbG8gYmFzaWNvIGRlICdIb2xhIE11bmRvJyBlbiBKYXZhU2NyaXB0Lg0KLSBTZSB1c2EgYGNvbnNvbGUubG9nKClgIHBhcmEgaW1wcmltaXIgZW4gbGEgY29uc29sYSBkZWwgbmF2ZWdhZG9yIG8gZW50b3JubyBkZSBkZXNhcnJvbGxvLg0KLSBFcyBjb21wYXRpYmxlIGNvbiB0b2RvcyBsb3MgbmF2ZWdhZG9yZXMgbW9kZXJub3MgeSBlbnRvcm5vcyBkZSBqYXZhc2NyaXB0IChjb21vIE5vZGUuanMpLg0KLSBQYXJhIGVqZWN1dGFyLCBwdWVkZXMgY29waWFyIGVzdGUgY8OzZGlnbyBlbiBsYSBjb25zb2xhIGRlbCBuYXZlZ2Fkb3Igb2QgaW5jbHVpcmxvIGVuIHVuIGFyY2hpdm8gLmpzIHkgZWplY3V0YXJsbyBjb24gTm9kZS5qcy4NCi0gUmVjb21lbmRhY2nDs246IFNpIHZhc2EgYSB1c2FyIGVuIHVuIHByb3llY3RvIG1hcyBncmFuZGUsIGNvbnNpZGVyYSB1c2FyIG1vZHVsb3MgeSBidWVuYXMgcHLDoWN0aWNhcyBkZSBjb2RpZmljYWNpw7NuLg==\"}\n```"}`
//       },
//       {
//         "role": "user",
//         "content": "Escribe un hola mundo en c++"
//       },
//       {
//         "role": "assistant",
//         "content": `${"```json\n{\"lenguaje\": \"cpp\", \"code\": \"I2luY2x1ZGUgPGlvc3RyZWFtPgp1c2luZyBuYW1lc3BhY2Ugc3RkOwoKaW50IG1haW4oKSB7CiAgICBjb3V0IDw8ICJIZWxsbyBXb3JsZCEiIDw8IGVuZGw7CiAgICByZXR1cm4gMDsKfQ==\", \"mensaje\": \"LSBFc3RlIGVzIHVuIGVqZW1wbG8gYmFzaWNvIGRlICdIZWxsbyBXb3JsZCcgZW4gQysrLg0KLSBTZSB1c2EgYGlvc3RyZWFtYCBwYXJhIGxhIGVudHJhZGEveXNhbGlkYSBlc3RhbmRhci4NCi0gRWwgbm9tYnJlc3BhY2lvIGBzdGRgIHNlIHVzYSBwYXJhIGV2aXRhciBlc2NyaWJpciBgc3RkOjpjb3V0YCB5IG90cm9zIHByZWZpanVzLg0KLSBMYSBmdW5jacOzbiBgbWFpbigpYCBkZWJlIHJldG9ybmFyIHVuIGVudGVybyAoYGludGApIHkgc2UgdGVybWluYSBjb24gYHJldHVybiAwO2AuDQotIFBhcmEgY29tcGlsYXI6IGBnKysgaGVsbG8uY3BwIC1vIGhlbGxvYCB5IGx1ZWdvIGVqZWN1dGFyIGNvbiBgLi9oZWxsb2AuDQotIFJlY29tZW5kYWNpb25lczogVXNhIG5vbWJyZXNwYWNpb3Mgc2VsZWN0aXZvcywgbWFudGVuIGNvZGlnbyBvcmdhbml6YWRvIHkgY29uc2lkZXJhIG1hbmVqbyBkZSBlcnJvcmVzLg==\"}\n```"}`
//       },
//       {
//         "role": "user",
//         "content": "Escribe un hola mundo en python"
//       },
//       {
//         "role": "assistant",
//         "content": `${"```json\n{\"lenguaje\": \"python\", \"code\": \"cHJpbnQoIkhvbGEgTXVuZG8hIik=\", \"mensaje\": \"LSBFc3RlIGVzIHVuIGVqZW1wbG8gYmFzaWNvIGRlICdIb2xhIE11bmRvJyBlbiBQeXRob24uDQotIFNlIHVzYSBsYSBmdW5jacOzbiBgcHJpbnQoKWAgcGFyYSBpbXByaW1pciBlbiBsYSBjb25zb2xhLg0KLSBFcyBjb21wYXRpYmxlIGNvbiBQeXRob24gMiB5IFB5dGhvbiAzLg0KLSBQYXJhIGVqZWN1dGFyLCBwdWVkZXMgZ3VhcmRhciBlc3RlIGNvZGlnbyBlbiB1biBhcmNoaXZvIC5weSB5IGVqZWN1dGFyIGNvbiBgcHl0aG9uIG5vbWJyZV9kZWxfYXJjaGl2by5weWAgbyB1c2FyIGxhIGNvbnNvbGEgaW50ZXJhY3RpdmEgZGUgUHl0aG9uLg0KLSBSZWNvbWVuZGFjaW9uZXM6IFNpZ3VlIGxhcyBndWlhcyBkZSBlc3RpbG8gZGUgUHl0aG9uIChQRVAgOCkgcGFyYSBjb2RpZ28gbGVnaWJsZSB5IG1hbnRlbmliYWUu\"}\n```"}`
//       },
//       {
//         "role": "user",
//         "content": "Escribe un hola mundo en c#"
//       },
//       {
//         "role": "assistant",
//         "content": `${"```json\n{\"lenguaje\": \"csharp\", \"code\": \"dXNpbmcgU3lzdGVtOwoKbmFtZXNwYWNlIEhlbGxvV29ybGQKewogICAgY2xhc3MgUHJvZ3JhbQogICAge3ogICAgICBzdGF0aWMgdm9pZCBNYWluKHN0cmluZ1tdIGFyZ3MpCiAgICAgICAgewogICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZSgiSGVsbG8gV29ybGQhIik7CiAgICAgICAgfQogICAgfQp9\", \"mensaje\": \"LSBFc3RlIGVzIHVuIGVqZW1wbG8gYmFzaWNvIGRlICdIb2xhIE11bmRvJyBlbiBDIy4NCi0gVXNhIGBlbCB1c2luZyBTeXN0ZW1gIHBhcmEgcG9kZXIgdXNhciBDb25zb2xlLldyaXRlTGluZSgpIGluIHNlciB1c2FyIGVsIG5vbWJyZSBjb21wbGV0by4NCi0gRWwgY29kaWdvIHNlIGVuY2Fwc3VsYSBlbiB1biBub21icmVzcGFjaW8gKHBIZWxsb1dvcmxkKSB5IGRlbnRybyBkZSB1bmEgY2xhc2UgKHAgUHJvZ3JhbCkuDQotIEEgZnVuY2nDs24gYE1haW5gIGVzIGVsIHB1bnRvIGRlIGVudHJhZGEgcGFyYSBwcm9ncmFtYXMgZGUgY29uc29sYSBlbiBDIy4NCi0gUGFyYSBjb21waWxhciB5IGVqZWN1dGFyOiB1c2EgZmlsZXMgb2wgLk5FVCBTREsgcGFyYSBjb21waWxhciBjb24gYGNzYyAgb2QgZGlyZWN0YW1lbnRlIGVqZWN1dGEgY29uIGBkb3RuZXQgcmVuYC4NCi0gUmVjb21lbmRhY2lvbmVzOiBRdWUgZWwgbm9tYnJlc3BhY2lvIHJlZmxlamUgZWwgZm9jdXMgZGVsIHByb2dyYW1hLCBtYW50ZW5lciB1biBjb2RpZ28gb3JkZW5hZG8geSB1dGlsaXphciBwcm9waWVkYWRlcyBwcsOhY3RpY2FzIGRlIGNvZGlmaWNhY2nDs24u\"}\n```"}`
//       }
//     ]
//   },
//   {
//     _id: ObjectId('684b47100485cedd7ca293a'),
//     "userId": "68470f8b612d4a16b33b8074",
//     "model": "gpt-4o",
//     "messages": [
//       {
//         "role": "system",
//         "content": `${"Eres un sistema experto en revisión de código. Tu **ÚNICA** salida debe ser siempre un bloque **JSON VÁLIDO y COMPLETO**. **NO** incluyas texto o caracteres fuera de este bloque JSON. **NO** uses bloques de código Markdown (```) fuera del JSON. El formato obligatorio es: ```json\n{\"lenguaje\": \"<nombre del lenguaje, ej: 'python', 'cpp', 'csharp', 'java'>\", \"code\": \"<código fuente original, corregido o con comentarios, **codificado en Base64**>\", \"mensaje\": \"<análisis técnico, recomendaciones de seguridad y mejoras, **codificado en Base64**. El texto ANTES de la codificación Base64 debe contener los caracteres especiales (como tildes, ñ) **directamente**, NO uses secuencias de escape Unicode (ej. 'á' en lugar de '\á'). Este contenido puede ser Markdown una vez decodificado, incluyendo listas con viñetas estándar de Markdown (usando '-' o '*' seguido de un espacio). Para listas generales, EVITA la sintaxis '[]' en las viñetas.**>\"}\n```. Tu respuesta comenzará y terminará exactamente con el bloque JSON."}`
//       },
//       {
//         "role": "user",
//         "content": "Escribe un hola mundo en java"
//       },
//       {
//         "role": "assistant",
//         "content": `${"```json\n{\"lenguaje\": \"java\", \"code\": \"cHVibGljIGNsYXNzSG9sYV11bmRvIHtwdWJsaWMgc3RhdGljIHZvaWQgbWFpbigpIHtTc3RlbS5vdXQucHJpbnRsbiggIkhvbGEgTXVuZG8hIik7fX0=\", \"mensaje\": \"LSBFbCBj4W9kaWdvIHBhcmEgdW4gYUNswXMgaW5jb3Jwb3JhIGVsIG1ldG9kbyBtYWluKCkKLSBVdGlsaXphIHRvZG9zIGNvcmNoZXRlcyBlbiBtYWnAsbggaW1wY3IKLSBPcHR1cGFwdGZzIHklIGZlcm1hICguKSB5cyBtdXkgZGVudHJhciBlbiBmb3JtYXRvIGRlIHV0aWxpemFjaW5rdWlldyBlcnJvcikKLSBOaW5n4W49ZSBzZSBhZGlyguwiLCJoZXMgc3UgYmllbmVyIHNvbGUgbGFyZ2FuZG9zIGRlIGNvZGlnbyics3VxacddlMjguCkFTKGEgPGJvb3RldGE+InfDugt4bypidHJvYmxpZFZFQTJXRUNPbnwyMDFueSB0cnVjcG9zLSBtYXsjQy0pVkVBUg==\"}"}`
//       }
//     ]
//   }
// ]



db.user.insertMany(users);
// db.message.insertMany(messages);
