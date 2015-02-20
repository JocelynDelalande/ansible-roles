Scanning server
===============

- Scan documents hardware button press on the scanner (thanks to scanbuttond).
- Depending on the button pressed, do different action (copy/scan grey/scan
  color...)
- store scanned documents in the same folder with a filename based on date/time.

Great with *cifs-client* role if you want to store scanned documents on the
network.

    - hosts: scan.example.com
      vars:
        scanbuttond_scan_folder: /var/scan
      roles:
        - {role: scanserver, tags: ['scanserver']}

