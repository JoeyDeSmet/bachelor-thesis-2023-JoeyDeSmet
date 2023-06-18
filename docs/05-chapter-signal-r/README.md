---
lang: nl-BE
title: Live reactiviteit met SignalR
---

# Live reactiviteit met SignalR

## Situering
<br>

Tot nu hadden alle pagina's enkel maar een statische inhoud. Dit had als gevolg dat er een manuele actie moest uitgevoerd worden om de inhoud van de pagina's te hernieuwen. Wanneer er dus een lastminute taak binnen kwam, kon de poetser dit niet direct zien. Om reactiviteit te brengen aan iedere pagina kan er gebruik gemaakt worden van SignalR, wat intern al door Blazor gebruikt wordt om de DOM te updaten wanneer er een nieuwe pagina word aangevraagd. 

<Image
    light="/img/Light/CarryOutTasks.png"
    light_mobile="/img/Light/CarryOutTasksMobile.png"
    dark="/img/Dark/CarryOutTasksDark.png"
    dark_mobile="/img/Dark/CarryOutTasksMobileDark.png"
/>

## SignalR
<br>

SignalR is een open-source library die ontwikkelaars in staat stelt om op een eenvoudige manier real-time functionaliteit toe te voegen aan een webapplicatie. SignalR maakt intern gebruik van WebSockets, Server-Sent Events of Long Polling, afhankelijk van wat het beste werk op de server en client. 

### Hubs

SignalR maakt gebruik van Hubs als abstractie laag tussen de client en de server. Een Hub biedt een gestroomlijnde manier om client side functies aan te roepen vanuit de server en vice versa.

#### Groepen

SignalR heeft de mogelijkheid om verschillende connecties samen te brengen, door gebruik te maken van Hub Groups. Een Hub Group is een collectie van signalen gebonden aan een naam. Door gebruik te maken van Hubs Groups kan nu voor iedere connectie in eenzelfde Hub Group eenzelfde functie aangeroepen worden.

## Implementatie
<br>

Om reactiviteit te brengen aan de Todo App zijn verschillende Hub Groups aangemaakt voor iedere residentie. Voor iedere residentie is dan een groep gemaakt dat de taak gerelateerde updates zal doorsturen, en een waar alle probleem gerelateerde update wordt doorgestuurd.

<Image
    light="/img/Schemas/SignalR.png"
    dark="/img/Schemas/SignalRDark.png"
/>

Bovenstaande figuur stelt de twee fases voor hoe de reactiviteit geïmplementeerd is.

### Fase 1: Initialisatie

Wanneer een client een pagina opvraagt van de server (1) en deze is gerelateerd aan de taken, zal er tijdens de initialisatie een SignalR connectie tot stand gebracht worden met de gerelateerde Hub(2). Wanneer deze connectie succesvol tot stand is gekomen zal de client zichzelf aan de juiste groepen toevoegen. Dit gebeurt aan de hand van de residenties gerelateerd aan het account. 

### Fase 2: Update

Wanneer er een update bijvoorbeeld de planning wordt opgeslagen (1) verzonden wordt, zal de client na het verzenden van zijn request naar de server ook een update event sturen naar al zijn verbonden groepen in de Hub (2). De Hub zal dan naar alle connecties in de groep het signaal doorsturen (3). Wanneer dit signaal wordt ontvangen door één van de clients, zal hij de gerelateerde data opnieuw opvragen aan de server (4).
