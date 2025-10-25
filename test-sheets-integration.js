#!/usr/bin/env node

// Script para testar a integração com Google Sheets
// Execute com: node test-sheets-integration.js

const { google } = require('googleapis');

async function testGoogleSheetsIntegration() {
  console.log('🧪 Testando integração com Google Sheets...\n');

  try {
    // Carrega as variáveis de ambiente do arquivo .env
    require('dotenv').config();
    
    // Valida se as credenciais estão completas
    const requiredFields = [
      'GOOGLE_CLIENT_EMAIL',
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_PROJECT_ID'
    ];
    
    const missingFields = requiredFields.filter(field => !process.env[field]);
    if (missingFields.length > 0) {
      console.error('❌ Campos obrigatórios ausentes:', missingFields.join(', '));
      console.log('📝 Verifique se o arquivo .env existe e contém todas as variáveis necessárias');
      return;
    }

    console.log('✅ Credenciais carregadas com sucesso');
    console.log(`📧 Email da Service Account: ${process.env.GOOGLE_CLIENT_EMAIL}`);

    // Configura a autenticação usando GoogleAuth (método moderno)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE || 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
        universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN || 'googleapis.com'
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    console.log('🔐 Autenticando com Google...');
    const authClient = await auth.getClient();
    console.log('✅ Autenticação bem-sucedida!');

    // Testa o acesso à API
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    // Verifica se GOOGLE_SHEET_ID está definido
    const sheetId = process.env.GOOGLE_SHEET_ID;
    
    if (!sheetId) {
      console.log('⚠️  GOOGLE_SHEET_ID não definido');
      console.log('📝 Para testar completamente, defina a variável GOOGLE_SHEET_ID');
      console.log('   Exemplo: GOOGLE_SHEET_ID=1aBcDeF... node test-sheets-integration.js');
      return;
    }

    console.log(`📊 Testando acesso à planilha: ${sheetId}`);
    
    // Tenta ler a planilha
    const response = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
      fields: 'properties.title,sheets.properties'
    });

    console.log('✅ Acesso à planilha bem-sucedido!');
    console.log(`📋 Título da planilha: ${response.data.properties.title}`);
    console.log(`📄 Número de abas: ${response.data.sheets.length}`);

    // Testa escrita de dados
    console.log('\n🧪 Testando escrita de dados...');
    
    const testData = [[
      new Date().toISOString(),
      'Teste de Integração',
      1,
      0,
      1,
      'teste@exemplo.com'
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'A:F',
      valueInputOption: 'USER_ENTERED',
      resource: { values: testData }
    });

    console.log('✅ Dados de teste escritos com sucesso!');
    console.log('🎉 Integração com Google Sheets funcionando perfeitamente!');

  } catch (error) {
    console.error('❌ Erro na integração:', error.message);
    
    if (error.message.includes('PERMISSION_DENIED')) {
      console.log('\n💡 Possíveis soluções:');
      console.log('1. Verifique se a Service Account tem acesso à planilha');
      console.log('2. Compartilhe a planilha com o email da Service Account');
      console.log('3. Verifique se o GOOGLE_SHEET_ID está correto');
    } else if (error.message.includes('INVALID_ARGUMENT')) {
      console.log('\n💡 Possíveis soluções:');
      console.log('1. Verifique se o GOOGLE_SHEET_ID está correto');
      console.log('2. Verifique se a planilha existe e está acessível');
    }
  }
}

// Executa o teste
testGoogleSheetsIntegration();
