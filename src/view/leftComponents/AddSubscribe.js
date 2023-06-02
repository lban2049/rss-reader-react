import * as Dialog from '@radix-ui/react-dialog';
import { PlusIcon, Cross1Icon } from '@radix-ui/react-icons';
import Parser from 'rss-parser/dist/rss-parser.min.js'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { BaseUrl } from '../../config';
import { useEffect, useState } from 'react';
import Http from '../../request';

export default function AddSubscribe() {

  // 订阅地址栏按Enter键时，预览订阅信息
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setData(null);
      const parser = new Parser()
      // 通过转发获取信息
      const url = `${BaseUrl}proxy?modify&proxyUrl=${e.target.value}`
      parser.parseURL(url, (err, feed) => {
        if (err) {
          console.log(err)
        } else {
          setData(feed)
          console.log(feed)
        }
      })
    }
  }

  // 添加订阅
  const handleAddSubscribe = () => {
    console.log('添加订阅')
    const rssData = {
      link: data.link,
      title: data.title,
      rssLink: data.feedUrl,
      imageUrl: data.image.url,
      lastBuildDate: data.lastBuildDate,
      description: data.description
    }

    Http.post('/api/subscriptions/add', rssData).then(res => {
      if (res.success) {
        alert('订阅成功！')
      }

      console.log('res', res)
    });
  }

  const [data, setData] = useState(null);

  // 关闭弹窗，清空数据
  const handleClose = () => {
    setData(null)
  }

  return (
    <Dialog.Root onOpenChange={handleClose}>
      <Dialog.Trigger className="flex items-center justify-center h-full text-ws-100 cursor-pointer">
        <PlusIcon className="w-9 h-9" />
      </Dialog.Trigger>
      <Dialog.Portal>

        <Dialog.Overlay className="fixed inset-0 bg-ws-500 bg-opacity-50" />
        <Dialog.Content className="fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/4 h-3/4 bg-ws-950 rounded-2xl overflow-hidden">
          <Dialog.Title className="text-3xl text-ws-100 text-left p-5 border-b border-solid border-ws-700">添加订阅</Dialog.Title>
          <Dialog.Description className="text-ws-100 text-center p-5 flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center">
              <div className="flex-1">
                <input
                  className="text-base h-11 w-full border-2 border-solid border-ws-700 text-ws-100 bg-ws-950 rounded-lg px-4 focus:border-ws-700 focus:shadow-ws-700 focus:shadow shadow-none"
                  placeholder="输入订阅地址，按enter键预览信息"
                  onKeyDown={handleKeyDown}
                />
              </div>

            </div>
            <div className="mt-5 flex-1 overflow-hidden">
              <ScrollArea.Root className="h-full">
                <ScrollArea.Viewport className="h-full">
                  {
                    data && (
                      <div className="flex border border-solid border-ws-700 rounded-lg p-5">
                        <div className="w-15 h-10 shrink-0 rounded-lg overflow-hidden">
                          <img src={data.image.url} alt="" className="w-full h-full" />
                        </div>
                        <div className="ml-5 flex-1 text-left">
                          <div className="flex items-center">
                            <div className="text-2xl text-ws-100 flex-1">
                              {data.title}
                            </div>
                            <div className="ml-5 shrink-0 h-10 rounded-lg bg-ws-700 hover:bg-ws-500 cursor-pointer text-center px-5 text-xl leading-9 "
                              onClick={handleAddSubscribe}
                            >
                              订阅
                            </div>
                          </div>
                          <div className="text-ws-300 text-base mt-2">
                            {data.description}
                          </div>
                          <ul className="mt-2 list-disc">
                            {
                              data.items.map((item, index) => {
                                if (index > 4) {
                                  return null;
                                }

                                return (
                                  <li className="text-ws-300 text-base">
                                    {item.title}
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    )
                  }
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="flex select-none touch-none bg-ws-300 w-1 rounded-full" orientation='vertical'>
                  <ScrollArea.Thumb className="bg-ws-600 flex-1 rounded-full" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </div>
          </Dialog.Description>
          <Dialog.Close className="absolute top-5 right-5 w-9 h-9 cursor-pointer">
            <Cross1Icon className="w-9 h-9 text-ws-100" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}