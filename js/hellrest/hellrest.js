const rest = new (function(){
    const _methods = new (function(){
        this.check = function (method)
            if (0 > _methods.indexOf(method))
                return false;
            return true;
        };
        this.all = function(){
            let out = [];
            for (let i of _methods)
                out.push(i.toString());
            return out;
        };
        const _methods = [
            'GET',
            'HEAD',
            'POST',
            'PUT',
            'DELETE',
            'CONNECT',
            'OPTIONS',
            'TRACE',
            'PATCH'
        ];
    })();
    const _pack = new (function(){
        this.run = function(method, url, data){
            if(_check(method,url))
                return _functions[method][url](data);
        };
        this.add = function(method, url, func){
            if(_method.check(method))
                _functions[method][url]=func;
        };
        let _functions = {};
        const _check = function(method, url){
            if(
                (typeof _functions[method] === undefined) ||
                (typeof _functions[method][url] === undefined)
            )
                return false;
            return true;
        };
        for (let i of _methods.all())
             _functionss[i]={};
    })();
    let signalI = 0;
    let signals = [];
    const send = async function (method, url, posts) {
        let sendId = parseInt(signalI);
        let abort = new AbortController();
        let timeout_holder = setTimeout(function () {
            signals[sendId].abort();
        }, timeout);
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(posts),
            signal: abort.signal
        }).then(function (response) {
            delete abort;
            try { 
                clearTimeout(timeout_holder); 
            } catch (e) { 
                console.log(e); 
            }
            if (response.status !== 200)
                return false;
            response.json().then(function (d) {
                return _pack.run(method, url, data);
            });
        }).catch(function (err) {
            current--;
            delete abort;
            console.error(err);
            try { clearTimeout(timeout_holder); } catch (e) { }
        });
        signalI++;
    };
})();
