Yunohost borg backup
====================

*requires: borg-common*
*see also: borg-server*

Backup Yunohost, via borg, to a remote repository over SSH.

    vars:
      - borg_ynh_backup_repository: borg@example.com:/var/borg-backups/repository
      - borg_ynh_backup_monthly: 6
      - borg_ynh_backup_weekly: 4
      - borg_ynh_backup_daily: 7

You can either :
- Choose your own passphrase and set it via `borg_ynh_backup_passphrase_path` var
- Let the playbook generate a strong one for you (be sure to back it up then)

Set up client & server
----------------------

If you set up both borg client and server, the easiest way is :

- run borg-ynh-backup role against your yunohost server
- get the public key it created (default: *~borg/.ssh/id_rsa.pub*)
- setup the server, configuring the given public_key
- perform a test (and check hostkey) running by hand
  `~borg/bin/borg-ynh-backup` (as borg user).
- **backup your client private keys** (ssh, and repository passphrase),
  by hand, somewhere offline :
  - *~borg/.borg/pass* folder
  - *~borg/.ssh/id_rsa* file

TODO
----

- Use compression
- switch to repokey security
