# ShortenizeMe

### Endpoints
#### GET /shortenize - get all saved long URLs
#### POST /shortenize - create new short URL and save into DBs (redis and postgres)
#### DELETE /shortenize/:id - remove long URL from DB (postgres)

#### GET /s/:hash - get LONG url from shortened from redis (redirection)

# Task 2

First of all we need the app, as it is not finished.

If we think about scalability, we can make different instances of web servers that will receive requests and distribute them between database instances.
