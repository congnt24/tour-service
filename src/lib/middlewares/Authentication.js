import passport from 'passport';
import Bearer from 'passport-http-bearer';
import _ from 'lodash';

let conf = {};

export function init(config) {
    conf = config;
}
