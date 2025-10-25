# Guia para Configurar Google Sheets com niverdaash@gmail.com

## Passo 1: Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Faça login com a conta **niverdaash@gmail.com**
3. Clique em "Selecionar projeto" → "Novo projeto"
4. Nome do projeto: `ashley-circus-sheets` (ou outro nome de sua escolha)
5. Clique em "Criar"

## Passo 2: Ativar API Google Sheets

1. No menu lateral, vá em "APIs e serviços" → "Biblioteca"
2. Pesquise por "Google Sheets API"
3. Clique em "Google Sheets API" → "Ativar"

## Passo 3: Criar Service Account

1. Vá em "APIs e serviços" → "Credenciais"
2. Clique em "Criar credenciais" → "Conta de serviço"
3. Nome: `ashley-circus-service`
4. Descrição: `Service account para integração com Google Sheets do site Ashley Circus`
5. Clique em "Criar e continuar"
6. Role: "Editor" (ou "Proprietário" se necessário)
7. Clique em "Continuar" → "Concluído"

## Passo 4: Gerar Chave JSON

1. Na lista de contas de serviço, clique na conta criada
2. Vá na aba "Chaves"
3. Clique em "Adicionar chave" → "Criar nova chave"
4. Tipo: JSON
5. Clique em "Criar"
6. O arquivo JSON será baixado automaticamente

## Passo 5: Configurar Planilha

1. Crie uma nova planilha no Google Sheets (ou use uma existente)
2. Compartilhe a planilha com o email da Service Account
   - Email: `ashley-circus-service@seu-projeto.iam.gserviceaccount.com`
   - Permissão: "Editor"
3. Copie o ID da planilha da URL:
   - URL exemplo: `https://docs.google.com/spreadsheets/d/1aBcDeF.../edit`
   - ID: `1Hky6SAn7X2ikiHQkXdTIS6vjey3k5z0ASLkncIwH-lA` 

## Passo 6: Configurar Arquivos Locais

### Opção A: Usar arquivo chave.json (desenvolvimento local)

1. Renomeie o arquivo JSON baixado para `chave.json`
2. Mova para a pasta `api/`
3. Substitua o conteúdo do arquivo `api/chave.json` pelo novo arquivo

### Opção B: Usar variáveis de ambiente (recomendado para produção)

1. Copie o arquivo `env-template.txt` para `.env`
2. Preencha as variáveis com os dados do arquivo JSON:

```bash
GOOGLE_SHEET_ID=1aBcDeF...  # ID da sua planilha
GOOGLE_PROJECT_ID=seu-projeto-id
GOOGLE_PRIVATE_KEY_ID=chave-privada-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nsua-chave-privada\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=ashley-circus-service@seu-projeto.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=seu-client-id
```

## Passo 7: Testar a Integração

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o teste:
   ```bash
   GOOGLE_SHEET_ID=sua-planilha-id node test-sheets-integration.js
   ```

3. Se tudo estiver correto, você verá:
   ```
   ✅ Credenciais carregadas com sucesso
   ✅ Autenticação bem-sucedida!
   ✅ Acesso à planilha bem-sucedido!
   ✅ Dados de teste escritos com sucesso!
   🎉 Integração com Google Sheets funcionando perfeitamente!
   ```

## Passo 8: Deploy no Vercel (Produção)

1. No painel do Vercel, vá em "Settings" → "Environment Variables"
2. Adicione todas as variáveis do arquivo `.env`
3. Certifique-se de marcar "Production", "Preview" e "Development"
4. Faça o deploy

## Estrutura da Planilha

A planilha será preenchida com as seguintes colunas:
- **A**: Timestamp (data/hora do envio)
- **B**: Nome completo
- **C**: Número de adultos
- **D**: Número de crianças  
- **E**: Total de convidados
- **F**: Contato (WhatsApp ou email)

## Solução de Problemas

### Erro: PERMISSION_DENIED
- Verifique se a Service Account tem acesso à planilha
- Compartilhe a planilha com o email da Service Account

### Erro: INVALID_ARGUMENT
- Verifique se o GOOGLE_SHEET_ID está correto
- Verifique se a planilha existe e está acessível

### Erro: Authentication failed
- Verifique se as credenciais estão corretas
- Verifique se a API Google Sheets está ativada

## Segurança

⚠️ **IMPORTANTE**: 
- Nunca commite o arquivo `chave.json` ou `.env` no repositório
- Use variáveis de ambiente em produção
- Mantenha as credenciais seguras
