## Geohash Notification Service

I host an instance of this at [geohash.kaiserapps.com](https://geohash.kaiserapps.com), feel free to go and register for notifications there.

However if you are the super-privacy kind or would just like to run it yourself, follow the below developer instructions.

### Developer Instructions

This application is built with deployment to dokku / heroku in mind. For those you will need to set the following environment variables:

#### Environment variables

```
GOOGLE_API_KEY=<your google maps api key>
SMTP_URL=smtps://user%40gmail.com:pass@smtp.gmail.com
SENDER_EMAIL=user@gmail.com
```

If you would like to use the direct mail transport, then there is no need to set `SMTP_URL`.

The Google API key has to be for both the Google Maps Javascript API, as well as for the Google Static Maps API (for showing a map preview in sent email).

#### Running in Docker + Docker Compose

```
bin/go
```

And you're done! Good to go! try it out on http://localhost:3000

#### Without Docker

You'll need:
- Node.js 6
- Mongodb running

then execute

```
yarn
APP_URL=http://localhost:3000 npm start
```
