# letsencrypt

An ansible role to obtain and renew SSL certs from letsencrypt, using webroot
authenticator.

*see also: nginx*


Dependencies
------------

*nginx* role, with *letsencrypt-check* feature enabled on the domains you want
to get a letsencrypt cert for.

Process to obtain and setup certs:

1. setup correctly vars for nginx (mind *letsencrypt-check*) and letsencrypt roles.
2. run nginx role
3. run letsencrypt role
4. run nginx role again (so that it detects the new certs, use them, and restart)

Renewing is automatic. nginx is restarted after renewal.


Vars
----

Example:


     letsencrypt_webroot_path: /var/www/html
     letsencrypt_email: user@example.net
     letsencrypt_cert_domains:
      - www.example.net
      - example.net


### Required

None ! If you set nothing, letsencyrpt will make a cert for the server fqdn.

### Optional

- `letsencrypt_cert_domains` a list of domains you want a LE cert for (they
  require to have a nginx vhost configured with *letsencryt-check* enabled on
  plain HTTP)
- `letsencrypt_webroot_path` is the root path that gets served by your web
  server. Defaults to `/var/www`.
- `letsencrypt_email` needs to be set to your email address. Let's Encrypt wants it. Defaults to `webmaster@{{ ansible_fqdn }}`.
 - `letsencrypt_renewal_frequency` has 3 properties : `day`, `hour` and
   `minute`, which are cron time selector (defaults to
   `{day: *, hour: 0, minute: 0}`)

Renewing
--------
