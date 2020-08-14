<template>
  <div>
    <el-upload
      ref="singleUpload"
      :action="useOss?ossUploadUrl:minioUploadUrl"
      :data="useOss?dataObj:null"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUploadHandler"
      :on-change="changeHandler"
      :on-remove="removeHandler"
      :on-preview="previewHandler"
      :on-success="uploadSuccessHandler"
      :on-exceed="exceedHandler"
      :limit="1"
      :auto-upload="false">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {policy} from "@/api/oss";

  export default {
    name: "singleUpload",
    props: {
      value: String,
      isUpload: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        dialogVisible: false,
        dialogImageUrl: null,
        useOss: true, //true为oss，false为minio
        ossUploadUrl: 'http://qlmusic-oss1.oss-cn-zhangjiakou.aliyuncs.com',
        minioUploadUrl: 'http://localhost:8080/minio/upload',
      }
    },
    computed: {
      fileList() {
        if (this.value !== undefined && this.value !== '' && this.value !== null)
          if (this.isUpload) return [{url: this.value}]
      }
    },
    methods: {
      submit() {
        this.$refs.singleUpload.submit()
      },
      changeHandler(file) {
        let _self = this;
        if (!this.useOss) {
          //不使用oss不需要获取策略
          return true;
        }
        return new Promise((resolve, reject) => {
          policy().then(response => {
            let data = response.data
            _self.dataObj.policy = data.policy;
            _self.dataObj.signature = data.signature;
            _self.dataObj.ossaccessKeyId = data.accessKeyId;
            _self.dataObj.key = data.dir + '/${filename}';
            _self.dataObj.dir = data.dir;
            _self.dataObj.host = data.host;
            this.$emit('input', data.host + '/' + data.dir + '/' + file.name)
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      removeHandler(file, fileList) {
        console.log(file);
        console.log(this.value);
      },
      previewHandler(file) {
        this.dialogVisible = true;
        this.dialogImageUrl = file.url;
      },
      beforeUploadHandler() {
        console.log('beforeUploadHandler');
      },
      uploadSuccessHandler() {
        console.log('uploadSuccessHandler');
      },
      exceedHandler() {
        this.$message({
          message: '最多只能上传1张图片',
          type: 'warning',
          duration: 1200
        });
      }
    }
  }
</script>

<style scoped>

</style>
