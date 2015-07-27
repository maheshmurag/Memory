angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', function ($scope, Chats, $http, $ionicLoading) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    var SPLIT_INTO = 50;
    $scope.callFunc = function () {
        $scope.showLoading();
        Chats.getTerms().then(function (terms) {
            $scope.terms = terms;
            var splitTerms = []; //2d array which holds split up sets in parts
            var counter = 0;
            var tmparr = [];
            for (var i = 0; i < $scope.terms.length; i++) {
                var termObj = $scope.terms[i];
                tmparr.push(termObj);
                if (i % SPLIT_INTO == 0 && i >= SPLIT_INTO) {
                    if ($scope.terms.length - i >= SPLIT_INTO) {
                        console.log(tmparr.length)
                        splitTerms.push(tmparr);
                        tmparr = [];
                    } else {
                        for (var b = i; b < $scope.terms.length; b++) {
                            tmparr.push($scope.terms[b]);
                        }
                        splitTerms.push(tmparr);
                        break;
                    }
                }
            }
//            var str = "";
//            for (var i = 0; i < splitTerms.length; i++) {
//                for (var j = 0; j < splitTerms[i].length; j++) {
//                    str += "" + (splitTerms[i][j].term) + " ";
//                    console.log(i + ":" + j);
//                }
//                str += "\n\n\n"
//            }
//            console.log(str);
            $scope.hideLoading();
        });
    }

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: 'Retrieving set...'
        });
    };

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
