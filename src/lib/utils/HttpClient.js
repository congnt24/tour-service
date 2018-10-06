import axios from 'axios';
import util from 'util';

class HttpClientClass {
    constructor(base_url) {
        this.httpClient = axios.create({
            baseURL: base_url,
            timeout: 10000
        });
        // this.httpClient.defaults.timeout = 5000;
        // this.httpClient.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    request(method, url, options) {
        let {log, expedia} = options;
        delete options.log;
        let query = Object.assign({
            method: method || 'get',
            url
        }, options);
        //TODO: Log query here
        console.log('----------------Request-----------------');
        console.log(util.inspect(query, false, null), 'Request');

        return this.httpClient(query).then(result => {
            //    TODO: Log response here
            console.log('----------------Response-----------------');
            console.log(util.inspect(result.data, false, null), 'Response');
            if (log) {
                // logstash({
                //     api_name: url,
                //     api_request: JSON.stringify(query),
                //     api_response: JSON.stringify(result.data)
                // }, 'api_success', 'request_api_success');
            }
            return result.data
        }).catch(err => {
            console.error(err);
            if (log) {
                // logstash({
                //     api_name: url,
                //     api_request: JSON.stringify(query),
                //     api_response: JSON.stringify(err.response ? err.response.data : 'no_response')
                // }, 'api_error', 'request_api_error');
            }
            return err.response ? err.response.data : 'no_response'
        })
    }

    get(url, params, options = {}) {
        return this.request('get', url, Object.assign(options, {params}))
    }

    post(url, body, options = {}) {
        return this.request('post', url, Object.assign(options, {data: body}))
    }

    put(url, body, options = {}) {
        return this.request('put', url, Object.assign(options, {data: body}))
    }

    patch(url, body, options = {}) {
        return this.request('patch', url, Object.assign(options, {data: body}))
    }

    delete(url, body, options = {}) {
        return this.request('delete', url, Object.assign(options, {data: body}))
    }
}
let HttpClient = new HttpClientClass(`http://34.207.88.68`);
export {HttpClient};

