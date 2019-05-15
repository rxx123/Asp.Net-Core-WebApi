<template>
    <div>        
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="站场平面图" name="first">
                <iframe src="http://192.168.100.57:2112/ankang-zhanchang.html" class="ifr"></iframe>
            </el-tab-pane>
            <el-tab-pane label="双线轨道电路及电缆径路图" name="second">
                <iframe src="http://192.168.100.57:2112/ankang-shuangxianguidao.html" class="ifr"></iframe>
            </el-tab-pane>
            <el-tab-pane label="室内平面布置图" name="third">
                <iframe src="http://192.168.100.57:2112/ankang-shineishebei.html" class="ifr"></iframe>
            </el-tab-pane>
            <el-tab-pane label="组合位置图" name="fourth">
                <iframe src="http://192.168.100.57:2112/ankang-zuheweizhi.html" class="ifr"></iframe>
            </el-tab-pane>
            <el-tab-pane label="组合器材排列表" name="five">
                <iframe src="http://192.168.100.57:2112/ankang-zuheqicai.html" class="ifr"></iframe>
            </el-tab-pane>
            <el-tab-pane label="进路联锁表" name="seven">
                <iframe src="http://192.168.100.57:2112/ankang-liansuobiao.html" class="ifr"></iframe>
            </el-tab-pane>
        </el-tabs>        
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        this.tabType = tab.index;
      }
    }
  };
</script>

<style scoped lang="scss">
    .ifr {
        width:100%;
        height: 700px;
    }
</style>