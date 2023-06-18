---
lang: nl-BE
title: Ontwikkeling statistieken
---

# Ontwikkeling statistieken pagina

## Situering
<br>

Om een inzicht te krijgen omtrent de duurtijd van de schoonmaken per type appartement werd er gevraagd om statistieken samen te stellen. Hierbij moet er ook een koppeling liggen met de klantenreviews, in deze reviews kan de klant een score geven op de schoonmaak van een suite. Het doel van deze statistieken is om de ervaring van de klant te verbeteren door de schoonmaken te verbeteren. 

## Backend implementatie
<br>

Tijdens het gebruik van de HS Todo App worden er gegevens opgeslagen in verband met de taken. Iedere taak bevat data dat gebruikt kan worden om statistieken op te stellen zoals:

<br>

- Start- en stopdatum en -tijd 
- Persoon die de taak heeft gedaan 
- Indicatie of er een probleem aan deze taak verbonden is 
- Indicatie of de taak opnieuw geopend is 
- Externe schoonmaakscore 

<br>

Omdat de externe score van een klant komt kan het soms zijn dat deze niet echt correct is. Daarom is er nog een indicatie toegevoegd die zegt of een taak zal meetellen bij de statistieken of niet. De externe score wordt ook niet via de Todo App gegeven maar komt uit het reservatiesysteem Booking Experts. Voor deze review data op te halen werd er een synchronisatie taak aangemaakt, die periodiek de reviews zal ophalen. 

<br>

Om de statistieken te berekenen is er in de backend een StatisticsService aangemaakt. Deze service is verantwoordelijk voor het genereren van de statistieken. Voor het genereren van de statistieken zal deze service ten eerste alle voltooide schoonmaaktaken ophalen en vervolgens de gemiddelden berekenen. Ten tweede zal hij deze taken groeperen op persoon, en daarvan de gemiddelden berekenen. 

<br>

Om de data beschikbaar te stellen werd er nog een endpoint geschreven, waarbij je de verschillende statistieken kan opvragen. 

## Frontend implementatie
<br>

<Image
    light="/img/Light/Statistics.png"
    dark="/img/Dark/StatisticsDark.png"
/>

Op bovenstaande figuur is de huidige frontend view te zien. Op deze pagina is er de mogelijkheid om verschillende statistieken in te kijken op basis van een geselecteerde tijdperiode. Ook is de mogelijkheid om verschillende filters toe te passen.  

<br>

Zodra een van deze filters wordt aangepast zal de data opnieuw opgevraagd worden aan de API. Deze nieuwe data zal dan opnieuw weergegeven worden op deze pagina. 

<br>

Om wat meer informatie te kunnen krijgen is er ook de mogelijkheid om naar de gerelateerde taken te kunnen gaan. Om dit te kunnen zijn de getallen klikbaar gemaakt, wanneer er dan op een getal geklikt wordt zal de applicatie naar de manage todo pagina gaan en de juiste taken ophalen en deze weergeven.
