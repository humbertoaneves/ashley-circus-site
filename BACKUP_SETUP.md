# 📊 Configuração da Planilha Backup

## 🎯 **Objetivo**
Implementar backup automático dos dados RSVP em duas planilhas simultaneamente.

## 📋 **Passo 1: Criar Planilha Backup**

1. **Acesse**: [Google Sheets](https://sheets.google.com)
2. **Crie** uma nova planilha:
   - Nome: `RSVP Niver - Backup`
   - Ou qualquer nome de sua escolha
3. **Copie o ID** da planilha da URL:
   - URL exemplo: `https://docs.google.com/spreadsheets/d/1ABC123.../edit`
   - ID: `1ABC123...`
4. **Compartilhe** a planilha com:
   - Email: `ashley-circus-service@niver-476203.iam.gserviceaccount.com`
   - Permissão: **Editor**

## ⚙️ **Passo 2: Configurar Variável de Ambiente**

### **No Vercel:**
1. Acesse o painel do Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione nova variável:
   - **Name**: `GOOGLE_BACKUP_SHEET_ID`
   - **Value**: `[ID_DA_SUA_PLANILHA_BACKUP]`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

### **Localmente:**
Adicione ao arquivo `.env.local`:
```bash
GOOGLE_BACKUP_SHEET_ID=[ID_DA_SUA_PLANILHA_BACKUP]
```

## 🧪 **Passo 3: Testar**

Após configurar:

1. **Baixe** as variáveis atualizadas:
   ```bash
   vercel env pull .env.local
   ```

2. **Teste** a API:
   ```bash
   curl -X POST http://localhost:3001/api/confirmar \
     -H "Content-Type: application/json" \
     -d '{"nome":"Teste Backup","contato":"teste@exemplo.com","adultos":1,"criancas":0}'
   ```

3. **Verifique** ambas as planilhas

## 📊 **Comportamento do Sistema**

### **✅ Com Backup Configurado:**
- Dados salvos na **planilha principal**
- Dados salvos na **planilha backup**
- Resposta: "Dados confirmados e salvos em ambas as planilhas!"

### **⚠️ Se Backup Falhar:**
- Dados salvos na **planilha principal**
- Resposta: "Dados confirmados na planilha principal (backup falhou)"

### **❌ Se Principal Falhar:**
- Erro: "Não foi possível salvar os dados em nenhuma planilha"

## 🔧 **Estrutura das Planilhas**

Ambas as planilhas terão as mesmas colunas:
- **A**: Timestamp
- **B**: Nome
- **C**: Adultos
- **D**: Crianças
- **E**: Total
- **F**: Contato

## 🚀 **Deploy**

Após configurar:
1. **Commit** as mudanças
2. **Push** para GitHub
3. **Deploy** automático no Vercel
4. **Configure** `GOOGLE_BACKUP_SHEET_ID` no Vercel

## 📝 **Logs**

O sistema registra logs detalhados:
- ✅ Sucesso em cada planilha
- ❌ Erros específicos por planilha
- 📊 Status de cada operação
