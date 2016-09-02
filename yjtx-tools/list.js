/**
 * 将TypeScript和EXML编译为JavaScript
 */
var path = require("path");
var file = require("./file.js");
var params = require("./params_analyze.js");

var titleStr = "";

var linkArr = {};

var configNames = {
    "DB" : "DragonBones Pro"
}

function run(opts) {
    
    var array = [];
    
    
    for (var i = 1; i <= 10; i++) {
        array.push({
            "filename":"/Wing/update/update30" + i + "/",
            "text":"Egret Wing 3.0." + i,
            "des":"Egret Wing 3.0." + i,
            "in_use":true
        });
    }
    
    for (var i = 0; i <= 6; i++) {
        array.push({
            "filename":"/Wing/update/update31" + i + "/",
            "text":"Egret Wing 3.1." + i,
            "des":"Egret Wing 3.1." + i,
            "in_use":true
        });
    }

    array.reverse();

    file.save("art.json", JSON.stringify(array, null, "  "));

}

var option = params.getArgv();
run(option.opts);