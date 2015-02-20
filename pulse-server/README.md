Pulseaudio local and network sound server
=========================================

Intended to be installed on an host with a soundcard, to offer playback over
the network.

**This pulseaudio server do not use any kind of authentication**

The most difficult is to know which is your audio device, for that list all PCMs:

    aplay -L

...and note the one that suits you (ex: *plughw:CARD=PCH,DEV=0*)

Sample playbook :

    - hosts: pulse.example.net
      vars:
        pa_audio_device: plughw:CARD=PCH,DEV=0
        pa_listen_to: 192.0.2.1/24
      roles:
        - {role: pulse-server, tags: ['pulseaudio']}
