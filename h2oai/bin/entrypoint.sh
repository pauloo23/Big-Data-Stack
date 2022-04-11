#!/bin/bash
# Entrypoint script.

set -e

d=`dirname $0`

# Use 90% of RAM for H2O.
memTotalKb=`cat /proc/meminfo | grep MemTotal | sed 's/MemTotal:[ \t]*//' | sed 's/ kB//'`
memTotalMb=$[ $memTotalKb / 1024 ]
tmp=$[ $memTotalMb * 30 ]
xmxMb=$[ $tmp / 100 ]

# First try running java.
java -version

# Start H2O
java -Xmx${xmxMb}m -jar /opt/h2o.jar -name ${H2O_CLUSTER_NAME} -port ${H2O_PORT}