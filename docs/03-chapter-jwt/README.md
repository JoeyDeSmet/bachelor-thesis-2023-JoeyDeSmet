---
lang: nl-BE
title: Herwerking frontend API-calls met JWT
---

# Herwerking frontend API-calls met JWT

[[toc]]

De authenticatie en autorisatie in de HS Todo App gebeurt via JSON Web Tokens (JWT).

## JWT

JWT is een veilige methode om informatie te verzenden tussen client en server. JWT-tokens bestaan uit drie verschillende delen. 

### Header

De header bevat het type token het is en wat voor hash-algoritme er is gebruikt voor het ondertekenen van de token. 

### Payload

De payload bevat de claims die de gebruiker heeft. De claims zijn de verklaringen over de entiteit die de token gebruikt. Er zijn drie soorten claims: registered claims deze bevatten nuttige informatie zoals de issuer, audience, subject en de vervaldatum van de token. Daarnaast heb je ook de public claims dit zijn de claims die public geregistreerd3 zijn. Dan heb je private claims, dit zijn de claims die je zelf mag definiëren zonder de garantie dat andere dit correct zullen begrijpen. 

### Signature

De signature is de methode waarmee er kan gekeken worden of het bericht niet veranderd is geweest onderweg. Deze signature wordt gemaakt door header, de payload en een secret te hashen met het opgegeven hash-algoritme. Als er gebruik gemaakt wordt van een public private key, kan er ook bekeken worden of de zender wel is wie hij zegt dat hij is. 

### Werking

Onderstaande figuur is een visuele voorstelling te zien van het authenticatie proces met JWT. Wanneer een client wil inloggen zal hij als eerste zijn inlog gegevens doorsturen naar de server. De server zal bij het ontvangen de controleren of dit account bestaat, en wanneer dit het geval is zal hij de autorisatie claims ophalen en een JWT-token generen met deze claims. 

Wanneer de client dan nu een request wil sturen moet hij deze token in de BearerToken header plaatsen bij iedere request dat hij maakt. De server zal dan deze token valideren en antwoorden wanneer de token geldig is. 

<Image
    light="/img/Schemas/JWT.png"
    dark="/img/Schemas/JWTDark.png"
/>

Voor het hernieuwen van een verlopen token stuurt de client zijn token en refresh token naar de server, die vervolgens een nieuwe token en refresh token genereerd. Op deze manier moet de client niet opnieuw aanmelden. 

## Probleem

Bij de vorige implementatie stond de vervaltijd van deze token zeer laag, waardoor de client telkens een nieuw token moest aanvragen. De nieuwe token aanvragen werd telkens voor iedere request gedaan. Dit kon soms voor problemen zorgen omdat Blazor Multi threaded is. Volgende situatie stelt het probleem voor dat kan optreden. 

<Box>
        
Twee threads (**T1**, **T2**) sturen tegelijk een request uit. Omdat eerst de token vernieuwd wordt kan het zijn dat **T1** al een nieuwe token heeft gekregen, maar voordat hij zijn effectieve request kan sturen heeft **T2** ondertussen al een nieuwe token aanvraagt en ontvangen.

Dit zorgt ervoor dat **T1** een ongeldige token heeft omdat **T2** de token vernieuwd heeft. Wanneer **T1** nu zijn request wil maken zal hij een unauthorized response krijgen, waardoor hij nu heel het proces opnieuw moet doen.
</Box>

Niet enkel de bovenstaande situatie was een probleem maar het telkens hernieuwen van de token voor iedere request zorgde voor een grote last op de server. 

## Implementatie

Als eerste heb ik de vervaltijd van de token wat verhoogd naar een vijftien minuten, waardoor de token niet bij iedere request vernieuwd moet worden.  

Ten tweede heb ik een oplossing gevonden voor het voorgaand threading probleem, hiervoor heb ik een Http Client (HS Authenticated Client) geschreven die een abstractie vormt rond de authenticatie. 

### HS Authenticated Client

Op onderstaande figuut is een diagram te zien die de werking van deze Http Client voorstelt. Opgesplitst in twee fases. 

<Image
    light="/img/Schemas/AuthClientExplained.png"
    dark="/img/Schemas/AuthClientExplainedDark.png"
/>

#### Fase 1 JWT-Token vervalt

De client maakt gebruik van de webbrowser localstorage voor het opslaan van de JWT-token en de refresh token. Als eerst zullen beide clients voor het sturen van een request naar de server, de JWT-token ophalen uit local storage (1). Deze token zal dan automatisch in de header van de request geplaats worden. Wanneer de token verlopen is zal de server een response geven met als status code 401 Unauthorized (2). Dit zorgt ervoor dat de clients naar Fase 2 zullen gaan. 

#### Fase 2 Hernieuwing van JWT-Token

Wanneer de clients zich in fase 2 bevinden zullen ze een request sturen om een sub-proces te starten die deze token zal hernieuwen. Enerzijds wanneer het proces nog niet gestart is zal dit proces gestart worden (1), en zal de client wachten tot het proces ten einde is. Anderzijds wanneer dit proces al gestart is (2), zal de client gewoon wachten tot het proces klaar is. 

In dit proces (3) wordt er een refresh request naar de server gestuurd, die dan een nieuwe token genereerd en terugstuurt. Dit proces zal bij mislukking nog twee keer opnieuw proberen voor het geval dat er een netwerkprobleem was. Als laatste zal dit proces de nieuwe token naar local storage schrijven (4) en de clients verwittigen dat ze mogen verder gaan. 
