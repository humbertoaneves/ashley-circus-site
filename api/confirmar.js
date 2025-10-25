
// api/confirmar.js
// Example Vercel Serverless function to receive RSVP submissions.
// Two modes:
// 1) If GOOGLE_SERVICE_ACCOUNT_KEY and GOOGLE_SHEET_ID are set, try to append to Google Sheets (uses googleapis).
// 2) Otherwise fallback to appending to a local CSV (useful for local dev).


module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const body = req.body;

  // Validação básica
  if (!body || !body.nome || !body.contato) {
    return res.status(400).send('Campos obrigatórios ausentes: nome e contato');
  }

  const sheetId = process.env.GOOGLE_SHEET_ID;
  const backupSheetId = process.env.GOOGLE_BACKUP_SHEET_ID;

  const key = process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY
    ? {
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
      }
    : null;

  if (!sheetId || !key) {
    return res.status(500).send('Credenciais ou ID da planilha principal ausentes');
  }

  try {
    const { google } = require('googleapis');
    
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const adultos = Number(body.adultos || 0);
    const criancas = Number(body.criancas || 0);
    const total = adultos + criancas;

    const values = [[
      new Date().toISOString(),
      String(body.nome),
      adultos,
      criancas,
      total,
      String(body.contato)
    ]];

    const range = process.env.GOOGLE_SHEET_RANGE || 'A:F';

    // Função para enviar dados para uma planilha
    const appendToSheet = async (spreadsheetId, sheetName = '') => {
      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range,
          valueInputOption: 'USER_ENTERED',
          resource: { values }
        });
        console.log(`✅ Dados salvos na planilha ${sheetName}`);
        return true;
      } catch (error) {
        console.error(`❌ Erro ao salvar na planilha ${sheetName}:`, error.message);
        return false;
      }
    };

    // Envia para a planilha principal
    const mainSheetSuccess = await appendToSheet(sheetId, 'Principal');

    // Envia para a planilha backup (se configurada)
    let backupSheetSuccess = true;
    if (backupSheetId) {
      backupSheetSuccess = await appendToSheet(backupSheetId, 'Backup');
    }

    // Retorna sucesso se pelo menos uma planilha foi atualizada
    if (mainSheetSuccess) {
      const message = backupSheetId 
        ? (backupSheetSuccess ? 'Dados confirmados e salvos em ambas as planilhas!' : 'Dados confirmados na planilha principal (backup falhou)')
        : 'Dados confirmados com sucesso!';
      return res.status(200).send(message);
    } else {
      return res.status(500).send('Não foi possível salvar os dados em nenhuma planilha');
    }
  } catch (err) {
    console.error('Erro ao gravar no Google Sheets:', err);
    return res.status(500).send('Não foi possível confirmar os dados no momento');
  }
};