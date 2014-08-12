PgBarcodeScanner
================

This is a full implementation of a phonegap barcode scanner app using the ionic and angularjs frameworks for the platforms supported by com.phonegap.plugins.barcodescanner. It includes the phonegap compatible config.xml that identifies the plug in.

The app has some interesting features like using the $q promise/deferred implementation to capture the barcode scanner information for display in a table and the angularjs state routing that is the default in the ionic framework.

To use it in phonegap, create a new, open-source project and provide this github repository. Phonegap knows how to deal with the www directory tree automatically.

The app has not been fully tested so please beware. It is only meant to show the basic ideas so that you can easily incorporate the barcode scanner into your app.

The source code is distributed under the MIT license so you are free to use it any way that you like.

Here are the basic commands that I used to create it:

    $ cd ~/work/apps
    $ ionic state PgBarcodeScanner tabs
    $ cd PgBarcodeScanner
    $ # add the plugin
    $ cordova plugin add http://github.com/phonegap-build/BarcodeScanner.git
    $ edit config.xml  # add in the plugin reference
    $ cp config.xml www/
    $ ionic platform add android
    $ ionic platform add ios
    $ cd www
    $ touch templates/tab-about.html
    $ touch templates/tab-scan.html
    $ open -a brackets index.html templates/*html js/*.js  # create the app
    $ # remove the initialization cruft
    $ rm -f templates/friend* templates/tab-friends.html \
            templates/tab-dash.html templates/tab-accounts.html
    $ # compile and test
    $ ionic build android ios
    $ # use the new ripple: http://ripple.incubator.apache.org/
    $ # npm install -g ripple-emulator
    $ ripple emulate
    
I was able to test it locally using the android emulator on my Mac like this because the "ionic emulate --target=gn1 android" command failed.

    $ # install the android SDK
    $ # update PATH to include the platforms-tools and tools directories:
    $ #    ~/Development/adt-bundle-mac-x86_64-20140321/sdk/platform-tools
    $ #    ~/Development/adt-bundle-mac-x86_64-20140321/sdk/tools
    $ # create at least one AVD (Android Virtual Device) under Tools --> Manage AVDs
    $ android avd list
    Available Android Virtual Devices:
    Name: galaxy_nexus
      Device: Galaxy Nexus (Google)
        Path: /Users/jlinoff/.android/avd/galaxy_nexus.avd
      Target: Android 4.4.2 (API level 19)
     Tag/ABI: default/armeabi-v7a
        Skin: 720x1280
    ---------
    Name: gn1
      Device: 4in WVGA (Nexus S) (Generic)
        Path: /Users/jlinoff/.android/avd/gn1.avd
      Target: Android 4.4.2 (API level 19)
     Tag/ABI: default/armeabi-v7a
        Skin: 480x800
        ---------
    Name: gn2
      Device: 4.65in 720p (Galaxy Nexus) (Generic)
        Path: /Users/jlinoff/.android/avd/gn2.avd
      Target: Android 4.4.2 (API level 19)
     Tag/ABI: default/x86
        Skin: 720x1280

        
    $ # Build the android APK
    $ ionic build android
    
    $ # Run the emulator with the camera enabled.
    $ emulator64-arm -camera-front on @gn1
    
    $ # Or, if you have HAX installed for much faster emulation use gn2.
    $ # Note that you must use the full path to the emulator to avoid a qemu "bios.bin" not found error.
    $ # Further note that you must update LD_LIBRARY_PATH so that the emulator finds the OpenGLES library.
    $ LD_LIBRARY_PATH=~/Development/adt-bundle-mac-x86_64-20140321/sdk/tools/lib \ 
        /Users/jlinoff/Development/adt-bundle-mac-x86_64-20140321/sdk/tools/emulator64-x86 \
        -camera-front webcam0 @gn2 &
    
    $ # Add the APK to the running emulator.
    $ adb -e install \
        /Users/jlinoff/work/apps/PgBarcodeScanner/platforms/android/ant-build/PgBarcodeScanner-debug-unaligned.apk
    1289 KB/s (3983000 bytes in 3.016s)
    WARNING: linker: libdvm.so has text relocations. This is wasting memory and is a security risk. Please fix.
	    pkg: /data/local/tmp/PgBarcodeScanner-debug-unaligned.apk
    Success

    $ # When finished uninstall the APK (unless you want to use it later).
    $ adb -e uninstall \
        /Users/jlinoff/work/apps/PgBarcodeScanner/platforms/android/ant-build/PgBarcodeScanner-debug-unaligned.apk
    
    $ # Kill the emulator
    $ kill -9 %1

Here is the error that I saw when I tried to use the built-in emulation:

    $ ionic emulate --target=gn1 android
    .
    .
    BUILD SUCCESSFUL
    Total time: 9 seconds
    Waiting for emulator...
    
    events.js:72
            throw er; // Unhandled 'error' event
                  ^
    Error: spawn ENOENT
        at errnoException (child_process.js:1001:11)
        at Process.ChildProcess._handle.onexit (child_process.js:792:34)
    Error: /Users/jlinoff/work/apps/PgBarcodeScanner/platforms/android/cordova/run: Command failed with exit code 8
        at ChildProcess.whenDone (/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/src/cordova/superspawn.js:135:23)
        at ChildProcess.emit (events.js:98:17)
        at maybeClose (child_process.js:756:16)
        at Process.ChildProcess._handle.onexit (child_process.js:823:5)

When the testing is complete, you can upload the project to http://build.phonegap.com using a zip file or from a github account. If you want to use a zip file create it as follows:

    $ cd ~/work/apps/PgBarcodeScanner
    $ zip -r PgBarcodeScanner.zip www  # zip file to upload to phonegap
