Bind basic DNS server
=====================

Handles everything (from installation to record definition) , for a simple,
multi-domain non-replicated bind server (replication comming soon...).

    - hosts: host.example.net
      vars:
        bind_server_name: ns1.example.com.
        bind_admin_name: admin.example.com. # contact name

        bind_master_domains:
          - name: crapouillou.net
            serial: 6
            records:
              - {type: NS,  name: '@',     val: "{{ bind_server_name }}"}
              - {type: A,  name: ns1,      val: 192.0.2.1
              - {type: A,    name: '@',    val: 192.0.2.2
              - {type: A,    name: marvin, val: 192.0.2.3

    roles:
        - {role: bind, tags: ['bind']}
