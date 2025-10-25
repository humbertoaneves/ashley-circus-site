#!/usr/bin/env node

// Script para testar o sistema de backup
// Carrega variáveis do arquivo .env.local se existir
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // Ignora se dotenv não estiver disponível
}

async function testBackupSystem() {
  console.log('🧪 Testando sistema de backup...\n');

  // Verifica configurações
  console.log('📋 Configurações:');
  console.log(`- Planilha Principal: ${process.env.GOOGLE_SHEET_ID ? '✅ Configurada' : '❌ Não configurada'}`);
  console.log(`- Planilha Backup: ${process.env.GOOGLE_BACKUP_SHEET_ID ? '✅ Configurada' : '⚠️ Não configurada'}`);
  console.log('');

  if (!process.env.GOOGLE_SHEET_ID) {
    console.log('❌ GOOGLE_SHEET_ID não configurado!');
    return;
  }

  try {
    const payload = {
      nome: 'Teste Sistema Backup',
      contato: 'backup@teste.com',
      adultos: 2,
      criancas: 1,
      timestamp: new Date().toISOString()
    };

    console.log('📤 Enviando dados de teste...');
    console.log('Payload:', JSON.stringify(payload, null, 2));
    console.log('');

    const response = await fetch('http://localhost:3001/api/confirmar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    
    console.log('📊 Resultado:');
    console.log(`- Status: ${response.status} ${response.statusText}`);
    console.log(`- Resposta: ${responseText}`);
    console.log('');

    if (response.ok) {
      console.log('🎉 Teste bem-sucedido!');
      
      if (process.env.GOOGLE_BACKUP_SHEET_ID) {
        console.log('✅ Dados devem estar em ambas as planilhas');
      } else {
        console.log('⚠️ Apenas na planilha principal (backup não configurado)');
      }
      
      console.log('\n📋 Próximos passos:');
      console.log('1. Verifique a planilha principal');
      if (process.env.GOOGLE_BACKUP_SHEET_ID) {
        console.log('2. Verifique a planilha backup');
      } else {
        console.log('2. Configure GOOGLE_BACKUP_SHEET_ID para ativar backup');
      }
    } else {
      console.log('❌ Teste falhou');
      console.log('Verifique as configurações e logs do servidor');
    }

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

testBackupSystem();
