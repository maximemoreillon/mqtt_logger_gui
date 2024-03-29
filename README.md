# MQTT Logger GUI

GUI for [MQTT logger](https://github.com/maximemoreillon/mqtt_logger), a microservice to publish to MQTT topics and store their data in InfluxDB.

More information on the project page [here](https://articles.maximemoreillon.com/articles/5aa92bbf-956c-43a9-8f3c-e0bdacd6412d)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Environment variables

| Variable                    | Description                |
| --------------------------- | -------------------------- |
| VUE_APP_MQTT_LOGGER_API_URL | URL of the MQTT logger API |
| VUE_APP_IDENTIFICATION_URL  | URL to identify users      |
| VUE_APP_LOGIN_URL           | URL to login               |

Note: Authentication is enabled when both VUE_APP_IDENTIFICATION_URL and VUE_APP_LOGIN_URL are set.
