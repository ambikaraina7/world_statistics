angular.module('SvgMapApp', [])
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        var states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL",
            "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
            "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA",
            "WA", "WV", "WI", "WY"];
//        $scope.createDummyData = function () {
//            var dataTemp = {};
//            angular.forEach(states, function (state, key) {
//                dataTemp[state] = {value: Math.random()}
//            });
//            $scope.dummyData = dataTemp;
//        };
//        $scope.createDummyData();

        $scope.changeHoverRegion = function (region) {
            $scope.hoverRegion = region;
            console.log("inside changeHoverRegion")
        };
        $scope.hoverRegion = 'AF'
        
        ////////////////////////////////////////
        console.log('WP');
        $scope.message="World Population" 

        $scope.load = function(){
            console.log("kya load");
            get_url = 'https://restcountries.eu/rest/v2/all';
            print_table(get_url);     
        }

        $scope.search_country = function(search_input){
            console.log("kya search_country");
            get_url = 'https://restcountries.eu/rest/v2/name/' + search_input;
            print_table(get_url);     
            console.log(get_url)
        }

        $scope.clear_field = function(){
            console.log("kya clear_field");
            $scope.search_input = "";
            $scope.load();  
        }
        print_table = function (get_url) {
            $http.get(get_url)
                .then(function(response) {
                $scope.search_success = true;
                  console.log('###5');
                  console.log(response);
                  console.log("through AngularJS\t restcountries\t Country:" + response.data[0].name + "\tPopulation: " + response.data[0].population);
                  result = response.data;
                $scope.countries = [];
                $scope.country_codes = []
                   for(var i =0; i < result.length;i++){

                       if(result[i].hasOwnProperty('name'))
                            name = result[i].name;
                       else
                           name = "-";
                       if(result[i].hasOwnProperty('population'))
                            population = result[i].population;
                       else
                           population = "-";
                       if(result[i].hasOwnProperty('area'))
                            area = result[i].area;
                       else
                           area = "-"
                       if(result[i].hasOwnProperty('currencies') && result[i].currencies[0].hasOwnProperty('name'))
                            currency = result[i].currencies[0].name;
                       else
                           currency = "-";
                       if(result[i].hasOwnProperty('languages') && result[i].languages[0].hasOwnProperty('name'))
                            language = result[i].languages[0].name;
                       else
                           language = "-";
                       if(result[i].hasOwnProperty('flag'))
                            flag = result[i].flag;
                       else
                           flag = "";
                       
                       if(result[i].hasOwnProperty('alpha2Code'))
                            id = result[i].alpha2Code;
                       else
                           id = "";

                        $scope.countries.push({
                        name : name,
                        population : population,
                        area : area,
                        currency : currency,
                        language : language,
                        flag : flag,
                        id: id
                      });


                       console.log(result.length + "countries!!!");

                       if(result[i].hasOwnProperty("alpha2Code"))
                            $scope.country_codes.push(result[i].alpha2Code);

                   }
                console.log($scope.countries[0]);
                console.log($scope.country_codes);
              },function(response) {
                // Second function handles error
                $scope.search_success = false;
                console.log("Something went wrong");
              });
          };
          $scope.load();
        
            $scope.createDummyData = function () {
                var dataTemp = {};
                angular.forEach($scope.country_codes, function (state, key) {
                    dataTemp[state] = {value: Math.random()}
                });
                $scope.dummyData = dataTemp;
//                console.log("Dummy country data" + dataTemp.toString())
            };
            $scope.createDummyData();
        
            console.log("scope.hoverRegion = scope.elementId;", $scope.hoverRegion)
          $scope.aaya = "apna time aayega";
        ////////////////////////////////////////
        
        
        
    }]);