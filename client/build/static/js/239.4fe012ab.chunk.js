"use strict";(self.webpackChunktuzmo_admin=self.webpackChunktuzmo_admin||[]).push([[239],{98152:function(e,s,r){r(72791);var i=r(80184);s.Z=function(e){var s=e.loading,r=void 0!==s&&s;return e.text,(0,i.jsx)(i.Fragment,{children:r&&(0,i.jsx)("div",{id:"overlay",children:(0,i.jsx)("div",{className:"spinner-border",role:"status",children:(0,i.jsx)("span",{className:"visually-hidden",children:"Loading..."})})})})}},239:function(e,s,r){r.r(s);var i=r(70885),n=r(72791),l=r(24846),o=(r(5462),r(78983)),d=r(48293),c=r(16030),a=r(54389),t=r(90381),u=r(43504),x=r(98152),v=r(80184);s.default=function(){var e=(0,c.v9)(a.QN),s=(0,c.I0)(),r=(0,n.useState)(!1),h=(0,i.Z)(r,2),j=h[0],m=h[1],N=(0,n.useState)(""),p=(0,i.Z)(N,2),f=p[0],C=p[1];(0,n.useEffect)((function(){return m(!0),s((0,t.ox)(w)),function(){s((0,t.oM)())}}),[t.ox]);var b,w=function(){m(!1)};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(x.Z,{loading:j}),(0,v.jsx)(o.rb,{children:(0,v.jsx)(o.b7,{xs:12,children:(0,v.jsxs)(o.xH,{className:"mb-4",children:[(0,v.jsx)(o.bn,{children:(0,v.jsxs)("div",{className:"row",children:[(0,v.jsx)("div",{className:"col-md-6",children:(0,v.jsxs)("div",{className:"d-flex",children:[(0,v.jsx)("input",{className:"form-control me-2",placeholder:"search",onChange:function(e){return C(e.target.value)}}),(0,v.jsx)(o.u5,{onClick:function(){return C("")},type:"button",color:"secondary",variant:"outline",children:"Clear"})]})}),(0,v.jsxs)("div",{className:"col-md-6 text-end",children:[(0,v.jsx)(u.rU,{to:"/orders/edit/new/IMEI",children:(0,v.jsx)(o.u5,{color:"secondary",variant:"outline",children:"IMEI Order"})}),(0,v.jsx)(u.rU,{to:"/orders/edit/new/SERVER",children:(0,v.jsx)(o.u5,{className:"ms-2",color:"secondary",variant:"outline",children:"Server Order"})})]})]})}),(0,v.jsx)(o.sl,{children:(0,v.jsx)("div",{className:"table-responsive",children:(0,v.jsxs)(o.Sx,{children:[(0,v.jsx)(o.V,{children:(0,v.jsxs)(o.T6,{children:[(0,v.jsx)(o.is,{scope:"col",children:"Order Number"}),(0,v.jsx)(o.is,{scope:"col",children:"Category Name"}),(0,v.jsx)(o.is,{scope:"col",children:"Service Name"}),(0,v.jsx)(o.is,{scope:"col",children:"Customer Name"}),(0,v.jsx)(o.is,{scope:"col",children:"Serial Numbers"}),(0,v.jsx)(o.is,{scope:"col",children:"Credits"}),(0,v.jsx)(o.is,{scope:"col",children:"Created At"}),(0,v.jsx)(o.is,{scope:"col",children:"Status"}),(0,v.jsx)(o.is,{scope:"col",children:"Action"})]})}),(0,v.jsx)(o.NR,{children:null===e||void 0===e?void 0:e.filter((b=f,function(e){var s,r;return e.orderNumber.toLowerCase().includes(b.toLowerCase())||(null===(s=e.userId)||void 0===s?void 0:s.firstName.toLowerCase().includes(b.toLowerCase()))||e.serviceType.toLowerCase().includes(b.toLowerCase())||(null===(r=e.service)||void 0===r?void 0:r.name.toLowerCase().includes(b.toLowerCase()))||!b})).map((function(e){var s,r,i,n,c;return(0,v.jsxs)(o.T6,{children:[(0,v.jsx)(o.NN,{children:e.orderNumber}),(0,v.jsx)(o.NN,{children:null===e||void 0===e||null===(s=e.service)||void 0===s||null===(r=s.categoryId)||void 0===r?void 0:r.name}),(0,v.jsx)(o.NN,{children:null===e||void 0===e||null===(i=e.service)||void 0===i?void 0:i.name}),(0,v.jsx)(o.NN,{children:null===e||void 0===e||null===(n=e.userId)||void 0===n?void 0:n.firstName}),(0,v.jsx)(o.NN,{children:null===e||void 0===e?void 0:e.serialNumber}),(0,v.jsx)(o.NN,{children:null===e||void 0===e?void 0:e.creditsUsed}),(0,v.jsx)(o.NN,{children:new Date(null===e||void 0===e?void 0:e.fromDate).toISOString().split("T")[0]}),(0,v.jsx)(o.NN,{children:(0,v.jsx)(o.C_,{className:"pt-2 pb-2",color:(c=null===e||void 0===e?void 0:e.status,{Pending:"secondary",Completed:"success",Confirmed:"success",InProgress:"primary",Rejected:"danger"}[c]),children:null===e||void 0===e?void 0:e.status})}),(0,v.jsxs)(o.NN,{children:["\xa0\xa0\xa0\xa0",(0,v.jsx)(u.rU,{to:"/orders/".concat(e._id),children:(0,v.jsx)(l.Z,{className:"text-secondary ",icon:d.M})})]})]},e._id)}))})]})})})]})})})]})}},5462:function(){}}]);
//# sourceMappingURL=239.4fe012ab.chunk.js.map