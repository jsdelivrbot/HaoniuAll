<template>
	<div class="service">
		<v-header title="在线客服"></v-header>
		<iframe :src="httpUrl + 'customService/'" style="width: 100%; height: 100vh;"
			frameborder="0"></iframe>
	</div>
</template>

<script>
//	(function(m, ei, q, i, a, j, s) {
//		m[i] = m[i] || function() {
//			(m[i].a = m[i].a || []).push(arguments)
//		};
//		j = ei.createElement(q)
//		s = ei.getElementsByTagName(q)[0]
//		j.async = true;
//		j.charset = 'UTF-8';
//		j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
//		s.parentNode.insertBefore(j, s);
//	})(window, document, 'script', '_MEIQIA');
//	_MEIQIA('entId', 76053);
//
//	// 初始化成功后调用美洽 showPanel
//	_MEIQIA('allSet', function() {
//		_MEIQIA('showPanel');
//	});
//	var downlocadnum = setInterval(function() {
//		if($('#MEIQIA-IFRAME').attr('style') != null) {
//			$('#MEIQIA-IFRAME').attr('style', $('#MEIQIA-IFRAME').attr('style') + 'height:' + (parseInt($('#MEIQIA-IFRAME').css('height')) + 30) + 'px !important;');
//			clearInterval(downlocadnum);
//		}
//	}, 200);
	import Header from '@/common/vue/Header'
	export default {
		name: 'Service',
		components: {
			'v-header': Header
		},
		data() {
			return {
				httpUrl: localStorage.getItem('httpUrl')
			}
		}
	}
</script>

<style lang="less">
	#MEIQIA-PANEL-HOLDER {
		z-index: 1!important;
	}
	.service {
		.header-box {
			height: 52px;
			position: absolute;
		}
	}
</style>