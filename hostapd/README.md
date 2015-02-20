HostAPD, Wifi Access-point
==========================

Everything required to use a ralink interface in AP mode, and allow stations to
connect via WPA1/2 using a pre-shared key. See `dnsmasq` and `radvd` roles, that
can be complimentary to this one.

    - hosts: host.example.net
      vars:
        wifi_iface: wlan0    # the interface to use as Access-point
        dmz_iface: br-lan    # the bridge interface (which receive IP infos)
        wifi_ssid: my-network
        wifi_passphrase: myverysecretpassphrase

      roles:
        - {role: hostapd, tags: [hostapd']}
