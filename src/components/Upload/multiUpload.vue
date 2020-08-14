<template>
  <div>
    <el-upload
            ref="multiUpload"
            :action="qleimgUrl"
            :data="useOss?dataObj:null"
            list-type="picture"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-change="changeHandler"
            :on-remove="removeHandler"
            :on-preview="previewHandler"
            :on-success="uploadSuccessHandler"
            :on-exceed="exceedHandler"
            :limit="maxCount"
            :auto-upload="false">
      <el-button type="primary" style="padding: 22px 150px">选择文件</el-button>
      <div slot="tip" class="el-upload__tip" style="color: #C5C5C5;margin-top: 15px">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {policy} from "@/api/oss";
  import {difference} from "@/api/image";

  export default {
    name: "multiUpload",
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount: {
        type: Number,
        default: 2
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
        useOss: true,  //true为oss，false为minio
        ossUploadUrl: 'http://qlmusic-oss1.oss-cn-zhangjiakou.aliyuncs.com',
        minioUploadUrl: 'http://localhost:8080/minio/upload',
        qleimgUrl: '/portal/difference'
      }
    },
    computed: {
      fileList() {
        let fileList = [];
        return fileList;
      }
    },
    methods: {
      submit() {
        this.$refs.multiUpload.submit()
      },
      emitInput(fileList) {
        let value = [];
        for (let i = 0; i < fileList.length; i++) {
          value.push(fileList[i].url);
        }
      },
      //选择文件后触发
      changeHandler(file) {
        //将文件存入fileList
        this.fileList.push(file)

        let _self = this;
        if (!this.useOss) {
          //不使用oss不需要获取策略
          return true;
        }
        // return new Promise((resolve, reject) => {
        //   policy().then(response => {
        //     let data = response.data
        //     _self.dataObj.policy = data.policy;
        //     _self.dataObj.signature = data.signature;
        //     _self.dataObj.ossaccessKeyId = data.accessKeyId;
        //     _self.dataObj.key = data.dir + '/${filename}';
        //     _self.dataObj.dir = data.dir;
        //     _self.dataObj.host = data.host;
        //     this.$emit('input',data.host + '/' + data.dir + '/' + file.name)
        //     resolve(true)
        //   }).catch(err => {
        //     console.log(err)
        //     reject(false)
        //   })
        // })
      },
      //移除文件后触发
      removeHandler(file, fileList) {
        this.emitInput(fileList);
      },
      //点击预览图片
      previewHandler(file) {
        this.dialogVisible = true;
        this.dialogImageUrl = file.url;
      },
      //上传文件之前触发
      beforeUpload(file) {
        console.log('beforeUpload');
      },
      upload(){
        let formData = new FormData();
        this.fileList.forEach(file => {
          console.log(file)
          formData.append("file", file.raw)
        })
        console.log(formData.getAll("file"));
        difference(formData).then(response =>{
          console.log(response);
        })

      },
      //上传文件成功后触发
      uploadSuccessHandler(response, file) {
        console.log(response);
        let url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name;
        if (!this.useOss) {
          //不使用oss直接获取图片路径
          url = response.data.url;
        }
        this.fileList.push({name: file.name, url: url});
        this.emitInput(this.fileList);
      },
      //限制图片上传数量
      exceedHandler(files, fileList) {
        this.$message({
          message: '最多只能上传' + this.maxCount + '张图片',
          type: 'warning',
          offset: 100,
          duration: 2000
        });
      }
    }
  }
</script>

<style scoped>

</style>
