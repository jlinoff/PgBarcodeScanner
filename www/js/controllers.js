angular.module('starter.controllers', [])

.controller('ScanCtrl', function($scope, appServices) {
    $scope.message = '';
    $scope.click = function() {
        var promise = appServices.scanBarcode();
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

