Borg server : remote backup repository
======================================

*requires: borg-common*
*see also: borg-ynh-backup*

Borg server offers remote repositories for storing borg backups.

Logic
-----

SSH is used to provide authentification, a single unix user is used for remote
access, ssh keys being used to differenciate actual users (think
gitolite/github) and limit them :

- to the use of borg only
- to the use of their allowed directory only

Setting up client & server
--------------------------

If setting up with borg-ynh-backup clients, you may want to provision clients
first to generate the ssh key automatically. Refer to borg-ynh-backup
*README.md* to see in which order setup things.

Vars
-----

Example:

    borg_server_user: borg
    borg_server_repositories: /var/borg-backups/repos
    borg_server_backup_clients:
      - name: somehost
        ssh_pubkey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD0527961d57583f95ff559004fbf6e5220a3628f355ed25720a965308eb37abc52eed7e4a6cbdaa4e67745faa3cd94407ff95bfa5b3abf6a0121c9200eb63dc51b5bcb0a6f61c25ad3f50d89f78862e4eb638be5b2f06b27e57b80f217948d60d9931dca17dd5204a91cb5043791aa6e2744165b7336c5b693211b6ccf9bc11acd7157e576f976d68514226ddd745080d root@somehost.example.com

- `borg_server_user` is the unix username the remote users will use to connect
  the service over ssh. It can be shared safely among different backup clients
  (authentication is done by the key itself, not the username).
- backups :
    - `borg_server_repositories` is the path were dedicated directory will be created for each backup user
    - `borg_server_backup_clients` is a list of backup clients you want to
      allow access and offer storage.
        - `name` is arbitrary and used to create name dedicated directory (hostname is a good convention)
        - `ssh_pubkey` is the pubkey, as appearing verbatim  in the *.pub* file SSH generates.
