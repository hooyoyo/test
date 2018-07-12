require.config(
    {
        baseUrl: '../',
        paths: {
            'jquery': ['https://code.jquery.com/jquery-3.3.1.min', 'lib/Framework/jquery/3.3.1/jquery.min'],
            'bootstrap': ['https://cdn.bootcss.com/bootstrap/4.1.1/js/bootstrap.bundle.min', 'lib/Framework/bootstrap/4.1.1/js/bootstrap.bundle.min'],
            'base': ['js/base'],
            'temp': ['js/temp']
        },
        map: {
            '*': {
                'require-css': 'lib/require/2.3.5/css'
            }
        },
        shim: {
            // 'foo': {
            //     deps: ['bar'],
            //     exports: 'Foo',
            //     init: function (bar) {
            //         return this.Foo.noConflict();
            //     }
            // },
            // 'library.plugin': ['library'],
            'jquery': {
                exports: '$'
            },
            'bootstrap': {
                deps: ['jquery']
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
                    'require-css!https://cdn.bootcss.com/bootstrap/4.1.1/css/bootstrap.min',
                    //'require-css!lib/Framework/bootstrap/4.1.1/css/bootstrap.min',
                    'require-css!css/base',
                    'require-css!css/temp',
                    'jquery',
                    'bootstrap',
                    'base'
                ]
            }
        }
    }
);

require(['temp'], function () {
    console.log('load complete');
});