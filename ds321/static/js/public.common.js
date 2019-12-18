function OpenWindow(query, w, h, scroll) {
    var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 2;

    winprops = 'resizable=0, height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + 'w';
    if (scroll) winprops += ',scrollbars=1';
    var f = window.open(query, "_blank", winprops);
}

function setLocation(url) {
    window.location.href = url;
}

function displayAjaxLoading(display) {
    if (display) {
        $('.ajax-loading-block-window').show();
    }
    else {
        $('.ajax-loading-block-window').hide('slow');
    }
}

function displayPopupNotification(message, messagetype, modal) {
    //types: success, error
    var container;
    if (messagetype == 'success') {
        //success
        container = $('#dialog-notifications-success');
    }
    else if (messagetype == 'error') {
        //error
        container = $('#dialog-notifications-error');
    }
    else {
        //other
        container = $('#dialog-notifications-success');
    }

    //we do not encode displayed message
    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<p>' + message + '</p>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p>' + message[i] + '</p>';
        }
    }

    container.html(htmlcode);

    var isModal = (modal ? true : false);
    container.dialog({ modal: isModal });
}


var barNotificationTimeout;
function displayBarNotification(message, messagetype, timeout) {
    clearTimeout(barNotificationTimeout);

    //types: success, error
    var cssclass = 'success';
    if (messagetype == 'success') {
        cssclass = 'success';
    }
    else if (messagetype == 'error') {
        cssclass = 'error';
    }
    //remove previous CSS classes and notifications
    $('#bar-notification')
        .removeClass('success')
        .removeClass('error');
    $('#bar-notification .content').remove();

    //we do not encode displayed message

    //add new notifications
    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<p class="content">' + message + '</p>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p class="content">' + message[i] + '</p>';
        }
    }
    $('#bar-notification').append(htmlcode)
        .addClass(cssclass)
        .fadeIn('slow')
        .mouseenter(function () {
            clearTimeout(barNotificationTimeout);
        });

    $('#bar-notification .close').unbind('click').click(function () {
        $('#bar-notification').fadeOut('slow');
    });

    //timeout (if set)
    if (timeout > 0) {
        barNotificationTimeout = setTimeout(function () {
            $('#bar-notification').fadeOut('slow');
        }, timeout);
    }
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

//设置导航选中状态下的样式
function setNavigateActiveClass(id) {
    var rawurl = window.location.pathname + window.location.search;
    $("#" + id).find(".mod-nav").children("li").each(function () {
        var href = $(this).find("a").attr("href");
        if (href != null) {
            href = href.replace(" ", "%20");
            if (href.toLowerCase() == rawurl.toLowerCase()) {
                $(this).addClass("active");
                return;
            }
        }
        if ($(this).children("ul").length > 0) {
            $(this).children("ul").children("li").each(function () {
                href = $(this).find("a").attr("href");
                if (href != null) {
                    href = href.replace(" ", "%20");
                    if (href.toLowerCase() == rawurl.toLowerCase()) {
                        $(this).addClass("active").parent().parent().addClass("active");
                        return;
                    }
                }
            });
        }
    });

}

//设置分类选中状态下的样式
function setCategoryActiveClass(id) {
    var rawurl = window.location.pathname + window.location.search;
    $("#" + id).find(".mod-category").children("li").each(function () {
        var href = $(this).find("a").attr("href");
        if (href != null) {
            href = href.replace(" ", "%20");
            if (href.toLowerCase() == rawurl.toLowerCase()) {
                $(this).addClass("active");
                return;
            }
        }
        if ($(this).children("ul").length > 0) {
            $(this).children("ul").children("li").each(function () {
                href = $(this).find("a").attr("href");
                if (href != null) {
                    href = href.replace(" ", "%20");
                    if (href.toLowerCase() == rawurl.toLowerCase()) {
                        $(this).addClass("active").parent().parent().addClass("active");
                        return;
                    }
                }
            });
        }
    });

}
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}


