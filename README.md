## API para Solicitação de Documentos
### Tecnologias
`node`
`express`
`Prisma`
`passport`
`postgresql`
`mongodb`
`winston`
`typescript`
`postman`
### Nota
```bash
A API esta em fase de desenvolvimento. Todas as funcionalidades são basicas apenas com o propósito de contemplar a POC-Solicitação de Documentos.
```
### Motivação
A Api esta sendo desenvolvida na arquitetura [MVC](https://coodesh.com/blog/dicionario/o-que-e-arquitetura-mvc/). Com camadas fazendo suas funções separadamente e independente. Caso seja necessário mudar uma rota ou uma conexão com o banco de dados, é muito rápido e produtivo realizar na camada que executa apenas essa função.
Utilizando assim o conceito de [Arquitetura Limpa](https://medium.com/@ben.dev.io/clean-architecture-in-node-js-39c3358d46f3). Criando códigos pequenos, bem nomeados, simples e de rápida manutenção.

### Instalação
Faça o clone da api no git do azure e digite os comandos para instalar a pasta node-modules

```bash
npm install
ou
yarn install
```
### ORM
A api utiliza o [Prisma](https://www.prisma.io/) para criar as tabelas com o banco de dados. Por ser um ORM simples e popularmente utilizado no mercado.

Digite o comando: `npx prisma init` para criar um novo `schema`.
No nosso caso, que os models já estão criados, devemos digitar o comando:
```bash
npm prisma migrate dev
ou
yarn prisma migrate dev
```
Para criar as tabelas no banco. O nome do banco já precisa existir para criar as tabelas.

### Para criar novas tabelas
Nunca digite o comando `prisma migrate dev` para criar novas tabelas, se já tiver tabela criada no banco de dados. Se digitar esse comando, as tabelas que já existem serão limpas e criadas novamente. Se houver dados dentro de alguma tabela, será tudo apagado.

Para isso, deve ser criado a nova tabela dentro do arquivo `schema.prisma`, onde fica os models e realizar o comando:
```bash
yarn prisma migrate dev --name rename-migration --create-only
```
Onde esta escrito "rename-migration" digite a descrição da nova migration.

Todas as modificações necessárias nas tabelas, devem ser feitas dentro do schema.prisma e digitar o comando acima para que o prisma crie um histórico de todas as modificações no schema.

Depois disso é que devemos utiliza o comando: `prisma migrate dev`

### MongoDB
No caso do mongodb, os models são criados dentro da pastas model e lá são criadas os schemas para salvar informações no banco com o [mongoose](https://mongoosejs.com/)

### Passport
[Passport](https://www.passportjs.org/) é uma lib utilizada para vários tipos de login. Pode ser configurado um login com o facebook, google, twitter...etc. E também, oauth, openid, jwt e muito mais.
No caso da api, estamos utilizando o jwt para gerar um hash de segurança.

## Rotas
A base url é: `<base_url>/api/v1`

### Usuário

| URL | Tipo | Parâmetros |Requisição |Segurança| Descrição | Retorno|
|:---:|:----:|:----------:|:-------:|:---------:|:------:|:----:|
|/ping| get| nenhum | nenhum | false| Apenas para realizar o teste de conexão. |pong: string|
|/users/login| post | usuário e Senha | body | false | Realizar login do usuário | user: object|
|/users/logout| post | nenhum | nenhum | true | Realiza o logout do usuário | message: string |

#### Parâmetros de Usuário
Entrada
```bash
"name": "",
"register": "",
```
saida
```bash
{
    "user":{
        "id": "",
        "name": "",
        "register": "",
        "bank_op": "",
        "op": ""
    },
    "token":""
}
```

### Solicitações
| URL | Tipo | Parâmetros |Requisição |Segurança| Descrição | Retorno|
|:---:|:----:|:----------:|:-------:|:---------:|:------:|:----:|
| /solicitations | get | nenhum | nenhum | true | Retorna todas as solicitações disponíveis | solicitations: array[]|
|/solicitations/:id | get | id | params | true | Retorna apenas uma solicitação | solicitations: object|
|/solicitations | post | solicitations: object| body | true |Cria uma nova solicitação| message: string |
|/solicitations/:id| put | id/solicitation | params/body| true | Atualiza uma solicitação especifica | message: string|
|/solicitations/filterByDates&initial_date=:initial_date&final_date=:final_date| get | initial_date/final_date| params | true | Filtra solicitações dentro de um range de datas | solicitations: array[]|

#### Parâmetros de Solicitação
entrada
```bash
{
    "id": 0
    "request_number": ""
    "bank_proposal": ""
    "document_name": ""
    "sub_document": ""
    "state_id": ""
    "state": ""
    "city": ""
    "uf": ""
    "property_registration_office": ""
    "civil_register_office": ""
    "register_number": ""
    "applicant_name_one": ""
    "applicant_name_two": ""
    "applicant_cpf_on": ""
    "applicant_cpf_two": ""
    "birth_date": ""
    "wedding_date": ""
    "death_date": ""
    "municipal_registration_property": ""
    "request_status": ""
    "request_date": ""
    "request_hour": ""
    "requestor_name": ""
    "requestor_register": ""
    "bank_op": ""
    "forecast_date": ""
    "forecast_weeK_day": ""
    "operator_name": ""
    "operator_register": ""
    "operator_op": ""
    "image": ""
    "image_name": ""
    "image_type": ""
    "image_size": ""
    "start_process_date": ""
    "start_process_hour": ""
    "finish_process_date": ""
    "finish_process_hour": ""
}
```

### Inconsistências
| URL | Tipo | Parâmetros |Requisição |Segurança| Descrição | Retorno|
|:---:|:----:|:----------:|:-------:|:---------:|:------:|:----:|
|/inconsistencies/:idSolicitation|get|idSolicitation|params|true|Retorna uma inconsistência pelo número da solicitação|inconsistencies: object|
|/inconsistencies|post|nenhum|nenhum|true| Insere uma nova inconsistência para uma determinada solicitação|message:string|
|/inconsistencies/:id|put|id|params|true|Atualiza uma inconsistência|message: string|

#### Parâmetros de Inconsistência
```bash
    "id": 0
    "operator_name": ""
    "operator_register": ""
    "requestor_name": ""
    "requestor_register": ""
    "bank_op": ""
    "information_date": ""
    "correction_date": ""
    "description": ""
    "status": ""
    "solicitationId": ""
```
### Cartórios
| URL | Tipo | Parâmetros |Requisição |Segurança| Descrição | Retorno|
|:---:|:----:|:----------:|:-------:|:---------:|:------:|:----:|
|/offices|get|nenhum|nenhum|true|Retorna todos os cartórios| offices: array|
|/offices/:uf|get|uf|params|true|Retorna os cartórios pelo UF| offices: array|
|/offices/city/:city|get|city|params|true|Retorna os cartórios pela cidade| offices: array|

#### Parâmetros de Cartórios
```bash
    "id": 0
    "cns": ""
    "type": ""
    "name": ""
    "city": ""
    "uf": ""
```

### Arquivos
| URL | Tipo | Parâmetros |Requisição |Segurança| Descrição | Retorno|
|:---:|:----:|:----------:|:-------:|:---------:|:------:|:----:|
|/uploadFile|post|nenhum|nenhum|true|Salva um novo arquivo em formato base64| message: string|
|/downloadFile/:id|get|id|params|true|Retorna um documento por id|file:object|