# Live Streaming from Ricoh Theta V to HTC Vive Pro


## Overview
This system streams live video from a 360 camera to VR headsets. Video captured from the 360 camera is transcoded into ``HLS format`` using `Gstreamer`. A javascript-based HLS server then streams the transcoded video to a Web-based client. The Web-based client uses ``A-frame`` for displaying 360 video.

The live latency of the system with default settings is around 4-5 seconds when both the client and server are in a same local network. Live video from the camera is captured at a resolution 1920x960 (2K) and a frame rate of 29.97fps.

   - 360 Camera: Ricoh Theta V
   - Server: Ubuntu 20.04 LTS
   - HMD: HTC Vive Pro Eye

## How to use
### Setting up the server
Install gstreamer

    sudo apt-get install libgstreamer1.0-0 gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-doc gstreamer1.0-tools gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-qt5 gstreamer1.0-pulseaudio libgstreamer-plugins-base1.0-dev

Install libuvc

    sudo apt install cmake
    sudo apt install libusb-1.0-0-dev
    git clone https://github.com/libuvc/libuvc
    cd libuvc
    mkdir build
    cd build
    cmake ..
    make && sudo make install
 
 Clone this repository

    sudo apt install git
    git clone https://github.com/nvduc/ThetaV-2-HVCVive.git

 Build HLS-server
 
    cd ThetaV-2-HVCVive/HLS-server
    sudo apt-get install npm
    npm install
    npm install express
    npm install hls-server
 
 Generate HTTPS certificates for the server
 
    cd ../
    sudo apt install libnss3-tools
    sudo apt  install golang-go
    git clone https://github.com/FiloSottile/mkcert
    cd mkcert
    go build -ldflags "-X main.Version=$(git describe --tags)"
    sudo cp mkcert /usr/bin/
    mkcert -install
    mkcert example.com '*.example.org' myapp.dev localhost 127.0.0.1 ::1
    cp example.com+5.pem ../HLS-serve/src/certificates/localhost.pem
    cp example.com+5-key.pem ../HLS-serve/src/certificates/localhost-key.pem
 
Build and start the Transcoder
 
    cd ../Transcoder
    make
    ./gst_viewer
    
Start the server (using a separate Terminal)

    cd ThetaV-2-HVCVive/HLS-server/src
    node app.js  

The live video from camera is now available at: https://localhost:3000/

### Viewing live video on the client
- VR Heasets: (HTC Vive Pro)
  - Install ``Firefox Reality`` into the VR headset
  - Open ``Firefox Reality``  and go to https://server-ip-address:3000/. The ip address of the server can be found by typing ``ifconfig`` in the Terminal. At the main page, you will be asked to select the video resolution. Select ``2K`` and click on the ``Submit`` button.

- PCs:
  - Open Web browsers (Chrome, Firefox, Safari) and go to https://server-ip-address:3000/
