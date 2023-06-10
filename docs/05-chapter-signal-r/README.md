---
lang: nl-BE
title: Live reactiviteit met SignalR
---

# Live reactiviteit met SignalR

In de vorige versie van de Todo App ontbrak er de mogelijkheid voor live updates. Als er dus bijvoorbeeld een aanpassing werd gebracht aan de planning, kon het schoonmaakpersoneel dit niet direct zien. Wel was er een knop aanwezig om manueel de data opnieuw op te halen, wat niet ideaal is. Om de applicatie reactief te maken kan er gebruik gemaakt worden van SignalR.  

<Image
    light="/img/Light/CarryOutTasks.png"
    light_mobile="/img/Light/CarryOutTasksMobile.png"
    dark="/img/Dark/CarryOutTasksDark.png"
    dark_mobile="/img/Dark/CarryOutTasksMobileDark.png"
/>

## SignalR

SignalR is een open-source library die ontwikkelaars in staat stelt om op een eenvoudige manier real-time functionaliteit toe te voegen aan een webapplicatie. SignalR maakt intern gebruik van WebSockets, Server-Sent Events of Long Polling, afhankelijk van wat het beste werk op de server en client. 

### Hubs

SignalR maakt gebruikt van Hubs als abstractie laag tussen de client en de server. Een Hub biedt een gestroomlijnde manier om client side functies aan te roepen vanuit de server en vice versa.

#### Groepen

SignalR Hubs bieden ook de mogelijkheid om groepen van connecties te maken. Een groep is dan een verzameling van verschillende client connecties, die geassocieerd zijn met een specifieke naam. Dit stelt je in staat om een signaal naar iedere connectie binnen deze groep te sturen op basis van deze naam. 

## Implementatie

Door het gebruik te maken van verschillende SignalR Hubs kon ik reactiviteit toevoegen aan de Todo App. Omdat alle residenties gebruik maken van dezelfde server, heb ik verschillende groepen gemaakt voor elke residentie. Deze groepen zijn onderverdeeld in één groep voor taak gerelateerde updates en één voor probleem gerelateerde updates. 

<Image
    light="/img/Schemas/SignalR.png"
    dark="/img/Schemas/SignalRDark.png"
/>

Op bovenstaande figuur is een visuele voorstelling te zien hoe de reactiviteit is geïmplementeerd opgesplitst in twee fases. 

### Fase 1: Initialisatie

Wanneer een client een pagina opvraagt van de server (1) en deze is gerelateerd aan de taken, zal er tijdens de initialisatie een SignalR connectie tot stand gebracht worden met de gerelateerde Hub(2). Wanneer deze connectie succesvol tot stand is gekomen zal de client zichzelf aan de juiste groepen toevoegen. Dit gebeurt aan de hand van de residenties gerelateerd aan het account. 

### Fase 2: Update

Wanneer er een update bijvoorbeeld de planning wordt opgeslagen (1) verzonden wordt, zal de client na het verzenden van zijn request naar de server ook een update event sturen naar al zijn verbonden groepen in de Hub (2). De Hub zal dan naar alle connecties in de groep het signaal doorsturen (3). Wanneer dit signaal wordt ontvangen door één van de clients, zal hij de gerelateerde data opnieuw opvragen aan de server (4).
