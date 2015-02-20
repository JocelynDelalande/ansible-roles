IPv4 HTTP(s) transparent reverse proxy
======================================

The configuration is very simple (a bare list of hosts to proxy) but supposes
that the *reverse-proxy* machine can access to any proxied host using its public
hostname, either :

- by IPv6
- by IPv4, using for example a
  [split-horizon DNS](https://en.wikipedia.org/wiki/Split-horizon_DNS)
  configuration (see *dnsmasq* role).

- act as a hostname-based reverse-proxy for HTTP
- act as a hostname-based reverse-proxy for HTTPS, using
  [SNI](https://en.wikipedia.org/wiki/Server_Name_Indication) to read hostname
  only **the relay don't see exchanged data and don't have to store any
  certificates/priv keys.

The goal is to host several servers behind a single IPv4. The ipv4-proxied machines
serve directly their content on their public IPv6, without going through haproxy.

    - hosts: proxy.example.net
      vars:
        # just list the hostnames you want to proxy in both http/https
        ipv4_proxies:
          - www.example.net
          - acme.example.com
          - foo.bar.example.com

        # following is only used if SNI is not available on the client to serve
        # proxy to a default server with default certificate.

        ssl_certs_dir: /etc/nginx/ssl
        ssl_certs_suffix: "-startssl-2014.crt+key+ca"
        default_cert: www.example.com

      roles:
        - {role: haproxy-ip4-proxy, tags:['proxy', 'haproxy']}
