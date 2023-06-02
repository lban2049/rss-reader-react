import * as ScrollArea from '@radix-ui/react-scroll-area';
import Http from '../../request';
import { useState, useEffect } from 'react';

export default function SubscribeList() {
  const [data, setData] = useState([])

  useEffect(() => {
    // 获取订阅列表
    Http.get('/api/subscriptions/all').then(res => {
      if (res.success) {
        setData(res.data)
      }
    })
  }, [])

  return (
    <ScrollArea.Root className="h-full">
      <ScrollArea.Viewport className="h-full">
        {
          data && data.map((item, index) => {
            return (
              <div key={index} className="flex p-5 items-start border-b border-solid border-ws-700">
                <div className="h-20 w-20 shrink-0 rounded-lg overflow-hidden">
                  <img src={item.imageUrl} className="w-full h-full" />
                </div>
                <div className="flex-1 items-center ml-5 text-left">
                  <div className="text-ws-50 text-lg">{item.title}</div>
                  <div className="mt-2 text-xs text-ws-200 break-all">{item.description}</div>
                </div>
              </div>
            )
          })
        }
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex select-none touch-none bg-ws-300 w-1 rounded-full" orientation='vertical'>
        <ScrollArea.Thumb className="bg-ws-600 flex-1 rounded-full" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}