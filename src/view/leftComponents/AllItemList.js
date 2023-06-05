import * as ScrollArea from '@radix-ui/react-scroll-area';
import Http from '../../request';
import { useState, useEffect } from 'react';

export default function AllItemList() {
  const [data, setData] = useState([]);
  const [activeData, setActiveData] = useState({});

  let lastDate = undefined;

  // 获取未读列表
  const getUnReadList = () => {
    Http.get('/api/subscriptions/items', {
      params: {
        isRead: 0,
        lastDate,
      }
    }).then(res => {
      if (res.success) {
        const newData = res.data;
        console.log('newData', newData);

        if (newData.length > 0) {
          lastDate = newData[newData.length - 1].pubDate;
          setData([...data, ...newData]);
        }
      }
    });
  }

  useEffect(() => {
    getUnReadList();
  }, []);

  return (
    <ScrollArea.Root className="h-full">
      <ScrollArea.Viewport className="h-full">
        {
          data && data.map((item, index) => {
            return (
              <div key={index} className="flex p-5 items-start border-b border-solid border-ws-700 w-400 overflow-hidden cursor-pointer">
                <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden">
                  <img src={item.imageUrl} className="w-full h-full" />
                </div>
                <div className="flex-1 ml-5 text-left overflow-hidden">
                  <div className="text-ws-100 text-lg line-clamp-2">{item.title}</div>
                  <div className="mt-2 text-xs text-ws-200 line-clamp-3">{item.content}</div>
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