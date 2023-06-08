---
lang: nl-BE
title: Technologien
---

# Technoloieën

[[toc]]

## Blazor

Blazor is een open source Single Page Application development framework, ontwikkeld door Microsoft. Blazor applicaties bestaan net zoals andere webapplicaties uit HTML, CSS en JS/WASM. In Blazor wordt er gebruik gemaakt van een `.razor`-bestand, waar een combinatie van HTML, C#-code en optionele CSS-stijlen in zitten. 

Deze `.razor`-bestand fungeert al de bouwstenen van een Blazor-applicatie, waarin de structuur van de pagina wordt gedefinieerd met behulp van HTML-tags, de logica wordt geïmplementeerd met C#-code. Stijlen kunnen rechtstreeks als een HTML style tag in het bestand geplaatst worden. De stijlen kunnen ook in een `.razor.css`-bestand geplaatst worden, wat dan de mogelijkheid brengt voor CSS isolation.

### Structuur `.razor`-bestand

```razor
// file: Counter.razor

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

Bovenstaande code is een voorbeeld van `.razor`-bestand, deze code houdt bij hoe vaak een gebruiker de knop heeft geklikt. Wanneer een gebruiker deze knop klikt, wordt er een event gegenereerd die de interne variable zal verhogen. Vervolgens wordt de wijziging aan de gebruiker getoond.

Het bovenste gedeelte van de code bevat de vormgeving van de component, geschreven in HTML. Hierin bevinden zich een paar zaken dat Blazor specifiek zijn en niet behoren tot HTML:

**@Count:**

De `@Count` zal tijdens gebruik vervangen worden door de waarde van de `Count` variable gedefinieerd in de code block. In Blazor wordt er gebruik gemaakt van het @-symbool om variabelen weer te geven aan de eindgebruiker.

**@onclick:**

De @onclick zal de klik event binden aan een methode IncrementCount, wanneer een gebruiker deze knop klikt wordt de code in deze methode uitgevoerd. In Blazor kunnen de verschillende events gebonden worden aan methoden door gebruik te maken van een structuur: `@onEVENT`, waar EVENT dan wordt vervangen door click, input, change, ... , etc.

<br>  

Het onderste gedeelte, dat zich bevindt in de `@code`-block, is de plaats waar alle logica van de component wordt geplaatst. Hier kunnen methoden en variabelen worden gedefinieerd. In dit voorbeeld heeft de variabele `Count` het `Parameter`-attribuut. Dit is een van de attributen die beschikbaar zijn in Blazor. Dit attribuut zorgt ervoor dat deze variable kan worden ingesteld wanneer deze component wordt gebruikt (zie code hieronder). 

```razor
<Counter Count="5" />
```

In deze code wordt de Counter component gebruikt, maar zal de initiële waarde van de Count variable op 5 gezet worden in plaats van 0.

##### Resultaat
<Counter/>

### Render modes

Blazor kan gebruikt worden in twee verschillende render-modes, Blazor WASM en Blazor Server. 

#### Blazor WASM

Blazor WASM (WebAssembly) maakt gebruik van WebAssambly technologie om de webpagina's weer te geven. Voor het opzetten compileert Blazor WASM alle `.razor`-bestanden naar een `WASM`-bestand en bundelt vervolgens alle CSS en Javascript. Net zoals andere webframeworks stuurt het bij de initiële verbinding met de client alle bestanden door (HTML, JS/WASM, CSS).

<Image
  light="/img/blazor-webassembly.png"
  dark="/img/blazor-webassembly-dark.png"
/>

Bij Blazor WASM voert de client de pagina-rendering uit, omdat alle bestanden lokaal bij de client wordt uitgevoerd heeft deze een directe toegang tot de DOM. In Blazor WASM is de client dus verantwoordelijk voor alle events en reactiviteit van de webpagina.

#### Blazor Server

Blazor Server maakt gebruik van SignalR technologie en server side rendering om de webpagina's weer te geven. Hierbij worden de `.razor`-bestanden gebruikt als templates voor de verschillende componenten van de pagina. Bij de initiële connectie met de server wordt er een beetje javascript doorgestuurd naar de client, waarmee de client dan een SignalR connectie kan maken met de server. Deze connectie vormt de interactie tussen de server en de client-DOM.

<Image
  light="/img/blazor-server.png"
  dark="/img/blazor-server-dark.png"
/>

De pagina-rendering wordt uitgevoerd door de server die vervolgens de resulterende HTML naar de client zal sturen over de SignalR connectie. Om interactiviteit te hebben is de client verantwoordelijk om alle events door te communiceren naar de server. In deze render-mode is de server verantwoordelijk voor het behandelen van alle event, en zal de server de grootste load overnemen van de client. 

### Vergelijking Blazor Server - Blazor WASM

|                     |     Blazor Server                |     Blazor WASM                 |
|---------------------|----------------------------------|---------------------------------|
|     Download grote  |   Klein                          |   Groot                         |
|     Schaalbaarheid  |   Uitdagend                      |   Makkelijk                     |
|     Serverless      |   Niet mogelijk                  |   Mogelijk                      |
|     Offlinemode     |   Niet mogelijk                  |   Mogelijk                      |
|     Snelheid        |   Server en netwerk afhankelijk  |   Client ressource afhankelijk  |

In bovenstaande tabel is er een vergelijking gemaakt tussen Blazor Server en Blazor WASM, met de grootste verschillen.

**Download grote**

In tegenstelling tot Blazor WASM is de download grote van Blazor Server veel kleiner, dit komt omdat bij Blazor WASM alle dependencies en het .NET Runtime mee gebundeld worden in de WASM-bestand. Hierdoor zal de initiële laad tijd bij Blazor Server veel lager liggen dan bij Blazor WASM. 

**Schallbaarheid en serverless**

Blazor WASM is dan wel veel schaalbaarder dan Blazor Server, dit komt omdat Blazor Server voor iedere connectie RAM-geheugen gebruikt wat een limitatie kan geven tot het aantal gebruikers. Omdat Blazor WASM enkel maar bestand hoeft door te sturen, is er de mogelijkheid om deze in een serverless omgeving te plaatsen.

**Offline mode**

Bij het verliezen van de internet connectie zal Blazor Server niet meer reageren omdat deze afhankelijk is van de SignalR connectie met de server. Blazor WASM zal blijven werken tot op het punt dat een API-call gemaakt moet worden.

**Snelheid**

De snelheid van de webapplicatie is afhankelijk van verschillende factoren, waarbij Blazor Server vooral afhankelijk is van de snelheid van de internetverbinding hoewel de kracht van de server ook een rol kan spelen. Waarbij Blazor WASM dan volledig client-ressource afhankelijk is.

<br>

## ASP.NET Core Web API

ASP.NET Core is een open-source framework dat is ontworpen door Microsoft voor het bouwen van moderne, cloud-gebaseerde en internet verbonden applicaties. Het biedt ontwikkelaars de mogelijkheid om makkelijk schaalbare internetverbonden applicaties zoals web APIs te ontwikkelen die cross-platform beschikbaar zijn.

### Opzetten van endpoints

Het opzetten van webendpoint maakt gebruik van de ControllerBase klasse, die de basisfunctionaliteit heeft voor het opzetten van een endpoint. Deze klasse is verantwoordelijk voor het routeren en afhandelen van HTTP-verzoeken en het terugsturen van HTTP-responses. Deze klasse moet overgeërfd worden om deze te gebruiken, wat dan methoden ter beschikking stelt voor het afhandelen van HTTP-verzoeken.

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

In bovenstaande code is een controller genaamd `SampleController` gedefinieerd met enkele attributen. Het `ApiController`-attribuut geeft aan dat deze klasse als een Web API-controller fungeert. Daarnaast is er ook een route gedefinieerd met het `Route`-attribuut, waarmee wordt bepaald wat de hoofdroute van deze controller zal zijn. In dit voorbeeld zal dit de `http://your-domain.be/sample`-route zijn.  

Binnen deze klasse wordt er een `Get`-methode gedefinieerd, met behulp van het `HttpGet`-attribuut wordt deze methode toegewezen aan een HTTP GET-verzoek met een optionele id parameter. Deze methode is dan beschikbaar via de `http://your-domail.be/sample/1`-route. 

De ControllerBase klasse beschikt over veel meer functionaliteit dan in het bovenstaande voorbeeld. Zoals methoden voor elke response status.  

Door het gebruik te maken van deze controller zijn we in staat om makkelijk endpoint te ontwikkelen die betrouwbaar en schaalbaar zijn. 

## .NET Entity Framework

Het .NET Entity Framework is een open source ORM (Object-Relational Mapper) dat de interactie tussen de applicatie en de database beheert en vereenvoudigd, waardoor het gemakkelijk wordt om gegeven op te slaan en op te halen vanuit de database. 

### Werking

.NET EF kan gebruikt worden volgens een code-first databaseontwerp, waarbij alle data eerst wordt voorgesteld als een model (C# klasse). Na het ontwerpen van een model, zal EF de SQL-query’s produceren en deze naar de database schrijven. 

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

- **Id**: Dit is de unieke sleutel die zal gebruikt worden in de database, deze worden gemarkeerd met het `Key`-attribuut 
- **Naam**: Dit is de naam van de gebruiker 
- **PetId**: Dit is een optionele eigenschap die wordt gebruikt wanneer een gebruiker gekoppeld is aan een huisdier. Het identificatie nummer zal hierin terecht komen.
- **Pet**: Deze eigenschap wordt gebruikt wanneer er in code een verwijzing hierna to gebracht is. Deze eigenschap zal niet opgeslagen worden in de database. Het `ForeignKey`-attribuut legt de relatie dan tussen de `User` en een `Pet` vast. 

Door gebruik te maken van .NET Entity Framework, kan het leggen van relaties tussen verschillende entities makkelijk gebeuren. Ook zal het tijd uitsparen dankzij automatische generatie van SQL-queries en mogelijke SQL-injections vermijden.
