CIFS client
===========

Installs required tools, mount and set fstab lines to access CIFS shares,
 protected by a login/password.

**CIFS credentials are stored plaintext in a file.**

    - hosts: host.example.net
      vars:
        cifs_mounts:
          # arbitrary, unique, used to build credentials filename
          - name: my_mount
            mountpoint: /mnt/my_mount
            share_uri: //cifs.example.com/my_mount # in samba-format

            # local user and groups to hold ownership on mounted share
            localuser: johndoe
            localgroup: johngroup

            # cifs authentication informations
            cifs_domain: workgroup.example.com
            cifs_username: remote-johndoe
            cifs_password: changeme

      roles:
        - {role: cifs-client, tags: ['cifs']}
