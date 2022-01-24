# Projeto 03 DevInBank | Conta-365
---

Este repositório foi criado para adicionar o projeto 03 desenvolvido no curso DevInHouse no módulo 2, que tem o objetivo de firmar os conhecimentos aprendidos sobre Backend com NodeJS.

- [Consulte a documentção aqui.](https://devinbank-conta365.herokuapp.com/api/v1/docs/)
<p align="center">	
   <a href="https://www.linkedin.com/in/developer-danielmn/">
      <img alt="Daniel Meireles" src="https://img.shields.io/badge/-Daniel Meireles-0080000?style=flat&logo=Linkedin&logoColor=white" />
   </a>
  <img alt="Repository size" src="https://img.shields.io/github/languages/code-size/meirelesdev/devinbank?color=0080000label=repo%20size">


  <a href="https://github.com/meirelesdev/devinbank/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/meirelesdev/devinbank?color=0080000">
</p>

# :pushpin: Índice

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Utilizar](#como-utilizar)
- [Imagens](#imagens)

<a id="sobre"></a>

## :bookmark: Sobre

O <strong>Projeto DevinBank | Conta-365</strong> é o terceiro projeto da Turma Teltec e BRy do Dev in House, desenvolvido para prática e avaliação dos conhecimentos aprendidos no módulo 2 (backend com NodeJS) do curso.

<a id="tecnologias-utilizadas"></a>

## :rocket: Tecnologias Utilizadas

O projeto aqui disposto foi desenvolvido utilizando as seguintes tecnologias:
- [NodeJS](https://nodejs.org/en/) no backend.
A documentação da API foi construída utilizando:
- [Swagger](https://swagger.io/)
Para a fazer modificações no layout da documentação
- [CSS](https://www.w3schools.com/css/default.asp)

<a id="#como-utilizar"></a>
# :construction_worker: Como Utilizar

### **Pré-requisitos**

  - É **necessário** possuir o **[NodeJS](https://nodejs.org/en/)** instalado na máquina.
  - No arquivo src/utils/default-doc.js na linha 8 e 9 temos o caminho queo swagger utilizara para testar os endpoints.

```bash
# Clone o Repositório
$ git clone https://github.com/meirelesdev/devinbank.git
```

```bash
# Entre na pasta projeto
$ cd devinbank

```
```bash
# Já dentro da pasta do projeto.
# Instale as bibliotecas utlizadas no projeto.
$ npm install
```
```bash
# Caso seja necessario atualizar a documentação rode o commando.
# obs: Não esqueca de trocar a chave host dentro do arquivo src/utils/default-doc.js para host: "localhost:3333" ou "DOMINIO_QUE_HOSPEDARA_A_APLICAÇÃO"
$ npm run swagger-docs
```

```bash
# Para executar em ambiente de desenvolvimento rode o comando.
# obs: Não esqueca de trocar a chave host dentro do arquivo src/utils/default-doc.js para host: "localhost:3333"
$ npm run dev
```

```bash
# Para executar em ambiente de produção.
# OBS: Não esqueca de trocar a chave host dentro do arquivo src/utils/default-doc.js para host: "DOMINIO_QUE_HOSPEDARA_A_APLICAÇÃO"
$ npm start
```

<a id="imagens"></a>
## :bookmark: Imagens

### Documentação detalhada.

![Rotas Users](screens/users-routes.png?raw=true "Rotas user")

![Rotas Transactions](screens/transactions-routes.png?raw=true "Rotas transactions")


<h4 align="center">
    Feito com ❤️ by <a href="https://www.linkedin.com/in/developer-danielmn/" target="_blank">Daniel Meireles</a>
</h4>