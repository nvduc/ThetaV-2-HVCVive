# ffmpeg -fflags nobuffer \
#  -rtsp_transport udp \
#  -i rtsp://127.0.0.1:8554/test\
#  -vsync 0 \
#  -copyts \
#  -vcodec copy \
#  -movflags frag_keyframe+empty_moov \
#  -an \
#  -hls_flags delete_segments+append_list \
#  -f segment \
#  -segment_list_flags live \
#  -segment_time 0.5 \
#  -segment_list_size 1 \
#  -segment_format mpegts \
#  -segment_list video1/4K/output.m3u8 \
#  -segment_list_type m3u8 \
#  -segment_list_entry_prefix video1/4K/ \
#  video1/4K/%5d.ts



 # ffmpeg -fflags nobuffer \
 # -rtsp_transport udp \
 # -i rtsp://127.0.0.1:8554/test\
 # -vsync 0 \
 # -copyts \
 # -vcodec copy \
 # -movflags frag_keyframe+empty_moov \
 # -an \
 # -hls_flags delete_segments+append_list \
 # -f segment \
 # -segment_time 2 \
 # -segment_list_size 0 \
 # -segment_format mpegts \
 # -segment_list video1/4K/output.m3u8 \
 # -segment_list_type m3u8 \
 # video1/4K/%5d.ts


  ffmpeg -fflags nobuffer \
 -rtsp_transport udp \
 -thread_queue_size 5120 \
 -i rtsp://127.0.0.1:8554/test\
 -vsync 0 \
 -copyts \
 -vcodec copy \
 -movflags frag_keyframe+empty_moov \
 -an \
 -f hls \
 -start_number 0 \
 -hls_init_time 2 \
 -hls_time 2 \
 -hls_list_size 0 \
 -segment_list video1/4K/output.m3u8 \
 -segment_list_type m3u8 \
 video1/4K/%5d.ts
