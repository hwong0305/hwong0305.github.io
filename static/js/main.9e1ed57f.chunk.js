(this["webpackJsonpdnd-kanban"]=this["webpackJsonpdnd-kanban"]||[]).push([[0],{39:function(e,t,n){e.exports=n(85)},44:function(e,t,n){},45:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(15),c=n.n(r),i=(n(44),n(3)),l=n(8),d=n(10),s=(n(45),n(4)),u=function(e){var t=e.listId,n=e.listType,r=e.name,c=Object(a.useState)(""),i=Object(l.a)(c,2),u=i[0],b=i[1];return o.a.createElement("div",{className:"kanban"},o.a.createElement("header",{className:"board-header",id:r},o.a.createElement("span",null,r)),o.a.createElement("main",null,o.a.createElement("div",null,o.a.createElement(d.c,{droppableId:t,type:n,direction:"vertical",isCombineEnabled:!1},(function(t){return o.a.createElement("div",t.droppableProps,o.a.createElement("div",null,o.a.createElement("div",{ref:t.innerRef},o.a.createElement("ul",{className:"todos"},e.todos.map((function(t,n){return o.a.createElement(d.b,{draggableId:"".concat(e.name,":").concat(n),key:n,index:n},(function(a){return o.a.createElement("div",Object.assign({},a.dragHandleProps,a.draggableProps,{ref:a.innerRef,className:"item"}),o.a.createElement("div",null,o.a.createElement("li",{onClick:function(){if(window.confirm("Are you sure you want to delete?")){var t=Object(s.a)(e.todos);t.splice(n,1),e.setTodos(t)}},key:n},t)))}))}))))),t.placeholder)})))),o.a.createElement("footer",null,o.a.createElement("textarea",{value:u,rows:"1",type:"text",onChange:function(e){return b(e.target.value)},onKeyDown:function(t){if("Enter"===t.key&&!1===t.shiftKey){if(t.preventDefault(),""===u)return;var n=Object(s.a)(e.todos);return n.push(u),e.setTodos(n),b(""),!1}}}),o.a.createElement("button",{type:"button",className:"submit-button",onClick:function(){if(""!==u){var t=Object(s.a)(e.todos);t.push(u),b(""),e.setTodos(t)}}},"Send")))},b=n(9),p=function(e,t,n){var a,o=Object(s.a)(e[t.droppableId]),r=Object(s.a)(e[n.droppableId]),c=o[t.index];if(t.droppableId===n.droppableId){var d=function(e,t,n){var a=Object(s.a)(e),o=a.splice(t,1),r=Object(l.a)(o,1)[0];return a.splice(n,0,r),a}(o,t.index,n.index);return Object(i.a)({},e,Object(b.a)({},t.droppableId,d))}return o.splice(t.index,1),r.splice(n.index,0,c),Object(i.a)({},e,(a={},Object(b.a)(a,t.droppableId,o),Object(b.a)(a,n.droppableId,r),a))},m=function(){var e=Object(a.useState)(JSON.parse(localStorage.getItem("kanban"))||{ToDo:[],Doing:[],Done:[],Approved:[]}),t=Object(l.a)(e,2),n=t[0],r=t[1],c=[function(e){r(Object(i.a)({},n,{ToDo:e}))},function(e){r(Object(i.a)({},n,{Doing:e}))},function(e){r(Object(i.a)({},n,{Done:e}))},function(e){r(Object(i.a)({},n,{Approved:e}))}];return Object(a.useEffect)((function(){localStorage.setItem("kanban",JSON.stringify(n))})),o.a.createElement("div",{className:"container"},o.a.createElement(d.a,{onDragEnd:function(e){var t=e.destination,a=e.source;t&&r(p(n,a,t))}},Object.keys(n).map((function(e,t){return o.a.createElement(u,{name:e,key:t,listId:e,listType:"CARD",todos:n[e],setTodos:c[t]})}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[39,1,2]]]);
//# sourceMappingURL=main.9e1ed57f.chunk.js.map