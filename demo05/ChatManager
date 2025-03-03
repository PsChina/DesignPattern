/*
 * @Author: pss
 * @Date: 2023-04-13 11:57:50
 * @LastEditors: pss
 * @LastEditTime: 2023-06-06 17:36:47
 * @Description:
 */
import { wsBaseUrl } from "@/config"
import Taro, {
  SocketTask,
  UploadTask,
  onNetworkStatusChange,
} from "@tarojs/taro"
import {
  historyMessages,
  updateReadStatus,
  uploadFile,
  UploadParma,
  UpdateReadStatusParamVO,
  historyAlarm,
} from "@/service"
import { getStore, showToast } from "@/utils/taro-utils"
import { generateRandomID, date } from "@/utils/utils"
import { saveLatestPoliceTicket } from "../history/history"
export interface ChatMessage {
  senderType: number // 消息发送者类型
  content: string // 消息内容
  isRead?: boolean // 接收方阅读状态
  messageId: string // 消息ID
  messageType: string | number // 消息类型
  pictureUrl?: string // 图片路径
  receiverId?: string // 接收方ID
  sendTime: string // 发送时间
  senderId: string // 发送方ID
  senderName: string | undefined // 发送方名字
  unreadMessageCount?: string // 未读消息数量
  sending?: "sending" | "fail" | undefined //  sending 正在发送 fail 发送失败 undefined 为发送成功
  uploadTask?: UploadTask
}

interface SocketMessage {
  senderType: number
  messageId: string
  receiverId: string
  senderId: string
  senderName: string
  messageType: string | number
  sendTime: string
  content: string
}

interface MessagesCallBack {
  (message: ChatMessage | SocketMessage): void
}

type ChatMessageList = Array<ChatMessage>

interface HistoryMessagesCallBack {
  (message: ChatMessageList): void
}

export interface UserInfo {
  id: string
  name: string
}

class ChatManager {
  static instance: any = null // 全局唯一聊天管理者实例
  static baseUrl: string = wsBaseUrl
  static policeId: string = "" // 警员id
  static userInfo: UserInfo | null = null
  static tempFilePathMap: Map<string, string> = new Map()
  static calledSit: string = "" // 被呼叫警员id

  static setBaseUrl(url: string) {
    ChatManager.baseUrl = url
  }

  static setUserInfo(userInfo: UserInfo) {
    ChatManager.userInfo = userInfo
  }
  static setCalledSit(calledSit: string) {
    ChatManager.calledSit = calledSit
  }

  // 获取历史消息回调
  static getHistoryMessagesCallback: HistoryMessagesCallBack = () => null

  // 历史消息回调
  static onGetHistoryMessages(fn: HistoryMessagesCallBack) {
    ChatManager.getHistoryMessagesCallback = fn
  }

  // 是不是用户自己
  static isUser(id) {
    return ChatManager.userInfo?.id === id
  }

  /**
   *  根据消息 id 获取文件路径
   * @param id string
   * @returns string
   */
  static getTempFilePathById(id: string) {
    return ChatManager.tempFilePathMap.get(id)
  }

  /**
   * 存储临时文件路径
   * @param id string
   * @param path string
   */
  static setTempFilePathById(id: string, path: string) {
    ChatManager.tempFilePathMap.set(id, path)
  }

  /**
   * 清除临时文件路径
   */
  static clearTempFilePath() {
    ChatManager.tempFilePathMap.clear()
  }

  socketTask: SocketTask | null = null // socket 实例
  acceptNo: string = "" // 受理号
  bizId: string = "" // 警单id
  historyMessages: ChatMessageList = [] // 历史聊天记录
  socketLive: "ping" | "pong" | undefined = undefined
  liveTimer: NodeJS.Timeout | null = null // socket 活跃状态
  checkoutTimer: NodeJS.Timeout | null = null // 心跳检测定时器
  checkNetWorkTimer: NodeJS.Timeout | null = null // 检测网络变化的定时器
  msgTimeoutCheckMap = new Map() // 超时检测 map
  timeout = 10 * 1000 // 10 秒超时
  maxReconnectTime = 10 // 最大重连次数
  currentReconnectTime = 0 // 当前重连次数
  socketIsWork = false // socket 工作状态
  messagesPageIsHide = true // 消息页是否隐藏
  // 收到消息的回调
  reciveMessage: MessagesCallBack = () => null
  // 收到文本消息的回调
  reciveTextMessageCallback: MessagesCallBack = () => null
  // 收到文件消息的回调
  reciveFileMessageCallback: MessagesCallBack = () => null
  // 收到反馈消息的回调
  messageFeedbackCallback: MessagesCallBack = () => null
  // 有消息已读
  messageReadCallback: MessagesCallBack = () => null
  // 视频通话请求被挂断
  videoCallHangupCallback: MessagesCallBack = () => null
  constructor() {
    const self = ChatManager.instance
    if (self) {
      // 尝试重连socket
      self.resetReconnetParamsAndReconnect()
      return self
    }
    this.initChat()
    // 注册网络状态变更回调
    onNetworkStatusChange(this.netWorkStatusChange.bind(this))
    ChatManager.instance = this
  }

  // 检查网络状态
  netWorkStatusChange(res) {
    // 判断网络状态
    if (res && res.isConnected) {
      // 能上网 尝试重连socket
      this.resetReconnetParamsAndReconnect()
    } else {
      // 不能上网 关闭重连
      this.maxReconnectTime = 0
    }
  }

  // 重置重连参数并重连
  resetReconnetParamsAndReconnect() {
    // 判断socket是否正常工作
    if (!this.socketIsWork) {
      // 如果发现链接已经断开 （socket 工作不正常）
      this.maxReconnectTime = 10
      // 如果当前尝试次数大于最大重连次数那么重置当前重连次数
      if (this.currentReconnectTime >= this.maxReconnectTime) {
        this.currentReconnectTime = 0
      }
      // 尝试重连
      this.reConnect()
    }
    // socket 工作正常就什么都不做
  }

  // 设置受理信息
  setAcceptanceInformation(acceptNo: string, bizId: string) {
    this.acceptNo = acceptNo
    this.bizId = bizId
  }

  // 清除受理信息
  clearAcceptanceInformation() {
    this.acceptNo = ""
    this.bizId = ""
  }

  // 获取历史聊天记录
  getChatHistory() {
    return new Promise((resolve, reject) => {
      // 发送请求
      historyMessages({
        roleFlag: 0,
        id: ChatManager.userInfo!.id,
      }).then((res) => {
        if (Number(res.code) === 200) {
          resolve(res.data)
          this.historyMessages = res.data
          // 调用已注册的回调函数
          ChatManager.getHistoryMessagesCallback(this.historyMessages)
        } else {
          reject(res)
        }
      })
    })
  }

  // 获取最新警单id
  async getLatestPoliceTicket() {
    let latestPoliceTicket
    try {
      // 从本地缓存获取有效警单
      const res = await getStore("LatestPoliceTicket")
      if (res && res.data) {
        latestPoliceTicket = res.data
      }
    } catch (e) {}
    if (!latestPoliceTicket) {
      // 通过网络请求获取警单
      const res = await historyAlarm(1, 50)
      if (+res.code === 200) {
        const alarmList = res?.data?.records ?? []
        latestPoliceTicket = saveLatestPoliceTicket(alarmList)
      } else {
        showToast("网络错误")
      }
    }
    return latestPoliceTicket
  }

  // 发送消息 type 1 文本信息 2 文件信息
  sendMessage(message: string) {
    if (this.socketTask) {
      // socket 存在则发送消息
      this.socketTask.send({
        data: message,
      })
      return true
    }
    return false
  }

  // 设置超时反馈
  setTimeoutFeedBack(messageId) {
    const timer = setTimeout(() => {
      this.sendMessageTimeout(messageId)
    }, this.timeout)
    // 将定时器 id 和消息 id 绑定
    this.msgTimeoutCheckMap.set(messageId, timer)
  }

  // 发送文本信息
  sendTextMessage(content: string) {
    return new Promise<ChatMessage>((resolve) => {
      // 初始化消息体
      const message: ChatMessage = {
        senderType: 0,
        messageId: generateRandomID(),
        senderId: ChatManager.userInfo?.id!,
        senderName: ChatManager.userInfo?.name,
        messageType: 1,
        sendTime: date(Date.now(), "YYYY-MM-dd HH:mm:ss") as string,
        content,
        sending: "sending",
      }
      // 序列化消息体
      const messageText = JSON.stringify(message)
      // 发送消息
      const sending = this.sendMessage(messageText)
      // 设置消息发送超时定时器
      this.setTimeoutFeedBack(message.messageId)
      if (sending === false) {
        message.sending = "fail"
      }
      resolve(message)
    })
  }

  // 发送多媒体信息
  async sendMutMediaMsg(tempFiles) {
    // 多媒体消息存在则发送
    if (tempFiles && tempFiles.length) {
      if (!this.acceptNo || !this.bizId) {
        // 警单号不存在尝试获取
        await this.initPoliceTicket()
      }
      // 警单号存在初始化多媒体消息
      const messages = tempFiles.map(async (tempFile) => {
        const { tempFilePath, fileName } = tempFile
        // 序列化消息内容
        const content = JSON.stringify({
          fileName: fileName
            ? fileName
            : tempFilePath && tempFilePath.split("/").reverse()[0],
          url: tempFile.tempFilePath,
        })
        // 初始化多媒体消息
        const message: ChatMessage = {
          senderType: 0,
          messageId: generateRandomID(),
          senderId: ChatManager.userInfo?.id!,
          senderName: ChatManager.userInfo?.name,
          messageType: 2,
          sendTime: date(Date.now(), "YYYY-MM-dd hh:mm:ss") as string,
          content,
          uploadTask: undefined,
          sending: "sending",
        }
        // 将多媒体消息上传至文件服务器 返回上传任务
        const uploadTask = await this.uploadFile({
          file: tempFile,
          acceptNo: this.acceptNo,
          bizId: this.bizId,
          header: {
            "file-name": encodeURIComponent(tempFile?.fileName || ""),
          },
          success: (result) => {
            if (result && result.data) {
              // 上传成功
              const { data } = result
              const json = JSON.parse(data)
              // 复写上传成功后的地址到消息体
              if (json.data) {
                const content = json.data[0]
                const sendMessage = {
                  ...message,
                  content,
                }
                // 序列化消息体
                const messageText = JSON.stringify(sendMessage)
                // 发送多媒体消息
                this.sendMessage(messageText)
                // 设置消息发送超时定时器
                this.setTimeoutFeedBack(message.messageId)
              }
            }
          },
        })
        // 复写上传任务
        message.uploadTask = uploadTask
        // 返回消息体
        return message
      })
      // 返回多媒体消息
      return messages
    }
    return []
  }

  // 接收到消息
  onReciveMessage(fn: MessagesCallBack) {
    this.reciveMessage = fn
  }

  // 接收文本信息
  onReciveTextMessage(fn: MessagesCallBack) {
    this.reciveTextMessageCallback = fn
  }

  // 接收文件信息
  onReciveFileMessage(fn: MessagesCallBack) {
    this.reciveFileMessageCallback = fn
  }

  // 接受反馈信息 type 4
  onMessageFeedback(fn: MessagesCallBack) {
    this.messageFeedbackCallback = fn
  }

  // 有消息已读 type 5
  onMessageRead(fn: MessagesCallBack) {
    this.messageReadCallback = fn
  }

  // 视频通话请求被挂断 type 6
  onCallHangup(fn: MessagesCallBack) {
    this.videoCallHangupCallback = fn
  }

  // 心跳检测 type 0
  startHeartbeatDetection() {
    // 心跳轮询定时器不存在
    if (!this.liveTimer) {
      // 初始化心跳轮询定时器
      this.liveTimer = setInterval(() => {
        if (this.socketTask) {
          // 准备发送 pong
          const content = "ping"
          // 序列化消息
          const message = JSON.stringify({
            messageType: "0",
            content,
          })
          // 发送心跳检测消息
          this.sendMessage(message)
          // 将心跳状态设置为 pong
          this.socketLive = content
          // 初始化检测定时器
          this.checkoutTimer = setTimeout(() => {
            // 2 秒钟后检测是否任然为 pong
            if (this.socketLive === content) {
              // 心态状态未变化 重新连接
              this.reConnect()
            }
          }, 1000 * 2)
        }
      }, 1000 * 10)
    }
  }

  // 消息发送超时消息
  sendMessageTimeout(messageId) {
    const data = {
      messageId,
      content: "error; send message timeout.",
    } as SocketMessage
    this.messageFeedbackCallback(data)
  }

  // 关闭心跳检测
  closeHeartbeatDetection() {
    // 心跳轮询定时器存在
    if (this.liveTimer) {
      // 清空定时器
      clearInterval(this.liveTimer)
      this.liveTimer = null
    }
    // 检测定时器存在
    if (this.checkoutTimer) {
      // 清空定时器
      clearTimeout(this.checkoutTimer)
      this.checkoutTimer = null
    }
  }

  // 上传文件 返回上传任务
  uploadFile(data: UploadParma) {
    return uploadFile(data)
  }

  // 下载文件
  downloadFile() {}
  // 反馈已读消息
  messagesBeenRead(data: Array<UpdateReadStatusParamVO>) {
    if (this.messagesPageIsHide) {
      return false
    }
    return updateReadStatus(data)
  }

  // 建立 socket 连接
  async connect() {
    const { userInfo } = ChatManager
    // 用户不存在
    if (!userInfo) {
      // 退出
      return
    }
    // 初始化 socket 连接
    const url = `${ChatManager.baseUrl}/user${userInfo.id}_${encodeURI(
      userInfo.name
    )}`
    // 初始化 socket
    const socketTask = await Taro.connectSocket({
      url,
    })
    // 保存 socket 任务
    this.socketTask = socketTask
    // 设置错误 15秒后 重连
    socketTask.onError((error) => {
      console.log("Websocket Error", error)
      this.socketIsWork = false
      setTimeout(this.reConnect.bind(this), 1000 * 15)
    })
    // 链接成功
    socketTask.onOpen(() => {
      // 清除重连次数
      this.claerReconnectTime()
      // 设计心跳检测
      this.startHeartbeatDetection()
      this.socketIsWork = true
    })
    // 处理收到信息回调
    socketTask.onMessage((evt: any) => {
      // 解析 data 数据
      const data: SocketMessage = JSON.parse(evt.data)
      const type = Number(data.messageType)
      data.messageType = type
      switch (type) {
        case 0:
          // 收到心跳
          this.socketLive = data.content as "pong"
          break
        case 1:
          // 收到文本消息
          this.reciveTextMessageCallback(data)
          this.reciveMessage(data)
          break
        case 2:
          // 接收到文件消息
          this.reciveFileMessageCallback(data)
          this.reciveMessage(data)
          break
        case 4:
          // 信息发送反馈
          this.messageFeedbackCallback(data)
          // 取消消息发送超时定时器
          this.cancelMessageTimeout(data.messageId)
          break
        case 5:
          // 有已读信息
          this.messageReadCallback(data)
        case 6:
          const content = JSON.parse(data.content)
          // 视频通话请求被挂断
          if (ChatManager.calledSit === content.sitCode) {
            this.videoCallHangupCallback(data)
          }
          break
        default:
          break
      }
    })
    // 正常关闭的回调监听
    socketTask.onClose((evt) => {
      this.socketIsWork = false
      console.log("Connection closed.", evt)
      if (evt.reason !== "小程序主动关闭") {
        // 异常关闭重连
        setTimeout(() => this.reConnect(), 3000)
      }
    })
  }

  // 重连
  reConnect() {
    if (this.enableReconnect()) {
      // 先断开连接
      this.disconnect()
      // 重新连接
      this.connect()
      // 重连次数加一
      this.updateReconectTime()
    }
  }

  // 断开连接
  disconnect() {
    // socket 任务存在
    if (this.socketTask) {
      // 关闭心跳轮询
      this.closeHeartbeatDetection()
      // 关闭 socket 任务
      Taro.closeSocket({
        reason: "小程序主动关闭",
        success() {
          this.socketIsWork = false
          // 清空缓存任务
          this.socketTask = null
        },
      })
    }
  }

  // 初始化聊天
  async initChat() {
    // 如果用户信息不存在那么结束初始化
    if (!ChatManager.userInfo) {
      return
    }
    // 初始化有效警单号
    await this.initPoliceTicket()
    // 链接websocket
    this.connect()
  }

  // 设置警单号
  async initPoliceTicket() {
    // 获取最近的警单
    const res = await this.getLatestPoliceTicket()
    if (res) {
      // 设置 受理号 警单id
      const { acceptNum, id } = res
      this.setAcceptanceInformation(acceptNum, id)
    }

    return res
  }

  // 关闭聊天
  closeChat() {
    // 断开 socket
    this.disconnect()
    // 清空 map
    this.msgTimeoutCheckMap.clear()
    // 清除临时文件路径
    ChatManager.clearTempFilePath()
    // 清空历史数据
    this.historyMessages = []
    // 清除重连次数
    this.claerReconnectTime()
    // 清除警单
    this.clearAcceptanceInformation()
  }

  // 取消超时
  cancelMessageTimeout(messageId) {
    const timer = this.msgTimeoutCheckMap.get(messageId)
    clearTimeout(timer)
  }

  // 更新当前重连次数
  updateReconectTime() {
    this.currentReconnectTime++
  }

  // 是否达到最大重连次数
  enableReconnect() {
    return this.currentReconnectTime < this.maxReconnectTime
  }

  // 清除重连次数
  claerReconnectTime() {
    this.currentReconnectTime = 0
  }

  // 设置是否在聊天页面的标记
  setMessagesPageIsHide(value: boolean) {
    this.messagesPageIsHide = value
  }
}

export default ChatManager
