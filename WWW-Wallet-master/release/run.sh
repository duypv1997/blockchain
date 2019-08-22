#!/bin/bash
cron
rm -rf /var/run/apache2/
apache2ctl -D FOREGROUND
