import { useState, useCallback, useRef } from 'react'
import type { ReaderData } from 'types/readable-stream/index'
import { ReaderResponseType, ReaderState } from 'types/readable-stream/enum'

const useRequestReadableStream = () => {
  
  let waitMsgTimer: NodeJS.Timeout;
  const waitMsgMS: number = 1e4;
  // let aborter: (() => void) | null;
  const [aborter, setAborter] = useState<(() => void) | null>()

  let aborterRef = useRef<(() => void) | null>()

  const transformSourceData = (data: string) => {
    let txt = data
    if (txt.includes('<br>') || txt.includes('<br/>')) {
      txt = txt.replace(/<br>|<br\/>/g, '\n')
    }
    if (txt.includes('&nbsp;')) {
      txt = txt.replace(/&nbsp;/g, ' ')
    }
    return txt
  }

  const read = (url: string, data: any, callback: (res: ReaderData) => void, transform: boolean = true) => {
    const type = Object.prototype.toString.call(data)
    let contentType;
    if (type === '[object Object]') {
      contentType = {
        'Content-Type': 'application/json'
      }
    }
    fetch(url, {
      method: 'POST',
      headers: {
        ...contentType,
        [sessionStorage['tokenName']]: sessionStorage['tokenValue']
      },
      body: type === '[object FormData]' ? data : JSON.stringify(data)
    })
    .then((response) => {
      if (response.ok) {
        return response
      }
      callback({type: ReaderState.RequestError})
      return
    })
    .then((response) => {
      const reader = response?.body?.getReader()
      return new ReadableStream({
        start(controller) {
          callback({type: ReaderState.Init})
          function pump():any {
            return reader?.read().then(({ done, value }) => {
              let txt = new TextDecoder().decode(value, {stream: true}).replaceAll('data:', '').replace(/\s*/g, '')
              if (transform) {
                txt = transformSourceData(txt)
              }
              clearTimeout(waitMsgTimer)
              if (txt === ReaderResponseType.GPT_ERROR || txt.indexOf(ReaderResponseType.GPT_ERROR) !== -1) {
                callback({type: ReaderState.Error, content: txt})
                return
              } else if (txt === ReaderResponseType.GPT_ILLEGAL || txt.indexOf(ReaderResponseType.GPT_ILLEGAL) !== -1) {
                callback({type: ReaderState.Illegal, content: txt})
                return
              } else if (txt === ReaderResponseType.EV_END || txt.indexOf(ReaderResponseType.EV_END) !== -1) {
                callback({type: ReaderState.End, content: txt})
                return
              }
              callback({type: ReaderState.Text, content: txt})
              waitMsgTimer = setTimeout(() => {
                console.log('useRequestReadableStream waitMsgTimer')
                callback({type: ReaderState.Timeout})
              }, waitMsgMS)
              if (done) {
                // setAborter(null)
                aborterRef.current = null
                controller.close()
                return
              }
              controller.enqueue(value)
              return pump()
            })
          }
          const abort = () => {
            reader?.cancel()
            clearTimeout(waitMsgTimer)
            console.log('useRequestReadableStream aborter')
            controller.error(new Error('Fetch aborted'))
          }
          // setAborter(() => abort)
          aborterRef.current = () => abort
          return pump()
        },
        cancel() {
          console.log('useRequestReadableStream cancel')
        }
      })
    })
    .catch((err) => {
      console.log('useRequestReadableStream onError: ', err)
      clearTimeout(waitMsgTimer)
      callback({type: ReaderState.RequestCatch})
    })
  }

  const cancel = () => {
    try {
      if (aborterRef.current) {
        aborterRef.current()
      }
      // if (aborter) {
      //   aborter()
      // }
    } catch (error) {
      console.error(error)
    }
  }

  // const test = useCallback(() => {
  //   console.log('useCallback')
  // }, [waitMsgTimer])

  return { read, cancel }
}

export default useRequestReadableStream
