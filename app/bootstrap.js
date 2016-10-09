import './styles/index.sass'
import '../node_modules/angular-material/angular-material.css'
import angular from 'angular';
import App     from 'source/index.js';
import * as io from 'socket.io-client'

angular.bootstrap(document, [App]);
