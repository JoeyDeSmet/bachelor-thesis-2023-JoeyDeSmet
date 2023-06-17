---
lang: nl-BE
title: Reflectie
---

# Reflectie

De HS Todo App is tijdens mijn stage/bachelorproef periode bij Holiday Suites in productie gebracht over de verschillende residenties. Waarbij er eerst een test fase van een maand in Westende ingebracht op 15/02/2023. Daarna werd geleidelijk aan de app gelanceerd over de andere residenties: 
- Blankenberge & De Haan: 13/03/2023 
- Zeebrugge: 15/03/2023 
- Jabbeke: 27/03/2023 
- Nieuwpoort: 23/05/2023 
    - Omwille van een externe poetsfirma werd deze wat later gelanceerd 

Omdat de HS Todo App al in productie was voor deze test periode, is er veel feedback binnengekomen. Dit bracht ons de mogelijkheid om op deze feedback in te spelen, en de applicatie nog beter te maken. Het was zeker een uitdaging om aan een applicatie te werken die al in productie is, omwille van de verantwoordelijkheid dat het brengt voor een goede workflow op de residenties. 

Voor mijn stage/bachelorproef periode bij Holiday Suites had ik nog nooit een web API in .NET met het .NET Entity Framework  geschreven. Wat mij een introductie gaf tot een Object Relational Mapper, wat het werken met een database vereenvoudigd. 

Het Blazor Framework was ook nieuw voor mij, hiermee was ik wel rap mee op weg omdat ik al met andere web frameworks had gewerkt. Het enige waar ik aan gewent moest geraken was dat dit in server side modus stond. In server side zijn er meer zaken mogelijk maar brengt moeilijkheden wanneer je met de browser wilt interageren.  

Over het algemeen heb ik veel bijgeleerd en nieuwe manieren gevonden om over verschillende problemen na te denken. Ik heb nieuwe frameworks leren gebruiken die ik op mijzelf niet zou gebruiken. 

## Valkuilen en successen

### Valkuilen

Tijdens de start van mijn stage/bachelorproef periode, waren er een paar technische moeilijkheden omwille dat ik Linux gebruik. In het begin heb ik een aantal zaken moeten aanpassen omwille van dit. 

Soms zag ik ook zaken veel makkelijker dan dat ze in de werkelijkheid waren, zoals bijvoorbeeld de herwerking van de JWT-authenticatie en autorisatie, waarbij ik nog op het einde van mijn periode nog aanpassingen heb moeten brengen voor subtiele bijwerkingen. 

### Successen

Volgende punten zie ik voor mijzelf als successen die ik in mijn stage/bachelorproef periode heb behaald: 

- De uitwerking van de verschillende systemen zoals de HS Authenticated Client en Frontend crash report systeem. 
- Het uitwerken van herbruikbare webcomponenten die op meerder plaatsen kan hergebruikt kan worden op een generieke wijze. 
- Algemene optimalisaties zoals: 
    - Virtualisatie van het scrollen door een tabel op de webpagina zodat niet alles moet weergegeven worden maar dynamisch ingeladen wordt. 
    - Caching van taken wanneer deze worden opgevraagd zodat de volgende keer deze sneller ter beschikking zijn 
    - Compressie van foto’s om zowel plaats in de database te besparen als de laadtijd op de webpagina te verkleinen 


