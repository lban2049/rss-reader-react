import * as ScrollArea from '@radix-ui/react-scroll-area';
import Http from '../../request';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { DateTime } from 'luxon';

export default forwardRef(({ onShow }, ref) => {
  const [data, setData] = useState([]);
  const [activeData, setActiveData] = useState({});
  const [lastDate, setLastDate] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // 获取未读列表
  const getUnReadList = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    Http.get('/api/subscriptions/items', {
      params: {
        isRead: 0,
        lastDate: lastDate,
      }
    }).then(res => {
      setIsLoading(false);
      if (res.success) {
        const newData = res.data;
        console.log('newData', newData);

        if (newData.length > 0) {
          setData([...data, ...newData]);
          if (lastDate === undefined) {
            handleClick(newData[0]);
          }

          const newLastDate = newData[newData.length - 1].pubDate;
          setLastDate(newLastDate);
        }
      }
    }).catch(err => {
      setIsLoading(false);
      console.log(err);
    });
  }

  useEffect(() => {
    getUnReadList();
  }, []);

  // 点击选中内容，调用父组件方法，显示在右侧
  const handleClick = (item) => {
    setActiveData(item);

    // 调用Props件方法，显示在右侧
    if (onShow && typeof onShow === 'function') {
      onShow(item);
    }
  }

  useImperativeHandle(ref, () => ({

    // 内容已读，切换到下一条
    handleItemRead() {
      // 获取activeData的index，切换到下一条
      const index = data.findIndex(item => item.id == activeData.id);
      if (index > -1) {
        const nextIndex = index + 1;
        if (nextIndex < data.length) {
          handleClick(data[nextIndex]);
        }
      }
    }
  }));

  // 处理滚动事件，靠近底部时，加载更多
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      getUnReadList();
    }
  }

  return (
    <ScrollArea.Root className="h-full">
      <ScrollArea.Viewport className="h-full" onScroll={handleScroll}>
        {
          data && data.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleClick(item)}
                className={`${item.id == activeData.id ? 'bg-ws-800' : ''} flex p-5 items-start border-b border-solid border-ws-700 w-400 overflow-hidden cursor-pointer`}
              >
                <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden">
                  <img src={item.imageUrl} className="w-full h-full" />
                </div>
                <div className="flex-1 ml-5 text-left overflow-hidden">
                  <div className="text-ws-100 text-lg line-clamp-2">{item.title}</div>
                  <div className="text-ws-300 text-sm">
                    {`${DateTime.fromISO(item.pubDate).toFormat('yyyy-MM-dd HH:mm')} - ${item.author}`}
                  </div>
                  <div className="mt-2 text-xs text-ws-200 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.content }}></div>
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
})