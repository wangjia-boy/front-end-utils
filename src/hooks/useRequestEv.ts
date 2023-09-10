
import { useState, useRef } from 'react'
import { Event, EventSourcePolyfill } from 'event-source-polyfill'

let connectEventSourceTimeout = 60000 * 5
// let ev = null as any
// let connectEventSourceTimer = null as any
// let waitMsgTimer = null as any

const useRequestEv = () => {

  const evRef = useRef<any>(null)
  const connectEventSourceTimerRef = useRef<any>(null)
  const waitMsgTimerRef = useRef<any>(null)
  const [isManual, setIsManual] = useState(false as boolean)

  const renderEvFlow = (params: any, callback: any) => {
    let data = ''
    evRef.current = new EventSourcePolyfill(params.fullUrl || (params.url), {
      headers: {
        [sessionStorage['tokenName']]: sessionStorage['tokenValue']
      },
      heartbeatTimeout: params.connectEventSourceTimeout || connectEventSourceTimeout
    })

    connectEventSourceTimerRef.current = setTimeout(() => {
      evRef.current?.close()
      connectEventSourceTimerRef.current = null
      clearTimeout(connectEventSourceTimerRef.current)
    }, connectEventSourceTimeout)

    evRef.current.onopen = (e: any) => {
      connectEventSourceTimerRef.current = null
      clearTimeout(connectEventSourceTimerRef.current)
    }

    evRef.current.onmessage = (e: any) => {
      clearTimeout(waitMsgTimerRef.current)
      let txt = e.data
      if (txt.indexOf('[SOURCE]') !== -1) {
        const sourceMap: string = txt.split('[SOURCE]')[1] || '{}'
        callback.sourceCallback?.(sourceMap)
        return
      }
      data += txt
      data = data.replace('[GPT_ERROR]', '').replace('[GPT_ILLEGAL]', '').replace('[EV_END]', '')
      callback.doingCallback?.(data)
      if (txt === '[GPT_ERROR]') {
        callback.errCallback?.(data.replace('[GPT_ERROR]', ''))
        evRef.current?.close()
        return
      } else if (txt === '[GPT_ILLEGAL]') {
        callback.illegalCallback?.(data.replace('[GPT_ILLEGAL]', ''))
        evRef.current?.close()
        return
      } else if (txt === '[EV_END]') {
        callback.endCallback?.(data.replace('[EV_END]', ''))
        evRef.current?.close()
        return
      }
      // console.log(isManual)
      // 手动停止不走异常处理
      if (!isManual) {
        waitMsgTimerRef.current = setTimeout(() => {
          console.log('renderEvFlow waitMsgTimer')
          callback.errCallback?.(data.replace('[GPT_ERROR]', ''))
          // callback.endCallback?.(data.replace('[EV_END]', ''))
          evRef.current?.close()
        }, 3e4)
      }
    }

    evRef.current.onerror = (e: any) => {
      console.log('evRef.current.onerror', e, evRef.current)
      evRef.current?.close()
      connectEventSourceTimerRef.current = null
      callback.evErrCallback?.(e)
      clearTimeout(connectEventSourceTimerRef.current)
    }

    evRef.current.onclose = (e: any) => {
      console.log('renderEvFlow onclose')
      console.log(e)
    }

    evRef.current.addEventListener('close', (e: any) => {
      console.log('renderEvFlow close')
      console.log(e)
    })
  }

  const manualStopFlow = () => {
    setIsManual(true)
    setTimeout(() => {
      evRef.current?.close()
      connectEventSourceTimerRef.current = null
      clearTimeout(connectEventSourceTimerRef.current)
    }, 300)
  }

  const stopFlow = (isManual: boolean = false) => {
    setIsManual(isManual)
    evRef.current?.close()
    connectEventSourceTimerRef.current = null
    console.log('00000000', isManual)
    clearTimeout(connectEventSourceTimerRef.current)
  }
  return { renderEvFlow, manualStopFlow, stopFlow }
}
export default useRequestEv
