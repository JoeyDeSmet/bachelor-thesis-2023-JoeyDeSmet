---
lang: nl-BE
title: Frontend crash report systeem
---

# Frontend crash report systeem

De HS Todo App is sinds 15/02/2023 in productie gegaan in Westende als een test periode van een maand. Het is onvermijdelijk dat eindgebruikers altijd nieuwe manieren vinden om de applicatie te gebruiken, meestal buiten de verwachtingen van de ontwikkelaars. Dit kan soms leiden tot situaties waarin de gebruiker iets doet dat tijdens de testfase niet getest is geweest. Dit kan mogelijks zorgen voor een applicatiecrash. Om deze mogelijke problemen goed op te lossen, is het soms handig om meer informatie te hebben dan wat een eindgebruiker ons kan bieden. Daarom heb ik een systeem ontwikkeld die deze fouten zal opvangen en ons hierover verwittigen. 

## Implementatie

In de meeste gevallen werden fouten in de frontend al opgevangen en afgehandeld, waarbij er dan bij onoplosbare fouten een foutmelding aan de eindgebruiker werd getoond. Wanneer er zich een ernstig probleem voordoet, kan de connectie abrupt verbroken worden, wat leidt tot een slechte gebruikservaring. 

### Opvangen van een crash

Het Blazor framework beschikt over een globale exception handler-component, die niet behandelde fouten opvangt. Hierdoor is het mogelijk om in plaats van de verbinding abrupt te verbreken, wat meer informatie te tonen wanneer zo’n fout optreedt. 

Door het gebruik van deze component kon ik de deze fouten opvangen, en beschik ik over de nodige informatie om de oorzaak van de crash te achterhalen. Wanneer er een fout optreedt, zal de gebruiker een melding te zien krijgen (Figuur hieronder) waarin staat dat wij op de hoogte gebracht zijn, en een optie om de pagina opnieuw te laden. 

<Image
    light="/img/Light/CrashCard.png"
    dark="/img/Dark/CrashCardDark.png"
/>

#### Screenshot van huidige pagina

Om de foutmelding nog wat meer context te geven, heb ik besloten om een screenshot van de huidige applicatie toe te voegen. Omdat Blazor Server geen directe toegang heeft to de DOM, is een Javascript-library nodig.  

Na wat onderzoek en uitproberen van verschillende libraries kwam ik uit op de [modern-screenshot](https://github.com/qq15725/modern-screenshot) library. Deze library biedt de mogelijkheid aan om de DOM op te slaan in verschillende formaten, zoals PNG, SVG, Jpeg, …, etc. Hiermee kan ik een momentopname maken van de applicatie op het moment van de fout. Dit zorgt voor wat visuele informatie om het probleem beter te begrijpen en op te lossen. 

<Image
    light="/img/Schemas/CrashReportDiagram.png"
    dark="/img/Schemas/CrashReportDiagramDark.png"
/>

Op bovenstaande figuur is een visuele representatie te zien van het crash report systeem. Wanneer er een onbehandelde fout optreedt (1), wordt er een proces gestart die die de stacktrace van de applicatie ophaalt en deze formatteert naar een leesbare tekst.

Vervolgens communiceert dit proces met de Javascript Interop (2) dat vraagt om een screenshot van de huidige pagina. Vanwege een limitatie in de gegevensoverdracht van de Javascript Interop, wordt de screenshot opgesplitst in meerder delen. De Javascript Interop maakt telkens callbacks naar dit proces met een deel van de screenshot en stuurt een signaal wanneer de volledige screenshot is verzonden. 

Zodra het proces de volledige screenshot heet ontvangen, stuurt het de stacktrace samen met de screenshot door naar de server (3). Wanneer de server deze ontvangt, formatteert het deze naar een e-mailformaat en stuurt dit naar de exchange-server (4). 

Op deze manier wordt er een uitgebreid rapport gemaakt met zowel de stacktrace als een visuele representatie. Waardoor het makkelijker wordt om deze problemen op te lossen.
