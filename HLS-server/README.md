# 360-VR-Streaming
This is a code that stream 360 video using WebXR and HLS.  
# How to use 
Clone this repository.
 ```
 git clone https://github.com/vnd1608/360-VR-Streaming.git
 ```
 Install dependencies.

```
cd 360-VR-Streaming
npm install
npm install fluent-ffmpeg
npm i @ffmpeg-installer/ffmpeg
npm install express
npm install express hls-server

```
You need to have HTTPS Certification by mkcert.

A guide are availble in <a href='https://12bit.vn/articles/tao-https-cho-localhost-su-dung-mkcert/'>here</a>.

Or a tutorial video in <a href='https://www.youtube.com/watch?v=U09p5J8jbcA&t=457s'>here</a>.

After you have 2 .pem certificate files, let copy them and replace exist file in 'certicates' directory.

```
cd src/certificates
```

Go to 'videos' directory.

```
cd src/videos
```
In this directory you will see 'video1' directory and 'ffmpeg.js' file.
You can download a sample video at 
<a href='https://drive.google.com/file/d/1mV2or4-5LppnXOHyivX0joZh2t4shtjO/view?usp=sharing'>here</a>

After fully download that video, you need to put it in '4K' sub-directory in 'video1'.
Then check the link of video and output file in 'ffmpeg.js'
```
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
    console.log('End');
}).run();
```

Run 'ffmpeg.js' to generate segments .ts in '4K' directory.
```
node ffmpeg.js
```

Run 'app.js' to start system
```
node app.js
```
The system are available at
https://localhost:3000

You should choose 'video1' and '4K' in homepage because another version need to be encoded.

To test immersive experience you need to access above link in Firefox Reality, which is availble at <a href=https://www.viveport.com/05634fed-6dc5-4aa8-865d-af6027f4ec09>here</a> for HTC Vive.
