## ✈️ Planner de Viagens entre Amigos

Um app mobile para **planejar viagens em grupo**, organizar atividades diárias, links importantes e convidados, desenvolvido com **Expo**, **React Native** e **TypeScript**.

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

Planeje o destino, datas, convidados, atividades e links essenciais da sua próxima viagem, tudo em um só lugar.

## 📱 Demonstração

Este projeto está em modo **local / teste**, focado em demonstração de funcionalidades:

- Ao criar uma viagem, os dados são salvos apenas no dispositivo (sem backend real)
- Você pode abrir a mesma viagem novamente enquanto o ID estiver salvo no aparelho
- A interface foi pensada para uso em dispositivos móveis (Expo Go, emulador ou build nativa)

> Caso você publique um vídeo ou GIF do app, pode substituir esta seção por imagens ou links de demonstração.

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

### 💾 Armazenamento local (modo teste)

- Os dados de viagem, atividades, convidados e links são salvos usando **armazenamento local** e estruturas de teste
- Não há integração com servidor real neste projeto (ideal para estudo de layout, navegação, formulários e estado)

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
- `src/server`: camada de serviços simulada para dados da viagem, links, participantes e atividades
- `src/storage`: abstrações de armazenamento local (viagem atual e dados de teste)
- `src/styles`: configurações de tema (cores, fontes, estilos globais)
- `src/utils`: utilitários de calendário, validações e configurações de locale

## 🌟 Funcionalidades Principais

- Interface **intuitiva e focada em mobile**
- **Planejamento completo da viagem**: destino, período, convidados, atividades e links
- **Calendário interativo** para seleção de datas
- **Validações amigáveis** com mensagens em português
- **Design moderno** usando NativeWind/Tailwind
- Separação clara entre **atividades** e **detalhes** da viagem

## 🗺️ Roadmap

- [x] Criar e salvar viagens localmente
- [x] Cadastrar atividades por dia com horário
- [x] Cadastrar links importantes da viagem
- [x] Listar e gerenciar convidados
- [ ] Integrar com backend real (API) para salvar viagens na nuvem
- [ ] Enviar convites reais por e-mail para participantes
- [ ] Adicionar notificações push para lembrar atividades
- [ ] Suporte completo a múltiplos idiomas
- [ ] Autenticação de usuário e múltiplas viagens por conta
- [ ] Melhorar acessibilidade e testes automatizados

## 📊 Status do Projeto

Você pode ajustar estes badges com o seu usuário do GitHub:

![GitHub stars](https://img.shields.io/github/stars/<seu-usuario>/planner?style=for-the-badge&logo=github&logoColor=white)
![GitHub forks](https://img.shields.io/github/forks/<seu-usuario>/planner?style=for-the-badge&logo=github&logoColor=white)
![GitHub issues](https://img.shields.io/github/issues/<seu-usuario>/planner?style=for-the-badge&logo=github&logoColor=white)
![GitHub pull requests](https://img.shields.io/github/issues-pr/<seu-usuario>/planner?style=for-the-badge&logo=github&logoColor=white)

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [`LICENSE`](LICENSE) para mais detalhes.

