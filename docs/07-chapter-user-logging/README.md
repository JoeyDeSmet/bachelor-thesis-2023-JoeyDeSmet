---
lang: nl-BE
title: User logging
---

# User logging

Soms komt het wel eens voordat er een onverwachte aanpassing is gemaakt op een taak, bijvoorbeeld een deadline van een taak dat veranderd is. Het zou dan handig zijn om te weten wie deze veranderd heeft gemaakt en wanneer deze veranderd is. Om dit allemaal bij te houden moet er een logging systeem ontwikkeld worden die alle relevante data bijhoudt. 

## Implementatie
<br>

Om een goeie logging systeem te hebben moet er bij iedere request relevante data opgeslagen worden. Om deze log op te slaan heb ik als eerst een nieuwe entity aangemaakt genaamd `UserLog`.

<br>

Deze entity bevat de volgende informatie: 

- Een identificatienummer 
- Administratienummer 
- Tijd wanneer de log is aangemaakt 
- Endpoint URL  
- Parameters  
- Gebruikers informatie (Id, Name, Email) 
- Een extra beschrijving 
- ContextId: een optionele Id naar een andere entity 
- CRUD 
- Gebruiker actie: geeft context of het om een taak, probleem, …, etc. gaat 
- Type: geeft informatie over welk type verandering het gaat 
- Changes: JSON-data die de verandering voorstelt 

<br>

Met deze informatie is er voldoende om een logging systeem te implementeren. 

### Backend

Om alle acties bij te houden die iedere user uitgevoerd heeft heb ik een logging service gemaakt. Deze service kan dan in iedere contoller waar logging nodig is deze service injecteren en gebruiken.  

<br>

Wanneer een client dan een request stuurt naar de API, zal deze service een UserLog object aanmaken. Deze service heeft de mogelijkheid om op een generieke manier logs te maken van verschillende objecten. Door gebruik te maken van polymorfisme kan de verandering van verschillende objecten op eenzelfde manier worden gelogd. Deze abstracte objecten moeten een methode bevatten om de veranderingen voor te stellen as een JSON-string. 

<br>

Als laatste zal de service alle essentiële data aanvullen vanuit de context waarin het zich bevindt en alle data schrijven naar de database.

### Frontend

Het implementeren van de backend was in een vroegere periode al gebeurd. Om deze logs dus te bekijken werd er telkens gebruik gemaakt van een SQL-manager waarbij SQL-queries gebruikt werden om deze log te raadplegen. Dit zorgde er ook voor dat deze logs enkel ter beschikking waren voor admins. Daarom is er besloten om een frontend aan te maken die deze logs kan weergeven.  

<br>

Voor deze pagina heb ik besloten om eens een mobile first design te hanteren. Dit wil zeggen dat ik de pagina in eerste instantie voor kleine schermen heb ontworpen, en deze daarna wat aangepast voor grotere schermen. 

<GridContainer cols="2">
<Image
    light="/img/Light/LastActionsMobile.png"
    dark="/img/Dark/LastActionsMobileDark.png"
/>

<Image
    light="/img/Light/LastActionsMobileCollapsed.png"
    dark="/img/Dark/LastActionMobileCollapsedDark.png"
/>
</GridContainer>

Bovenstaande figuren zijn de huidige mobile weergave van deze pagina. Deze pagina beschikt over enkele filters: 

<br>

- Een datum waarmee logs van een specifieke dag kan opgehaald worden 
- Een type waarmee gefilterd kan worden op 
    - Aanmaak van taak, probleem, etc. 
    - In en uitlog van een account  
    - Aanpassingen van taak, probleem, etc. 
- Door wie het uitgevoerd is geweest 

<br>

Ook is er een manier aanwezig om op kernwoorden te gaan zoeken. Wanneer er dan gezocht wordt slaat dit op de verandering velden (zie kader met `Description: from...` op bovenstaande figuur). Een process zal itereren over ieder kader en zoeken naar een match. Wanneer een match gevonden is zal de pagina naar deze log scrollen. Om meerdere matches te bekijken kan er nogmaals op enter geklikt worden om naar de volgende match te gaan.

<Image
    light="/img/Light/LastActions.png"
    dark="/img/Dark/LastActionsDark.png"
/>

Om de pagina ook op desktop weergave te gebruiken, heb ik de verbogen filters uitgebreid om deze altijd te tonen in plaats van achter een knop te steken.  
