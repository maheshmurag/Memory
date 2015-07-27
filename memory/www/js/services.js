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
//                alert("line 17: " + JSON.stringify(data))
                for (var i = 0; i < tmp.length; i++) {
                    var termsObj = {};
                    var obj = tmp[i];
//                    console.log("line 20: " + obj.term)
                    termsObj.term = obj.term;
                    termsObj.definition = obj.definition;
                    termsObj.timesReviewed = 0;
                    termsObj.state = 0;//Learning=1,Reviewed=2,Mastered=3
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
