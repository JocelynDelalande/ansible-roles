RAdvd - IPv6 address auto-configuration daemon
==============================================

Simplest role ever <3.

Choose the /64 block you want to announce and the interface to announce it.

    - hosts: router.example.com
      user: root
      vars:
        radvd_block_64: 2001:0910:1321:33::/64
        radvd_iface: br-dmz

      roles:
        - {role: radvd, tags: ['radvd', 'router']}
