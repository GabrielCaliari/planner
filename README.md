## ✈️ Planner de Viagens entre Amigos

Um app mobile para **planejar viagens em grupo**, organizar atividades diárias, links importantes e convidados, desenvolvido com **Expo**, **React Native** e **TypeScript**.

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

Planeje o destino, datas, convidados, atividades e links essenciais da sua próxima viagem, tudo em um só lugar.

## 📱 Demonstração

<p align="center">
  <img alt="Planner - Planejador de viagens" src="./assets/images/icon.png" width="200">
</p>

<p align="center">
  <em>Convide seus amigos e planeje sua próxima viagem.</em>
</p>

## 📌 Funcionalidades

### 🧭 Criação e gerenciamento de viagens

- **Criar nova viagem** informando:
  - Destino
  - Data de ida e volta (selecionadas em um calendário)
- **Validação de dados**:
  - Destino com tamanho mínimo
  - Obrigatoriedade de datas de início e fim
- **Salvar viagem no dispositivo** para reabrir automaticamente depois
- **Atualizar viagem** (destino e período) em uma tela própria
- **Remover viagem** salva do dispositivo

### 👥 Convidados e convites

- **Adicionar e-mails de convidados** para a viagem, com:
  - Validação de e-mail
  - Prevenção de e-mails duplicados
- **Listar convidados** na tela de detalhes
- **Fluxo de confirmação de presença**:
  - Tela específica onde o convidado informa nome e e-mail
  - Validação de e-mail antes de confirmar

### 📅 Atividades da viagem

- **Cadastro de atividades por dia**:
  - Título da atividade
  - Data da atividade (dentro do período da viagem)
  - Horário da atividade
- **Visualização em lista seccionada** por dia:
  - Dia e nome do dia da semana
  - Indicação se a atividade já aconteceu (data/horário no passado)
- **Interface pensada para uso contínuo** durante a viagem

### 🔗 Links importantes

- **Cadastro de links relacionados à viagem**:
  - Título (ex.: Reserva do hotel, Ingresso do parque, Passagens)
  - URL validada
- **Lista de links importantes** visível para todos os convidados

## 🚀 Como Usar

### 1. Pré-requisitos

- **Node.js** LTS instalado
- **npm** ou **yarn**
- Opcional: **Expo Go** instalado no celular ou emulador Android/iOS configurado

### 2. Clonar o repositório

```bash
git clone https://github.com/<seu-usuario>/planner.git
```

### 3. Instalar as dependências

```bash
cd planner
npm install
```

### 4. Executar o projeto

```bash
npm run start
```

- O Expo abrirá um painel no navegador
- Você poderá:
  - Ler o QR Code com o app **Expo Go** no celular, ou
  - Rodar em um emulador Android/iOS, ou
  - Abrir a versão web (opção **Run on web** no painel do Expo)

## 💻 Tecnologias

- **Expo** (SDK 51)
- **React Native**
- **TypeScript**
- **Expo Router**
- **React Navigation (via Expo Router)**
- **NativeWind + Tailwind CSS**
- **Dayjs** (manipulação e formatação de datas)
- **Async Storage** (persistência local)
- **Jest + jest-expo** (testes)

## 🧱 Estrutura Principal

Algumas pastas importantes do projeto:

- `src/app`: rotas e telas principais (criação de viagem, detalhes, atividades)
- `src/components`: componentes reutilizáveis (inputs, botões, calendário, modal, loading, etc.)
- `src/server`: camada de serviços para dados da viagem, links, participantes e atividades
- `src/storage`: armazenamento local da viagem e dados do planejamento
- `src/styles`: configurações de tema (cores, fontes, estilos globais)
- `src/utils`: utilitários de calendário, validações e configurações de locale

## 🌟 Funcionalidades Principais

- Interface **intuitiva e focada em mobile**
- **Planejamento completo da viagem**: destino, período, convidados, atividades e links
- **Calendário interativo** para seleção de datas
- **Validações amigáveis** com mensagens em português
- **Design moderno** usando NativeWind/Tailwind
- Separação clara entre **atividades** e **detalhes** da viagem
- Dados salvos no dispositivo para acessar sua viagem quando quiser

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [`LICENSE`](LICENSE) para mais detalhes.

