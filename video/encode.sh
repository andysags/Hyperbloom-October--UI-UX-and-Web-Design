#!/usr/bin/env bash
# Encode rendered subframes into the final film.
# usage: video/encode.sh <frames_dir> <subframes> <audio.wav> <out.mp4>
set -euo pipefail
DIR=$1; SUB=$2; AUDIO=$3; OUT=$4
FR=$((30 * SUB))
ffmpeg -v error -y -framerate "$FR" -i "$DIR/%06d.png" -i "$AUDIO" \
  -filter_complex "[0:v]tmix=frames=${SUB},select='eq(mod(n\,${SUB})\,${SUB}-1)',setpts=N/30/TB,scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p[v]" \
  -map "[v]" -map 1:a -r 30 -c:v libx264 -preset slow -crf 17 -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:a aac -b:a 256k -movflags +faststart "$OUT"
