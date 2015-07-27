angular.module('starter.services', [])

.factory('Chats', function ($http, $q) {
    var terms;


    var getTermsFromAPI = function () {
        var deferred = $q.defer();
        $http.get("http://crossorigin.me/https://api.quizlet.com/2.0/sets/87552158/terms", {
                params: {
                    "client_id": "YHbPSd5ZYy"
                }
            })
            .success(function (data) {
                var tmp = data;
                terms = [];
                for (obj in tmp) {
                    var termsObj = {};
                    termsObj.term = obj.term;
                    termsObj.definition = obj.definition;
                    terms.push(termsObj);
                }
                deferred.resolve(terms);

            })
            .error(function (data) {
                alert("error, line 25: " + JSON.stringify(data));
            });
        return deferred.promise;
    };

    return {
        getTerms: getTermsFromAPI,
        remove: function (term) {
            terms.splice(terms.indexOf(term), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});
