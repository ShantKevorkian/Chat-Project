# Conector TranslationOS GitHub

Este repositório contém o código do conector entre as APIs do TranslationOS e o GitHub.
O conector é um aplicativo do GitHub que pode ser instalado em um repositório e executa a entrada e as entregas de conteúdo traduzido
de/para ele.

## Desenvolvimento local

Para desenvolver o conector GitHub, você deve:

1. Registre-se em uma plataforma de interceptação de webhook como [Hookdeck](https://hookdeck.io), [Smee](https://smee.io)
   ou [Ngrok](https://ngrok.io) e lançar seu cli de túnel localmente.
2. Registre-se no Beeceptor [e](https://beeceptor.com) ative um ponto de extremidade
3. Faça um registro de um aplicativo GitHub de teste seguindo as instruções abaixo e:
   * aponte a URL de configuração para o ponto de extremidade do Beeceptor
   * aponte o URL do Webhook para o URL público fornecido pela plataforma de intercepção
4. Copie o `arquivo` .env.example para `.env` em seu repositório clonado (este arquivo é ignorado por padrão) e insira os valores necessários
   retornado/gerado pelo GitHub na etapa acima.
5. Lançar o `saque de fio`
6. Adicione o aplicativo GitHub a uma conta de usuário/organização e autorize-o em alguns repositórios
7. Fazer alguns commits no repositório


## Ambientes

* `preparo` implantado no Translated staging Docker Swarm automaticamente em cada commit pelo pipeline CI/CD, interfaces com o ambiente de preparo da API tos.
   
* `sandbox` implantado no Translated Production Docker Swarm automaticamente em cada commit por pipeline CI/CD, interfaces com tos
   Ambiente de sandbox da API.
* `produção` implantada no Translated production Docker Swarm automaticamente em cada commit por pipeline CI/CD, interfaces com tos
   Ambiente de produção de API.

## Registro manual do aplicativo Connector GitHub na organização Translated

Execute as seguintes etapas para registrar o aplicativo de produção no GitHub (etapas semelhantes podem ser seguidas para registrar um teste
aplicação que aponta para o ambiente de teste e uma aplicação de teste para o desenvolvimento local):

1. Vá para Configurações de conta de organização traduzidas
2. No canto inferior esquerdo, clique em **Configurações do desenvolvedor**
3. Em seguida, clique em **Aplicativos GitHub**
4. No canto direito, clique em **Novo aplicativo do GitHub**
5. Preencha o formulário com os seguintes valores:
   - Nome do aplicativo GitHub: `TranslationOS GitHub Connector`
   - Descrição (isso é exibido para os usuários): `TranslationOS <> Conector GitHub`
   - URL da página inicial (obrigatório): `https://tos-connector-github.translated.com`
   - URL de configuração: `https://tos-connector-github.translated.com/setup`
   - Verificar `redirecionamento na atualização`
   - Verificar `ativo` na seção Webhook
   - URL do Webhook (eventos como push, pull etc... publicarão neste
      URL): `https://tos-connector-github.staging.translated.com/webhook`
   - Webhook Secret: `tr4nsl4t3d`
   - Deixe a verificação SSL ativada
6. Preencha as seguintes permissões:
   - Seção de repositório
      - Status do commit: Ler e escrever
      - Conteúdos: Read and write
      - Problemas: Ler e escrever
      - Metadados: somente leitura
      - Solicitações pull: Ler e escrever
      - Segredos: Somente leitura
      - Webhooks: Ler e escrever
   - Seção de organização
      - Segredos: Somente leitura
   - Seção do usuário
      - Endereços de e-mail: somente leitura
7. Marque para se inscrever nos seguintes eventos:
   - Enviar
8. Clique em “**Criar um!**
9. Copie o `ID do aplicativo` e os valores `do ID do cliente` para as variáveis de ambiente apropriadas no `arquivo` .env.production
10. Clique no botão `Gerar novo segredo do cliente`
11. Copie o segredo gerado para o ambiente apropriado var no `arquivo` .env.production
12. Clique no botão `Gerar chave privada`
13. Abra o arquivo `pem` baixado e copie todo o conteúdo para o ambiente apropriado var no `arquivo` .env.production

## Aplicativo GitHub com o fluxo de manifesto

Podemos sempre criar um aplicativo com o fluxo de manifesto. O que significa que haverá um arquivo pré-configurado com todas as configurações necessárias para
crie
o aplicativo GitHub (em vez de usar a interface do usuário do GitHub).
Devemos acionar uma solicitação post para https://github.com/settings/apps/new `fornecendo` um arquivo de configuração de manifesto JSON (localizado
no `src/manifest-flow/manifest.json`).
Depois de criar o aplicativo com o fluxo de manifesto, o GitHub redirecionará seu site para o URL redirecionado especificado com um código temporário.

Em seguida, podemos usar o manifesto do aplicativo API` (`https://api.github.com/app-manifests/CODE/conversions) substituindo o `CÓDIGO` pelo temporário
código fornecido pelo GitHub. Isso deve retornar uma resposta fornecendo o arquivo de configuração de aplicativo necessário que deve ser armazenado
no arquivo `.env` (client_id, client_secret, webhook_secret, pem).
