---
lang: nl-BE
title: User logging
---

# User logging

Soms komt het wel eens voordat er een onverwachte aanpassing is gemaakt op een taak, bijvoorbeeld een deadline die is veranderd. Het zou dan handig zijn om te weten wie deze veranderd heeft en wanneer deze veranderd is. Om dit allemaal bij te houden moet er een logging systeem ontwikkeld worden die alle relevante data bijhoudt. 

## Implementatie

Om een logging systeem te hebben moet er voor iedere request dat verzonden wordt moet wat informatie worden opgeslagen. Om zo weinig mogelijk data te hoeven opslaan heb ik een nieuwe entity aangemaakt genaamd `UserLog`. 

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

Met deze informatie is er voldoende om een logging systeem te implementeren. 

### Backend

Om alle acties bij te houden die iedere user uitgevoerd heeft heb ik een logging service gemaakt. Deze service kan dan in iedere contoller waar logging nodig is deze service injecteren.  

Wanneer een client dat een request stuurt naar de API, zal deze service een UserLog object aanmaken. Deze service heeft brengt de mogelijkheid om op een generieke manier logs te maken van verschillende objecten. Door gebruik te maken van polymorfisme kan de verandering van verschillende objecten op eenzelfde manier worden gelogd. 

Daarna zal het alle essentiële data aanvullen vanuit de context waarin het zich bevindt. Als laatste zal het dit object dan naar de database schrijven en de response doorsturen naar de client. 

### Frontend

Na het implementeren van dit logsysteem, was er nog geen frontend aanwezig. Wanneer de logging nodig was werd dit via een SQL-Manager bekeken. Dus heb ik hiervoor ook nog een page aangemaakt waar deze logs te bekijken zijn.  

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

- Een datum waarmee logs van een specifieke dag kan opgehaald worden 
- Een type waarmee gefilterd kan worden op 
    - Aanmaak van taak, probleem, etc. 
    - In en uitlog van een account  
    - Aanpassingen van taak, probleem, etc. 
- Door wie het uitgevoerd is geweest 

Ook is er een manier aanwezig om op kernwoorden te gaan zoeken in de logs. Deze kernwoorden zal gaan zoeken in de verandering velden, zie kader met `CountTowardStatistics...`, en deze woorden matchen en naar de eerste match scrollen. Wanneer er dan nog eens op enter wordt geduwd zal er naar het naar de volgende match scrollen.  

<Image
    light="/img/Light/LastActions.png"
    dark="/img/Dark/LastActionsDark.png"
/>

Om de pagina ook op desktop weergave te gebruiken, heb ik de verbogen filters uitgebreid om deze altijd te tonen in plaats van achter een knop te steken.  
