## SP500 LISTELERININ DEGISIMINE GORE YENI RATIOLARI CEKMEK
SUANDA ScrappingHelper.scrapeInvestingForRatios() methodunda, asagidaki gibi bir kod blogu var:
```
 const ticker = await TickerService.findOne({symbol:data.stockSymbol});
    if (ticker) {
      if (investingModel) {
        await InvestingScrapingModel.findOneAndUpdate(
          { ratioLink },
          { ticker: ticker._id }
        );
      }
    }
```
Bu kod blogu bir ticker'a bakiyor, eger ticker varsa ve investingModel varsa, investingModelin ticker degerini guncelliyor.
### Sorun: 
- SP500 listesi degisebilir, bu nedenle hem ticker collectiondaki degerler hem de  investingModel collectionundaki url'ler de degisecektir.
- SP500 listesi degisirse hem urlleri degistirmek hem de tickerlari degistirmek gerekecek, 
- Dolayisiyla, bu koddaki investingModel var mi kontrolu if(investingModel) ya da if(ticker) kontrolleri mantikli kontroller degil
cunku urller bir kere cekildi mi hep db de kalacaklar dolayisiyla hep true donecek. 
- buraya SP500 listeleri yenilendi mi diye bir parametre koymak gerek, eger yenilendiyse hem url'yi hem de tickeri update etmek gerek.
- bunu da ScrappingHelper.scrapeInvestingForRatioUrls() endpointinde yapmak gerek.

## IDEAS:
- A USER SHOULD BE ABLE TO CHOOSE SORTING OPTIONS. FOR INSTANCE, A USER MIGHT WANT TO SORT STOCKS BASE OF OVERALL EVALUATION OF FOUR DIFFERENT STOCK CHOOSING STRATEGIES.
-- USER CHOOSES GRAHAM NUMBER, EBITDA ..2 MORE AND WE ONLY RETURN THE OVERALL EVALUATION OF FOUR DIFFERENT STOCK CHOOSING STRATEGIES.
