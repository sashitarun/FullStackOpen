(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=t(2),l=t(3),i=t.n(l),m="/api/persons",d=function(){return i.a.get(m).then((function(e){return e.data}))},s=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))};var b=function(e){var n=e.persons,t=e.filterName,a=function(e){var n=e.person;console.log(n),window.confirm("Delete ".concat(n.name," ?"))?(console.log("Deleting ",n.name),h(n.id).then((function(e){return console.log("Successfully deleted")})).catch((function(e){return console.log("Failed")}))):console.log("No"),window.location.reload(!1)};if(""===t)return r.a.createElement("div",null,n.map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return a({person:e})}}," delete "))})));var o=n.filter((function(e){var n=e.name.toLowerCase(),a=t.toLowerCase();return!0===n.includes(a)?(console.log(e),e):null}));return r.a.createElement("div",null,o.map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return a({person:e})}}," delete "))})))},p=function(e){return r.a.createElement("form",{onSubmit:e.addContact},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:e.handleNameChange}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},E=function(e){return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:e.handleFilterNameChange}))};t(36);var g=function(e){var n=e.message;return null!==n?r.a.createElement("div",{className:"message"},n):null},v=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),l=Object(u.a)(c,2),i=l[0],m=l[1],h=Object(a.useState)(""),v=Object(u.a)(h,2),w=v[0],C=v[1],j=Object(a.useState)(""),k=Object(u.a)(j,2),N=k[0],O=k[1],y=Object(a.useState)(null),S=Object(u.a)(y,2),x=S[0],D=S[1];Object(a.useEffect)((function(){d().then((function(e){o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:x}),r.a.createElement(E,{handleFilterNameChange:function(e){O(e.target.value)}}),r.a.createElement("h2",null,"Add a new "),r.a.createElement(p,{addContact:function(e){if(e.preventDefault(),e.target.reset(),-1!==t.findIndex((function(e){return e.name===i&&e.number===w})))window.alert("".concat(i," is already added to phonebook"));else if(-1!==t.findIndex((function(e){return e.name===i&&e.number!==w}))){if(window.confirm("".concat(i," is already added to phonebook , replace the old number with the new one ? "))){var n=t.find((function(e){return e.name===i})),a={name:i,number:w,id:n.id};s(n.id,a).then((function(e){o(t.map((function(e){return e.id!==n.id?e:a})))})),D("".concat(i,"'s contact has been updated")),setTimeout((function(){D(null)}),3e3)}}else{var r={name:i,number:w};f(r).then((function(e){return o(t.concat(r))})),D("".concat(i,"'s contact has been created")),setTimeout((function(){D(null)}),3e3)}},handleNameChange:function(e){m(e.target.value)},handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(b,{persons:t,filterName:N}))};c.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.9ebf636d.chunk.js.map