#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  ffmpeg-web-loop.sh [options] <input_video> [output_video]

Creates a browser-optimized, silent looping MP4:
  - strips audio
  - re-encodes to H.264
  - scales to 800px wide (keeps aspect ratio)
  - enables fast start for web playback

Defaults:
  output: <input_basename>_weboptimized.mp4
  crf: 23
  preset: medium
  profile: high
  level: 4.0
  gop: 48

Options:
  -o, --output <path>    Output file path
      --crf <n>          x264 CRF (lower is higher quality, larger files)
      --preset <name>    x264 preset (ultrafast..veryslow)
      --fps <n>          Force output FPS (e.g. 30)
      --gop <n>          GOP/keyframe interval (default 48)
      --profile <name>   H.264 profile (default high)
      --level <value>    H.264 level (default 4.0)
  -h, --help             Show help

Examples:
  ffmpeg-web-loop.sh input.mov
  ffmpeg-web-loop.sh input.mov output.mp4
  ffmpeg-web-loop.sh --crf 25 --fps 30 --gop 60 input.mov
EOF
}

require_command() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Error: '$cmd' is required but not installed." >&2
    exit 1
  fi
}

main() {
  local input=""
  local output=""
  local crf="23"
  local preset="medium"
  local fps=""
  local gop="48"
  local profile="high"
  local level="4.0"

  while [[ $# -gt 0 ]]; do
    case "$1" in
      -o|--output)
        output="${2:-}"
        shift 2
        ;;
      --crf)
        crf="${2:-}"
        shift 2
        ;;
      --preset)
        preset="${2:-}"
        shift 2
        ;;
      --fps)
        fps="${2:-}"
        shift 2
        ;;
      --gop)
        gop="${2:-}"
        shift 2
        ;;
      --profile)
        profile="${2:-}"
        shift 2
        ;;
      --level)
        level="${2:-}"
        shift 2
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      -*)
        echo "Error: unknown option '$1'" >&2
        usage
        exit 1
        ;;
      *)
        if [[ -z "$input" ]]; then
          input="$1"
        elif [[ -z "$output" ]]; then
          output="$1"
        else
          echo "Error: unexpected argument '$1'" >&2
          usage
          exit 1
        fi
        shift
        ;;
    esac
  done

  if [[ -z "$input" ]]; then
    echo "Error: input file is required." >&2
    usage
    exit 1
  fi

  require_command ffmpeg

  if [[ ! -f "$input" ]]; then
    echo "Error: input file not found: $input" >&2
    exit 1
  fi

  if [[ -z "$output" ]]; then
    local input_dir input_name input_base
    input_dir="$(dirname "$input")"
    input_name="$(basename "$input")"
    input_base="${input_name%.*}"
    output="${input_dir}/${input_base}_weboptimized.mp4"
  fi

  if [[ -n "$fps" && -z "${gop:-}" ]]; then
    gop="$(( fps * 2 ))"
  fi

  local -a ffmpeg_cmd=(
    ffmpeg
    -hide_banner
    -y
    -i "$input"
    -an
    -c:v libx264
    -preset "$preset"
    -crf "$crf"
    -vf "scale=800:-2"
    -pix_fmt yuv420p
    -movflags +faststart
    -profile:v "$profile"
    -level:v "$level"
    -g "$gop"
    -sc_threshold 0
  )

  if [[ -n "$fps" ]]; then
    ffmpeg_cmd+=(-r "$fps")
  fi

  ffmpeg_cmd+=("$output")

  echo "Input:  $input"
  echo "Output: $output"
  echo "Running: ${ffmpeg_cmd[*]}"
  "${ffmpeg_cmd[@]}"
  echo "Done."
}

main "$@"
