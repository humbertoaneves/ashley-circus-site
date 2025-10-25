#!/usr/bin/env node

// Script para testar o formulário completo
const fetch = require('node-fetch');

async function testFormSubmission() {
  console.log('🧪 Testando envio do formulário...\n');

  try {
    const payload = {
      nome: 'Teste Completo',
      contato: 'teste@exemplo.com',
      adultos: 2,
      criancas: 1,
      timestamp: new Date().toISOString()
    };

    console.log('📤 Enviando dados:', payload);

    // Testa ambas as APIs
    const [resp1, resp2] = await Promise.all([
      fetch('http://localhost:3001/api/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }),
      fetch('http://localhost:3001/api/init-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    ]);

    console.log('📊 Status das respostas:');
    console.log(`- /api/confirmar: ${resp1.status} ${resp1.statusText}`);
    console.log(`- /api/init-sheet: ${resp2.status} ${resp2.statusText}`);

    const text1 = await resp1.text();
    const text2 = await resp2.text();

    console.log('\n📝 Respostas:');
    console.log(`- /api/confirmar: ${text1}`);
    console.log(`- /api/init-sheet: ${text2}`);

    if (resp1.ok && resp2.ok) {
      console.log('\n🎉 Teste do formulário bem-sucedido!');
      console.log('✅ Dados enviados para a planilha Google Sheets');
    } else {
      console.log('\n❌ Erro no teste do formulário');
    }

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

testFormSubmission();
