# Listagem de Skins de Counter Strike

Bem-vindo ao projeto da Landing Page para exibir uma lista de Skins de Counter Strike! Este projeto foi desenvolvido com as seguintes tecnologias:

- **Next.js**: Framework para React que facilita o desenvolvimento de aplicações web com renderização no lado do servidor.
- **Chakra UI**: Biblioteca de componentes React que fornece uma interface de usuário acessível e modular.
- **React Hook Form**: Biblioteca para gerenciar formulários em React com validação e gerenciamento de estado.
- **Zod**: Biblioteca de validação para garantir a integridade dos dados.

## Funcionalidades

- **Listagem de Skins**: Exibe uma lista de skins de Counter Strike, com detalhes e imagens.
- **Filtragem de Skins**: Permite aos usuários filtrar as Skins através de categorias, nome, preço mínimo e/ou máximo e float (desgaste) mínimo e/ou máximo.
- **Responsivo**: Design adaptável para diferentes tamanhos de tela.

## Tecnologias e Ferramentas

- **Next.js**: Utilizado para renderização do lado do servidor e geração de páginas estáticas.
- **Chakra UI**: Para a criação de uma interface de usuário moderna e responsiva.
- **React Hook Form**: Facilita a criação e validação de formulários.
- **Zod**: Para validação de dados e garantias de tipo.

## Faça o clone do projeto

Acesse a pasta que deseja fazer o clone do projeto e rode o comando abaixo

```bash
git clone https://github.com/christopher-alves-dev/cs-skin-store-web.git
```

## Configuração de Variáveis de Ambiente

Para garantir que seu ambiente de desenvolvimento esteja configurado corretamente, você precisará definir algumas variáveis de ambiente. Siga as instruções abaixo para configurar essas variáveis.

### Passo 1: Criar o Arquivo `.env`

Na raiz do projeto, crie um arquivo chamado `.env`. Esse arquivo será usado para definir suas variáveis de ambiente. O arquivo deve seguir o formato `VARIAVEL=valor`, uma por linha.

### Passo 2: Definir as Variáveis de Ambiente

Você pode utilizar o arquivo de tipagens de env `env.d.ts` na raíz do projeto como exemplo para configurar as variáveis.

## Como Rodar

Para rodar em modo de desenvolvimento.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

A porta do projeto foi alterada para rodar na 3001 para prevenir conflito com a porta do backend.

Abra [http://localhost:3001](http://localhost:3001) com seu navegador para ver o resultado.
