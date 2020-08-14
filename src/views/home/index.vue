<template>
  <div align="center">
    <div style="margin-top: 20px">
      <div style="font-size: 36px;color: #fe0000; ">图像处理</div>
      <div style="margin-top: 7px;margin-bottom: 20px">将两张图片进行比较找出不同</div>
    </div>
    <el-card shadow="hover">
      <multi-upload ref="multiUpload" ></multi-upload>
    </el-card>
    <el-button type="danger" style="margin-top: 20px;padding: 22px 150px" @click="generateImageHandler">生成图像</el-button>
  </div>
</template>

<script>
  import MultiUpload from '@/components/Upload/multiUpload'

  export default {
    name: "index",
    components:{
      MultiUpload
    },
    methods:{
      generateImageHandler(){
        this.$refs.multiUpload.upload()
      }
    }
  }
</script>

<style scoped>

</style>