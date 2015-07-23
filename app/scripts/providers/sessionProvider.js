'use strict';

angular.module('kpapply')
    .provider('sessionProvider', function(){
       this.logoutUrl = "/logout";
       this.$get = function(){
           return {
               logoutUrl: this.logoutUrl,
               callback: function(){
                   console.log("This is the callback function");
               }
           }
       };

    });