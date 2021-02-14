## Tworzenie grupy zasobów
```
az group create --name myCloudGroup --location "West Europe"
```
## Tworzenie bazy danych w usłudze CosmosDB
```
az cosmosdb create --name cloud-db --resource-group myCloudGroup --kind MongoDB
```

## Pobieranie Klucza Bazy danych do połączenia
```
az cosmosdb list-keys --name cloud-db --resource-group myCloudGroup
```

## Konfigurowanie użytkownika wdrożenia
```
az webapp deployment user set --user-name szymonjez --password wsb@CLOUD123!
```

## Tworzenie planu usługi aplikacji
```
az appservice plan create --name wsbCloudServicePlan --resource-group myCloudGroup --sku F1 --is-linux
```

## Dodawanie tożsamości przypisanej do systemu
* W Panelu Azure tworzymy nowa usługę appService o nazwie TestCLOUD
* W konfiguracji usługi wybieramy zakładke Tożsamości > Systemowe
* Przełączamy na Włączone i zapisujemy

## Tworzenie aplikacji sieci Web
* Utwórz aplikację sieci web ze środowiska uruchomieniowego NodeJS 14.15 i wdrożony z lokalnego repozytorium git.
```
az webapp create --resource-group myCloudGroup --plan myCloudServicePlan --name cloudnodeapp --runtime "NODE|14-lts" --deployment-local-git
```


## Wypychanie na platformę Azure z git
```
git remote add azure https://cloudnodeapp.scm.azurewebsites.net:443/cloudnodeapp.git
```
```
git push azure master
```

## Ustawienie zmiennej konfiguracyjnej
```
az webapp config appsettings set --name cloudnodeapp --resource-group myWsbGroup --settings PORT=3000
```
