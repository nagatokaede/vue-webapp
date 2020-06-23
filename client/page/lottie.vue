<template>
    <div class="lottie">
        <van-uploader :after-read="afterRead" :max-count="1" accept="application/x-zip-compressed"></van-uploader>

        <div>
            {{ title }}
        </div>

        <van-button type="info" size="small" style="display: block; width: 100%;" @click="testStart">
            start
        </van-button>

        <div id="lottie"></div>

        <div class="button-box">
            <div class="clear-fix" v-for="(item, index) in animationsKeys" :key="index">
                <van-button type="info" size="small" style="float: left;"
                            @click="lottieAnimation.open(item)">
                    {{ item }}
                </van-button>

                <van-button type="info" size="small" style="float: right;"
                            @click="lottieAnimation.close(item)">
                    {{ item }}
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import lottie from 'lottie-web';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import {Uploader,Button} from 'vant';

Vue.use(Button);
Vue.use(Uploader);
export default {
  name: 'lottie',

  data() {
    return {
      typeDictionary: {
        json: 'application/json',
        png: 'image/png',
        zip: 'application/x-zip-compressed',
      },

      title: '',

      // 入场动画列表
      admission: {
        openList: ['wholeSideIn', 'flash', ''],
        closeList: [],
      },
      test2: [
        'bonnet', 'trunk', 'leftFrontWindow',
        'leftFrontDoor', 'rightFrontWindow', 'rightFrontDoor',
        'leftRearWindow', 'leftRearDoor', 'rightRearWindow',
        'rightRearDoor', ['leftLight', 'rightLight'],
        ['leftParkingLight', 'rightParkingLight'], 'sunroof',
      ],

      dictionaries: {
        '右前窗': 'rightFrontWindow',
        '左前窗': 'leftFrontWindow',
        '右前门': 'rightFrontDoor',
        '左前门': 'leftFrontDoor',

        '右后窗': 'rightRearWindow',
        '左后窗': 'leftRearWindow',
        '右后门': 'rightRearDoor',
        '左后门': 'leftRearDoor',

        '前灯': ['leftLight', 'rightLight'],
        '尾灯': ['leftParkingLight', 'rightParkingLight'],
      },

      animateTest: [
        // '整车关闭；',
        // '整车开启；',
        '右前窗：开启、关闭',
        '右前窗+右前门：开启、关闭',
        '右前窗+左前窗：开启、关闭',
        '右前窗+左前门：开启、关闭',
        '右前窗+右后窗：开启、关闭',
        '右前窗+右后门：开启、关闭',
        '右前窗+左后窗：开启、关闭',
        '右前窗+左后门：开启、关闭',
        '右前窗+前灯：开启、关闭',
        '右前窗+尾灯：开启、关闭',
        '右前窗+右前门+左前窗：开启、关闭',
        '右前窗+右前门+左前门：开启、关闭',
        '右前窗+右前门+右后窗：开启、关闭',
        '右前窗+右前门+右后门：开启、关闭',
        '右前窗+右前门+左后窗：开启、关闭',
        '右前窗+右前门+左后门：开启、关闭',
        '右前窗+右前门+前灯：开启、关闭',
        '右前窗+右前门+尾灯：开启、关闭',
        '右前窗+左前窗+左前门：开启、关闭',
        '右前窗+左前窗+右后窗：开启、关闭',
        '右前窗+左前窗+右后门：开启、关闭',
        '右前窗+左前窗+左后窗：开启、关闭',
        '右前窗+左前窗+左后门：开启、关闭',
        '右前窗+左前窗+前灯：开启、关闭',
        '右前窗+左前窗+尾灯：开启、关闭',
        '右前窗+左前门+右后窗：开启、关闭',
        '右前窗+左前门+右后门：开启、关闭',
        '右前窗+左前门+左后窗：开启、关闭',
        '右前窗+左前门+左后门：开启、关闭',
        '右前窗+左前门+前灯：开启、关闭',
        '右前窗+左前门+尾灯：开启、关闭',
        '右前窗+右后窗+右后门：开启、关闭',
        '右前窗+右后窗+左后窗：开启、关闭',
        '右前窗+右后窗+左后门：开启、关闭',
        '右前窗+右后窗+前灯：开启、关闭',
        '右前窗+右后窗+尾灯：开启、关闭',
        '右前窗+右后门+左后窗：开启、关闭',
        '右前窗+右后门+左后门：开启、关闭',
        '右前窗+右后门+前灯：开启、关闭',
        '右前窗+右后门+尾灯：开启、关闭',
        '右前窗+左后窗+左后门：开启、关闭',
        '右前窗+左后窗+前灯：开启、关闭',
        '右前窗+左后窗+尾灯：开启、关闭',
        '右前窗+左后门+前灯：开启、关闭',
        '右前窗+左后门+尾灯：开启、关闭',
        '右前窗+前灯+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门：开启、关闭',
        '右前窗+右前门+左前窗+右后窗：开启、关闭',
        '右前窗+右前门+左前窗+右后门：开启、关闭',
        '右前窗+右前门+左前窗+左后窗：开启、关闭',
        '右前窗+右前门+左前窗+左后门：开启、关闭',
        '右前窗+右前门+左前窗+前灯：开启、关闭',
        '右前窗+右前门+左前窗+尾灯：开启、关闭',
        '右前窗+右前门+左前门+右后窗：开启、关闭',
        '右前窗+右前门+左前门+右后门：开启、关闭',
        '右前窗+右前门+左前门+左后窗：开启、关闭',
        '右前窗+右前门+左前门+左后门：开启、关闭',
        '右前窗+右前门+左前门+前灯：开启、关闭',
        '右前窗+右前门+左前门+尾灯：开启、关闭',
        '右前窗+右前门+右后窗+右后门：开启、关闭',
        '右前窗+右前门+右后窗+左后窗：开启、关闭',
        '右前窗+右前门+右后窗+左后门：开启、关闭',
        '右前窗+右前门+右后窗+前灯：开启、关闭',
        '右前窗+右前门+右后窗+尾灯：开启、关闭',
        '右前窗+右前门+右后门+左后窗：开启、关闭',
        '右前窗+右前门+右后门+左后门：开启、关闭',
        '右前窗+右前门+右后门+前灯：开启、关闭',
        '右前窗+右前门+右后门+尾灯：开启、关闭',
        '右前窗+右前门+左后窗+左后门：开启、关闭',
        '右前窗+右前门+左后窗+前灯：开启、关闭',
        '右前窗+右前门+左后窗+尾灯：开启、关闭',
        '右前窗+右前门+左后门+前灯：开启、关闭',
        '右前窗+右前门+左后门+尾灯：开启、关闭',
        '右前窗+右前门+前灯+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后门：开启、关闭',
        '右前窗+右前门+左前窗+左前门+左后窗：开启、关闭',
        '右前窗+右前门+左前窗+左前门+左后门：开启、关闭',
        '右前窗+右前门+左前窗+左前门+前灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+右后门：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+左后窗：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+左后门：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+前灯：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+右后门+左后窗：开启、关闭',
        '右前窗+右前门+左前窗+右后门+左后门：开启、关闭',
        '右前窗+右前门+左前窗+右后门+前灯：开启、关闭',
        '右前窗+右前门+左前窗+右后门+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左后窗+左后门：开启、关闭',
        '右前窗+右前门+左前窗+左后窗+前灯：开启、关闭',
        '右前窗+右前门+左前窗+左后窗+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+前灯+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+右后门+左后窗：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+右后门+左后门：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+右后门+前灯：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+右后门+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+左后窗+左后门：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+左后窗+前灯：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+左后窗+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+左后门+前灯：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+左后门+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+右后窗+前灯+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+左后窗+左后门：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+左后窗+前灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+左后窗+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+左后门+前灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+左后门+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+前灯+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+右后门+左后窗+左后门：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+右后门+左后窗+前灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+右后门+左后窗+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+右后门+左后门+前灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+右后门+左后门+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+右后门+前灯+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+右后门+左后窗+左后门+前灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+右后门+左后窗+左后门+尾灯：开启、关闭',
        '右前窗+右前门+左前窗+左前门+右后窗+右后门+左后窗+前灯+尾灯：开启、关闭',
      ],

      animationsKeys: [],

      // animation event
      lottieAnimation: {
        // lottie 实例
        animations: {},

        // 需要置顶的模块名称, _ 命名格式
        placedTop: [
          'bonnet', 'trunk', 'left_front_window', 'right_front_window',
          'left_rear_window', 'right_rear_window', 'left_light', 'right_light',
          'left_parking_light', 'right_parking_light', 'sunroof', 'lock', 'unlock',
        ],

        // 需要置底的模块名称, _ 命名格式
        placedDown: ['whole', 'whole_side_in'],

        // 动画开关时刻配置
        config: {},

        // 打开模块
        open(animate) {
          const segments = [this.config[animate].openFrameInfo.beginIndex, this.config[animate].openFrameInfo.endIndex + 1];
          this.animations[animate].playSegments(segments, true);

          return new Promise(resolve => {
            this.animations[animate].addEventListener('complete', () => {
              console.log(animate, ' open finish!');
              this.animations[animate].removeEventListener('complete');
              resolve(animate);
            });
          });
        },

        // 关闭模块
        close(animate) {
          const segments = [this.config[animate].closeFrameInfo.beginIndex, this.config[animate].closeFrameInfo.endIndex + 1];
          this.animations[animate].playSegments(segments, true);

          return new Promise(resolve => {
            this.animations[animate].addEventListener('complete', () => {
              console.log(animate, ' close finish!');
              this.animations[animate].removeEventListener('complete');
              resolve(animate);
            });
          });
        },
      },
    };
  },

  methods: {
    async afterRead(file) {
      console.log(file);
      // 解压上传文件
      const zipContent = await this.unpack(file.file);

      // 删除旧子节点
      const lottieBox = document.getElementById('lottie');
      document.querySelectorAll('#lottie div').forEach(node => {
        lottieBox.removeChild(node);
      });

      // 获取动画播放帧数配置
      const configData = await this.getZipContentString(zipContent, 'config.json');
      const configDataSideIn = await this.getZipContentString(zipContent, 'config_car_slide_in.json');
      const configDataJson = Object.assign(JSON.parse(configData), JSON.parse(configDataSideIn));
      this.lottieAnimation.config = configDataJson;

      // 遍历创建图层
      for (const item of Object.keys(zipContent.files)) {
        const dir = item.split('/')[0];

        if (item.includes('/data.json') && configDataJson[this.humpConverter(dir)]) {
          // 创建容器
          const layer = document.createElement('div');
          layer.setAttribute('id', dir);
          // 添加排列顺序
          if (this.lottieAnimation.placedTop.includes(dir)) {
            layer.style.zIndex = '2';
          } else if (this.lottieAnimation.placedDown.includes(dir)) {
            layer.style.zIndex = '0';
          } else {
            layer.style.zIndex = '1';
          }
          lottieBox.appendChild(layer);

          // 添加动画图层
          this.createLayer(zipContent, item, dir);
        }
      }
    },
    
    getInternalZip(url) {
      return new JSZip.external.Promise((resolve, reject) => {
        JSZipUtils.getBinaryContent(url, (err, data) => {
          if (err) {
            reject(err);
          } else {
            this.unpack(data).then(content => {
              resolve(content);
            });
          }
        });
      });
  
      // promise.then(JSZip.loadAsync)                     // 2) chain with the zip promise
      //   .then(function(zip) {
      //     return zip.file('Hello.txt').async('string'); // 3) chain with the text content promise
      //   })
      //   .then(function success(text) {                    // 4) display the result
      //     $("#jszip_utils").append($("<p>", {
      //       "class": "alert alert-success",
      //       text: "loaded, content = " + text
      //     }));
      //   }, function error(e) {
      //     $("#jszip_utils").append($("<p>", {
      //       "class": "alert alert-danger",
      //       text: e
      //     }));
      //   });
    },

    // 下划线 -> 驼峰转换
    humpConverter(name) {
      return name.split('_').reduce((acc, cur) => acc + cur[0].toUpperCase() + cur.slice(1));
    },

    // 解压 zip
    unpack(file) {
      const zip = new JSZip();
      return new Promise(resolve => {
        zip.loadAsync(file)
          .then(content => {
            resolve(content);
          })
          .catch(err => {
            console.log(err);
          })
      });

    },

    // 获取解压后的 zip 内文件 blob
    getZipContentBlob(zip, zipFileName) {
      return new Promise(resolve => {
        zip.file(zipFileName).async('blob').then(res => {
          resolve(res);
        }).catch(err => {
          console.log(err);
        });
      });
    },

    // 获取解压后的 zip 内文件 string
    getZipContentString(zip, zipFileName) {
      return new Promise(resolve => {
        zip.file(zipFileName).async('string').then(res => {
          resolve(res);
        }).catch(err => {
          console.log(err);
        });
      });
    },

    // lottie 绘制 animation
    animation(dataJsonPath, id) {
      const name = this.humpConverter(id);
      // 创建实例
      this.lottieAnimation.animations[name] = lottie.loadAnimation({
        container: document.getElementById(id),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name,
        path: dataJsonPath
      });

      // 注册控制按钮列表
      this.animationsKeys.push(name);
    },

    // 创建 lottie 图层
    async createLayer(zipContent, dataJsonName, dir) {
      // 获取 data.json 内容
      const dataJsonString = await this.getZipContentString(zipContent, dataJsonName);

      // 转换 JSON
      const dataJson = JSON.parse(dataJsonString);

      // 将图片地址写入 data.json
      // 创建 promise 组合，异步转换
      const assets = dataJson.assets.map(async item => {
        // 将图片转为 blob
        return this.getZipContentBlob(zipContent, dir + '/' + item.u + item.p, 'image/png').then(res => {
          // 使用 Blob 创建一个指向类型化数组的URL
          item.u = URL.createObjectURL(res).match(/(?!.*\/).*/)[0];
          item.p = '';
          return item;
        });
      });

      // 异步转换，同步结果
      dataJson.assets = await Promise.all([...assets]);

      // 将 data.json 转换为 blob
      const blob = new Blob([JSON.stringify(dataJson)], {
        type: 'application/json'
      });

      // 生成 animation
      this.animation(URL.createObjectURL(blob), dir);
    },

    // 批量同步动画执行列表
    async animationAsyncStartList(animations) {
      const { openList, closeList } = animations;

      if (openList) {
        for (const animate of openList) {
          if (typeof animate === 'string') {
            await this.lottieAnimation.open(animate);
          }
          if (typeof animate === 'object') {
            await Promise.all([...animate.map(item => this.lottieAnimation.open(item))])
          }
        }
      }

      if (closeList) {
        for (const animate of closeList) {
          if (typeof animate === 'string') {
            await this.lottieAnimation.close(animate);
          }
          if (typeof animate === 'object') {
            await Promise.all([...animate.map(item => this.lottieAnimation.close(item))])
          }
        }
      }
    },

    // 动画组测试
    async animationTest() {
      // 过场
      const interlude = {
        openList: ['wholeSideIn', 'flash'],
        closeList: ['flash', 'wholeSideIn'],
      };
      await this.animationAsyncStartList(interlude);
      
      // 入场
      this.title = '整车开启';
      const admission = {
        openList: ['whole'],
      };
      await this.animationAsyncStartList(admission);

      // 测试
      for (const test of this.animateTest) {
        this.title = test;

        const animateTest = test.split('：')[0].split('+').map(item => this.dictionaries[item]);

        const animations = {
          openList: animateTest,
          closeList: animateTest,
        };
        // animations.closeList.reverse();

        console.log(animations);

        await this.animationAsyncStartList(animations);
        console.log(test);
      }

      // 出场
      this.title = '整车关闭';
      const comeOut = {
        closeList: ['whole'],
      };
      await this.animationAsyncStartList(comeOut);
    },

    testStart() {
      this.animationTest();
    },
  },

  created() {
    this.setTitle('lottie 测试');
  },

  mounted() {
    this.getInternalZip('/oss/1573120876979_vw_2019_C425PZ_P1P1_68c1b000.zip').then(async zipContent => {
      // 删除旧子节点
      const lottieBox = document.getElementById('lottie');
      document.querySelectorAll('#lottie div').forEach(node => {
        lottieBox.removeChild(node);
      });
  
      // 获取动画播放帧数配置
      const configData = await this.getZipContentString(zipContent, 'config.json');
      const configDataSideIn = await this.getZipContentString(zipContent, 'config_car_slide_in.json');
      const configDataJson = Object.assign(JSON.parse(configData), JSON.parse(configDataSideIn));
      this.lottieAnimation.config = configDataJson;
  
      // 遍历创建图层
      for (const item of Object.keys(zipContent.files)) {
        const dir = item.split('/')[0];
    
        if (item.includes('/data.json') && configDataJson[this.humpConverter(dir)]) {
          // 创建容器
          const layer = document.createElement('div');
          layer.setAttribute('id', dir);
          // 添加排列顺序
          if (this.lottieAnimation.placedTop.includes(dir)) {
            layer.style.zIndex = '2';
          } else if (this.lottieAnimation.placedDown.includes(dir)) {
            layer.style.zIndex = '0';
          } else {
            layer.style.zIndex = '1';
          }
          lottieBox.appendChild(layer);
      
          // 添加动画图层
          this.createLayer(zipContent, item, dir);
        }
      }
    });
  }
}
</script>

<style lang="less">
    #lottie {
        position: relative;
        div {
            position: absolute;
            top: 0;
            &:nth-child(1) {
                position: inherit;
            }
        }
    }
    .button-box {
        position: absolute;
        z-index: 1000;
        top: 200px;
        width: 100%;
        div {
            margin-bottom: 10px;
            opacity: .5;
            button {
                width: 110px;
                margin-left: 0;
            }
        }
    }
    .clear-fix {
        &:before,
        &:after {
            content: " ";
            display: table;
        }
        &:after {
            clear: both;
        }
    }
</style>
