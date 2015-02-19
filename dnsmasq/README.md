IPv4 DNSMasq DHCP and DNS relay
===========================

For use on a small network with publicly accessible machines, everything being
on a single L2 network/address-range.

Handles :

- /etc/hosts construction
- /eth/ethers construction
- dns relays
- DHCP leases

It uses [split-horizon DNS hack](https://en.wikipedia.org/wiki/Split-horizon_DNS) to allow hosts on the LAN to access NATed
servers by using their public hostname.

- Real DNS server is not handled here, see *bind* role.
- IPv6 address distributon is much simpler and handled by *radvd* role.


    - hosts: host.example.net
      vars:
        dhcp_range_start: 192.168.0.100   # Range for dynamic allocation
        dhcp_range_stop: 192.168.0.200    # (outside of static leases)
        dhcp_iface: eth0                  #
        dhcp_addr: 192.168.0.254          # DNSMasq server itself

        # List all your hosts with static lease and public hostname
        dmz_hosts:
          - name: hostname1                # short hostname
            ip4: 192.168.0.1
            mac: ab:ab:ab:ab:ab:ab

            # List here all qualified hostnames pointing to the host
            names:
              - hostname1.example.com
              - www.example.com
              - ldap.example.com

          - name: hostname2
            ip4: 192.168.0.2
            mac: cd:cd:cd:cd:cd:cd
            names:
              - hostname2.crapouillou.net

      roles:
        - {role: dnsmasq, tags: ['dnsmasq']}
