LXC management
--------------

LXC containers are only half-automated through the *lxc-host* role.

Ansible vars
------------

An lxc guest is simply a `dmz_hosts` entry holding a `lxc` var.

The *features* list is optional and is a list of special authorization on the
hardware that are granted to the container.

Available features are :

- *seat* for running a full desktop in a lxc container (if french-speaking, see
   [that blog post](http://hackriculture.fr/serveur-xorg-dans-conteneur-lxc-jessie-trusty.html))
- *audio* for access to the audio card
- *pts* for access to /dev/pts (usefull for using screen/tmux...)

I generate mac address from local IPv4 address with the following
command (just throwing random hex will lead you to bad surprises...):

    $ printf "02:00:%x:%x:%x:%x" 192 168 0 42

Sample site.yml

    - hosts: host.example.net
      vars:

        # List all your hosts with static lease and public hostname
        dmz_hosts:
          - name: desktop                # short hostname
            ip4: 192.168.0.1
            mac: ab:ab:ab:ab:ab:ab

            lxc:
              autostart: yes    # should the container boot with the host ?
              distro: ubuntu    # distro and version are the ones you can
              version: trusty   # choose with "lxc-create -t download"
              features:
                - seat

          # that host won't be created by lxc-host, as it have no "lxc" var.
          - name: hostname2
            ip4: 192.168.0.2
            mac: cd:cd:cd:cd:cd:cd
            names:
              - hostname2.crapouillou.net

      roles:
        - {role: dnsmasq, tags: ['dnsmasq']}



Creating a new container
------------------------

To create a new container:

    myhostname=foo

    lxc-create -n ${myhostname} -t download -- \
               --dist debian --release wheezy --arch amd64

Then register it in `dmz_hosts` variable (in site.yml) registering propper
distro/release and ip-addr and run the provision :

    ansible-playbook --ask-vault-pass site.yml -tlxc

You can now start it on lxc host (needed to pick up dns info):

    lxc-start -n ${myhostname} -d

And do basic provisionning on it :

    mkdir /var/lib/lxc/${myhostname}/rootfs/root/.ssh/
    cp /root/.ssh/authorized_keys /var/lib/lxc/${myhostname}/rootfs/root/.ssh/
    echo 'nameserver 80.67.169.12' >> /var/lib/lxc/${myhostname}/rootfs/etc/resolv.conf
    chroot /var/lib/lxc/${myhostname}/rootfs apt-get update
    chroot /var/lib/lxc/${myhostname}/rootfs apt-get install openssh-server python-minimal python-apt
    chroot /var/lib/lxc/${myhostname}/rootfs dpkg-reconfigure locales


Restart it (so that ssh & co starts properly)

    lxc-stop -n ${myhostname} -r

New host is now ready to be added to the inventory and ansibled!
