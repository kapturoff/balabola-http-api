# balabola-http-api
Unofficial API for Yandex Balabola built on Express, Puppeteer and Typescript

## Why does this project even exist?
  Yandex Balabola is a quite interesting project of Yandex, but it refuses to answer if you call its API via any requests libraries, curl, etc... The only way to use 
Yandex Balabola as a service, as I found, is using a browser and pretending like you are a simple user and not a script. And this behavior is what my script tries to implement. 
It uses headless browser (puppeteer) to interact with Balabola API. To make possible to interact with Yandex API further, the script runs its own server (broker), which redirects
requests from other scripts to Yandex Balabola and returns its response.

## How to use it?
1. Clone the repository and enter it
```
> git clone git@github.com:kapturoff/balabola-http-api.git
> cd balabola-http-api
```
2. Install project dependencies
```
> npm i
```
3. Build the project
```
> npm run build
```
4. Run the server up
```
> npm run start
```

## How to interact?
Now the project is running and listening 4000 port. You can already access its API. For example, type this in your browser address bar:
```
http://localhost:4000/generate?q=Кошка&style=6"
```
And it will generate a short story bases on word "Кошка". For getting the whole list of styles, you can access this endpoint:
```
http://localhost:4000/styles
```
If Balabola responses with error, the error field in script response will be describing what happend. The error occures, btw, if you trying to generate any text bases on 
politicial words, such as "Путин", "Байден", etc...

Here you go.
