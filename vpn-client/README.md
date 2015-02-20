OpenVPN client for IPv4/IPv6 full connectivity
==============================================

Configure the host as a router, with uplink on the tunnel.

Configured with the CA and public certs from [FDN](http://www.fdn.fr) non-profit
ISP, of course, your milleage may vary... Highly inspired from
[this page from FDN documentation](https://wiki-adh.fdn.fr/wiki/travaux:vpn_misc:doc:openvpn:config).

- VPN connection
- Default routes (v4 & v6) through the VPN
- resolv.conf update (roughly)

This sample config takes FDN service as an example.

    - hosts: host.crapouillou.net
      vars:
        vpn_name: fdn
        vpn_login: foo.bar@vpn.fdn.fr
        vpn_password: "{{ vaulted_vpn_password }}"
        vpn_servers:
          - {host: 80.67.169.57, port: 1194}
          - {host: 80.67.169.45, port: 1194}
        vpn_iface: tun0 # just choose the name, openvpn will create it
        # first adress of your /48 block
        vpn_ipv6_local_endpoint: dead:dead:beef::1
        vpn_ipv6_remote_endpoint: 2001:910:1301::1 # FDN endpoint
      roles:
        - {role: vpn-client, tags: ['vpn', 'openvpn', 'router']}
