IPv4 router with firewall
=========================

Some things on this module are not totally generic and may be adapted for your
use (/etc/network/interfaces namely...)

- NAT for lan hosts (NAT)
- default DMZ host
- simple port redirections (IPv4 only) (DNAT)

Related roles are *radvd*, *dnsmasq*, *haproxy-ip4-proxy*.

    - hosts: router.example.com
      vars:
        dmz_iface: br-dmz
        # router interface on DMZ
        dmz_ip4: 192.168.0.254/24
        # default host (all inbound ipv4 connections goes to it)
        dmz_ip4_host: 192.168.0.1
        # wan interface
        vpn_iface: tun0
        ip4_port_redirections:
          - {proto: tcp, port: 80, host: 192.168.0.2}
          - {proto: tcp, port: 80, host: 192.168.0.3}
       roles:
        - {role: router, tags: ['router']}
