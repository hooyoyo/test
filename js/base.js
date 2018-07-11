// 参数处理：开始
function _getQueryString_(url)
{
    var result = url.match(new RegExp('[\?\&][^\?\&]+=[^\?\&]+', 'g'));
    for (var i = 0; result && i < result.length; i++) {
        result[i] = result[i].substring(1);
    }

    if (!result) {
        result = [];
    }
    return result;
}

function _getQueryStringByName_(url, name)
{
    var result = url.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
    if (result == null || result.length < 1) {
        return '';
    }
    return result[1];
}

function _getQueryStringByIndex_(url, index)
{
    if (index == null) {
        return '';
    }
    var queryStringList = _getQueryString_(url);
    if (index >= queryStringList.length) {
        return '';
    }
    var result = queryStringList[index];
    var startIndex = result.indexOf('=') + 1;
    result = result.substring(startIndex);
    return result;
}

function _getQueryStringParam_(url)
{
    var queryStringList = _getQueryString_(url);
    return _arrParamStrToParam_(queryStringList);
}

function _arrParamStrToParam_(queryStringList)
{
    var param = {};
    for (var i = 0; queryStringList && i < queryStringList.length; i++) {
        var result = queryStringList[i];
        var startIndex = result.indexOf('=') + 1;
        var value = result.substring(startIndex);
        var name = result.substring(0, startIndex - 1);

        param[name] = value;
    }

    return param;
}
// 参数处理：结束

// 正则匹配：开始
var _regExp_ = {
    isIntegerNumber: function (inp)
    {
        var reg = /^\d+$/;
        return reg.test(inp);
    },
    isFloatNumber: function (inp)
    {
        var reg = /^\d+(\.\d+)?$/;
        return reg.test(inp);
    },
    isColor: function (inp)
    {
        var regHex = /(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/;
        var regRGB = /(^[rR][gG][bB]\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$)|(^[rR][gG][bB][aA]\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(1|0.[0-9]{1,2})\)$)/;
        return regHex.test(inp) || regRGB.test(inp);
    },
    isCoordinate: function (inp)
    {
        var reg = /^\d+(\.\d+)?\,\d+(\.\d+)?$/;
        return reg.test(inp);
    }
};
// 正则匹配：结束

// 日期格式化
Date.prototype.pattern = function(fmt)
{
    var o = {
        'M+' : this.getMonth()+1, //月份
        'd+' : this.getDate(), //日
        'h+' : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        'H+' : this.getHours(), //小时
        'm+' : this.getMinutes(), //分
        's+' : this.getSeconds(), //秒
        'q+' : Math.floor((this.getMonth()+3)/3), //季度
        'S' : this.getMilliseconds() //毫秒
    };
    var week = {
        '0' : '/u65e5',
        '1' : '/u4e00',
        '2' : '/u4e8c',
        '3' : '/u4e09',
        '4' : '/u56db',
        '5' : '/u4e94',
        '6' : '/u516d'
    };
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? '/u661f/u671f' : '/u5468') : '')+week[this.getDay()+'']);
    }
    for(var k in o){
        if(new RegExp('('+ k +')').test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)));
        }
    }
    return fmt;
};

// 日期处理工具：开始
// 加天数
Date.prototype.addDate = function (days)
{
    if (!days) days = 1;
    this.setDate(this.getDate() + days);
    return new Date(this);
};
// 加月数
Date.prototype.addMonth = function (months)
{
    if (!months) months = 1;
    var y = this.getFullYear();
    var m = this.getMonth();
    var newY = y;
    var newM = m;
    var delta = m + months;
    if (delta > 11) {
        newM = delta % 11 - 1;
        newY = y + parseInt((delta - delta % 11) / 12);
    } else {
        newM = m + months;
    }
    var newMLastD;
    if (newM == 1) {
        newMLastD = ((newY % 4 == 0 && newY % 100 != 0) || newY % 400 == 0) ? 29 : 28;
    } else {
        newMLastD = ((newM <= 6 && newM % 2 == 0) || (newM > 6 && newM % 2 == 1)) ? 31 : 30;
    }
    var newD = this.getDate();
    if (newD > newMLastD) newD = newMLastD;
    return new Date(newY, newM, newD);
};
// 加年数
Date.prototype.addYear = function (years)
{
    if (!years) years = 1;
    var y = this.getFullYear();
    var m = this.getMonth();
    var newY = y + years;
    var newM = m;
    var newD = this.getDate();
    var newMLastD;
    if (newM == 1) {
        newMLastD = ((newY % 4 == 0 && newY % 100 != 0) || newY % 400 == 0) ? 29 : 28;
        if (newD > newMLastD) newD = newMLastD;
    }
    return new Date(newY, newM, newD);
};
//检查有效日期
function _isDate_(str)
{
    var sepa = '';
    if (str.indexOf('-') > -1) sepa = '-';
    else if (str.indexOf('/') > -1) sepa = '/';
    else if (str.indexOf('.') > -1) sepa = '.';
    var arrDate = str.split(sepa);

    var year = (sepa != '') ? parseInt(arrDate[0]) : parseInt(arrDate[0] + arrDate[1] + arrDate[2] + arrDate[3]);
    var month = (sepa != '') ? parseInt(arrDate[1]) : parseInt(arrDate[4] + arrDate[5]);
    var day = (sepa != '') ? parseInt(arrDate[2]) : parseInt(arrDate[6] + arrDate[7]);

    if (year < 0 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    } else {
        if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
            if ((month == 2 && day > 29) || ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) || ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31)) return false;
        } else {
            if ((month == 2 && day > 28) || ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) || ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31)) return false;
        }
    }

    return true;
}
// 日期处理工具：结束

// 产生随机字符串（默认8位长度）
function _rndStr_(len, opt) {
    var length = len ? len : 8;
    var chars = '', unique;
    if (opt) {
        (opt.upper) ? chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : null;
        (opt.lower) ? chars += 'abcdefghijklmnopqrstuvwxyz' : null;
        (opt.number) ? chars += '0123456789' : null;
        (opt.symbol) ? chars += '`~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?' : null;
        (opt.custom) ? chars += ('' + opt.custom).replace(/\s/g, '') : null;
        (opt.unique) ? unique = opt.unique : null;
    } else {
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?';
    }
    var str = '';
    for (var j = 0; j < length; j++) {
        if (chars.length < 1) break;
        var index = Math.floor(Math.random() * chars.length);
        str += chars[index];
        if (unique) chars.splice(index, 1);
    }
    return str;
}

// 产生随机数（默认1~9位任意长）
function _rndNum_(len) {
    var power = (len ? len : Math.floor(Math.random() * 10)) - 1;
    var size = Math.pow(10, power);
    var num = Math.floor(Math.random() * size * 10);
    (num < size) ? num += size : null;
    return num;
}

// 判断是否为空（含空文本）
function _isEmpty_(x)
{
    if (typeof(x) != 'undefined' && x != null
        && (
            typeof(x) == 'number' && !isNaN(x) || typeof(x) == 'string' && x.trim() != '' || typeof(x) == 'object' && (JSON.stringify(x) != '[]' && JSON.stringify(x) != '{}')
        ))
    {
        return false;
    } else {
        return true;
    }
};

// 判断是否数组
function _isArray_(obj)
{
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// 数组去重（优先时间）
Array.prototype.unique = function()
{
    // n为hash表，r为结果
    var n = {}, r = [];
    for (var i = 0; i < this.length; i++) {
        // 如果hash表中没有当前项
        if (!n[this[i]]) {
            // 存入hash表
            n[this[i]] = true;
            // 将当前数组的当前项追加到结果里
            r.push(this[i]);
        }
    }
    return r;
};

// 判断是否绑定了事件
function _hasBoundEvent_(selector, event)
{
    var objE = $._data($(selector)[0], 'events');
    if (objE && objE[event]) return true;
    else return false;
}

// 去掉地址栏?后的参数（基于html5的replaceState特性）
function _dropoffUrlParam_()
{
    var newUrl = window.location.href.substr(0, window.location.href.indexOf('?'));
    history.replaceState(null, null, newUrl);
}

// 跳转错误页
function _toErrorPage_(msg, url)
{
    !msg && (msg = '');
    if (url) {
        window.location.href = url + '?m=' + encodeURIComponent(msg);
        return;
    }
    window.location.href = './error.html?m=' + encodeURIComponent(msg);
}

// 判断微信端
function _isWeChat_()
{
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    }
    return false;
}

// 提示对话框：开始
var _tipDialog_ = {
    html: '<div class="tip-dialog"><div class="dialog-bg" style="position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: #000; z-index: 999; filter: alpha(opacity=20); opacity: 0.2;"></div><div class="dialog-wd" style="position: fixed; top: 50%; left: 50%; margin-left: -50px; margin-top: -50px; z-index: 1000;"><div class="dialog-p" style="height: 100px; width: 100px; background-color: #fff;"><div class="dialog-title"><span>标题</span></div><div class="dialog-content"><p>内容</p></div><div class="dialog-button"><a>控件</a><a>控件</a></div></div></div></div>',
    popForm: function (type, title, content, fn)
    {
        if (!title) title = '提示';
        if (!content) content = '';
        var cover = $(_tipDialog_.html);
        cover.find('.dialog-wd').prop('style', 'position: fixed; top: 50%; left: 50%; margin-left: -120px; margin-top: -240px; z-index: 1000;');
        cover.find('.dialog-p').prop('style', 'height: auto; width: 240px; background-color: #fff; min-height: 120px; max-height: 480px; border-radius: 3px; box-shadow: 0 0 3px #999;');
        cover.find('.dialog-title').prop('style', 'height: 30px; font-size: 15px; font-weight: 600; line-height: 30px; text-align: center; border-top-left-radius: 3px; border-top-right-radius: 3px; color: #fff; background-color: #fdce51; box-shadow: 0 1px 1px #ddd');
        cover.find('.dialog-title').children('span').text(title);
        cover.find('.dialog-content').prop('style', 'height: auto; min-height: 60px; max-height: 420px; overflow-y: auto;');
        cover.find('.dialog-content').children('p').prop('style', 'margin: 0; padding: 5px 10px; word-wrap: break-word');
        cover.find('.dialog-content').children('p').html(content);
        if (type) {
            cover.find('.dialog-button').prop('style', 'height: 30px; font-size: 15px; line-height: 30px; text-align: center;');
            switch (type) {
                case 'confirm':
                    cover.find('.dialog-button').children('a').prop('style', 'height: 30px; font-size: 15px; line-height: 30px; text-align: center;');
                    cover.find('.dialog-button').children('a').first().prop('style', 'padding: 5px 45px; color: #fff; background-color: #ec5d39; border-bottom-left-radius: 3px; cursor: pointer;');
                    cover.find('.dialog-button').children('a').first().addClass('btn-confirm');
                    cover.find('.dialog-button').children('a').first().text('确定');
                    cover.find('.dialog-button').children('a').last().prop('style', 'padding: 5px 45px; color: #adadad; background-color: #ececec; border-bottom-right-radius: 3px; cursor: pointer;');
                    cover.find('.dialog-button').children('a').last().addClass('btn-cancel');
                    cover.find('.dialog-button').children('a').last().text('取消');
                    break;
                case 'alert':
                    cover.find('.dialog-button').remove();
                    break;
            }
        } else {
            cover.find('.dialog-button').remove();
        }

        $('body').css('overflow', 'hidden');
        $('body').append(cover);
        var dialogWdHeight = cover.find('.dialog-wd').css('height');
        $('.tip-dialog').find('.dialog-wd').css('margin-top', - parseInt(dialogWdHeight) / 2 + 'px');

        //$('.tip-dialog').off();
        var hasButton = cover.find('.dialog-button').length;
        if (hasButton) {
            var hasConfirm = cover.find('.btn-confirm').length;
            if (hasConfirm && !_hasBoundEvent_('.btn-confirm', 'click')) {
                $('.btn-confirm').one('click', function () {
                    if (fn && typeof(fn) == 'function') {
                        try {
                            fn.call();
                        } catch (e) {
                        }
                    }
                    _tipDialog_.delForm();
                });
            }
            var hasCancel = cover.find('.btn-cancel').length;
            if (hasCancel && !_hasBoundEvent_('.btn-cancel', 'click')) {
                $('.btn-cancel').one('click', function () {
                    _tipDialog_.delForm();
                });
            }
        } else {
            if (!_hasBoundEvent_('.tip-dialog', 'click')) {
                $('.tip-dialog').one('click', function () {
                    _tipDialog_.delForm();
                });
            }
        }
    },
    delForm: function ()
    {
        $('body').css('overflow', '');
        $('.tip-dialog').remove();
    }
};
// 提示对话框：结束

// 遮罩层：开始
var _LOADING_COVER_ = '<div class="loading-bg" style="position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: #000; z-index: 999; filter: alpha(opacity=20); opacity: 0.2;"><div style="position: absolute; top: 50%; left: 50%; margin-left: -50px; margin-top: -50px;"><img src="data:image/gif;base64,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" style="width: 100px;"/></div></div>';

function _loadingStart_(elem, css)
{
    var cover = $(_LOADING_COVER_);
    cover.width(window.width);
    cover.height(window.height);
    var target = $('body');
    if (elem) {
        target = $(elem);
        target.css('position', 'relative');
        cover.css('position', 'absolute')
    }
    target.append(cover);
    if (css) {
        $.each(css, function(idx,val) {
            target.children('.loading-bg').css(idx,val);
        });
    }
}

function _loadingEnd_(elem)
{
    var target = $('body');
    if (elem) {
        target = $(elem);
    }
    target.children('.loading-bg').remove();
}
// 遮罩层：结束

//Ajax的http请求
var _myAjax_ = function(opt)
{
    var url = (typeof(opt.url) != undefined) ? encodeURI(opt.url) : window.location.href;
    var method = (typeof(opt.method) != undefined) ? opt.method : 'GET';
    var timeout = (typeof(opt.timeout) != undefined) ? opt.timeout : 5000;
    var data = (typeof(opt.data) != undefined) ? opt.data : '';
    var dataType = (typeof(opt.dataType) != undefined) ? opt.dataType : 'jsonp';
    var processData = (typeof(opt.processData) != undefined) ? opt.processData : true;
    var contentType = (typeof(opt.contentType) != undefined) ? opt.contentType : 'application/x-www-form-urlencoded; charset=UTF-8';
    var cache = (typeof(opt.cache) != undefined) ? opt.cache : (!(dataType == 'script' || dataType == 'jsonp'));
    var success = (typeof(opt.success) != undefined) ? opt.success : null;
    var error = (typeof(opt.error) != undefined) ? opt.error : null;
    $.ajax({
        url: url,
        method: method,
        timeout: timeout,
        data: data,
        dataType: dataType,
        processData: processData,
        contentType: contentType,
        cache: cache,
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token_"]').val()
        },
        success: function (data) {
            //console.log(data);
            if (success != null) success(data);
        },
        error: function (err) {
            //console.log(err);
            if (error != null) error(err);
        }
    });
};

/*
// 判断IE浏览器（版本8及以下的最简方式）
var ies = !-[1,];
if (ies) {
    // 去首尾空格（IE兼容）
    String.prototype.trim = function()
    {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    };
    // 页面完成加载后
    $(function () {
        // 兼容IE的input和textarea元素placeholder属性：开始
        var inputs = $('input[placeholder], textarea[placeholder]');
        inputs.each(function () {
            var placeholder = $(this).attr('placeholder');
            if (placeholder) {
                $(this).css('color', '#999');
                $(this).val(placeholder);
                $(this).addClass('ies-placeholder');
            }
        });
        $(document).on('focus', 'input[placeholder], textarea[placeholder]', function () {
            var placeholder = $(this).attr('placeholder');
            var value = $(this).val().trim();
            if(placeholder && value == placeholder){
                $(this).val('');
                $(this).css('color', '');
                $(this).removeClass('ies-placeholder');
            }
        });
        $(document).on('blur', 'input[placeholder], textarea[placeholder]', function () {
            var placeholder = $(this).attr('placeholder');
            var value = $(this).val().trim();
            if(placeholder && _isEmpty_(value)){
                $(this).css('color', '#999');
                $(this).val(placeholder);
                $(this).addClass('ies-placeholder');
            }
        });
        // 兼容IE的input和textarea元素placeholder属性：结束
    });
}

//兼容IE8的数组indexOf方法
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /!*, from*!/){
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++){
            if (from in this && this[from] === elt)
                return from;
        }
        return -1;
    };
}

//兼容IE8的数组forEach方法
if (!Array.prototype.forEach)
{
    Array.prototype.forEach = function forEach(callback, arg) {
        var T, k;
        if (this == null) {
            throw new TypeError("this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (arguments.length > 1) {
            T = arg;
        }
        k = 0;
        while(k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call( T, kValue, k, O );
            }
            k++;
        }
    };
}
*/
