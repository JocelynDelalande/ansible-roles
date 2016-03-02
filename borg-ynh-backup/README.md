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

Set up client & server
----------------------

If you set up both borg client and server, the easiest way is :

- run borg-ynh-backup role on your client backup client
- get the public key it created (default: */root/.ssh/id_rsa_borg*)
- setup the server, configuring the given public_key
- perform a test run by hand running `/etc/cron.d/borg-ynh-backup` if nothing
  appears, then it worked :-)
- **backup your client private keys** (ssh & repo encryption), by hand, somewhere offline :
  - /root/.borg/
  - /root/.ssh/id_rsa_borg

TODO
----

- Use compression
- Do not do everything as root
- handle properly the passphrase
