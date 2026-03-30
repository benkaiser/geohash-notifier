## Geohash Notification Service

Get browser push notifications whenever an [XKCD geohash](https://xkcd.com/426/) lands near your chosen location.

I host an instance of this at [geohash.kaiserapps.com](https://geohash.kaiserapps.com), feel free to go and subscribe for notifications there.

However if you are the super-privacy kind or would just like to run it yourself, follow the below developer instructions.

### How It Works

1. Visit the app and select a location on the Leaflet/OpenStreetMap map
2. Set a radius (in km) for how close a geohash needs to be
3. Click "Enable Notifications" to subscribe to browser push notifications
4. When a geohash lands within your radius, you'll get a push notification
5. Click the notification to open OpenStreetMap at the geohash coordinates

### Developer Instructions

This application is built with deployment to Dokku / Heroku in mind.

#### Environment Variables

```
VAPID_PUBLIC_KEY=<your VAPID public key>
VAPID_PRIVATE_KEY=<your VAPID private key>
VAPID_SUBJECT=mailto:your@email.com
MONGO_URL=mongodb://localhost:27017/geohash-notifier
```

#### Generating VAPID Keys

```
npx web-push generate-vapid-keys
```

This will output a public and private key pair. Set them as environment variables.

**Note:** HTTPS is required for service workers and push notifications (except on localhost for development).

#### Running in Docker + Docker Compose

```
bin/go
```

And you're done! Good to go! Try it out on http://localhost:3000

#### Without Docker

You'll need:
- Node.js >= 18
- MongoDB running

Then execute:

```
npm install
MONGO_URL=mongodb://localhost:27017/geohash-notifier npm start
```

#### Checking for Geohashes

Run the check job manually or set up a cron to run it periodically:

```
node jobs/check_stocks.js
```

#### Deploying to Dokku

```
git push dokku@benkaiser.dev:geohash-notifier master
```

The buildpack auto-detects Node.js from package.json.
