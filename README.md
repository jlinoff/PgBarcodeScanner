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
    $ # remote the initialization cruft
    $ rm -f templates/friend* templates/tab-friends.html \
            templates/tab-dash.html templates/tab-accounts.html
    $ # compile and test
    $ ionic build android ios
    $ # use the new ripple: http://ripple.incubator.apache.org/
    $ # npm install -g ripple-emulator
    $ ripple emulate
    
