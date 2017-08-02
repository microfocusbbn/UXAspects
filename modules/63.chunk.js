webpackJsonp([63],{1612:function(n,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(){function n(n){var t=this;this.snippets={compiled:{},raw:{}},n.keys().forEach(function(a){var e=a.replace("./","").replace(/\W+(\w)/g,function(n){return n[1].toUpperCase()}),s=n(a);s.snippet&&(t.snippets.compiled[e]=s.snippet),s.example&&(t.snippets.raw[e]=s.example)})}return n}();t.BaseDocumentationSection=e},1825:function(n,t,a){"use strict";var e=this&&this.__decorate||function(n,t,a,e){var s,o=arguments.length,p=o<3?t:null===e?e=Object.getOwnPropertyDescriptor(t,a):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(n,t,a,e);else for(var c=n.length-1;c>=0;c--)(s=n[c])&&(p=(o<3?s(p):o>3?s(t,a,p):s(t,a))||p);return o>3&&p&&Object.defineProperty(t,a,p),p},s=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};Object.defineProperty(t,"__esModule",{value:!0});var o=a(0),p=a(23),c=a(318),l=a(170),i=a(319),u=a(1826),r=a(321),d=a(320),m=[u.ComponentsComponentListNg1Component],k=[{path:"**",component:i.DocumentationCategoryComponent,data:{category:l.ResolverService.resolveCategoryData(l.DocumentationPage.Components,"Component List")}}],f=function(){function n(n,t){t.registerResolver(n)}return n}();f=e([o.NgModule({imports:[r.WrappersModule,d.TabsModule,c.DocumentationComponentsModule,p.RouterModule.forChild(k)],exports:m,declarations:m,entryComponents:m}),s("design:paramtypes",[o.ComponentFactoryResolver,l.ResolverService])],f),t.ComponentsListModule=f},1826:function(n,t,a){"use strict";var e=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var a in t)t.hasOwnProperty(a)&&(n[a]=t[a])};return function(t,a){function e(){this.constructor=t}n(t,a),t.prototype=null===a?Object.create(a):(e.prototype=a.prototype,new e)}}(),s=this&&this.__decorate||function(n,t,a,e){var s,o=arguments.length,p=o<3?t:null===e?e=Object.getOwnPropertyDescriptor(t,a):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(n,t,a,e);else for(var c=n.length-1;c>=0;c--)(s=n[c])&&(p=(o<3?s(p):o>3?s(t,a,p):s(t,a))||p);return o>3&&p&&Object.defineProperty(t,a,p),p},o=this&&this.__metadata||function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};Object.defineProperty(t,"__esModule",{value:!0});var p=a(0),c=a(317),l=a(1612),i=function(n){function t(){var t=n.call(this,a(1827))||this;return t.codepen={html:t.snippets.raw.componentListHtml,htmlAttributes:{"ng-controller":"ComponentListDemoCtrl as vm"},js:[t.snippets.raw.componentListJs]},t}return e(t,n),t}(l.BaseDocumentationSection);i=s([p.Component({selector:"uxd-component-list-ng1",template:a(1830)}),c.DocumentationSectionComponent("ComponentsComponentListNg1Component"),o("design:paramtypes",[])],i),t.ComponentsComponentListNg1Component=i},1827:function(n,t,a){function e(n){return a(s(n))}function s(n){var t=o[n];if(!(t+1))throw new Error("Cannot find module '"+n+"'.");return t}var o={"./component-list.html":1828,"./component-list.js":1829};e.keys=function(){return Object.keys(o)},e.resolve=s,n.exports=e,e.id=1827},1828:function(n,t){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>col-md-6<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component-list</span> <span class="token attr-name">ng-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>vm.components<span class="token punctuation">"</span></span> <span class="token attr-name">min-components</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>form-control<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Enter text<span class="token punctuation">"</span></span> <span class="token attr-name">ng-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>model<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component-list</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>',example:'<div class="row">\n    <div class="col-md-6">\n        <component-list ng-model="vm.components" min-components="1">\n            <component>\n                <input type="text" class="form-control" placeholder="Enter text" ng-model="model">\n            </component>\n        </component-list>\n    </div>\n</div>'}},1829:function(n,t){n.exports={snippet:'angular<span class="token punctuation">.</span><span class="token function">module</span><span class="token punctuation">(</span><span class="token string">\'app\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">controller</span><span class="token punctuation">(</span><span class="token string">\'ComponentListDemoCtrl\'</span><span class="token punctuation">,</span> ComponentListDemoCtrl<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">ComponentListDemoCtrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n\n    vm<span class="token punctuation">.</span>components <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n',example:"angular.module('app').controller('ComponentListDemoCtrl', ComponentListDemoCtrl);\n\nfunction ComponentListDemoCtrl() {\n    var vm = this;\n\n    vm.components = [];\n}\n"}},1830:function(n,t){n.exports='<uxd-component-list-wrapper></uxd-component-list-wrapper>\n\n<hr>\n\n<p>The <code>component-list</code> directive allows you to add or remove instances of the same component. \nIt should be given an <code>ng-model</code> containing an array. If the array has any items components will initially be created for those values.\nThis array will be updated when a new field is added or when a component changes its model.</p>\n\n<p>You should provide the html for the component you want to duplicate in a <code>component</code> tag inside the <code>component-list</code> directive. \nEach component will have a property called <code>model</code> available in its scope. \nYour component should update this property which will update the <code>ng-model</code> on the <code>component-list</code>.</p>\n\n<tabset>\n    <tab heading="HTML">\n        <uxd-snippet [content]="snippets.compiled.componentListHtml" language="html"></uxd-snippet>\n    </tab>\n    <tab heading="JavaScript">\n        <uxd-snippet [content]="snippets.compiled.componentListJs" language="javascript"></uxd-snippet>\n    </tab>\n</tabset>\n\n<p>Use the following attributes to customize the behavior of the component:</p>\n\n<div class="demo-attributes table-responsive">\n<table class="table m-t">\n  <tbody><tr>\n    <th>Name</th>\n    <th>Type</th>\n    <th>Binding</th>\n    <th>Description</th>\n    <th>Optional</th>\n  </tr>\n  <tr>\n    <td class="attribute">min-components</td>\n    <td>number</td>\n    <td>variable</td>\n    <td>Specifies the minimum number of components that will be displayed. If no values have been set for these components in the <code>ng-model</code> then the default value they will be given is null. The default value is 0.</td>\n    <td>true</td>\n  </tr>\n  <tr>\n    <td class="attribute">max-components</td>\n    <td>number</td>\n    <td>variable</td>\n    <td>Specifies the maximum number of components that will be displayed. The add button will be disabled when the limit has been reached. By default there is no limit.</td>\n    <td>true</td>\n  </tr>\n  <tr>\n    <td class="attribute">button-text</td>\n    <td>string</td>\n    <td>literal</td>\n    <td>Specifies the text to be displayed beside the add button. The default text is \'Add a field\'.</td>\n    <td>true</td>\n  </tr>\n  <tr>\n    <td class="attribute">on-add</td>\n    <td>function</td>\n    <td>variable</td>\n    <td>If specified the function will be called when a new item is being added to the list.</td>\n    <td>true</td>\n  </tr>\n  <tr>\n    <td class="attribute">on-remove</td>\n    <td>function</td>\n    <td>variable</td>\n    <td>If specified the function will be called when an item is being removed from the list.</td>\n    <td>true</td>\n  </tr>\n</tbody>\n</table>\n</div>'}});