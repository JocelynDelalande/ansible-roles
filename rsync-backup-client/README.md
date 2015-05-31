Rsync mirroring client
======================

Allows you to push backups of your system to a remote ssh+rsync server :

- dirs
- MySQL dumps
- LDAP dumps

It's designed to work with the *rsync-server* role, but can target any
rsync+ssh server.

Assumptions:

- the user doing backup is root
- you already have a passwordless ssh key on your host (default :
  */root/.ssh/id_rsa*), **the role will not create it for you**.

Minimal setup with ldap+mysql backup (will match *rsync-server role* defaults) :

    - hosts: alice.example.com
      vars:
        rsync_backup_client_ssh_user: backup
        rsync_backup_client_ssh_host: backupserver.example.com
        rsync_backup_client_mysql_root_pass_file: /etc/mysql-root
        rsync_backup_client_dirs:
          - /etc
        rsync_backup_client_mysql: yes
        rsync_backup_client_ldap: yes
      roles:
        - {role: rsync-backup-client, tags: ['rsync-backup-client]}


*rsync_backup_client_mysql_root_pass_file* is a file where you store your mysql
 root password (`chmod 700` it !), you need it if *rsync_backup_client_mysql* is
 *yes*.
