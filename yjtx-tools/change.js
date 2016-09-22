/**
 * 将TypeScript和EXML编译为JavaScript
 */
var path = require("path");
var file = require("./file.js");
var params = require("./params_analyze.js");


function run(opts) {

    var fileList = file.getDirectoryAllListing(path.join('../'));

    for (var i = 0; i < fileList.length; i++) {
        var name = fileList[i];
        if (name.indexOf("index.md") >= 0) {

            // file.copy(name, name.replace("index.md", "README.md"));
            // file.remove(name);
            console.log(name);
        }
    }


}

var option = params.getArgv();
run(option.opts);