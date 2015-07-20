Pelican blog hosting
====================

Static hosting for pelican blog (or any static site pushed by rsync/scp).

Simple role, does :

- installs rsync
- defines a unix user that will be used for push (pelican `make rsync_upload`)
- define dirs that will be handled by this user and offered read access to nginx

Does not:

- handle content fetching (content is supposed to be pushed by user)
- handle nginx config

Example:

    static_website_user:
      login: jdoe
      ssh_key: AAAAAB3N...afe44== jdoe@localhost.localdomain

    static_websites_dirs:
      - /var/www/example.com
      - /var/www/bar.example.com
