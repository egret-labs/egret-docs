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
    titleStr += "# 目录" + "\n\n";
    
    var titlesInfo = JSON.parse(file.read(path.join('../config/index.json')));

    var titleList = [];
    for (var i = 0; i < titlesInfo.length; i++) {
        for (var j = 0; j < titlesInfo[i]["children"].length; j++) {
            var title = titlesInfo[i]["children"][j];
            if (title['in_use'] == 'true') {
                titleList.push({'name': title['des'], "url" : title['filename']}); 
            }
        }
    }

    for (var i = 0; i < titleList.length; i++) {
        var fileName = titleList[i]['name']
        titleStr += "## " + fileName + "\n\n";

        console.log(titleList[i]['url'])
        ans(JSON.parse(file.read(path.join('../config/', titleList[i]['url']))), [fileName]);

        titleStr += "\n\n";
    }


    titleStr += "\n\n# egret-docs \n\n#### Egret文档，你也可以访问 [白鹭开发者中心](http://developer.egret.com/cn/) "


    file.save("../README.md", titleStr);


    // file.save("../b.md", JSON.stringify(linkArr, null, 4));

    file.save("../c.md", ans22('root', linkArr));

}


function ans22(name, info) {
    var result = "";

    if (info['url'] && info['list']) {
        result = '[' + name + '](' + info['url'] + ")";
        
        for (var i = 0; i < info['list'].length; i++) {
            result += "\n\n* " + info['list'][i];
        }

        return result;
    }

    result += "\n\n" + name;

    for (var key in info) {
        result += "\n\n" + ans22(key, info[key]);
    }

    return result;
}


function ans(configList, parentList) {

    for (var i = 0; i < configList.length; i++) {
        var config = configList[i];

        if (config.in_use == false) {
            continue;
        }

        if (config.children) {
            titleStr += "##";
            for (var ii = 0; ii < parentList.length; ii++) {
                titleStr += "##";
            }
            titleStr += " " + config.text + "\n\n";

            ans(config.children, parentList.concat(config.text));
        }
        else {
            var url = config.filename.substring(1) + 'README.md';
            
            titleStr += '* [' + config.text + '](' + url + ')\n\n';
            var filep = path.join('../' + config.filename.substring(1)) + 'README.md';
            var fileContent = file.read(filep);

            var matches = fileContent.match(/\[[^\[]+\]\([^#]*?\)/g);
            if (matches) {
                for (var j = 0; j < matches.length; j++) {
                    // if (matches[j].indexOf('../../') >= 0) {
                    //     addLink(matches[j], parentList, config.text, url);
                    // }

                    if (matches[j].indexOf('edn.egret.com/cn/') >= 0) {
                        addLink(matches[j], parentList, config.text, url);
                    }
                    else if (matches[j].indexOf('edn.egret.com/cn/index.php') >= 0) {
                        addLink(matches[j], parentList, config.text, url);
                    }
                    else {
                    }
                }
            }

        }
    }
}

function addLink(link, parentList, mdName, mdUrl) {
    var arr = linkArr;
    for (var i = 0; i < parentList.length; i++) {
        if (arr[parentList[i]] == null) {
            arr[parentList[i]] = {};
        }
        arr = arr[parentList[i]];
    }

    if (arr[mdName] == null) {
        arr[mdName] = {'url' : mdUrl, 'list': []};
    }

    arr[mdName]['list'].push(link);
}

var option = params.getArgv();
run(option.opts);