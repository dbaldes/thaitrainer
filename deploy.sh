#!/bin/sh

TUHOST=db@iduna.throughput.de
TPATH=/var/www/de.throughput/thai

ng build --prod --bh "/thai/" &&\
ssh "$TUHOST" "rm -f $TPATH/*" &&\
scp dist/* "$TUHOST:$TPATH/"
