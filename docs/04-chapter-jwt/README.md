---
lang: nl-BE
title: Herwerking frontend API-calls met JWT
---

# Herwerking frontend API-calls met JWT

Na het ontwikkelen van het crash report systeem, kwamen er regelmatig report binnen in verband met de authenticatie. Deze crash zorgde ervoor dat de gebruikers telkens opnieuw moesten inloggen, dit zorgde dus voor een slechtere gebruikservaring. Hierdoor is er besloten om een herwerking uit te voeren van het authenticatiesysteem.

## Probleem

Het eerste probleem was dat de vervaltijd van de JWT token zeel laag stond, daarom was er voorheen ook besloten om voor iedere request een nieuwe token aan te vragen. Dit is als eerste niet nodig en zorgt ook voor veel requests naar de API. Het aanvragen van een nieuwe token op zich zelf zorgde soms voor problemen, omdat Blazor Multi threaded is kon een race condition voorkomen. Onderstaande situatie stel deze race condition voor.

<Box>

Wanneer twee threads (**T1**, **T1**) op hetzelfde moment een request willen uitsturen kan het volgende voorkomen:

**T1** vraagt als eerst een nieuwe token aan en schrijft deze naar localstorage. Daarna vraagt **T2** een nieuwe token aan voor **T1** zijn effectieve request heeft gestuurd. 

Wanneer **T1** nu de token leest uit localstorage voor **T2** zijn nieuwe token kan schrijven naar localstorage, stuurt **T1** zijn request met een ongeldige token door. Dit zorgt er nu voor dat **T1** een unauthorized response krijgt waardoor de gebruiker wordt uitgelogd.
</Box>

## JWT

JWT is een veilige methode om informatie te verzenden tussen client en server. JWT-tokens bestaan uit drie verschillende delen, een JWT token heeft dan volgende structuur: `xxxx.yyyy.zzzzz`.

### Header

De header bestaat meestal uit twee delen, het type token en het hash-algoritme dat gebruikt moet worden.

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

### Payload

De payload bevat informatie over de gebruiker, deze worden gedefinieerd volgens claims. Claim zij opgesplitst in drie soorten:

**Registered claims**: Dit zijn de officieel geregistreerde claims dit bevat nuttige informatie zoals: de issuer, audience, subject, vervaldatum, ..., etc.

**Public claims**: Dit zijn de claims die publiek geregistreerd staan. Voorbeelden hiervan kunnen gevonden worden in de [IANA JSON Web Tokens Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims).

**Private claims**: Dit zijn de claims die je zelf mag definiëren dit dan wel zonder de garantie dat derden deze zal ondersteunen.

```json
{
    "name": "jhon doe",
    "role": "admin"
}
```

### Signature

De signature is een validatie dat kan verifiëren of het bericht onderweg niet veranderd is. Deze signature wordt opgebouwd door de header (Base64), de payload(Base63) en een secret samen te hashen volgens het hash-algoritme opgegeven in de header. Deze signature kan ook gebruik maken van een public/private key, waardoor de zender ook gecontroleerd kan worden.

### Werking

De onderstaande figuur is een visuele voorstelling te zien van het authenticatie proces met JWT. Wanneer een client client wil inloggen, stuurt hij eerst zijn inloggegevens naar de server. Bij ontvangst controleert de server de geldigheid van deze gegeven, wanneer dit het geval is zal hij de autorisatie claims ophalen en een JWT-token genereren met deze claims.

Wanneer de client dan nu een request wil sturen moet hij deze token in de BearerToken header plaatsen, en bij iedere request meegeven. De server zal dan deze token valideren en enkel maar antwoorden wanneer de token geldig is. 

<Image
    light="/img/Schemas/JWT.png"
    dark="/img/Schemas/JWTDark.png"
/>

Wanneer de token niet meer geldig is zal de server een 401-response sturen, de client zal dit moeten behandelen door een nieuwe token aan te vragen. Om een nieuwe token aan te vragen moet de client zijn JWT-token en refresh-token verzenden naar de server. Vervolgens zal de server een controle uitvoeren dat bij succes een nieuwe tokens genereert en deze aan de client geeft.

## Implementatie

Om de token minder frequent te moeten vernieuwen, heb ik als eerst de vervaltijd van deze token verhoogd. 

Daarna moest de race condition opgelost worden dat hierboven vermeld is. Hiervoor heb ik een custom Http Client (HS Authenticated Client) geschreven die verantwoordelijk is voor het hernieuwen van de token.

### HS Authenticated Client

Op onderstaande figuur is een visuele voorstelling te zien dat de werking van de HS Authenticated Client voorstelt. De voorstelling is opgesplitst in twee fases.

<Image
    light="/img/Schemas/AuthClientExplained.png"
    dark="/img/Schemas/AuthClientExplainedDark.png"
/>

#### Fase 1 Normale werking / verlopen token

Voor iedere request haalt iedere client de JWT token op uit localstorage (1), de client zal deze automatisch in de header van de request plaatsen. Daarna stuurt de client zijn request uit naar de Server (2). Wanneer de client een 401 Unauthorized response ontvangt zal de client over gaan naar Fase 2. 

#### Fase 2 Hernieuwing van JWT-Token

Wanneer een client zich in Fase 2 bevind, zal de client een process aanmaken (1) die verantwoordelijk is voor de hernieuwing van de JWT-token. Wanneer dit process al gestart is wordt deze client thread geblokkeerd tot deze klaar is.

Dit process zal de verlopen token en refresh token ophalen uit localstorage en een refresh aanvragen bij de server (3). Bij een succesvolle hernieuwing zal dit process de nieuwe token en refresh token terug schrijven naar localstorage (4). Daarna signaleert hij alle wachtende client die terug kunnen gaan naar fase 1. 

Wanneer er bij de hernieuwing dan toch weer een bad response binnen komt, zal dit process dit nog 3 keer proberen voor het geval dat er een netwerk probleem zou geweest zijn.
