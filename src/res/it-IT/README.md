# Connettore GitHub TranslationOS

Questo repo contiene il codice del connettore tra le API di TranslationOS e GitHub.
Il connettore è un'applicazione GitHub che può essere installata su un repo ed esegue l'assunzione e le consegne di contenuti tradotti
da/a esso.

## Sviluppo locale

Per sviluppare il connettore GitHub è necessario:

1. Registrati su una piattaforma di intercettazione webhook come [Hookdeck](https://hookdeck.io), [Spugna](https://smee.io)
   o [Ngrok](https://ngrok.io) e lanciare il loro tunnel cli localmente.
2. Registrati su [Beeceptor](https://beeceptor.com) e attiva un endpoint
3. Effettuare una registrazione di un'applicazione di prova GitHub seguendo le istruzioni riportate di seguito e:
   * puntare l'URL di configurazione all'endpoint del beeceptor
   * puntare l'URL Webhook all'URL pubblico fornito dalla piattaforma di intercettazione
4. Copiare il `file` .env.example in `.env` nel repository clonato (questo file viene ignorato per impostazione predefinita) e inserire i valori necessari
   restituito/generato da GitHub nel passaggio precedente.
5. Avvia `servizio filati`
6. Aggiungere l'applicazione GitHub a un account utente/organizzazione e autorizzarlo su alcuni repos
7. Effettuare alcuni commit nel repo


## Ambienti

* `staging` distribuito su Translated staging Docker Swarm automaticamente ad ogni commit dalla pipeline CI/CD, si interfaccia con l'ambiente di staging TOS API.
   
* `sandbox` distribuita automaticamente su Docker Swarm di produzione Translated ad ogni commit dalla pipeline CI/CD, si interfaccia con TOS
   Ambiente sandbox API.
* `produzione` distribuita su Docker Swarm di produzione Translated automaticamente ad ogni commit da parte della pipeline CI/CD, interfacce con TOS
   Ambiente di produzione API.

## Registrazione manuale dell'app Connector GitHub nell'organizzazione Translated

Eseguire i seguenti passaggi per la registrazione dell'applicazione di produzione su GitHub (è possibile seguire passaggi simili per registrare un test
applicazione che punta all'ambiente di staging e un'applicazione di test per lo sviluppo locale):

1. Vai alle impostazioni dell'account dell'organizzazione tradotta
2. Nell'angolo in basso a sinistra, fai clic su **Impostazioni sviluppatore**
3. Quindi fai clic su **GitHub Apps**
4. Nell'angolo destro, fai clic su **Nuova app GitHub**
5. Compilare il modulo con i seguenti valori:
   - Nome dell'app GitHub: `TranslationOS GitHub Connector`
   - Descrizione (visualizzata agli utenti): `TranslationOS <> GitHub connector`
   - URL della home page (obbligatorio): `https://tos-connector-github.translated.com`
   - URL di installazione: `https://tos-connector-github.translated.com/setup`
   - Controlla `il reindirizzamento all'aggiornamento`
   - Verifica `Attivo` nella sezione Webhook
   - URL del webhook (eventi come push, pull, ecc... verranno pubblicati su questo
      URL): `https://tos-connector-github.staging.translated.com/webhook`
   - Webhook segreto: `tr4nsl4t3d`
   - Lascia la verifica SSL abilitata
6. Immettere le seguenti autorizzazioni:
   - Sezione Repository
      - Stati di commit: lettura e scrittura
      - Contenuti: Read and write
      - Problemi: lettura e scrittura
      - Metadati: sola lettura
      - Richieste pull: lettura e scrittura
      - Segreti: sola lettura
      - Webhook: lettura e scrittura
   - Sezione Organizzazione
      - Segreti: sola lettura
   - Sezione utenti
      - Indirizzi email: Sola lettura
7. Seleziona per iscriverti ai seguenti eventi:
   - Premi
8. Clicca su + Create City****
9. Copiare i valori `App ID` e `Client ID` nell'ambiente appropriato vars nel `file` .env.production
10. Fare clic sul pulsante `Genera nuovo segreto cliente`
11. Copiare il segreto generato nell'ambiente appropriato var nel file di `produzione` .env.
12. Fare clic sul pulsante `Genera chiave privata`
13. Aprire il file `PEM` scaricato e copiare l'intero contenuto nell'ambiente appropriato var nel `file` .env.production

## App GitHub con il flusso manifest

Possiamo sempre creare un'app con il flusso manifest. Il che significa che ci sarà un file preconfigurato con tutte le impostazioni necessarie per
creare
l'app GitHub (invece di utilizzare l'interfaccia utente GitHub).
Dovremmo attivare una richiesta post a https://github.com/settings/apps/new `fornendo` un file di configurazione manifest JSON (localizzato
in `src/manifest-flow/manifest.json`).
Dopo aver creato l'app con il flusso manifest, GitHub reindirizzerà al tuo sito all'URL reindirizzato specificato con un codice temporaneo.

Quindi possiamo utilizzare il manifesto dell'app API (https://api.github.com/app-manifests/CODE/conversions`)` sostituendo il `CODICE` con il temporaneo
codice fornito da GitHub. Dovrebbe restituire una risposta che fornisca il file di configurazione dell'app necessario che dovrebbe essere archiviato
nel file `.env` (client_id, client_secret, webhook_secret, pem).
