# MQTT Logger GUI

GUI for MQTT logger

More information on the project page [here](https://articles.maximemoreillon.com/articles/5aa92bbf-956c-43a9-8f3c-e0bdacd6412d)

[![dockeri.co](https://dockeri.co/image/moreillon/mqtt-logger-front)](https://hub.docker.com/r/moreillon/mqtt-logger-front)

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
| Variable | Description |
| --- | --- |
| VUE_APP_MQTT_LOGGER_API_URL | URL of the MQTT logger API | 
| VUE_APP_IDENTIFICATION_URL | URL to identify users | 
| VUE_APP_LOGIN_URL | URL to login | 

Note: Authentication is enabled when both VUE_APP_IDENTIFICATION_URL and VUE_APP_LOGIN_URL are set.
