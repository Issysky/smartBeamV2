import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// 引入json文件
import talkData from '@renderer/assets/json/talk.json'

export const useAITalkStore = defineStore('AItalk', () => {
  // 存放message的数组
  const messageArr = ref([])
  // 定义存放提示信息的数组
  const promptArr = ref([
    {
      role: 'system',
      content: 'You are a helpful assistant.'
    },
    {
      role: 'user',
      content: talkData.model1
    },
    {
      role: 'assistant',
      content: '好的，我了解了'
    }
  ])
  // 模式提示词
  const buttonArr = ref([
    {
      index: 0,
      model: talkData.model1,
      text: talkData.button1,
      isActive: true
    },
    {
      index: 1,
      model: talkData.model2,
      text: talkData.button2,
      isActive: false
    }
  ])
  // 是否正在返回消息
  const is_Returning = ref(false)
  // 是否正在等待返回消息
  const is_Waiting = ref(false)
  // 定义定时器
  let timer = null
  // 通义千问接口地址
  // const url = '119.45.206.196:5012/test'
  const url = 'http://119.45.206.196:5012/test'
  // const url = 'http://119.45.206.196:5012/test/api/v1/services/aigc/text-generation/generation'
  // 请求头
  const headers = {
    'Content-Type': 'application/json',
    Authorization: talkData.key
    // Authorization: 'sk-41a613af91ba496890f78e1eb57a27dd'
  }
  // 请求体
  const data = {
    model: 'qwen-turbo',
    input: {
      messages: [
        {
          role: '',
          content: ''
        }
      ]
    },
    parameters: {
      seed: 65535
    }
  }
  // 发送请求
  function getTalks() {
    is_Returning.value = true
    is_Waiting.value = true
    // 将messagesArr.value赋值给请求体
    data.input.messages = [...promptArr.value, ...messageArr.value]
    // console.log(data.input.messages)
    console.log('调用getTalks发送请求')
    axios
      .post(url, data, { headers })
      .then((response) => {
        let res = response.data
        // console.log(res)
        // console.log(res.output.text)
        // 拼接历史记录
        addMessage('assistant', res.output.text)
        // console.log(messageArr)
        // console.log(messageArr.value)
      })
      .catch((error) => {
        console.warn(error)
      })
  }
  // 添加用户消息到消息数组
  function addMessage(role, content) {
    if (role === 'user') {
      messageArr.value.push({
        role,
        content
      })
    } else {
      // console.log(content.length, content, content[1])
      combination(content)
    }
  }
  // 清空消息数组
  function resetMessage() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    messageArr.value = []
  }
  // 更换提示信息
  function changePrompt(type) {
    if (type === 'model1') {
      promptArr.value = [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: talkData.model1
        },
        {
          role: 'assistant',
          content: '好的，我了解了'
        }
      ]
    } else if (type === 'model2') {
      promptArr.value = [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: talkData.model2
        },
        {
          role: 'assistant',
          content: '好的，我了解了'
        }
      ]
    }
  }
  // 将返回内容分解为单个字符拼接到数组中，实现字符逐个出现的效果
  function combination(content) {
    // 临时存放结果的数组
    let arr = []
    // 存入数组的索引
    let index = 0
    // 打印字符的随机间隔时间ms
    let max = 200
    let min = 50
    let interval = 3000 / content.length
    // let interval = Math.floor(Math.random() * (200 - 50 + 1)) + 50
    messageArr.value.push({
      role: 'assistant',
      content: ''
    })
    // 结束等待
    is_Waiting.value = false
    // 启用计时器，每隔interval毫秒将content中的一个字符拼接到数组中
    timer = setInterval(() => {
      arr.push(content[index])
      index++
      messageArr.value[messageArr.value.length - 1].content = arr.join('')
      if (index >= content.length) {
        let res = arr.join('')
        // console.log('拼接结果', res)
        clearInterval(timer)
      }
    }, interval)
    setTimeout(() => {
      is_Returning.value = false
    }, 3000)
  }
  return {
    messageArr,
    buttonArr,
    is_Returning,
    is_Waiting,
    addMessage,
    getTalks,
    resetMessage,
    changePrompt
  }
})
