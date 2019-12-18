(function (Window, $) {
    var scriptCallBack = {};
    var Until = {
        isInclude: function (name) {

            var js = /js$/i.test(name);

            var es = document.getElementsByTagName(js ? 'script' : 'link');

            for (var i = 0; i < es.length; i++)

                if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;

            return false;

        },
        isReady: function (name, callback) {
            var js = /js$/i.test(name);

            var es = document.getElementsByTagName(js ? 'script' : 'link'), isready = false;

            for (var i = 0; i < es.length; i++)

                if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) {
                    if (scriptCallBack[name] && scriptCallBack[name].ready) {
                        callback.call(this, arguments);
                    } else {
                        if (!scriptCallBack[name]) {
                            scriptCallBack[name] = {};
                        }
                        if (!scriptCallBack[name].callbackArray) {
                            scriptCallBack[name].callbackArray = [];
                            scriptCallBack[name].callbackParams = [];
                        }
                        scriptCallBack[name].callbackArray.push(callback);
                        scriptCallBack[name].callbackParams.push(arguments);
                    }
                    isready = true;
                };

            return isready;
        },
        loadJS: function (url, callback) {
            var head = document.getElementsByTagName('head');
            if (head && head.length) {
                head = head[0];
            } else {
                head = document.body;
            }
            var script = document.createElement('script');
            script.src = url;
            if (!scriptCallBack[url]) {
                scriptCallBack[url] = {};
                }
            scriptCallBack[url].ready = false;
            script.type = "text/javascript";
            head.appendChild(script);
            if (callback && typeof (callback) === 'function') {
                script.onreadystatechange = function () {
                    if (this.readyState == 'complete' || this.readyState=="loaded") {
                        scriptCallBack[url].ready = true;
                        callback();
                        if (scriptCallBack[url].callbackArray) {
                            for (var i = 0; i < scriptCallBack[url].callbackArray.length; i++) {
                                scriptCallBack[url].callbackArray[i].call(this, scriptCallBack[url].callbackParams[i])
                            }
                        }
                    }
                }
                script.onload = function () {
                    scriptCallBack[url].ready = true;
                    callback();
                    if (scriptCallBack[url].callbackArray) {
                        for (var i = 0; i < scriptCallBack[url].callbackArray.length; i++) {
                            scriptCallBack[url].callbackArray[i].call(this, scriptCallBack[url].callbackParams[i])
                        }
                    }
                }
            }
        },
        removeJs: function (name) {

            var js = /js$/i.test(name);

            var es = document.getElementsByTagName(js ? 'script' : 'link');

            for (var i = 0; i < es.length; i++)

                if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) {
                    $(es[i]).remove();
                    break;
                }
        },
        LoadCss: function (name) {
            if (!this.isInclude(name)) {
                var head = document.getElementsByTagName('head');
                if (head && head.length) {
                    head = head[0];
                } else {
                    head = document.body;
                }
                var style = document.createElement('link');
                style.href = name;
                style.rel="stylesheet"
                head.appendChild(style);
            }
        }
    };

    Window.Until = Until;
})(window,jQuery)