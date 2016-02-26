borg − installation of borg backup program
==========================================

This role is required wether the host is a borg server or borg client.
It fetches, verifies and install borg on an amd64 system.

When borg will be packaged into Debian, this role will go away.

Sadly, to be compatible with arm systems, it installs via pip and thus, no
gpg/checksum signature is possible on packages.
