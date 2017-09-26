export default {
	install: function(Vue, options) {
		Vue.prototype.$CwxShare = function(selectId, opts, cb) {
				var selectMsg = ''
				var shares = {}
				mui.plusReady(function() {
					plus.share.getServices(function(s) {
						for(var i in s) {
							var t = s[i]
							shares[t.id] = t
						}
						selectMsg = shares
						if(selectId == 'wx') {
							shareAction('weixin', 'WXSceneSession')
						}
						if(selectId == 'tm') {
							shareAction('weixin', 'WXSceneTimeline')
						}
						if(selectId == 'qq') {
							shareAction('qq')
						}
						if(selectId == 'sinaweibo') {
							shareAction('sinaweibo')
						}
					}, function(e) {})
				})

				function shareAction(id, ex) {
					var s = null
					if(!id || !(s = selectMsg[id])) {
						console.log('无效分享,请检查配置文件!')
						return
					}
					if(s.authenticated) {
						console.log(JSON.stringify(s))
						shareMessage(s, ex)
					} else {
						s.authorize(function() {
							shareMessage(s, ex)
						}, function(e) {})
					}
				}

				function shareMessage(s, ex) {
					var msg = {
						href: opts.url,
						title: opts.title,
						content: opts.content,
						thumbs: [opts.img],
						pictures: [opts.img],
						extra: {
							scene: ex
						}
					}
					s.send(msg, function() {
						cb(true)
					}, function(e) {
						cb(false)
					})
				}
			},
			Vue.prototype.$CGPS = function(callback) {
				var val = false
				mui.plusReady(function() {
					plus.geolocation.getCurrentPosition(geoInf, function(e) {
						callback(val)
					}, {
						geocode: false
					})
				})

				function geoInf(position) {
					val = {
						lng: position.coords.longitude,
						lat: position.coords.latitude
					}
					callback(val)
				}
			},
			Vue.prototype.$CgetCID = function(callback) {
				var cid = ''
				mui.plusReady(function() {
					cid = plus.push.getClientInfo()
					callback(cid.clientid)
				})
			},
			Vue.prototype.$CopenWifi = function() {
				mui.plusReady(function() {
					if(mui.os.ios) {
						plus.runtime.launchApplication({
							action: 'App-Prefs:root=WIFI'
						}, function(e) {
							console.log(JSON.stringify(e))
						})
					} else {
						var main = plus.android.runtimeMainActivity()
						var Intent = plus.android.importClass('android.content.Intent')
						var mIntent = new Intent('android.settings.WIFI_SETTINGS')
						main.startActivity(mIntent)
					}
				})
			},
			Vue.prototype.$CopenGps = function() {
				mui.plusReady(function() {
					if(mui.os.ios) {
						plus.runtime.launchApplication({
							action: 'App-Prefs:root=Privacy&path=LOCATION'
						}, function(e) {
							console.log(JSON.stringify(e))
						})
					} else {
						var main = plus.android.runtimeMainActivity(); //获取activity 
						var Intent = plus.android.importClass('android.content.Intent');
						var Settings = plus.android.importClass('android.provider.Settings');
						var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS); //可设置表中所有Action字段
						main.startActivity(intent)
					}
				})
			},
			Vue.prototype.$ConLine = function(callback) {
				mui.plusReady(function() {
					if(plus.networkinfo.getCurrentType() > 1) {
						callback(true)
					} else {
						callback(false)
					}
				})
			},
			Vue.prototype.$CtoPay = function(payid, payres, callback) {
				mui.plusReady(function() {
					plus.payment.getChannels(function(channels) {
						var channel = ''
						if(payid === 1) {
							channel = channels[1]
						} else {
							channel = channels[0]
						}
						plus.payment.request(channel, payres, function(result) {
							callback(true)
						}, function(error) {
							callback("支付失败：" + error.code)
						});
					}, function(e) {
						callback("获取支付通道失败：" + e.message);
					});
				})
			},
			Vue.prototype.$CotherLogin = function(otherName, callback) {
				plus.oauth.getServices(function(services) {
					var auths = services
					var s, other
					switch(otherName) {
						case 0:
							other = 'weixin'
							break;
						case 1:
							other = 'qq'
							break;
						case 2:
							other = 'sinaweibo'
							break;
						default:
							other = 'weixin'
							break;
					}

					for(var i = 0; i < auths.length; i++) {
						if(auths[i].id === other) {
							s = auths[i]
							break
						}
					}
					if(!s.authResult) {
						s.login(function(e) {
							s.getUserInfo(function(e) {
								callback(s)
							}, function(e) {})
						}, function(e) {
							mui.toast('登录认证失败')
						})
					} else {
						callback(s)
					}
				}, function(e) {
					mui.toast('登录认证失败')
				})
			},
			Vue.prototype.$CisANDROID = function() {
				var u = navigator.userAgent
				var result = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
				return result
			}
	}
}