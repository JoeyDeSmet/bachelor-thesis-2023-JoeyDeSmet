---
lang: nl-BE
title: Ontwikkeling statistieken
---

# Ontwikkeling statistieken pagina

[[toc]]

Om een indicatie te kunnen krijgen van de kwaliteit van het schoonmaakpersoneel, werd er gevraagd om statistieken samen te stellen zoals weergegeven in onderstaande tabel. De statistieken zouden enkel moeten berekend worden voor de eindschoonmaak taken. 

Holiday Suites heeft verschillende soorten appartementen, die groter of kleiner kunnen zijn. Om een correcte indicatie te kunnen hebben zouden de statistieken gesplitst moeten worden onder deze verschillende types. 


|             |     General  |           |           |          |     Type 20+B0R1DB  |         |       |          |         |
|-------------|--------------|-----------|-----------|----------|---------------------|---------|-------|----------|---------|
|     User    |   Done       |   Failed  |   % Fail  |   Score  |   # Done            |   Time  |       |   Score  |         |
|     Bas     |   15         |   1       |   7%      |   4      |   10                |   45    |   4   |   9.10   |   0.5   |
|     Jan     |   3          |   0       |   0%      |   2      |   1                 |   41    |   0   |   8.40   |   -0.2  |
|     Els     |   52         |   2       |   4%      |   2      |   11                |   39    |   -2  |   8.40   |   -0.2  |
|     Totaal  |   70         |   3       |   4%      |   2.6    |   22                |   41    |       |   8.60   |         |

De score in de tabel stelt de externe schoonmaak score voor, dit is de score die de klant na zijn verblijf kan geven. Naast de tijd en de score moet er ook nog een vergelijk gemaakt worden tussen de gemiddelde score van het type en de persoons specifieke gemiddelde. 

## Implementatie

Tijdens het gebruik van de HS Todo App worden er gegevens opgeslagen in verband met de taken, volgende is een opsomming van de taak gerelateerde data dat voor iedere taak wordt bijgehouden. 

- Start en Stop datum en tijd 
- Persoon die de taak heeft gedaan 
- Indicatie of er een probleem aan deze taak verbonden is 
- Indicatie of de taak opnieuw geopend is 
- Externe schoonmaakscore 

Omdat de externe score van een klant komt kan het soms zijn dat deze niet echt correct is. Daarom is er nog een indicatie toegevoegd die zegt of een taak zal meetellen bij de statistieken of niet. De externe score wordt ook niet via de Todo App gegeven maar komt uit het boeking programma Booking Experts. Voor deze review data op te halen werd er een synchronisatie taak aangemaakt, die periodiek de reviews zal ophalen. 

### Backend

Om de statistieken te bereken is er in de backend een StatisticsService aangemaakt. Deze service is verantwoordelijk voor het genereren van de statistieken. Voor het genereren van de statistieken zal deze service ten eerste alle voltooide schoonmaakstaken ophalen en vervolgens de gemiddelden berekenen. Ten tweede zal hij deze taken groeperen op persoon, en daarvan de gemiddelden berekenen. 

Om de data beschikbaar te stellen werd er nog een endpoint geschreven, waarbij je de verschillende statistieken kan opvragen. 

### Frontend

<Image
    light="/img/Light/Statistics.png"
    dark="/img/Dark/StatisticsDark.png"
/>

Op bevonstaande figuur is de huidige frontend view te zien. Op deze pagina is er de mogelijkheid om verschillende statistieken in te kijken op basis van een geselecteerde tijdperiode. Ook is de mogelijkheid om verschillende filters toe te passen.  

Zodra een van deze filters wordt aangepast zal de data opnieuw opgevraagd worden aan de API. Deze nieuwe data zal dan opnieuw weergegeven worden op deze pagina. 

Om wat meer informatie te kunnen krijgen is er ook de mogelijkheid om naar de gerelateerde taken te kunnen gaan. Om dit te kunnen zijn de getallen klikbaar gemaakt, wanneer er dan op een getal geklikt wordt zal de applicatie naar de manage todo pagina gaan en de juiste taken ophalen.
