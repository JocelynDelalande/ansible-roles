Rsync server : backup and mirroring server
==========================================

Rsync server offers a replication and storage over rsync+ssh for two use cases :

- Backup (pushed from the client)
- Mirroring (pulled from the client)

Interesting associated role : *rsync-miror*.

Goals:
------

- bandwidth-efficient
- cpu-efficient
- storage-efficient
- simple to setup for clients

Logic
-----

SSH is used to provide authentification, a single unix user is used for remote
access, ssh keys being used to differenciate actual users (think
gitolite/github) and limit them :

- to the use of rsync only
- to the use of their allowed directory only

Vars
-----

Example:

    - hosts: host.crapouillou.net
      vars:
        rsync_server_user: backup
        rsync_server_path: /var/rsync-backups
        rsync_server_backup_clients:
          - name: somehost
            ssh_pubkey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD0527961d57583f95ff559004fbf6e5220a3628f355ed25720a965308eb37abc52eed7e4a6cbdaa4e67745faa3cd94407ff95bfa5b3abf6a0121c9200eb63dc51b5bcb0a6f61c25ad3f50d89f78862e4eb638be5b2f06b27e57b80f217948d60d9931dca17dd5204a91cb5043791aa6e2744165b7336c5b693211b6ccf9bc11acd7157e576f976d68514226ddd745080d root@somehost.example.com
        rsync_server_mirror_clients:
          - path: /var/partage
            ssh_pubkey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD0527961d57583f123495ff559004fbf6e5220a3628f355ed2565308eb37abc52eed7e4a6cbdaa4e67745faa3cd94407ff95bfa5b3abf6a0121c9200eb63dc51b5bcb0a6f61c25ad3f50d89f78862e4eb638be5b2f06b27e57b80f217948d60d9931dca17dd5204a91cb5043791aa6e2744165b7336c5b693211b6ccf9bc11acd7157e576f976d68514226ddd745080d root@other.example.com


- `rsync_server_user` is the unix username the remote users will use to connect the service.
- backups :
    - `rsync_server_path` is the path were dedicated directory will be created for each backup user
    - `rsync_server_backup_clients` is a list of backup clients you want to
      allow access and offer storage.
        - `name` is arbitrary and used to create name dedicated directory.
        - `ssh_pubkey` is the pubkey, as appearing verbatim  in the *.pub* file SSH generates.
- mirroring :
    - `rsync_server_mirror_clients` is a list of clients you want to allow
      mirroring a dir of your filesystem.
        - `path` is the local path you want to allow pulling data from.
        - `ssh_pubkey` is the pubkey, as appearing verbatim  in the *.pub* file SSH generates.

Limits
------

- Mirroring clients have r/w access, so enforce permissions at fs-level.
- Encryption of backups, if needed, has to be done on client-side.

TODO
----

Auto snapshots/rotations of backups via btrfs snapshots.
