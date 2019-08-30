angular.module('world-stats', [])
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.changeHoverRegion = function (region) {
            $scope.hoverRegion = region;
            console.log("inside changeHoverRegion")
        };
        $scope.hoverRegion = 'AF'
        
        ////////////////////////////////////////
        console.log('WP');
        $scope.message="World Population" 

        $scope.load = function(){
            console.log("load function");
            get_url = 'https://restcountries.eu/rest/v2/all';
            print_table(get_url);     
        }

        $scope.search_country = function(search_input){
            console.log("search_country function");
            get_url = 'https://restcountries.eu/rest/v2/name/' + search_input;
            print_table(get_url);     
            console.log(get_url)
        }

        $scope.clear_field = function(){
            console.log("clear_field function");
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
                console.log($scope.countries.length);
                console.log($scope.countries[0]);
                console.log($scope.country_codes);
              },function(response) {
                // Second function handles error
                $scope.search_success = false;
//                console.log("Something went wrong");
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
//          $scope.aaya = "apna time aayega";
        ////////////////////////////////////////
        
        
        
    }]);
angular.module('world-stats').directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: '',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.state');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                regionElement.attr("hover-region", "hoverRegion");
                $compile(regionElement)(scope);
            })
        }
    }
}]);


angular.module('world-stats').directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            dummyData: "=",
            hoverRegion: "="
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.regionClick = function () {
//                scope.country_id = scope.elementId;
                console.log("inside directive" + scope.elementId);
                
            };
            scope.regionMouseOver = function () {
                scope.hoverRegion = scope.elementId;
                element[0].parentNode.appendChild(element[0]);
//                console.log("inside directive regionMouseOver" + scope.hoverRegion);
            };
            element.attr("ng-click", "regionClick()");
            element.attr("ng-attr-fill", "sienna");
            element.attr("ng-mouseover", "regionMouseOver()");
            element.attr("ng-class", "{active:hoverRegion==elementId}");
            element.removeAttr("region");
            $compile(element)(scope);
        }
    }
}]);