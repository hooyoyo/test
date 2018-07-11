require.config(
    {
        baseUrl: '../',
        paths: {
            'jquery': ['https://code.jquery.com/jquery-3.3.1.min', 'lib/Framework/jquery/3.3.1/jquery.min'],
            'popper': ['https://cdn.bootcss.com/popper.js/1.14.3/umd/popper.min', 'lib/Framework/bootstrap/4.1.1/oth/popper.min'],
            'bootstrap': ['https://cdn.bootcss.com/bootstrap/4.1.1/js/bootstrap.min', 'lib/Framework/bootstrap/4.1.1/js/bootstrap.min'],
            'base': 'js/base',
            'temp': 'js/temp'
        },
        map: {
            '*': {
                'css': 'lib/require/2.3.5/css'
            }
        },
        shim: {
            //'jquery.form': ['jquery'],
            'jquery': {
                exports: '$'
            },
            'popper': {
                deps: ['jquery'],
                exports: 'Popper'
            },
            'bootstrap': {
                deps: ['jquery', 'popper'],
                exports: 'bootstrap'
            },
            'base': {
                deps: ['jquery'],
                init: function() {
                    return {
                        _getQueryString_: _getQueryString_,
                        _getQueryStringByName_: _getQueryStringByName_,
                        _getQueryStringByIndex_: _getQueryStringByIndex_,
                        _getQueryStringParam_: _getQueryStringParam_,
                        _arrParamStrToParam_: _arrParamStrToParam_,
                        _regExp_: _regExp_,
                        _isDate_: _isDate_,
                        _rndStr_: _rndStr_,
                        _rndNum_: _rndNum_,
                        _isEmpty_: _isEmpty_,
                        _isArray_: _isArray_,
                        _hasBoundEvent_: _hasBoundEvent_,
                        _dropoffUrlParam_: _dropoffUrlParam_,
                        _toErrorPage_: _toErrorPage_,
                        _isWeChat_: _isWeChat_,
                        _tipDialog_: _tipDialog_,
                        _loadingStart_: _loadingStart_,
                        _loadingEnd_: _loadingEnd_,
                        _myAjax_: _myAjax_
                    }
                }
            },
            'temp': {
                deps: [
                    'css!lib/Framework/bootstrap/4.1.1/css/bootstrap.min',
                    'css!css/base',
                    'css!css/temp',
                    'jquery',
                    'popper',
                    'bootstrap',
                    'base'
                ]
            }
        }
    }
);

require(['temp'],function ($) {
    console.log('load complete');
});