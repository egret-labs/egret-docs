var params = require("../core/params_analyze.js");
var file = require("../core/file.js");

function addQuotes(str) {
    return "\"" + str + "\"";
}

function getOption(type) {
    if (params.getArgv()["opts"][type]) {
        return params.getArgv()["opts"][type][0];
    }
    return null;
}

function getExampleRootPath() {
    return getOption("-examples-path") || getOption("--examples");
}

function getOutputPath() {
    return getOption("--output");
}

function getSourcePath() {
    return getOption("--path");
}

function getLanguage() {
    return getOption("--language") || "zh_cn";
}

function getType() {
    return getOption("--type") || null;
}


function clone(frame) {
    var result;
    if (frame instanceof Array) {
        result = [];
    }
    else if (frame instanceof Object) {
        result = {};
    }
    else {
        return frame;
    }

    for (var key in frame) {
        if (frame[key] instanceof Array) {
            result[key] = clone(frame[key]);
        }
        else if (frame[key] instanceof Object) {//
            result[key] = clone(frame[key]);
        }
        else {
            result[key] = frame[key];
        }
    }
    return result;
}

function getApiParserRoot() {
    return file.getDirectory(process.argv[1]);
}

function getDependence() {
    var dependencePathStr = getOption(["--dependence"]);
    if (dependencePathStr) {
        return dependencePathStr.split(",");
    }
    return [];
}
exports.getDependence = getDependence;

function isInDependence(filename) {
    var dependenceList = getDependence();

    if (filename) {
        for (var i = 0; i < dependenceList.length; i++) {
            var tempPath = file.escapePath(dependenceList[i]);
            if (filename.indexOf(tempPath) >= 0) {
                return true;
            }
        }
    }

    return false;
}
exports.isInDependence = isInDependence;


exports.clone = clone;
exports.getApiParserRoot = getApiParserRoot;

exports.getOption = getOption;
exports.addQuotes = addQuotes;
exports.getExampleRootPath = getExampleRootPath;
exports.getOutputPath = getOutputPath;
exports.getLanguage = getLanguage;
exports.getSourcePath = getSourcePath;
exports.getType = getType;