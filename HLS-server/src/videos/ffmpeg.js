const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg('video1/4K/video1_4K.mp4', { timeout: 432000 }).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-g 25',
    '-sc_threshold 0',
    '-start_number 0',
    '-hls_init_time 2',
    '-hls_time 2',        
    '-hls_list_size 50',   
    '-f hls'
]).output('video1/4K/output.m3u8').on('end', () => {
    console.log('end');
}).run();
