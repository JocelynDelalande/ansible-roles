Ympd mpd web client
===================

Builds and installs [ympd](http://www.ympd.org/), a modern and fast web mpd
client.

This roles asumes to be on the same host as the mpd daemon.

Good companion to the *mopidy* role.

    - hosts: ympd.example.com
      vars:
        ympd_listen_port: 80
      roles:
        - {role: ympd, tags: ['ympd']}
