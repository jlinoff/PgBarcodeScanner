angular.module('starter.controllers', [])

.controller('ScanCtrl', function($scope, $q) {
    $scope.message = '';
    $scope.scan = function() {
        // The plug operates asynchronously so a promise
        // must be used to display the results correctly.
        var deferred = $q.defer();
        try {
            cordova.plugins.barcodeScanner.scan(
                function (result) {  // success
                    deferred.resolve({'error':false, 'result': result});
                }, 
                function (error) {  // failure
                    deferred.resolve({'error':true, 'result': error.toString()});
                }
            );
        }
        catch (exc) {
            deferred.resolve({'error':true, 'result': 'exception: ' + exc.toString()});
        }
        return deferred.promise;
    };

    $scope.click = function() {
        var promise = $scope.scan();
        promise.then(
            function(result) {
                if (result.error == false) {
                    var d = new Date();
                    $scope.message = '<table>' +
                        '<tbody>' +
                        '<tr><td>Timestamp:</td><td>&nbsp;</td><td>' + d.toUTCString() + '</td></tr>' +
                        '<tr><td>Text:</td><td>&nbsp;</td><td>' + result.result.text + '</td></tr>' +
                        '<tr><td>Format:</td><td>&nbsp;</td><td>' + result.result.format + '</td></tr>' +
                        '<tr><td>Text:</td><td>&nbsp;</td><td>' + result.result.cancelled + '</td></tr>' +
                        '</tbody>' +
                        '</table>';
                }
                else {
                    $scope.message = '<b>ERROR</b>: ' + result;
                }
            },
            function(result) {
                $scope.message = '' + result.error;
            },
            function(result) {
                $scope.message = '' + result.error;
            });
    }

    $scope.clear = function() {
        $scope.message = '';
    }
})

.controller('AboutCtrl', function($scope) {
})

