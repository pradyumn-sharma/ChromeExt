// count = 0;
//   function getIdentityToken(){
//     // chrome.identity.getAuthToken({interactive: false}, function(token) {
//     //   console.log('got the token', token);
//     //   localStorage.setItem("googleToken", token);
//     // })
//   }

// function getHostName() {
//   return new Promise(resolve => {
//     chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(
//       tabs
//     ) {
//       var url = tabs[0].url;

//       chrome.cookies.get(
//         {
//           url: url,
//           name: "sid_Client"
//         },
//         function(cookie) {
//           var requiredSidClient = cookie.value;

//           chrome.cookies.get(
//             {
//               url: "https://" + cookie.domain,
//               name: "disco"
//             },
//             logUserId => {}
//           );

//           chrome.cookies.getAll(
//             {
//               domain: "salesforce.com",
//               name: "sid_Client"
//             },
//             valueSID => {
//               for (var idx = 0; idx < valueSID.length; idx++) {
//                 if (requiredSidClient == valueSID[idx].value) {
//                   localStorage.setItem("host", valueSID[idx].domain);
//                   const url1 = "https://" + valueSID[idx].domain;
//                   localStorage.setItem("instanceUrl", url1);
//                   var replacementNodeName = valueSID[idx].domain.substring(
//                     0,
//                     valueSID[idx].domain.indexOf(".salesforce.com")
//                   );
//                   localStorage.setItem(
//                     "salesforcePodName",
//                     replacementNodeName
//                   );
//                   var currentURL = "https://" + valueSID[idx].domain;
//                   chrome.cookies.get(
//                     {
//                       url: "https://" + valueSID[idx].domain,
//                       name: "sid"
//                     },
//                     cookie => {
//                       if (cookie.value) {
//                         localStorage.setItem("userSessionToken", cookie.value);
//                         fetch(url1 + "/services/data/v41.0/", {
//                           headers: new Headers({
//                             "Api-User-Agent": "Example/1.0",
//                             Authorization: `Bearer ${cookie.value}`,
//                             Accept: "application/json",
//                             "Content-Type": "application/json"
//                           })
//                         })
//                           .then(response => response.json())
//                           .then(data => {
//                             var identity = data.identity;
//                             var logUserId = "005" + identity.split("/005")[1];
//                             localStorage.setItem("LogUserId", logUserId);
//                             resolve(true);
//                           });
//                       }
//                     }
//                   );
//                 }
//               }
//             }
//           );
//         }
//       );
//     });
//   });
// }

chrome.pageAction.onClicked.addListener(function(tab) {
    console.log(tab)
//   this.count = this.count + 1;
//   getIdentityToken();
//   getHostName().then(resolve => {});
//   chrome.tabs.create({
//     url: "index.html",
//     selected: true
//   });
});

// function getSalesforcePodName(host) {
//   /*
//      parses pod from host i.e.
//      ap1 from ap1.salesforce.com
//      */
//   var _parsePodName = function(hostName) {
//     return hostName.substring(0, hostName.indexOf(".salesforce.com"));
//   };

//   // promise executor
//   var _executor = function(resolve, reject) {
//     var replacementNodeName;
//     if (
//       host.indexOf("visual.force.com") > 0 ||
//       host.indexOf("lightning.force.com") > 0
//     ) {
//       // vf page
//       chrome.cookies.get(
//         {
//           url: "https://" + host,
//           name: "sid_Client"
//         },
//         function(cookie) {
//           var requiredSidClient = cookie.value;

//           chrome.cookies.getAll(
//             {
//               domain: "salesforce.com",
//               name: "sid_Client"
//             },
//             function(sidClients) {
//               for (var idx = 0; idx < sidClients.length; idx++) {
//                 if (requiredSidClient == sidClients[idx].value) {
//                   replacementNodeName = _parsePodName(sidClients[idx].domain);

//                   resolve(replacementNodeName);
//                   break;
//                 }
//               }
//               if (!replacementNodeName) {
//                 reject("Failed to locate salesforce session");
//               }
//             }
//           );
//         }
//       );
//     } else {
//       replacementNodeName = _parsePodName(host);
//       resolve(replacementNodeName);
//     }
//   };

//   return new Promise(_executor);
// }

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.cookies.getALl(
        {
            domain: "twitch.tv",
            name: "login"
        },
        cookie => {
            if(cookie[0].value != undefined) {
                chrome.pageAction.show(tabId);
            }
        }
    )
	// chrome.cookies.getAll(
	// { domain: "salesforce.com", name: "sid_Client" },
	// value => {
	// 	for (var idx = 0; idx < value.length; idx++) {
	// 		const url1 = "https://" + value[idx].domain;
	// 		chrome.cookies.get({ url: url1, name: "disco" }, logUserId => {
	// 			let str = logUserId.value;
	// 			let a = str.split(":")[2];
	// 			chrome.cookies.get(
	// 				{
	// 				url: url1,
	// 				name: "sid"
	// 				},
	// 				(cookie)=>{}
	// 			);
	// 		});
	// 	}
	// });

	// if (changeInfo && changeInfo.status != "complete") return;

	// var host = new URL(tab.url).host;
	// if (host.indexOf("force.com") < 1) return;

	// var st = new Date().getTime();

	// var sfdcExcludeRegex = /(login|help|developer|success|appexchange|partners|test).salesforce.com/;
	// if (sfdcExcludeRegex.test(host)) {
	// 	chrome.pageAction.hide(tabId);
	// } else {
	// 	getSalesforcePodName(host).then(function(sfdcPodName) {
	// 		var et = new Date().getTime();
	// 		chrome.pageAction.show(tabId);
	// 	});
	// }
	// return true;
});
