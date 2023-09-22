<template>
  <div class="aiBot">
    12312
    <div class="chatContain">
      <div class="aiBotBox">
        <div class="boxContent">
          <div class="aiBotLogoArea"><img class="aiBotLogo" src="./assets/Angulara.png" /></div>
            <div class="chatArea">
              <span class="contentSpan">
                <span>您好，我是智能AI專家，歡迎您使用AI智能服務。</span>
                <ul>
                  <li v-for="(message, index) in defaultMessage" :key="index" @click="pickMessage(message)">{{ message }}</li>
                </ul>
              </span>
            </div>
          <div class="date">{{ startTime }}</div>
        </div>
      </div>
      <div v-for="(message, index) in messages" :key="index" :class="{ aiBotBox: message.type === 'bot', selfBox: message.type === 'user' }">
        <div class="boxContent">
          <div class="aiBotLogoArea" v-if="message.type === 'bot'"><img class="aiBotLogo" src="./assets/Angulara.png" /></div>
          <div class="chatArea">
            <span class="contentSpan">
              <span>{{ message.content }}</span>
            </span>
          </div>
          <div class="date">{{ message.timestamp }}</div>
        </div>
      </div>
    </div>
    <div class="chatInputArea">
      <div><span class="chatName">A</span></div>
        <div class="chatInputDiv">
          <input type="text" class="chatInput" placeholder="請輸入訊息" v-model="message" @keyup.enter="sendMessage"/>
        </div>
        <div>
          <button class="chatMic"></button>
        </div>
        <div>
          <button type="text" class="chatNext" @click="sendMessage"></button>
        </div>
      </div>
    </div>
</template>
  
<script>
import chatbotAPI from './api/chatbot'
export default {
  props: {},
  data() {
    return {
      startTime: "",
      messages: [],
      message: "",
      defaultMessage:[
        "請問如何調整實際負載容量?",
        "該場域年度契約容量為何?",
        "請問哪台配備負載量最高?",
        "時間電價區間為何?",
      ]
    };
  },
  created() {
    this.startTime = this.getCurrentTime();
  },
  methods: {
      getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      },
      pickMessage(askMsg) {
        this.message = askMsg
        this.sendMessage()
      },
      addMessage(message, type) {
        const msg = {}
        msg.content = message
        msg.type = type
        msg.timestamp = this.getCurrentTime()
        this.messages.push(msg)
      },
      async sendMessage () {
        if (this.message.trim() === '') {
          return false
        }
        this.addMessage(this.message, "user")
        var formData = new FormData();
        formData.append('question', this.message);
        const params = "index=iEMS_index&method=similarity"
        this.message = ""
        try {
          const resp = await chatbotAPI.requestSearch(formData, params)
          if (resp.data != null && resp.data.errCode === 0) {
            this.addMessage(resp.data.data, "bot")
          } else {
            this.addMessage("Error fetching response", "bot")
          }
        } catch (error) {
          this.addMessage("Connection error", "bot")
        }
      }
    },
};
</script>


<style scoped>

.aiBot{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .chatInputArea{
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 56px;
      padding: 12px 24px;
      box-sizing: border-box;
      border-top: 1px solid #C8C8C8;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
  }
  .chatContain {
      position: absolute;
      box-sizing: border-box;
      padding: 24px 4px;
      overflow-y: auto;
      overflow-x: hidden;
      height: calc(100% - 56px);
      width: 100%;
  }
  .chatBox{
      margin: 5px;
  }
  .selfBox {
      position: relative;
      display: flex;
      justify-content:flex-end;
      margin-top: 8px;
  }
  .selfBox .boxContent {
      max-width: calc(100% - 50px);
      display: flex;
      justify-content:flex-start;
      flex-direction:row-reverse;
  }
  .date {
      display: flex;
      color: #C8C8C8;
      align-items:flex-end;
      line-height: 16px;
      font-size: 12px;
      margin: 0px 2px;
  }
  .chatArea {
      box-sizing: border-box;
      color: #323233;
  }
  .chatArea .contentSpan{
      display: inline-block;
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
      padding: 8px 12px;
  }
  .selfBox .chatArea .contentSpan{
      background-color: #C6E6F9;
      border-top-left-radius: 20px;
  }
  .aiBotBox {
      position: relative;
      display: flex;
      justify-content:flex-start;
      margin-top: 8px;
  }
  .aiBotBox .boxContent {
      max-width: calc(100% - 50px);
      display: flex;
      justify-content:flex-start;
  }
  .aiBotBox .chatArea .contentSpan{
      background-color: #EDEDED;
      border-top-right-radius: 20px;
  }
  .aiBotBox .chatArea ul{
      list-style: none;
      padding: 0px;
  }
  .aiBotBox .chatArea li{
      margin-top: 5px;
      border: 1px solid #2A9ED7;
      color: #2A9ED7;
      background-color: #FFFFFF;
  }
  .aiBotBox .chatArea li:hover{
      color: #FFFFFF;
      background-color: #2A9ED7;
  }
  .aiBotLogoArea{
      position: relative;
      width: 50px;
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
  }
  .aiBotLogo{
      width: 40px;
      height: 40px;
      border-radius: 50px;
  }
  .chatName{
      display: flex;
      background-color: #C6E6F9;
      color: #2A9ED7;
      border-radius: 50px;
      width: 24px;
      height: 24px;
      text-align: center;
      align-items: center;
      justify-content:center;
  }
  .chatInputDiv{
      width: calc(100% - 100px);
  }
  .chatInput{
      background-color: transparent;
      border: 0;
      width: 100%;
      height: 24px;
  }
  .chatNext {
      background-color: transparent;
      border: 0;
      padding: 0;
      margin: 0;
      background-image: url(./assets/normalnext.svg);
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
  }
  .chatMic{
      background-color: transparent;
      border: 0;
      padding: 0;
      margin: 0;
      background-image: url(./assets/normalmic.svg);
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
  }
</style>