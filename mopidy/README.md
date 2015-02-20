Mopidy : a mpd server
=====================

Handles a Mopidy server, listening on IPv4 and accessing its library through
CIFS. Sets an auto-refresh cronjob for database.

Interesting associated roles may be *ympd* and  *pulse-server*.

    - hosts: gerboise.crapouillou.net
      vars:
        mopidy_mountpoint: "/media/son"
        mopidy_share_uri: "//192.168.0.2/shares/music/" # cifs URI
      roles:
        - {role: mopidy, tags: ['mopidy']}
