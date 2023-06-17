---
lang: nl-BE
title: Ontwikkeling terugkerende taken
---

# Ontwikkeling terugkerende taken

## Situering
<br>

Op iedere residentie zijn er taken die periodiek ingepland moeten worden, zoals bijvoorbeeld dagelijkse schoonmaak van de lift. In de vorige versie van de Todo App was er enkel een pagina om taken manueel aan te maken, door het invullen van een formulier (zie onderstaande figuur). Dit heeft als gevolg dat een personeelslid iedere dag deze taak manueel moet aanmaken. 

<Image
    light="/img/Light/CreateTodo.png"
    light_mobile="/img/Light/CreateTodoMobile.png"
    dark="/img/Dark/CreateTodoDark.png"
    dark_mobile="/img/Dark/CreateTodoMobileDark.png"
/>

Om het manueel inplannen van deze terugkerende taken weg te nemen, is er besloten om een systeem te ontwikkelen die deze automatisch zal inplannen.

## Implementatie
<br>

### Backend implementatie

Om taken automatisch periodiek in te plannen, moet er een mogelijkheid zijn om telkens een gegeven periode een taak uit te voeren. Op de huidige backend server applicatie worden er al verschillende synchronisatie periodiek uitvoert. Deze synchronisaties maken gebruik van de [Hangfire]() library. Deze library brengt ontwikkelaars de mogelijkheid om makkelijk achtergrond taken in te plannen en uit te voeren. 

<br>

Voor het opslaan van de bundels werd een nieuwe Entity aangemaakt (TodoBundle). De TodoBundle bevat de nodige velden om een nieuwe taak aan te maken, alsook de nodige informatie om deze automatisch in te plannen. Deze informatie is al volgt: 

<br>

- Identificatienummer dat aantoont tot welke bundel de TodoBundle behoort 
- Vereenvoudigde bundel naam die de eindgebruiker zal gebruiken 
- Vervaldatum een datum wanneer de backend deze bundel mag verwijderen 
- Periode van terugkeer (CRON-string) 

<Image
    light="/img/Schemas/RecurringTodo.png"
    dark="/img/Schemas/RecurringTodoDark.png"
/>

Op bovenste figuur is een visuele voorstelling te zien van het ontwerp van de backend. Wanneer er een nieuwe bundel binnen komt via een request dan zal de API eerst deze bundel opslaan in de database. Daarna zal hij een achtergrond taak registreren als deze nog niet bestaat voor de huidige bundel. Hangfire zal dan op het gevraagde moment een taak laten uitvoeren. Deze taak zal de bundels uit de database halen, en met deze informatie dan nieuwe taken aanmaken en deze opslaan in de database. 

### Frontend implementatie

De frontend moet een gebruiksvriendelijke manier brengen aan de eindgebruiker om verschillende bundels aan te maken. Hiervoor heb ik verder gewerkt op het eerste formulier zie figuur uit [situering](#situering). De volgende zaken heb ik aan het formulier toegevoegd: 

<br>

- Bundel naam & nieuwe bundel naam 
- Vervaldatum voor de bundel 
- Manier om een terugkeer periode te beschrijven 

<br>

Voor de bundel naam of nieuwe bundel, zijn er twee velden toegevoegd. Een is een selectie waar je een van de huidige bestaande bundels kan selecteren, met daarnaast een knop om een nieuw bundel aan te maken. 

<br>

Omdat de backend gebruik maakt van CRON om de periode te weten voor het inplannen van de taken, is dit een uitdaging om dit te vragen aan de eindgebruiker. Hiervoor heb ik gekozen om een component te maken die een abstractie hierrond vormt.  

<br>

De component bestaat uit vier selecties waar de gebruiker uit kan kiezen. Het eerste veld is een indicatie wanneer het ingepland wordt dit bevat de velden: dagelijks, wekelijks, maandelijks en jaarlijks. De volgende velden worden dan gebruikt om wat specifieker te gaan welke dag, welke dag van de maand en welke maand van het jaar. Wanneer er dan een bundel naar de backend verzonden wordt, zal deze component de user input omvormen naar een CRON-string. 

<br>

Op onderstaande figuur is de huidige weergave van de recurring todo page, waar de boven vermelde velden te zien zijn. 

<Image
    light="/img/Light/CreateRecurringTodo.png"
    light_mobile="/img/Light/CreateRecurringTodoMobile.png"
    dark="/img/Dark/CreateRecurringTodoDark.png"
    dark_mobile="/img/Dark/CreateRecurringTodoMobileDark.png"
/>

