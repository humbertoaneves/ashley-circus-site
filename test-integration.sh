#!/bin/bash

# Script para testar a integração com Google Sheets
# Execute este script após instalar o Node.js

echo "🚀 Iniciando testes da integração Google Sheets..."
echo ""

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo ""
    echo "📦 Para instalar o Node.js:"
    echo "1. Acesse: https://nodejs.org/"
    echo "2. Baixe a versão LTS (recomendada)"
    echo "3. Execute o instalador"
    echo ""
    echo "Ou use o Homebrew (se instalado):"
    echo "brew install node"
    echo ""
    exit 1
fi

# Verifica se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado!"
    echo "O npm geralmente vem junto com o Node.js"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo ""

# Instala as dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas com sucesso!"
echo ""

# Verifica se o arquivo .env existe
if [ ! -f ".env" ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "Certifique-se de que o arquivo .env existe com as configurações corretas"
    exit 1
fi

echo "✅ Arquivo .env encontrado"
echo ""

# Executa o teste de integração
echo "🧪 Executando teste de integração..."
node test-sheets-integration.js

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Teste concluído com sucesso!"
    echo ""
    echo "🚀 Para iniciar o servidor local:"
    echo "vercel dev"
    echo ""
    echo "Ou se não tiver o Vercel CLI:"
    echo "npm install -g vercel"
    echo "vercel dev"
else
    echo ""
    echo "❌ Teste falhou. Verifique as configurações no arquivo .env"
    echo "📋 Consulte o arquivo GOOGLE_SHEETS_SETUP.md para mais detalhes"
fi
