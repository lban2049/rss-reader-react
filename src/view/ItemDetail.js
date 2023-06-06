import { DateTime } from "luxon";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { GlobeIcon, StarIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import Http from '../request';

export function ItemDetail({ itemData, onItemRead }) {

  // 处理已读点击事件，调用接口，更新内容为已读
  const handleReadClick = () => {
    Http.post('/api/subscriptions/items/read', {
      id: itemData.id
    }).then(res => {
      if (res.success) {
        console.log('更新已读成功')
        if (onItemRead && typeof onItemRead === 'function') {
          onItemRead()
        }
      }
    })
  }

  // 打开原文
  const handleOpenClick = () => {
    window.open(itemData.link);
  }


  return (
    <div className="text-ws-100 text-left py-5 max-w-3xl m-auto h-full flex flex-col">
      <div className="text-2xl shrink-0">
        {itemData?.title}
      </div>
      <div className="pt-5 flex justify-start text-ws-300 shrink-0">
        <div>
          {itemData?.author}
        </div>
        <div className="ml-5">
          {itemData?.pubDate && DateTime.fromISO(itemData?.pubDate).toFormat('yyyy-MM-dd HH:mm')}
        </div>
      </div>
      <div className="pt-5 flex justify-start items-center">
        <EyeOpenIcon className="w-7 h-7 cursor-pointer" onClick={handleReadClick} />
        <StarIcon className="w-7 h-7 ml-5 cursor-pointer" />
        <GlobeIcon className="w-7 h-7 ml-5 cursor-pointer" onClick={handleOpenClick} />
      </div>
      <div className="text-base pt-5 flex-1 overflow-hidden">
        <ScrollArea.Root className="h-full">
          <ScrollArea.Viewport className="h-full">
            <div dangerouslySetInnerHTML={{__html:itemData.content}}>
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="flex select-none touch-none bg-ws-300 w-1 rounded-full" orientation='vertical'>
            <ScrollArea.Thumb className="bg-ws-600 flex-1 rounded-full" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  )
}