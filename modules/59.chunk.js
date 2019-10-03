(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{"4CIL":function(n,a){n.exports={snippet:'angular<span class="token punctuation">.</span><span class="token function">module</span><span class="token punctuation">(</span><span class="token string">\'app\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">controller</span><span class="token punctuation">(</span><span class="token string">\'ProgressBarDemoCtrl\'</span><span class="token punctuation">,</span> ProgressBarDemoCtrl<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">ProgressBarDemoCtrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n\n    vm<span class="token punctuation">.</span>percentComplete <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>\n\n    vm<span class="token punctuation">.</span><span class="token function-variable function">random</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        vm<span class="token punctuation">.</span>percentComplete <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>',example:"angular.module('app').controller('ProgressBarDemoCtrl', ProgressBarDemoCtrl);\n\nfunction ProgressBarDemoCtrl() {\n    var vm = this;\n\n    vm.percentComplete = 15;\n\n    vm.random = function () {\n        vm.percentComplete = Math.floor((Math.random() * 100) + 1);\n    };\n}"}},"5GH2":function(n,a,t){var l={"./app.html":"hIQ+","./app.ts":"LcJ0"};function s(n){var a=e(n);return t(a)}function e(n){var a=l[n];if(!(a+1)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return a}s.keys=function(){return Object.keys(l)},s.resolve=e,n.exports=s,s.id="5GH2"},"6HwM":function(n,a,t){var l={"./controller.js":"4CIL","./layout.html":"p3Vb"};function s(n){var a=e(n);return t(a)}function e(n){var a=l[n];if(!(a+1)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return a}s.keys=function(){return Object.keys(l)},s.resolve=e,n.exports=s,s.id="6HwM"},LcJ0:function(n,a){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token punctuation">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token punctuation">:</span> <span class="token string">\'./app.component.html\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n    value<span class="token punctuation">:</span> number <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>\n\n    <span class="token function">randomize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n',example:"import { Component } from '@angular/core';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html'\n})\nexport class AppComponent {\n\n    value: number = 15;\n\n    randomize() {\n        this.value = Math.floor((Math.random() * 100) + 1);\n    }\n}\n"}},V3TL:function(n,a,t){"use strict";t.r(a);var l=t("CcnG"),s=t("T/2f"),e=t("YZ8U"),p=t("mrSG"),u=t("AVdU"),o=t("yHOM"),c=t("W9B5"),r=function(n){function a(){var a=n.call(this,t("6HwM"))||this;return a.playground=Object(c.a)({html:a.snippets.raw.layoutHtml,htmlAttributes:{"ng-controller":"ProgressBarDemoCtrl as vm"},js:[a.snippets.raw.controllerJs]}),a}return Object(p.__extends)(a,n),Object(p.__decorate)([Object(o.a)("ComponentsProgressBarNg1Component")],a)}(u.a),d=function(n){function a(){var a=n.call(this,t("5GH2"))||this;return a.value=15,a.playground={files:{"app.component.html":a.snippets.raw.appHtml,"app.component.ts":a.snippets.raw.appTs},modules:[{imports:["ProgressBarModule"],library:"@ux-aspects/ux-aspects"}]},a}return Object(p.__extends)(a,n),a.prototype.randomize=function(){this.value=Math.floor(100*Math.random()+1)},Object(p.__decorate)([Object(o.a)("ComponentsProgressBarComponent")],a)}(u.a),i={category:e.b.resolveCategoryData(e.a.Components,"Progress")},m=function(){return function(n,a){a.registerResolver(n)}}(),k=t("WmtN"),g=t("CfOV"),b=t("pMnS"),f=t("GBPT"),v=t("rYg0"),h=t("wRzz"),y=t("unTc"),x=t("r1ng"),C=t("COk8"),w=l["\u0275crt"]({encapsulation:2,styles:[],data:{}});function M(n){return l["\u0275vid"](2,[(n()(),l["\u0275eld"](0,0,null,null,1,"uxd-progress-bar-wrapper",[],null,null,null,null,null)),l["\u0275did"](1,999424,null,0,h.a,[l.ElementRef,l.Injector],null,null),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](3,0,null,null,0,"hr",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](5,0,null,null,13,"p",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["Create a "])),(n()(),l["\u0275eld"](7,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["progressbar"])),(n()(),l["\u0275ted"](-1,null,[" element and set the value attribute to the value property. Set "])),(n()(),l["\u0275eld"](10,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,['type="accent"'])),(n()(),l["\u0275ted"](-1,null,["\n  and the max attribute to the maximum allowed value. Inside the "])),(n()(),l["\u0275eld"](13,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["progressbar"])),(n()(),l["\u0275ted"](-1,null,[" element you can specify a "])),(n()(),l["\u0275eld"](16,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["span"])),(n()(),l["\u0275ted"](-1,null,["\n  which can be used to display the current value."])),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](20,0,null,null,20,"ux-tabset",[],[[2,"tabs-left",null],[2,"tabs-right",null]],null,null,g.wc,g.db)),l["\u0275prd"](512,null,y.ff,y.ff,[]),l["\u0275did"](22,4374528,null,1,y.df,[y.ff,l.ChangeDetectorRef],{minimal:[0,"minimal"]},null),l["\u0275qud"](603979776,1,{_tabs:1}),(n()(),l["\u0275ted"](-1,0,["\n  "])),(n()(),l["\u0275eld"](25,0,null,0,6,"ux-tab",[["heading","HTML"]],null,null,null,g.vc,g.cb)),l["\u0275did"](26,245760,[[1,4]],1,y.Xe,[y.ff,l.ChangeDetectorRef],{heading:[0,"heading"]},null),l["\u0275qud"](603979776,2,{headingRef:0}),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](29,0,null,0,1,"uxd-snippet",[["language","html"]],null,null,null,x.b,x.a)),l["\u0275did"](30,114688,null,0,C.a,[],{language:[0,"language"],content:[1,"content"]},null),(n()(),l["\u0275ted"](-1,0,["\n  "])),(n()(),l["\u0275ted"](-1,0,["\n  "])),(n()(),l["\u0275eld"](33,0,null,0,6,"ux-tab",[["heading","JavaScript"]],null,null,null,g.vc,g.cb)),l["\u0275did"](34,245760,[[1,4]],1,y.Xe,[y.ff,l.ChangeDetectorRef],{heading:[0,"heading"]},null),l["\u0275qud"](603979776,3,{headingRef:0}),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](37,0,null,0,1,"uxd-snippet",[["language","javascript"]],null,null,null,x.b,x.a)),l["\u0275did"](38,114688,null,0,C.a,[],{language:[0,"language"],content:[1,"content"]},null),(n()(),l["\u0275ted"](-1,0,["\n  "])),(n()(),l["\u0275ted"](-1,0,["\n"])),(n()(),l["\u0275ted"](-1,null,["\n"]))],function(n,a){var t=a.component;n(a,1,0),n(a,22,0,!1),n(a,26,0,"HTML"),n(a,30,0,"html",t.snippets.compiled.layoutHtml),n(a,34,0,"JavaScript"),n(a,38,0,"javascript",t.snippets.compiled.controllerJs)},function(n,a){n(a,20,0,"left"===l["\u0275nov"](a,22).stacked,"right"===l["\u0275nov"](a,22).stacked)})}function R(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,1,"uxd-progress-bar-ng1",[],null,null,null,M,w)),l["\u0275did"](1,49152,null,0,r,[],null,null)],null,null)}var T=l["\u0275ccf"]("uxd-progress-bar-ng1",r,R,{},{},[]),D=t("9hoY"),O=t("+gXg"),j=t("rpQh"),L=t("2RDK"),_=l["\u0275crt"]({encapsulation:2,styles:[],data:{}});function z(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,5,"ux-progress-bar",[["class","m-b-md"],["max","100"],["role","progressbar"]],[[1,"aria-valuemin",0],[1,"aria-valuemax",0],[1,"aria-valuenow",0]],null,null,g.jc,g.Q)),l["\u0275did"](1,49152,null,0,y.Nd,[],{value:[0,"value"],max:[1,"max"]},null),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](3,0,null,0,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(n()(),l["\u0275ted"](4,null,["","%"])),(n()(),l["\u0275ted"](-1,0,["\n"])),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](7,0,null,null,2,"button",[["class","btn btn-primary"],["type","button"]],null,[[null,"click"]],function(n,a,t){var l=!0;return"click"===a&&(l=!1!==n.component.randomize()&&l),l},null,null)),l["\u0275did"](8,212992,null,0,y.gb,[l.ElementRef,y.ec,y.c,l.NgZone,[2,y.Jc]],null,null),(n()(),l["\u0275ted"](-1,null,["Random"])),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](11,0,null,null,0,"hr",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](13,0,null,null,7,"p",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["\n    A progress bar can be created by using the "])),(n()(),l["\u0275eld"](15,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["ux-progress-bar"])),(n()(),l["\u0275ted"](-1,null,[" component. Custom content can be added to the\n    bar by adding HTML inside the "])),(n()(),l["\u0275eld"](18,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["ux-progress-bar"])),(n()(),l["\u0275ted"](-1,null,[" tag.\n"])),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](22,0,null,null,7,"p",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["\n    Additional contextual information can be provided to screen readers by adding an "])),(n()(),l["\u0275eld"](24,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["aria-valuetext"])),(n()(),l["\u0275ted"](-1,null,[" attribute\n    to the "])),(n()(),l["\u0275eld"](27,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["ux-progress-bar"])),(n()(),l["\u0275ted"](-1,null,[".\n"])),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](31,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["\n    The following attributes can be used to configure the appearance and behavior of the progress bar:\n"])),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](34,0,null,null,25,"uxd-api-properties",[["tableTitle","Inputs"]],null,null,null,D.b,D.a)),l["\u0275did"](35,49152,null,0,O.a,[],{tableTitle:[0,"tableTitle"]},null),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](37,0,null,0,5,"tr",[["name","value"],["type","number"],["uxd-api-property",""]],null,null,null,j.b,j.a)),l["\u0275did"](38,49152,null,0,L.a,[],{name:[0,"name"],type:[1,"type"]},null),(n()(),l["\u0275ted"](-1,0,["\n        The value the bar should represent. This will be compared to the "])),(n()(),l["\u0275eld"](40,0,null,0,1,"code",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["max"])),(n()(),l["\u0275ted"](-1,0,[" value to determine the width of\n        the bar.\n    "])),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](44,0,null,0,2,"tr",[["defaultValue","0"],["name","min"],["type","number"],["uxd-api-property",""]],null,null,null,j.b,j.a)),l["\u0275did"](45,49152,null,0,L.a,[],{name:[0,"name"],type:[1,"type"],defaultValue:[2,"defaultValue"]},null),(n()(),l["\u0275ted"](-1,0,["\n        The lower limit of the bar.\n    "])),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](48,0,null,0,2,"tr",[["defaultValue","100"],["name","max"],["type","number"],["uxd-api-property",""]],null,null,null,j.b,j.a)),l["\u0275did"](49,49152,null,0,L.a,[],{name:[0,"name"],type:[1,"type"],defaultValue:[2,"defaultValue"]},null),(n()(),l["\u0275ted"](-1,0,["\n        The upper limit of the bar.\n    "])),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](52,0,null,0,2,"tr",[["defaultValue","grey7"],["name","trackColor"],["type","string"],["uxd-api-property",""]],null,null,null,j.b,j.a)),l["\u0275did"](53,49152,null,0,L.a,[],{name:[0,"name"],type:[1,"type"],defaultValue:[2,"defaultValue"]},null),(n()(),l["\u0275ted"](-1,0,["\n        The color of the track.\n    "])),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](56,0,null,0,2,"tr",[["defaultValue","accent"],["name","barColor"],["type","string"],["uxd-api-property",""]],null,null,null,j.b,j.a)),l["\u0275did"](57,49152,null,0,L.a,[],{name:[0,"name"],type:[1,"type"],defaultValue:[2,"defaultValue"]},null),(n()(),l["\u0275ted"](-1,0,["\n        The color of the bar.\n    "])),(n()(),l["\u0275ted"](-1,0,["\n"])),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](61,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["The following code can be used to create the example above:"])),(n()(),l["\u0275ted"](-1,null,["\n\n"])),(n()(),l["\u0275eld"](64,0,null,null,20,"ux-tabset",[],[[2,"tabs-left",null],[2,"tabs-right",null]],null,null,g.wc,g.db)),l["\u0275prd"](512,null,y.ff,y.ff,[]),l["\u0275did"](66,4374528,null,1,y.df,[y.ff,l.ChangeDetectorRef],{minimal:[0,"minimal"]},null),l["\u0275qud"](603979776,1,{_tabs:1}),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](69,0,null,0,6,"ux-tab",[["heading","HTML"]],null,null,null,g.vc,g.cb)),l["\u0275did"](70,245760,[[1,4]],1,y.Xe,[y.ff,l.ChangeDetectorRef],{heading:[0,"heading"]},null),l["\u0275qud"](603979776,2,{headingRef:0}),(n()(),l["\u0275ted"](-1,0,["\n        "])),(n()(),l["\u0275eld"](73,0,null,0,1,"uxd-snippet",[["language","html"]],null,null,null,x.b,x.a)),l["\u0275did"](74,114688,null,0,C.a,[],{language:[0,"language"],content:[1,"content"]},null),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275eld"](77,0,null,0,6,"ux-tab",[["heading","JavaScript"]],null,null,null,g.vc,g.cb)),l["\u0275did"](78,245760,[[1,4]],1,y.Xe,[y.ff,l.ChangeDetectorRef],{heading:[0,"heading"]},null),l["\u0275qud"](603979776,3,{headingRef:0}),(n()(),l["\u0275ted"](-1,0,["\n        "])),(n()(),l["\u0275eld"](81,0,null,0,1,"uxd-snippet",[["language","javascript"]],null,null,null,x.b,x.a)),l["\u0275did"](82,114688,null,0,C.a,[],{language:[0,"language"],content:[1,"content"]},null),(n()(),l["\u0275ted"](-1,0,["\n    "])),(n()(),l["\u0275ted"](-1,0,["\n"]))],function(n,a){var t=a.component;n(a,1,0,t.value,"100"),n(a,8,0),n(a,35,0,"Inputs"),n(a,38,0,"value","number"),n(a,45,0,"min","number","0"),n(a,49,0,"max","number","100"),n(a,53,0,"trackColor","string","grey7"),n(a,57,0,"barColor","string","accent"),n(a,66,0,!1),n(a,70,0,"HTML"),n(a,74,0,"html",t.snippets.compiled.appHtml),n(a,78,0,"JavaScript"),n(a,82,0,"javascript",t.snippets.compiled.appTs)},function(n,a){var t=a.component;n(a,0,0,l["\u0275nov"](a,1).min,l["\u0275nov"](a,1).max,l["\u0275nov"](a,1).valueNow),n(a,4,0,t.value),n(a,64,0,"left"===l["\u0275nov"](a,66).stacked,"right"===l["\u0275nov"](a,66).stacked)})}function H(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,1,"uxd-progress-bar",[],null,null,null,z,_)),l["\u0275did"](1,49152,null,0,d,[],null,null)],null,null)}var V=l["\u0275ccf"]("uxd-progress-bar",d,H,{},{},[]),N=t("Ip0R"),P=t("M2Lx"),I=t("lLAP"),J=t("gIcY"),B=t("eDkP"),F=t("Fzqc"),A=t("x4zH"),S=t("dWZg"),q=t("qina"),E=t("zCE2"),U=t("4c35"),G=t("qAlS"),Q=t("ZYCi"),X=t("FLOw"),Y=t("XtaT");t.d(a,"ComponentsProgressModuleNgFactory",function(){return Z});var Z=l["\u0275cmf"](m,[],function(n){return l["\u0275mod"]([l["\u0275mpd"](512,l.ComponentFactoryResolver,l["\u0275CodegenComponentFactoryResolver"],[[8,[k.a,g.tb,g.a,b.a,f.a,v.a,T,V]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l["\u0275mpd"](4608,N.NgLocalization,N.NgLocaleLocalization,[l.LOCALE_ID,[2,N["\u0275angular_packages_common_common_a"]]]),l["\u0275mpd"](4608,P.c,P.c,[]),l["\u0275mpd"](4608,y.c,y.c,[[2,y.a]]),l["\u0275mpd"](4608,y.Q,y.Q,[]),l["\u0275mpd"](4608,y.ec,y.ec,[I.d,y.c,y.dc,[2,y.a],l.RendererFactory2]),l["\u0275mpd"](4608,y.Kc,y.Kc,[l.RendererFactory2]),l["\u0275mpd"](4608,J.A,J.A,[]),l["\u0275mpd"](4608,y.vc,y.vc,[[3,y.vc],[2,y.sc]]),l["\u0275mpd"](4608,B.a,B.a,[B.f,B.b,l.ComponentFactoryResolver,B.e,B.c,l.Injector,l.NgZone,N.DOCUMENT,F.b]),l["\u0275mpd"](5120,B.g,B.h,[B.a]),l["\u0275mpd"](4608,y.yf,y.yf,[]),l["\u0275mpd"](4608,y.Jd,y.Jd,[]),l["\u0275mpd"](5120,"flotDataService",A.b,["$injector"]),l["\u0275mpd"](5120,"lineDataService",A.c,["$injector"]),l["\u0275mpd"](1073742336,N.CommonModule,N.CommonModule,[]),l["\u0275mpd"](1073742336,S.b,S.b,[]),l["\u0275mpd"](1073742336,P.d,P.d,[]),l["\u0275mpd"](1073742336,I.a,I.a,[]),l["\u0275mpd"](1073742336,y.G,y.G,[]),l["\u0275mpd"](1073742336,y.b,y.b,[]),l["\u0275mpd"](1073742336,q.a,q.a,[]),l["\u0275mpd"](1073742336,E.a,E.a,[]),l["\u0275mpd"](1073742336,y.pb,y.pb,[]),l["\u0275mpd"](1073742336,J.z,J.z,[]),l["\u0275mpd"](1073742336,J.l,J.l,[]),l["\u0275mpd"](1073742336,y.uc,y.uc,[]),l["\u0275mpd"](1073742336,F.a,F.a,[]),l["\u0275mpd"](1073742336,U.c,U.c,[]),l["\u0275mpd"](1073742336,G.a,G.a,[]),l["\u0275mpd"](1073742336,B.d,B.d,[]),l["\u0275mpd"](1073742336,y.z,y.z,[]),l["\u0275mpd"](1073742336,y.xf,y.xf,[]),l["\u0275mpd"](1073742336,y.Md,y.Md,[]),l["\u0275mpd"](1073742336,Q.s,Q.s,[[2,Q.x],[2,Q.o]]),l["\u0275mpd"](1073742336,y.je,y.je,[]),l["\u0275mpd"](1073742336,X.a,X.a,[]),l["\u0275mpd"](1073742336,y.Id,y.Id,[]),l["\u0275mpd"](1073742336,Y.a,Y.a,[]),l["\u0275mpd"](1073742336,y.Od,y.Od,[]),l["\u0275mpd"](1073742336,y.ef,y.ef,[]),l["\u0275mpd"](1073742336,A.a,A.a,[]),l["\u0275mpd"](1073742336,m,m,[l.ComponentFactoryResolver,e.b]),l["\u0275mpd"](1024,Q.m,function(){return[[{path:"**",component:s.a,data:i}]]},[])])})},"hIQ+":function(n,a){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-progress-bar</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>m-b-md<span class="token punctuation">"</span></span> <span class="token attr-name">[value]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>value<span class="token punctuation">"</span></span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>{{ value }}%<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-progress-bar</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn btn-primary<span class="token punctuation">"</span></span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>randomize()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Random<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>',example:'<ux-progress-bar class="m-b-md" [value]="value" max="100">\n    <span>{{ value }}%</span>\n</ux-progress-bar>\n\n<button type="button" class="btn btn-primary" (click)="randomize()">Random</button>'}},p3Vb:function(n,a){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>progressbar</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>vm.percentComplete<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>accent<span class="token punctuation">"</span></span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">ng-bind</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>vm.percentComplete+<span class="token punctuation">\'</span>%<span class="token punctuation">\'</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>progressbar</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn btn-primary<span class="token punctuation">"</span></span> <span class="token attr-name">ng-click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>vm.random()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Random<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>',example:'<progressbar value="vm.percentComplete" type="accent" max="100">\n    <span ng-bind="vm.percentComplete+\'%\'"></span>\n</progressbar>\n<button type="button" class="btn btn-primary" ng-click="vm.random()">Random</button>'}}}]);