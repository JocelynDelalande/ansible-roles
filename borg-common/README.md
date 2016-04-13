borg − installation of borg backup program
==========================================

*see also: borg-server, borg-ynh-backup*

This role is required wether the host is a borg server or borg client.
It fetches, verifies and install borg on an amd64 system.

When borg will be packaged into Debian, this role will go away.

Sadly, to be compatible with arm systems, it installs via pip and thus, no
gpg/checksum signature is possible on packages.

borgbackup is now available in debian backports, so you have two installation options:

Install via apt (default and recommended way, jessie only)

    borg_install_method: apt

The old method, via pip ; may still be useful for squeeze systems.

    borg_install_method: pip
