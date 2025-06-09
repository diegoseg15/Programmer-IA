db = db.getSiblingDB('programmer-ia');
db.createCollection('user');

// Ejemplos de usuarios
const users = [
  {
    _id: ObjectId('68470f8b612d4a16b33b8074'),
    username: 'dieferse@alumni.uv.es',
    password: '$2b$12$V.lMhRAE/f4.NBbFY6o8kOeKK5oLgm9k/.7f8Z2uOAycL/qt/hPPG'
  },
  {
    _id: ObjectId('68470fe7612d4a16b33b8075'),
    username: 'cruiz@example.com',
    password: '$2b$12$71fONjTW2Qm0FFerog120OSGjY/gLtLUNFVEIbOU1EsSmPuk67nM.'
  },
  {
    _id: ObjectId('68470ffe612d4a16b33b8076'),
    username: 'jperez@example.com',
    password: '$2b$12$rEhOzNHCYC3y2T.h4ba/HO87rAYDoolB/JUys2pUrbOtVE.mNllvG'
  }
];

// Ejemplos de mensajes

const messages = [
  {
    _id: ObjectId('68471086612d4a16b33b8077'),
    userId: '68470f8b612d4a16b33b8074',
    model: 'gpt-4o',
    messages: [
      {
        role: 'developer',
        content: "1 Analiza el siguiente fragmento de código y actúa como un sistema experto en revisión de buenas prácticas, estilo clean code, advertencias sobre uso de librerías obsoletas o ineficientes, y responde exclusivamente en el siguiente formato JSON: {lenguaje:'', code:'', mensaje:''}"
      },
      {
        role: 'user',
        content: 'No entiendo este código public class HelloWorld {\n' +
          'public static void main(String[] args) {\n' +
          'System.out.println("Hello, world!");\n' +
          '}\n' +
          '}'
      },
      {
        role: 'assistant',
        content: '```json\n' +
          '{\n' +
          '  "lenguaje": "Java",\n' +
          '  "code": "public class HelloWorld {\\n  public static void main(String[] args) {\\n    System.out.println(\\"Hello, world!\\");\\n  }\\n}",\n' +
          `  "mensaje": "El código es un programa Java básico que imprime 'Hello, world!' en la consola. Aquí hay algunas sugerencias de mejora:\\n1. Automatiza la indentación para mejorar la legibilidad. Añade cuatro espacios (o un tabulador) antes de las líneas dentro de los bloques de código.\\n2. Asegúrate de que las llaves estén alineadas verticalmente para mantener el código organizado.\\nNo se utilizan librerías obsoletas en este código simple."\n` +       
          '}\n' +
          '```'
      }
    ]
  },
  {
    _id: ObjectId('6847108a612d4a16b33b8078'),
    userId: '68470f8b612d4a16b33b8074',
    model: 'gpt-4o',
    messages: [
      {
        role: 'developer',
        content: "2 Analiza el siguiente fragmento de código y actúa como un sistema experto en revisión de buenas prácticas, estilo clean code, advertencias sobre uso de librerías obsoletas o ineficientes, y responde exclusivamente en el siguiente formato JSON: {lenguaje:'', code:'', mensaje:''}"
      },
      {
        role: 'user',
        content: 'No entiendo este código public class HelloWorld {\n' +
          'public static void main(String[] args) {\n' +
          'System.out.println("Hello, world!");\n' +
          '}\n' +
          '}'
      },
      {
        role: 'assistant',
        content: '```json\n' +
          '{\n' +
          '  "lenguaje": "Java",\n' +
          '  "code": "public class HelloWorld {\\n  public static void main(String[] args) {\\n    System.out.println(\\"Hello, world!\\");\\n  }\\n}",\n' +
          `  "mensaje": "El código es un programa Java básico que imprime 'Hello, world!' en la consola. Aquí hay algunas sugerencias de mejora:\\n1. Automatiza la indentación para mejorar la legibilidad. Añade cuatro espacios (o un tabulador) antes de las líneas dentro de los bloques de código.\\n2. Asegúrate de que las llaves estén alineadas verticalmente para mantener el código organizado.\\nNo se utilizan librerías obsoletas en este código simple."\n` +       
          '}\n' +
          '```'
      }
    ]
  },
  {
    _id: ObjectId('68471092612d4a16b33b8079'),
    userId: '68470fe7612d4a16b33b8075',
    model: 'gpt-4o',
    messages: [
      {
        role: 'developer',
        content: "3 Analiza el siguiente fragmento de código y actúa como un sistema experto en revisión de buenas prácticas, estilo clean code, advertencias sobre uso de librerías obsoletas o ineficientes, y responde exclusivamente en el siguiente formato JSON: {lenguaje:'', code:'', mensaje:''}"
      },
      {
        role: 'user',
        content: 'No entiendo este código public class HelloWorld {\n' +
          'public static void main(String[] args) {\n' +
          'System.out.println("Hello, world!");\n' +
          '}\n' +
          '}'
      },
      {
        role: 'assistant',
        content: '```json\n' +
          '{\n' +
          '  "lenguaje": "Java",\n' +
          '  "code": "public class HelloWorld {\\n  public static void main(String[] args) {\\n    System.out.println(\\"Hello, world!\\");\\n  }\\n}",\n' +
          `  "mensaje": "El código es un programa Java básico que imprime 'Hello, world!' en la consola. Aquí hay algunas sugerencias de mejora:\\n1. Automatiza la indentación para mejorar la legibilidad. Añade cuatro espacios (o un tabulador) antes de las líneas dentro de los bloques de código.\\n2. Asegúrate de que las llaves estén alineadas verticalmente para mantener el código organizado.\\nNo se utilizan librerías obsoletas en este código simple."\n` +       
          '}\n' +
          '```'
      }
    ]
  },
  {
    _id: ObjectId('68471093612d4a16b33b807a'),
    userId: '68470fe7612d4a16b33b8075',
    model: 'gpt-4o',
    messages: [
      {
        role: 'developer',
        content: "4 Analiza el siguiente fragmento de código y actúa como un sistema experto en revisión de buenas prácticas, estilo clean code, advertencias sobre uso de librerías obsoletas o ineficientes, y responde exclusivamente en el siguiente formato JSON: {lenguaje:'', code:'', mensaje:''}"
      },
      {
        role: 'user',
        content: 'No entiendo este código public class HelloWorld {\n' +
          'public static void main(String[] args) {\n' +
          'System.out.println("Hello, world!");\n' +
          '}\n' +
          '}'
      },
      {
        role: 'assistant',
        content: '```json\n' +
          '{\n' +
          '  "lenguaje": "Java",\n' +
          '  "code": "public class HelloWorld {\\n  public static void main(String[] args) {\\n    System.out.println(\\"Hello, world!\\");\\n  }\\n}",\n' +
          `  "mensaje": "El código es un programa Java básico que imprime 'Hello, world!' en la consola. Aquí hay algunas sugerencias de mejora:\\n1. Automatiza la indentación para mejorar la legibilidad. Añade cuatro espacios (o un tabulador) antes de las líneas dentro de los bloques de código.\\n2. Asegúrate de que las llaves estén alineadas verticalmente para mantener el código organizado.\\nNo se utilizan librerías obsoletas en este código simple."\n` +       
          '}\n' +
          '```'
      }
    ]
  },
  {
    _id: ObjectId('68471093612d4a16b33b807b'),
    userId: '68470fe7612d4a16b33b8075',
    model: 'gpt-4o',
    messages: [
      {
        role: 'developer',
        content: "5 Analiza el siguiente fragmento de código y actúa como un sistema experto en revisión de buenas prácticas, estilo clean code, advertencias sobre uso de librerías obsoletas o ineficientes, y responde exclusivamente en el siguiente formato JSON: {lenguaje:'', code:'', mensaje:''}"
      },
      {
        role: 'user',
        content: 'No entiendo este código public class HelloWorld {\n' +
          'public static void main(String[] args) {\n' +
          'System.out.println("Hello, world!");\n' +
          '}\n' +
          '}'
      },
      {
        role: 'assistant',
        content: '```json\n' +
          '{\n' +
          '  "lenguaje": "Java",\n' +
          '  "code": "public class HelloWorld {\\n  public static void main(String[] args) {\\n    System.out.println(\\"Hello, world!\\");\\n  }\\n}",\n' +
          `  "mensaje": "El código es un programa Java básico que imprime 'Hello, world!' en la consola. Aquí hay algunas sugerencias de mejora:\\n1. Automatiza la indentación para mejorar la legibilidad. Añade cuatro espacios (o un tabulador) antes de las líneas dentro de los bloques de código.\\n2. Asegúrate de que las llaves estén alineadas verticalmente para mantener el código organizado.\\nNo se utilizan librerías obsoletas en este código simple."\n` +       
          '}\n' +
          '```'
      }
    ]
  },
  {
    _id: ObjectId('6847109a612d4a16b33b807c'),
    userId: '68470ffe612d4a16b33b8076',
    model: 'gpt-4o',
    messages: [
      {
        role: 'developer',
        content: "6 Analiza el siguiente fragmento de código y actúa como un sistema experto en revisión de buenas prácticas, estilo clean code, advertencias sobre uso de librerías obsoletas o ineficientes, y responde exclusivamente en el siguiente formato JSON: {lenguaje:'', code:'', mensaje:''}"
      },
      {
        role: 'user',
        content: 'No entiendo este código public class HelloWorld {\n' +
          'public static void main(String[] args) {\n' +
          'System.out.println("Hello, world!");\n' +
          '}\n' +
          '}'
      },
      {
        role: 'assistant',
        content: '```json\n' +
          '{\n' +
          '  "lenguaje": "Java",\n' +
          '  "code": "public class HelloWorld {\\n  public static void main(String[] args) {\\n    System.out.println(\\"Hello, world!\\");\\n  }\\n}",\n' +
          `  "mensaje": "El código es un programa Java básico que imprime 'Hello, world!' en la consola. Aquí hay algunas sugerencias de mejora:\\n1. Automatiza la indentación para mejorar la legibilidad. Añade cuatro espacios (o un tabulador) antes de las líneas dentro de los bloques de código.\\n2. Asegúrate de que las llaves estén alineadas verticalmente para mantener el código organizado.\\nNo se utilizan librerías obsoletas en este código simple."\n` +       
          '}\n' +
          '```'
      }
    ]
  }
]

db.user.insertMany(users);
db.message.insertMany(messages);
