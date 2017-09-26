<template>
	<div class="course-sort-box">
		<div class="search-top-bar">
			<div class="left" @click="goback()">
				<img src="~IMG/lefticon.png" />
			</div>
			<span @click="search">
				搜索科目、机构、课程
			</span>
			<router-link tag='div' class='div' to='/searchlist/cat=&target=k'>
				<img src="~IMG/ditu@3x.png" />
				<em>地图</em>
			</router-link>
		</div>

		<div class="sortList">
			<ul class="left">
				<li :class="{active:selectNum==1}" @click="changeNum(1)">
					教辅
				</li>
				<li :class="{active:selectNum==2}" @click="changeNum(2)">
					艺术
				</li>
				<li :class="{active:selectNum==3}" @click="changeNum(3)">
					运动
				</li>
				<li :class="{active:selectNum==4}" @click="changeNum(4)">
					益智
				</li>
				<li :class="{active:selectNum==5}" @click="changeNum(5)">
					综合素质
				</li>
				<li :class="{active:selectNum==6}" @click="changeNum(6)">
					其他
				</li>
			</ul>

			<div class="right">
				<div v-show="selectNum==1">
					<h2>辅导提升冲刺</h2>
					<ul>
						<router-link tag='li' :to='seacherText("幼小衔接班")'>
							<img src="~IMG/幼小衔接班@3x.png" />
							<span>幼小衔接班</span>
						</router-link>
						<router-link tag='li' :to='seacherText("学前综合训练")'>
							<img src="~IMG/学前综合训练@3x.png" />
							<span>学前综合训练</span>
						</router-link>
						<router-link tag='li' :to='seacherText("个性化辅导")'>
							<img src="~IMG/个性化辅导@3x.png" />
							<span>个性化辅导</span>
						</router-link>
						<router-link tag='li' :to='seacherText("竞赛班")'>
							<img src="~IMG/竞赛班@3x.png" />
							<span>竞赛班</span>
						</router-link>
						<router-link tag='li' :to='seacherText("辅导强化班")'>
							<img src="~IMG/辅导强化班@3x.png" />
							<span>辅导强化班</span>
						</router-link>
					</ul>
					<h2>教辅其他</h2>
					<ul>
						<router-link tag='li' :to='seacherText("特色班")'>
							<img src="~IMG/特色班@3x.png" />
							<span>特色班</span>
						</router-link>
						<router-link tag='li' :to='seacherText("看图说话")'>
							<img src="~IMG/看图说话@3x.png" />
							<span>看图说话</span>
						</router-link>
						<router-link tag='li' :to='seacherText("绘本阅读")'>
							<img src="~IMG/绘本阅读@3x.png" />
							<span>绘本阅读</span>
						</router-link>
						<router-link tag='li' :to='seacherText("教辅课程其他")'>
							<img src="~IMG/教辅课程其他@3x.png" />
							<span>教辅课程其他</span>
						</router-link>
					</ul>
					<h2>学科</h2>
					<ul>
						<router-link tag='li' :to='seacherText("全科")'>
							<img src="~IMG/全科@3x.png" />
							<span>全科</span>
						</router-link>
						<router-link tag='li' :to='seacherText("语文")'>
							<img src="~IMG/语文@3x.png" />
							<span>语文</span>
						</router-link>
						<router-link tag='li' :to='seacherText("英语")'>
							<img src="~IMG/英语@3x.png" />
							<span>英语</span>
						</router-link>
						<router-link tag='li' :to='seacherText("数学")'>
							<img src="~IMG/数学@3x.png" />
							<span>数学</span>
						</router-link>
						<router-link tag='li' :to='seacherText("物理")'>
							<img src="~IMG/物理@3x.png" />
							<span>物理</span>
						</router-link>
						<router-link tag='li' :to='seacherText("化学")'>
							<img src="~IMG/化学@3x.png" />
							<span>化学</span>
						</router-link>
						<router-link tag='li' :to='seacherText("地理")'>
							<img src="~IMG/地理@3x.png" />
							<span>地理</span>
						</router-link>
						<router-link tag='li' :to='seacherText("生物")'>
							<img src="~IMG/生物@3x.png" />
							<span>生物</span>
						</router-link>
						<router-link tag='li' :to='seacherText("历史")'>
							<img src="~IMG/历史@3x.png" />
							<span>历史</span>
						</router-link>
						<router-link tag='li' :to='seacherText("几何")'>
							<img src="~IMG/几何@3x.png" />
							<span>几何</span>
						</router-link>
						<router-link tag='li' :to='seacherText("小学课程")'>
							<img src="~IMG/小学课程@3x.png" />
							<span>小学课程</span>
						</router-link>
					</ul>

					<h2>小语种</h2>
					<ul>
						<router-link tag='li' :to='seacherText("俄语")'>
							<img src="~IMG/俄语@3x.png" />
							<span>俄语</span>
						</router-link>
						<router-link tag='li' :to='seacherText("日语")'>
							<img src="~IMG/日语@3x.png" />
							<span>日语</span>
						</router-link>
						<router-link tag='li' :to='seacherText("西班牙语")'>
							<img src="~IMG/西班牙语@3x.png" />
							<span>西班牙语</span>
						</router-link>
						<router-link tag='li' :to='seacherText("意大利语")'>
							<img src="~IMG/意大利语@3x.png" />
							<span>意大利语</span>
						</router-link>
						<router-link tag='li' :to='seacherText("法语")'>
							<img src="~IMG/法语@3x.png" />
							<span>法语</span>
						</router-link>
						<router-link tag='li' :to='seacherText("韩语")'>
							<img src="~IMG/韩语@3x.png" />
							<span>韩语</span>
						</router-link>

						<router-link tag='li' :to='seacherText("德语")'>
							<img src="~IMG/德语@3x.png" />
							<span>德语</span>
						</router-link>
						<router-link tag='li' :to='seacherText("荷兰语")'>
							<img src="~IMG/荷兰语@3x.png" />
							<span>荷兰语</span>
						</router-link>
						<router-link tag='li' :to='seacherText("汉语")'>
							<img src="~IMG/汉语@3x.png" />
							<span>汉语</span>
						</router-link>

						<router-link tag='li' :to='seacherText("上海话")'>
							<img src="~IMG/上海话@3x.png" />
							<span>上海话</span>
						</router-link>
						<router-link tag='li' :to='seacherText("英语")'>
							<img src="~IMG/英语@3x.png" />
							<span>英语</span>
						</router-link>
						<router-link tag='li' :to='seacherText("语言学习")'>
							<img src="~IMG/语言学习@3x.png" />
							<span>语言学习</span>
						</router-link>
					</ul>

					<h2>托班</h2>
					<ul>
						<router-link tag='li' :to='seacherText("晚托班")'>
							<img src="~IMG/晚托班@3x.png" />
							<span>晚托班</span>
						</router-link>

						<router-link tag='li' :to='seacherText("寒暑班")'>
							<img src="~IMG/寒暑班@3x.png" />
							<span>寒暑班</span>
						</router-link>
						<router-link tag='li' :to='seacherText("日托班")'>
							<img src="~IMG/日托班@3x.png" />
							<span>日托班</span>
						</router-link>
						<router-link tag='li' :to='seacherText("暑假班")'>
							<img src="~IMG/暑假班@3x.png" />
							<span>暑假班</span>
						</router-link>
						<router-link tag='li' :to='seacherText("寒假班")'>
							<img src="~IMG/寒假班@3x.png" />
							<span>寒假班</span>
						</router-link>
						<router-link tag='li' :to='seacherText("夏令营")'>
							<img src="~IMG/夏令营@3x.png" />
							<span>夏令营</span>
						</router-link>
						<router-link tag='li' :to='seacherText("全托班")'>
							<img src="~IMG/全托班@3x.png" />
							<span>全托班</span>
						</router-link>
					</ul>

				</div>

				<div v-show="selectNum==2">
					<h2>器乐</h2>
					<ul>
						<router-link tag='li' :to='seacherText("键盘乐")'>
							<img src="~IMG/键盘乐@3x.png" />
							<span>键盘乐</span>
						</router-link>
						<router-link tag='li' :to='seacherText("管乐")'>
							<img src="~IMG/管乐@3x.png" />
							<span>管乐</span>
						</router-link>
						<router-link tag='li' :to='seacherText("弦乐")'>
							<img src="~IMG/弦乐@3x.png" />
							<span>弦乐</span>
						</router-link>

						<router-link tag='li' :to='seacherText("打击乐")'>
							<img src="~IMG/打击乐@3x.png" />
							<span>打击乐</span>
						</router-link>
						<router-link tag='li' :to='seacherText("电声乐")'>
							<img src="~IMG/电声乐@3x.png" />
							<span>电声乐</span>
						</router-link>
						<router-link tag='li' :to='seacherText("弹拨乐器")'>
							<img src="~IMG/弹拨乐器@3x.png" />
							<span>弹拨乐器</span>
						</router-link>

						<router-link tag='li' :to='seacherText("吹奏乐器")'>
							<img src="~IMG/吹奏乐器@3x.png" />
							<span>吹奏乐器</span>
						</router-link>
						<router-link tag='li' :to='seacherText("乐器综合")'>
							<img src="~IMG/乐器综合@3x.png" />
							<span>乐器综合</span>
						</router-link>
						<router-link tag='li' :to='seacherText("考级班")'>
							<img src="~IMG/考级班@3x.png" />
							<span>考级班</span>
						</router-link>

					</ul>

					<h2>舞蹈</h2>
					<ul>
						<router-link tag='li' :to='seacherText("国标舞")'>
							<img src="~IMG/国标舞@3x.png" />
							<span>国标舞</span>
						</router-link>
						<router-link tag='li' :to='seacherText("现代舞")'>
							<img src="~IMG/现代舞@3x.png" />
							<span>现代舞</span>
						</router-link>
						<router-link tag='li' :to='seacherText("少儿舞蹈")'>
							<img src="~IMG/少儿舞蹈@3x.png" />
							<span>少儿舞蹈</span>
						</router-link>

						<router-link tag='li' :to='seacherText("民族舞")'>
							<img src="~IMG/民族舞@3x.png" />
							<span>民族舞</span>
						</router-link>
						<router-link tag='li' :to='seacherText("芭蕾舞")'>
							<img src="~IMG/芭蕾舞@3x.png" />
							<span>芭蕾舞</span>
						</router-link>
						<router-link tag='li' :to='seacherText("舞蹈其它")'>
							<img src="~IMG/舞蹈其它@3x.png" />
							<span>舞蹈其它</span>
						</router-link>
					</ul>

					<h2>美术</h2>
					<ul>
						<router-link tag='li' :to='seacherText("绘画")'>
							<img src="~IMG/绘画@3x.png" />
							<span>绘画</span>
						</router-link>
						<router-link tag='li' :to='seacherText("陶艺")'>
							<img src="~IMG/陶艺@3x.png" />
							<span>陶艺</span>
						</router-link>
						<router-link tag='li' :to='seacherText("工艺美术")'>
							<img src="~IMG/工艺美术@3x.png" />
							<span>工艺美术</span>
						</router-link>

						<router-link tag='li' :to='seacherText("书法")'>
							<img src="~IMG/书法@3x.png" />
							<span>书法</span>
						</router-link>
						<router-link tag='li' :to='seacherText("美术综合")'>
							<img src="~IMG/美术综合@3x.png" />
							<span>美术综合</span>
						</router-link>
						<router-link tag='li' :to='seacherText("美术其他")'>
							<img src="~IMG/美术其他@3x.png" />
							<span>美术其他</span>
						</router-link>
					</ul>

					<h2>表演</h2>
					<ul>
						<router-link tag='li' :to='seacherText("表演综合")'>
							<img src="~IMG/表演综合@3x.png" />
							<span>表演综合</span>
						</router-link>
						<router-link tag='li' :to='seacherText("主持人")'>
							<img src="~IMG/主持人@3x.png" />
							<span>主持人</span>
						</router-link>
						<router-link tag='li' :to='seacherText("记者")'>
							<img src="~IMG/记者@3x.png" />
							<span>记者</span>
						</router-link>

						<router-link tag='li' :to='seacherText("戏剧表演")'>
							<img src="~IMG/戏剧表演@3x.png" />
							<span>戏剧表演</span>
						</router-link>
						<router-link tag='li' :to='seacherText("曲艺表演")'>
							<img src="~IMG/曲艺表演@3x.png" />
							<span>曲艺表演</span>
						</router-link>
						<router-link tag='li' :to='seacherText("歌舞表演")'>
							<img src="~IMG/歌舞表演@3x.png" />
							<span>歌舞表演</span>
						</router-link>

						<router-link tag='li' :to='seacherText("综艺表演")'>
							<img src="~IMG/综艺表演@3x.png" />
							<span>综艺表演</span>
						</router-link>
						<router-link tag='li' :to='seacherText("影视表演")'>
							<img src="~IMG/影视表演@3x.png" />
							<span>影视表演</span>
						</router-link>
						<router-link tag='li' :to='seacherText("表演其他")'>
							<img src="~IMG/表演其他@3x.png" />
							<span>表演其他</span>
						</router-link>
					</ul>

					<h2>声乐</h2>

					<ul>
						<router-link tag='li' :to='seacherText("声乐歌舞")'>
							<img src="~IMG/声乐歌舞@3x.png" />
							<span>声乐歌舞</span>
						</router-link>
						<router-link tag='li' :to='seacherText("音乐综合")'>
							<img src="~IMG/音乐综合@3x.png" />
							<span>音乐综合</span>
						</router-link>
						<router-link tag='li' :to='seacherText("歌唱")'>
							<img src="~IMG/歌唱@3x.png" />
							<span>歌唱</span>
						</router-link>
					</ul>

					<h2>艺术欣赏与创作</h2>

					<ul>
						<router-link tag='li' :to='seacherText("影视鉴赏")'>
							<img src="~IMG/影视鉴赏@3x.png" />
							<span>影视鉴赏</span>
						</router-link>
						<router-link tag='li' :to='seacherText("摄影")'>
							<img src="~IMG/摄影@3x.png" />
							<span>摄影</span>
						</router-link>
						<router-link tag='li' :to='seacherText("艺术基础")'>
							<img src="~IMG/艺术基础@3x.png" />
							<span>艺术基础</span>
						</router-link>

						<router-link tag='li' :to='seacherText("艺术综合")'>
							<img src="~IMG/艺术综合@3x.png" />
							<span>艺术综合</span>
						</router-link>
						<router-link tag='li' :to='seacherText("艺术文学")'>
							<img src="~IMG/艺术文学@3x.png" />
							<span>艺术文学</span>
						</router-link>
						<router-link tag='li' :to='seacherText("艺术启蒙")'>
							<img src="~IMG/艺术启蒙@3x.png" />
							<span>艺术启蒙</span>
						</router-link>
					</ul>

				</div>

				<div v-show="selectNum==3">
					<h2>球类</h2>
					<ul>
						<router-link tag='li' :to='seacherText("篮球")'>
							<img src="~IMG/篮球@3x.png" />
							<span>篮球</span>
						</router-link>
						<router-link tag='li' :to='seacherText("足球")'>
							<img src="~IMG/足球@3x.png" />
							<span>足球</span>
						</router-link>
						<router-link tag='li' :to='seacherText("网球")'>
							<img src="~IMG/网球@3x.png" />
							<span>网球</span>
						</router-link>

						<router-link tag='li' :to='seacherText("羽毛球")'>
							<img src="~IMG/羽毛球@3x.png" />
							<span>羽毛球</span>
						</router-link>
						<router-link tag='li' :to='seacherText("高尔夫")'>
							<img src="~IMG/高尔夫@3x.png" />
							<span>高尔夫</span>
						</router-link>
						<router-link tag='li' :to='seacherText("乒乓球")'>
							<img src="~IMG/乒乓球@3x.png" />
							<span>乒乓球</span>
						</router-link>

						<router-link tag='li' :to='seacherText("桌球")'>
							<img src="~IMG/桌球@3x.png" />
							<span>桌球</span>
						</router-link>
						<router-link tag='li' :to='seacherText("冰球")'>
							<img src="~IMG/冰球@3x.png" />
							<span>冰球</span>
						</router-link>
						<router-link tag='li' :to='seacherText("毽球")'>
							<img src="~IMG/毽球@3x.png" />
							<span>毽球</span>
						</router-link>

						<router-link tag='li' :to='seacherText("保龄球")'>
							<img src="~IMG/保龄球@3x.png" />
							<span>保龄球</span>
						</router-link>
					</ul>

					<h2>健身</h2>

					<ul>
						<router-link tag='li' :to='seacherText("有氧运动")'>
							<img src="~IMG/有氧运动@3x.png" />
							<span>有氧运动</span>
						</router-link>
						<router-link tag='li' :to='seacherText("力量器械")'>
							<img src="~IMG/力量器械@3x.png" />
							<span>力量器械</span>
						</router-link>
						<router-link tag='li' :to='seacherText("武术")'>
							<img src="~IMG/武术@3x.png" />
							<span>武术</span>
						</router-link>

						<router-link tag='li' :to='seacherText("户外运动")'>
							<img src="~IMG/户外运动@3x.png" />
							<span>户外运动</span>
						</router-link>
						<router-link tag='li' :to='seacherText("体育训练")'>
							<img src="~IMG/体育训练@3x.png" />
							<span>体育训练</span>
						</router-link>
						<router-link tag='li' :to='seacherText("体操运动")'>
							<img src="~IMG/体操运动@3x.png" />
							<span>体操运动</span>
						</router-link>

					</ul>

					<h2>运动其他</h2>
					<ul>
						<router-link tag='li' :to='seacherText("运动综合")'>
							<img src="~IMG/运动综合@3x.png" />
							<span>运动综合</span>
						</router-link>
						<router-link tag='li' :to='seacherText("运动")'>
							<img src="~IMG/运动@3x.png" />
							<span>运动</span>
						</router-link>
					</ul>
				</div>
				<div v-show="selectNum==4">
					<h2>科学</h2>
					<ul>
						<router-link tag='li' :to='seacherText("机器人")'>
							<img src="~IMG/机器人@3x.png" />
							<span>机器人</span>
						</router-link>
						<router-link tag='li' :to='seacherText("科技")'>
							<img src="~IMG/科技@3x.png" />
							<span>科技</span>
						</router-link>
						<router-link tag='li' :to='seacherText("电脑")'>
							<img src="~IMG/电脑@3x.png" />
							<span>电脑</span>
						</router-link>
					</ul>

					<h2>潜能开发</h2>
					<ul>
						<router-link tag='li' :to='seacherText("蒙氏教育")'>
							<img src="~IMG/蒙氏教育@3x.png" />
							<span>蒙氏教育</span>
						</router-link>
						<router-link tag='li' :to='seacherText("逻辑思维")'>
							<img src="~IMG/逻辑思维@3x.png" />
							<span>逻辑思维</span>
						</router-link>
						<router-link tag='li' :to='seacherText("五官训练")'>
							<img src="~IMG/五官训练@3x.png" />
							<span>五官训练</span>
						</router-link>
						<router-link tag='li' :to='seacherText("能力拓展")'>
							<img src="~IMG/能力拓展@3x.png" />
							<span>能力拓展</span>
						</router-link>
					</ul>

					<h2>益智训练</h2>
					<ul>
						<router-link tag='li' :to='seacherText("益智开发")'>
							<img src="~IMG/益智开发@3x.png" />
							<span>益智开发</span>
						</router-link>
						<router-link tag='li' :to='seacherText("棋类")'>
							<img src="~IMG/棋类@3x.png" />
							<span>棋类</span>
						</router-link>
						<router-link tag='li' :to='seacherText("速算")'>
							<img src="~IMG/速算@3x.png" />
							<span>速算</span>
						</router-link>
					</ul>
					<h2>口才训练</h2>
					<ul>
						<router-link tag='li' :to='seacherText("口语表达")'>
							<img src="~IMG/口语表达@3x.png" />
							<span>口语表达</span>
						</router-link>
						<router-link tag='li' :to='seacherText("口才其他")'>
							<img src="~IMG/口才其他@3x.png" />
							<span>口才其他</span>
						</router-link>
					</ul>
				</div>

				<div v-show="selectNum==5">

					<ul>
						<router-link tag='li' :to='seacherText("儿童早教")'>
							<img src="~IMG/儿童早教@3x.png" />
							<span>儿童早教</span>
						</router-link>
						<router-link tag='li' :to='seacherText("亲子活动")'>
							<img src="~IMG/亲子活动@3x.png" />
							<span>亲子活动</span>
						</router-link>

						<router-link tag='li' :to='seacherText("生活技能")'>
							<img src="~IMG/生活技能@3x.png" />
							<span>生活技能</span>
						</router-link>
						<router-link tag='li' :to='seacherText("综合其他")'>
							<img src="~IMG/综合其他@3x.png" />
							<span>综合其他</span>
						</router-link>

						<router-link tag='li' :to='seacherText("兴趣拓展")'>
							<img src="~IMG/兴趣拓展@3x.png" />
							<span>兴趣拓展</span>
						</router-link>
						<router-link tag='li' :to='seacherText("学习能力")'>
							<img src="~IMG/学习能力@3x.png" />
							<span>学习能力</span>
						</router-link>
					</ul>
				</div>

				<div v-show="selectNum==6">
					<p>
						暂无课程
					</p>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import km from '../../static/km'
	export default {
		data() {
			return {
				selectNum: 1
			}
		},
		activated() {
			window.scrollTo(0, 0)
		},
		methods: {
			changeNum(res) {
				this.selectNum = res
				window.scrollTo(0, 0)
			},
			goback() {
				if(sessionStorage.getItem('goback')) {
					this.$router.back(-1)
				} else {
					this.$router.push('/pub/home')
				}
			},
			seacherText(res) {
				let $this = this
				let result = ''
				km.map(function(item, index) {
					var arr = []
					arr.push(item)
					let a = arr.filter((p) => {
						return p.name === res
					})
					if(a.length > 0) {
						result += arr[0].name
						$this.searchtxt(arr[0].parent, function(data, parent) {
							if(data !== '') {
								result = data + '$' + result
								$this.searchtxt(parent, function(datas, parent) {
									result = datas + '$' + result
								})
							}
						})
					}
				})
				result = '/searchlist/cat=' + result + '&target=k'
				return result
			},
			searchtxt(res, cb) {
				km.map(function(item, index) {
					var arr = []
					arr.push(item)
					let a = arr.filter((p) => {
						return p.value === res
					})
					if(a.length > 0) {
						cb(arr[0].name, arr[0].parent)
					}
				})
			},
			search() {
				this.$router.push('/vaguesearch')
			}
		}
	}
</script>
<style lang="less">
	.course-sort-box {
		.sortList {
			display: flex;
			.left {
				position: fixed;
				top: 0;
				z-index: 1;
				height: 100vh;
				padding-top: 44px;
				width: 100px;
				background: #f4f8fb;
				li {
					height: 65px;
					line-height: 65px;
					text-align: center;
				}
				.active {
					background: #fff;
					position: relative;
					color: #85bef3;
				}
				.active:before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 3px;
					height: 100%;
					background: #85bef3;
				}
			}
			.right {
				width: 100%;
				padding-left: 100px;
				min-height: 100vh;
				padding-top: 44px;
				background: #ffffff;
				box-sizing: border-box;
				background: url(~IMG/bg_img02@3x.png) center /100% auto;
				p {
					width: 100%;
					display: block;
					line-height: 300px;
					text-align: center;
					height: auto;
					overflow: hidden;
				}
				h2 {
					padding: 0 12px;
					color: #333333;
					font-size: 16px;
					font-weight: normal;
					line-height: 40px;
				}
				ul {
					display: flex;
					flex-wrap: wrap;
					padding: 0 10px;
					box-sizing: border-box;
					list-style: none;
					li {
						flex: 1;
						padding: 3px;
						box-sizing: border-box;
						max-width: 33.33333%;
						min-width: 33.33333%;
						img {
							width: 100%;
						}
						span {
							display: block;
							color: #333333;
							font-size: 14px;
							text-align: center;
						}
					}
				}
			}
		}
		.search-top-bar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 2;
			padding: 8px 10px;
			padding-left: 0;
			box-sizing: border-box;
			background: #84bef3;
			display: flex;
			.left {
				text-align: center;
				img {
					margin: 5px 0;
					padding: 0 15px;
					display: block;
					height: 18px;
				}
			}
			span {
				vertical-align: text-top;
				flex: 1;
				height: 28px;
				line-height: 29px;
				border-radius: 3px;
				border: none;
				text-align: left;
				background: #ffffff;
				outline: none;
				font-size: 13px;
				color: #B2B2B2;
				background: url(~IMG/iconsearch.png) no-repeat #fff;
				background-size: 15px;
				background-position: 4%;
				text-indent: 32px;
				margin-right: 8px;
			}
			.div {
				display: flex;
				color: #fff;
				height: 28px;
				img {
					width: 16px;
					height: 16px;
					display: block;
					margin: 6px 3px;
				}
				em {
					font-size: 12px;
					line-height: 28px;
					color: #fff;
					font-style: normal;
				}
			}
		}
		.title {
			height: 45px;
			display: flex;
			padding: 14px 15px;
			box-sizing: border-box;
			div {
				flex: 1;
			}
			.left {
				display: flex;
				line-height: 17px;
				font-size: 15px;
				height: 17px;
				span {
					color: #333;
				}
				em {
					margin: 0;
					font-style: normal;
					color: #ffa421;
				}
			}
			.right {
				text-align: right;
				display: flex;
				span {
					display: inline-block;
					height: 17px;
					font-size: 14px;
					color: #999999;
					line-height: 20px;
					/*background: #FF1818;*/
					flex: 1;
					margin-right: 5px;
				}
				img {
					width: 10px;
				}
			}
		}
	}
</style>