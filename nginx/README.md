Nginx
=====

*see also: letsencrypt*


Install nginx and setup vhosts.

Variables
---------

### Required

- *nginx_vhosts* : a list of vhosts, relevant properties to each elements are
  documented in *Vhosts configuration*.


### Optional

- *nginx_letsencrypt_webroot* : where *.well-known* folder (containing
  challenges proofs) will be stored (default */var/www*)
- *nginx_ssl_fullchain_path* : default cert chain path (PEM format), defaults
  to a snakeoil cert.
- *nginx_ssl_privkey_path* : path to the private key path (PEM format),
  defaults to a snakeoil key.

Vhosts configuration
--------------------

Plusieurs clefs sont disponibles pour chaque vhost de la liste *nginx_vhosts*.

### Required

- *domain* : the domain name
- *type* : `http` or `https`

### Optional

- *features* : a list that may contain one or more from the following:
  - *letsencrypt-check* : to answer ACME letsencrypt challenges on this domain
  - *ssl-redirection* : to redirect all this domain to its https counterpart
  - *no-robots* : to disable indexing on the whole vhost
- *locations* : a list of "folders" located within this vhost (in most cases
  you will only have one "path=/" entry), with those properties:
  - *path*: the path (eg: `/`, `/images/`)
  - *type*: a value among:
    - *fastcgi* : Forwards traffic to a fastcgi servers whose address is
      provided in *target* property
    - *reverse-proxy* : proxies the traffic to another HTTP server whose
      address is provided in *target* property.  est précisée dans *target*
    - *reverse-proxy-websocket* : same, but also proxies websockets
    - *static* : serve a static files folder whose path is provided in *target*
      property précisé dans *target*
    - *domain-redirection* : redirects (301) to another domain mentioned in
      *target*
  - *target* : depends on *type*.
  - *vars*: a list of key/value couples, that will be appended as-is to nginx
    settings for that *path*.


Exemple
-------

```
nginx_vhosts:
    - domain: www.example.com
      type: http
      features:
        - letsencrypt-check
        - ssl-redirection

    - domain: www.example.com
      type: https
      locations:
        - path: /
          type: static
          target: "/var/www/website"

    - domain: "app.example.com"
      type: https
      locations:
        - path: /
          type: fastcgi
          target: 127.0.0.1:8000
          vars:
            - [client_max_body_size, 0]
            - [access_log, "/var/log/nginx/app.access.log"]
            - [error_log, "/var/log/nginx/app.error.log"]

```
