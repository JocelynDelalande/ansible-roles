Munin-node
==========

- Install munin-node
- Deploy custom plugins
- Allows one or several munin master to connect
- Configurable plugin lists:
  - list of required plugins
  - blacklist of munin plugins.

Variables
---------

- `munin_enabled_modules`: a list of dicts with two keys
  - `name`: the name of the module (mind the trailing "_")
  - `arg`: arg passed to the module (optional, does not apply to all modules)
- `munin_disabled_modules`: a list of module names you want to disable (names
include args)
- `munin_master_hosts`: the munin masters (graphing servers) allowed to gather
  data from this host.

Example
-------

    munin_disabled_modules:
      - ntp_kernel_err
      - ntp_kernel_pll_freq
      - ntp_kernel_pll_off
      - ntp_offset
      - entropy

    munin_enabled_modules:
      - name: openvpn
        arg: stfelix
      - name: openvpn
        arg: bottiere
      - name: ping_
        arg: 89.234.176.1

    munin_master_hosts:
      - 1.2.3.4
