'use strict';

var App = angular.module('motifApp')
    .controller('MainCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {


        /* // Sample json data which is generated from the  $scope.makeAnList function 3 rows X 3 columns
                
                $scope.list = {
                    "Feature 1": [
                        { id: 1, selected: false, level: 1 },
                        { id: 2, selected: false, level: 1 },
                        { id: 3, selected: false, level: 1 },
                    ],
                    "Feature 2": [
                        { id: 1, selected: false, level: 2 },
                        { id: 2, selected: false, level: 2 },
                        { id: 3, selected: false, level: 2 },
                    ],
                    "Feature 3": [
                        { id: 1, selected: false, level: 3 },
                        { id: 2, selected: false, level: 3 },
                        { id: 3, selected: false, level: 3 },
                    ]
                };

        */

        // function for <th> generation according to the columns required
        $scope.getNumber = function(columns) { 
            $scope.privacyLevel = [];
            for (var i = 1; i <= columns; i++) {
                var level = "Privacy level " + i;
                $scope.privacyLevel.push(level);
            }
        }//could have avoided like for Featurelevel


        // function to generate json data based on the user input of rows and columns
        $scope.makeAnList = function(rows, columns) {
            $scope.list = {}; // list where the json data will be stored
            var temp = [];
            var j = 1;
            $scope.featureLevel = [];
                    
            for (var k = 0; k < rows; k++) {
                var Feature = "Feature " + j; // Making a feature array for the DOM
                for (var i = 1; i <= columns; i++) {
                    var obj = {         //an obj with selected: false, 
                        id: i,
                        selected: false,
                        level: j
                    }
                    temp.push(obj);
                }
                $scope.list[Feature] = temp;
                temp = [];
                $scope.featureLevel.push(Feature);
                j++;
            }
            //console.log($scope.featureLevel);
            $scope.getNumber(columns);
            return $scope.list;
        }

        // Initial screen load
        $scope.makeAnList(3, 3);






        // Recursive function for printing values to console
        // Will return all the checkboxed which are ture
        $scope.getSelectedCheckboxes = function(o, search) { // search == true always
            if (o.selected === search) {
                //console.log("The id's which are selected are :");
                console.log(" Privacy level " + o.id + " ==>   Feature id " + o.level);
                //console.log(o.id);
            }
            for (var prop in o) {
                if (typeof o[prop] == "array" || typeof o[prop] == "object") {
                    $scope.getSelectedCheckboxes(o[prop], search); // r
                } else {
                    //console.log(prop + " = " + o[prop]);
                }
            }
        }




        // function to check according to the given conditions for the checkboxes 
        $scope.isChecked = function(selected, id, innerlist) {
            if (selected == true) {
                for (var i = id; i < innerlist.length; i++) { // check right 
                    innerlist[i].selected = true;
                }
            } else {
                for (var i = id - 1; i >= 0; i--) { // uncheck left 
                    innerlist[i].selected = false;
                }
            }
        }



////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////


        $scope.drawSquares = function(start, height) {

            $('.test').html("");

            var copyOfStart = start;
            var myObjForValues = {};
            var stack = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
            while (start <= 15) {
                var popedVal = stack.pop();
                var greyCode = "#" + popedVal + popedVal + popedVal; // making #AAA, #BBB etc 
                myObjForValues[start] = greyCode;   // all greycode wrt its value in an obj 
                start++;
            }
            //console.log(myObjForValues);
            var varyingHeight = height * (15 - copyOfStart + 1);
            
            for (var i = 15; i >= copyOfStart; i--) { // closure for retaining the values/ not needed as such
                (function(i) {
                    var div = $("<div></div>"); // creating a div for every loop
                    var backGroundColor = myObjForValues[i]; // getting respective values from hashtable/obj
                    div.css({       // assigning CSS properties after every loop
                        "position": "absolute",
                        "margin": "auto",
                        "left": 0,
                        "right": 0,
                        "top": 0,
                        "bottom": 0,
                        "width": varyingHeight,
                        "height": varyingHeight,
                        "backgroundColor": backGroundColor,
                        "class": "myClass" 
                    })
                    //console.log(varyingHeight);
                    var test = $('.test'); // getting test div from DOM
                    div.appendTo(test);     //appending to test
                    varyingHeight = varyingHeight - height; // decreasing height for every div
                }(i));

            }

        }

        $scope.drawSquares(0, 8); // Initial function load
    }]);



