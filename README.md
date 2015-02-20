Ansible Roles
=============

These are my personal ansible roles. I share with joy, and comments are welcome,
but I don't intend to make them generic nor perfect for everybody use. They suit
my needs.

Oh, and they all are using Debian systems.

They are licensing under the [WTFPL](http://www.wtfpl.net/txt/copying/)


Layout
------

The layout is quite standard, I do not provide defaults for everything but I try
to provide a README.md for each, it contains an example `site.yml` sample.


I use a single folder containing two git repos :

    ansible_
    ├── roles              (that git repo)
    └── site               (a private git repo)
        ├── ansible.cfg
        ├── hosts
        ├── site.yml
        └── vault.yml


 - a flat hosts file, containing just the hostnames
 - a single site.yml
 - my ansible.cfg :

    [defaults]
    roles_path = ../roles
    hostfile = hosts


External roles
--------------

I may use external 3rdparty roles, from [ansible galaxy](https://galaxy.ansible.com/), they are not versioned here, but rather listed in *galaxy-roles*. To download them, just run :

    ansible-galaxy install -r ansible-roles
