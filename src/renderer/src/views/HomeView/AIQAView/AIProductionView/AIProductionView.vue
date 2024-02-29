<!-- AI问答 生产数据助手 -->
<template>
  <div class="ai-production-wrapper">
    <LabelType1 :label="'生产数据助手'" :eng="'Production Data Assistant'" />
    <div class="content-wrapper">
      <!-- 对话框 -->
      <div class="message-wrapper" v-if="store.messageArr.length != 0">
        <div class="message-area" v-for="(message, index) in store.messageArr" :key="index">
          <div class="label">
            <img class="avator" :src="message.role === 'user' ? avatorArr[0] : avatorArr[1]" />
            <p class="name">{{ message.role === 'user' ? nameArr[0] : nameArr[1] }}</p>
          </div>
          <div class="send-res">{{ message.content }}</div>
        </div>
      </div>
      <div class="start-show-wrapper" v-if="store.messageArr.length == 0">
        <div class="logo-wrapper">
          <div class="logo"><img src="@renderer/assets/img/logo/logo5.png" alt="" /></div>
          <p>有什么可以帮助您?</p>
        </div>
        <!-- 提示词 -->
        <div class="tipsWrapper">
          <div
            class="tips"
            v-for="button in buttons"
            :key="button.text"
            @click="sendMessage('user', button.text)"
          >
            <p class="label">{{ button.label }}</p>
            <p class="text">{{ button.text }}</p>
          </div>
        </div>
      </div>

      <!-- 输入框 -->
      <div class="input-container">
        <div class="input" ref="input">
          <div class="wait" v-if="store.is_Waiting">等待回答中......</div>
          <textarea
            v-model="inputMessage"
            onblur=" const input = document.querySelector('.input')
    input.style.border = '2px solid #00000029'"
            onfocus="const input = document.querySelector('.input')
    input.style.border = '2px solid #000'"
            @keydown.enter="sendMessage('user', inputMessage)"
            placeholder="您想知道些什么..."
            cols="30"
          ></textarea>
          <button
            class="send"
            :class="{ active: inputMessage !== '' }"
            @click="sendMessage('user', input.innerHtml)"
          >
            <el-icon><Top /></el-icon>
          </button>
        </div>
      </div>
      <div class="footer">{{ footerInfo }}</div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useAITalkStore } from '@renderer/stores/homeStore/AITalkStore/AItalk'
import homeViewText from '@renderer/assets/json/homeView.json'
import avator from '@renderer/assets/img/logo/logo4.png'
import logo from '@renderer/assets/img/logo/logo5.png'
import LabelType1 from '@renderer/components/LabelType1.vue'

// 用户和回复头像的路径
const avatorArr = ref([avator, logo])

// 用户和回复的名字
const nameArr = ref([...homeViewText.nameArr])

// 定义buttons数组
const buttons = ref([
  { type: 'info', text: homeViewText.buttonArr[0].text, label: homeViewText.buttonArr[0].label },
  { type: 'info', text: homeViewText.buttonArr[1].text, label: homeViewText.buttonArr[1].label },
  { type: 'info', text: homeViewText.buttonArr[2].text, label: homeViewText.buttonArr[2].label },
  { type: 'info', text: homeViewText.buttonArr[3].text, label: homeViewText.buttonArr[3].label }
])

const footerInfo = ref('@艾环梦工程科技')
// 获取输入的消息
let inputMessage = ref('')
const input = ref(null)
// 获取store
const store = useAITalkStore()

// 发送信息方法
const sendMessage = (role, msg) => {
  console.log(store.is_Returning)
  if (store.is_Returning) {
    console.log('正在返回')
    return
  }
  // 如果msg存在，就把msg赋值给inputMessage
  if (msg) {
    inputMessage.value = msg
  }
  // 如果inputMessage存在，就把inputMessage的值push到messages数组中
  if (inputMessage.value) {
    store.addMessage('user', inputMessage.value)
    inputMessage.value = ''
    store.getTalks()
    // 将msg和inputMessage置空
    msg = ''
    inputMessage.value = ''
  }
}

onMounted(() => {
  store.resetMessage()
  store.changePrompt('model1')
})
</script>

<style scoped lang="less">
.ai-production-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  position: relative;
  color: var(--font-level-13);
  .content-wrapper {
    width: 100%;
    height: 85%;
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    position: relative;
    .message-wrapper {
      width: 60%;
      overflow: hidden;
      height: 80%;
      overflow-y: auto;
      .message-area {
        width: 100%;
        margin-bottom: 30px;
        align-items: center; // 添加这一行
        font-size: 18px;

        .label {
          height: 50px;
          width: 100%;
          font-size: 16px;
          text-align: left;
          line-height: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .avator {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-top: 0px;
            // display: inline-block;
          }
          .name {
            height: 18px;
            font-weight: 600;
            margin-left: 20px;
          }
        }

        .send-res {
          width: 100%;
          // 允许换行并且高度自适应
          word-wrap: break-word;
          text-align: left;
          height: auto;
          margin-bottom: 10px;
          font-size: 18px;
          margin-top: 10px;
        }
      }
    }

    .start-show-wrapper {
      width: 100%;
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .logo-wrapper {
        width: 50%;
        height:80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .logo {
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        p {
          font-size: 28px;
          font-weight: 600;
          color: var(--font-level-13);
        }
      }
      .tipsWrapper {
        width: 50%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        .tips {
          width: 45%;
          height: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 15px;
          border: 1px solid #33333388;
          margin-bottom: 15px;
          margin-right: 20px;
          color: var(--font-level-4);
          background-color: var(--color-info);
          &:hover {
            background-color: rgba(168, 172, 169, 0.5);
            .label {
              color: var(--font-level-13);
            }
            .text {
              color: var(--font-level-9);
            }
          }
          .label {
            width: 80%;
            font-size: 20px;
            font-weight: 600;
            color: var(--font-level-1);
          }
          .text {
            width: 80%;
            font-size: 12px;
            text-align: left;
            color: var(--font-level-5);
          }
        }
      }
    }

    .input-container {
      height: 20%;
      width: 60%;
      display: flex;
      align-items: center;
      // background-color: #fff;
      border-radius: 10px;
      justify-content: center;

      .input {
        width: 80%;
        height: 33%;
        border-radius: 15px;
        border: 2px solid #00000029;
        position: relative;
        background-color: #fff;

        .wait {
          width: 100%;
          height: 100%;
          position: absolute;
          top: -50px;
          left: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          color: var(--font-level-13);
        }

        textarea {
          border: none;
          width: 92%;
          margin-left: 20px;
          outline: none;
          font-size: 20px;
          /* 清除默认的大小调整功能 */
          resize: none;
          color: var(--font-level-13);
        }
        .send {
          width: 30px;
          height: 30px;
          position: absolute;
          bottom: 10px;
          right: 8px;
          font-size: 25px;
          font-weight: 800;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          background-color: var(--color-success-hover);
          border: none;
          border-radius: 5px;
          color: var(--font-level-1);
        }
        .active {
          background-color: var(--color-success);
          transition: all 0.2s;
          &:hover {
            transform: scale(1.05);
            font-size: 26px;
          }
        }
      }
    }

    .footer {
      position: fixed;
      bottom: 10px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: var(--font-level-7);
    }
  }
}
</style>
