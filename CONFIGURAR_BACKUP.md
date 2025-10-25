# 🚀 Configuração da Planilha Backup no Vercel

## 📋 **Passo a Passo:**

### **1. Acessar o Painel do Vercel**
1. Acesse: [vercel.com](https://vercel.com)
2. Faça login na sua conta
3. Encontre o projeto: `ashley-circus-site`

### **2. Configurar Variável de Ambiente**
1. Clique em **"Settings"** (Configurações)
2. Clique em **"Environment Variables"** (Variáveis de Ambiente)
3. Clique em **"Add New"** (Adicionar Nova)

### **3. Adicionar a Variável**
Preencha os campos:
- **Name**: `GOOGLE_BACKUP_SHEET_ID`
- **Value**: `1kAQzuy_xdmVOMD2I8I-co3y2uj4Ria1fNnWsnqFZXzc`
- **Environments**: Marque todas as opções:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development

### **4. Salvar**
1. Clique em **"Save"** (Salvar)
2. Aguarde a confirmação

### **5. Baixar Variáveis Atualizadas**
Execute no terminal:
```bash
vercel env pull .env.local
```

### **6. Reiniciar Servidor**
```bash
# Parar o servidor atual
pkill -f "vercel dev"

# Iniciar novamente
vercel dev
```

### **7. Testar**
```bash
curl -s http://localhost:3000/api/debug-env
```

Deve retornar:
```json
{
  "GOOGLE_SHEET_ID": "Configurado",
  "GOOGLE_BACKUP_SHEET_ID": "Configurado", 
  "backupId": "1kAQzuy_xdmVOMD2I8I-co3y2uj4Ria1fNnWsnqFZXzc"
}
```

## 🎯 **Resultado Esperado**

Após configurar, quando você enviar dados pelo formulário:
- ✅ Dados salvos na **planilha principal**
- ✅ Dados salvos na **planilha backup**
- ✅ Resposta: *"Dados confirmados e salvos em ambas as planilhas!"*

## 📊 **Verificação**

1. **Teste o formulário** no site
2. **Verifique a planilha principal**: `RSVP Niver`
3. **Verifique a planilha backup**: `RSVP Niver - Backup`
4. **Ambas devem ter os mesmos dados**

## 🔧 **Troubleshooting**

Se ainda não funcionar:
1. Verifique se a planilha backup foi compartilhada com: `ashley-circus-service@niver-476203.iam.gserviceaccount.com`
2. Verifique se o ID da planilha está correto
3. Execute `vercel env pull .env.local` novamente
4. Reinicie o servidor
