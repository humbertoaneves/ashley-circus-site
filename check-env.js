#!/usr/bin/env node

// Teste rápido para verificar variáveis de ambiente
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // Ignora se dotenv não estiver disponível
}

console.log('🔍 Verificando variáveis de ambiente:');
console.log(`GOOGLE_SHEET_ID: ${process.env.GOOGLE_SHEET_ID ? '✅ Configurado' : '❌ Não configurado'}`);
console.log(`GOOGLE_BACKUP_SHEET_ID: ${process.env.GOOGLE_BACKUP_SHEET_ID ? '✅ Configurado' : '❌ Não configurado'}`);

if (process.env.GOOGLE_BACKUP_SHEET_ID) {
  console.log(`\n📊 ID da planilha backup: ${process.env.GOOGLE_BACKUP_SHEET_ID}`);
}
