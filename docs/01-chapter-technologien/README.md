---
lang: nl-BE
title: Technologien
---

# Technoloieën

[[toc]]

## Blazor

Blazor is een open source Single Page Application development framework, ontwikkeld door Microsoft. Blazor applicaties bestaan net zoals andere webapplicaties uit HTML, CSS en JS/WASM. In Blazor wordt er gebruik gemaakt van een `.razor`-bestand, waar een combinatie van HTML, C#-code en optionele CSS-stijlen in zitten. 

Deze `.razor`-bestand fungeert al de bouwstenen van een Blazor-applicatie, waarin de structuur van de pagina wordt gedefinieerd met behulp van HTML-tags, de logica wordt geïmplementeerd met C#-code. Stijlen kunnen rechtstreeks als een HTML style tag in het bestand geplaats worden, maar als er gebruik wil gemaakt worden van CSS isolation, wordt deze in een `.razor.css`-bestand geplaats. 

### Structuur `.razor`-bestand

```razor
<div> 
  <h1>Counter</h1> 
  <p>Current count: @Count</p> 
  
  <button class="btn btn-primary"  
    @onclick="IncrementCount">Click me
  </button> 
</div> 

@code { 
  [Parameter] 
  public int Count { get; set; } = 0; 

  private void IncrementCount() { 
    Count++; 
  } 
} 
```
##### Resultaat
<Counter/>

Bovenstaande code is een voorbeeld van `.razor`-bestand, dat een knop voorstelt dat wanner je er op klikt een tekst erboven gaat omhoog tellen.  

Het bovenste deel is de vormgeving van de component schreven in HTML. Om variabelen weer te geven in HTML wordt het @-symbool gebruik. Om een event te capteren wordt er gebruik gemaakt van vooraf gedefinieerde keywords volgens de structuur `@onEVENT`, aan deze event kunnen dan methoden gekoppeld worden.   

Het onderste deel tussen de `@code`, is waar alle logica van de component zich bevindt. Hier kunnen methoden en variabelen gedefinieerd worden. In dit voorbeeld heeft de `Count`-parameter een `Parameter`-attribuut. Dit is een van de attributen die beschikbaar zijn in Blazor. Het `Parameter`-attribuut stelt deze parameter vrij wanneer deze component gebruikt zou worden. 

```razor
<Counter Count="@MyCount" />

@code {
  private int MyCount { get; set; } = 0;
}
```

### Render modes

Blazor kan gebruikt worden in twee verschillende render-modes met elk zijn voor- en nadelen. 

#### Blazor WASM

Bij Blazor WebAssembly (WASM) wordt er gebruik gemaakt van WebAssambly technologie, hierbij worden alle `.razor`-bestanden voor het opzetten van de server gecompileerd naar WASM. Net zoals andere webframeworks wordt er bij een connectie alle benodigde bestanden verzonden naar de client. 

<Image
  light="/img/blazor-webassembly.png"
  dark="/img/blazor-webassembly-dark.png"
/>

De initiële pagina-rendering wordt door de client gedaan, omdat alles lokaal bij de client staat heeft deze directe toegang tot de DOM zie figuur hierboven. In deze modus is de client dus verantwoordelijk voor alle events en reactiviteit van de webpagina.

#### Blazor Server

Bij Blazor Server worden de pagina’s en componenten pas weergegeven wanneer een client een verbinding maakt en om deze pagina vraagt. De communicatie tussen server en client verloopt via SignalR (5.1). Deze connectie vormt de interactie tussen server en de client-DOM zie figuur hieronder.

<Image
  light="/img/blazor-server.png"
  dark="/img/blazor-server-dark.png"
/>

De initiële pagina-rendering wordt uitgevoerd door de server die vervolgens de resulterende HTML naar de client zal sturen. Om interactiviteit te hebben is de client verantwoordelijk om alle events door te communiceren naar de server via de SignalR-verbinding. In deze render-mode is de server verantwoordelijk voor het behandelen van alle event, en zal de server de grootste load overnemen van de client. 

### Vergelijking Blazor Server - Blazor WASM

|                     |     Blazor Server                |     Blazor WASM                 |
|---------------------|----------------------------------|---------------------------------|
|     Download grote  |   Klein                          |   Groot1                        |
|     Schaalbaarheid  |   Uitdagend                      |   Makkelijk                     |
|     Serverless      |   Niet mogelijk                  |   Mogelijk                      |
|     Offlinemode     |   Niet mogelijk                  |   Mogelijk                      |
|     Snelheid        |   Server en netwerk afhankelijk  |   Client ressource afhankelijk  |

In bovestaande table is er een vergelijking gemaakt tussen Blazor Server en Blazor WASM, met de grootste verschillen.

Blazor Server heeft vooral als voordeel dat de eindgebruiker minder resources nodig heeft om de webpagina te gebruiken. Blazor Server is dan wel moeilijker om te schalen, omdat de server ook gelimiteerde resources heeft en alle load overneemt van de clients, is er een limitatie tot de hoeveelheid connectie mogelijk zijn. De webpagina is ook afhankelijk van een internetverbinding, wanneer deze wegvalt zal de pagina niet meer reageren. 

Blazor WASM laat daarentegen alles door de eindgebruiker doen. De initiële load van de pagina is hoger dan Blazor Server, omdat alle dependencies en .NET Runtime wordt verzonden naar de client. De schaalbaarheid ligt hier wel beter omdat er enkel maar bestanden moeten verzonden worden naar de client, wat ook de mogelijkheid heeft voor een serverless deployment.

## ASP.NET Core Web API

ASP.NET Core is een open-source framework dat is ontworpen door Microsoft voor het bouwen van moderne, cloud-gebaseerde en internet verbonden applicaties. Het biedt ontwikkelaars de mogelijkheid om schaalbare applicaties te ontwikkelen die cross-platform beschikbaar zijn. ASP.NET Core biedt de mogelijkheid om makkelijk web APIs te ontwikkelen.  

### Opzetten van endpoints

Bij het opzetten van een webendpoint in ASP.NET Core wordt er gebruik gemaakt van een Web Controller die de basisfunctionaliteit voor de endpoints biedt. Een Web Controller is een klasse die verantwoordelijk is voor het routeren en afhandelen van HTTP-verzoeken, en het terugsturen van HTTP-responses. 

Elke controller bevat eenzelfde structuur, om een nieuwe web controller aan te maken, wordt er een nieuwe klasse aangemaakt die afgeleid is van de ControllerBase klasse. Deze klasse bevat alle nodige methoden die worden aangeroepen wanneer er een HTTP-request binnen komt. 

```csharp
[ApiController]
[Route("controller")]
public class SampleController : ControllerBase
{

  [HttpGet("{id}")]
  public IActionResult Get(int id)
  {
    // Hier logica om gegevens op te halen

    return Ok(result);
  }

}
```

n de bovenstaande code is een controller genaamd `SampleController` gedefinieerd met enkele attributen. Het `ApiController`-attribuut geeft aan dat deze klasse als een Web API-controller fungeert. Daarnaast is er ook een route gedefinieerd met het `Route`-attribuut, waarmee wordt bepaald wat de hoofdroute van deze controller zal zijn. In dit voorbeeld zal dit de `http://your-domain.be/sample`-route zijn.  

Binnen deze klasse wordt er een `Get`-methode gedefinieerd, met behulp van het `HttpGet`-attribuut wordt deze methode toegewezen aan een HTTP GET-verzoek met een optionele id parameter. Deze methode is dan beschikbaar via de `http://your-domail.be/sample/1`-route. 

De ControllerBase klasse beschikt over veel meer functionaliteit dan in het bovenstaande voorbeeld. Zoals methoden voor elke response status.  

Door het gebruik te maken van deze controller zijn we in staat om makkelijk endpoint te ontwikkelen die betrouwbaar en schaalbaar zijn. 

## .NET Entity Framework

Het Dotnet Entity Framework is een open source ORM (Object-Relational Mapper) dat de interactie tussen de applicatie en de database beheert en vereenvoudigd, waardoor het gemakkelijk wordt om gegeven op te slaan en op te halen van vanuit de database. 

### Werking

Dotnet EF kan gebruikt worden volgens een code-first databaseontwerp, waarbij alle data eerst wordt voorgesteld als een model (C# klasse). Na het ontwerpen van een model, zal EF de SQL-query’s produceren en deze naar de database schrijven. 

```csharp
public class User 
{

  [Key]
  public string Id { get; set; } = string.Empty;

  public string Name { get; set; } = string.Empty;

  public string? PetId { get; set; }

  [ForeignKey("PetId")]
  public virtual Pet? Pet { get; set; }

}
```

In bovenstaande code is een Entity genaamd `User` gedefinieerd. Deze klasse zal door Entity Framework gebruikt worden om een database tabel aan te maken genaamd “User”. De `User`-klasse bevat de volgende eigenschappen: 

- Id: Dit is de unieke sleutel die zal gebruikt worden in de database, deze worden gemarkeerd met het `Key`-attribuut 
- `Naam`: Dit is de naam van de gebruiker 
- PetId: Dit is een optionele eigenschap wanneer een gebruiker gelinkt is aan een Huisdier zal de Id ingevuld worden 
- Pet: Deze eigenschap zal gebruikt worden wanneer er in code dit opgevraagd wordt, dit zal niet opgeslagen worden als een kolom in de database. Het `ForeignKey`-attribuut legt de link tussen de User en een Pet. 

Door gebruik te maken van Dotnet Entity Framework, kan er makkelijk relaties gelegd worden tussen verschillende entities. Hierdoor wordt er tijd uitgespaard en mogelijkse vulnerabilities door het zelf schrijven van SQL-query’s vermeden. 
