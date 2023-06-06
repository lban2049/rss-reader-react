import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { GearIcon, PaperPlaneIcon, EnvelopeClosedIcon, StarIcon, PlusIcon } from '@radix-ui/react-icons'
import AddSubscribe from './leftComponents/AddSubscribe'
import AllItemList from './leftComponents/AllItemList'
import SubscribeList from './leftComponents/SubscribeList'

export default forwardRef(({ onItemShow }, ref) => {
  const allItemListRef = useRef(null);

  const tabs = [
    {
      title: '全部',
      icon: EnvelopeClosedIcon,
      id: 'all'
    },
    {
      title: '收藏',
      icon: StarIcon,
      id: 'star'
    },
    {
      title: '订阅',
      icon: PaperPlaneIcon,
      id: 'subscribe'
    },
    {
      // 配置
      title: '配置',
      icon: GearIcon,
      id: 'config'
    }
  ]

  const [active, setActive] = useState(tabs[0])

  // 切换tab
  const handleTabChange = (tab) => {
    setActive(tab)
  }

  // 处理内容点击事件，调用onItemShow方法，显示在右侧
  const handleItemClick = (item) => {
    if (onItemShow && typeof onItemShow === 'function') {
      onItemShow(item)
    }
  }

  useImperativeHandle(ref, () => ({
    // 内容已读，切换到下一条
    handleItemRead() {
      if (allItemListRef && allItemListRef.current) {
        allItemListRef.current.handleItemRead();
      }
    }
  }));

  return (
    <div className="h-full flex flex-col">
      <div className="p-5 flex items-center border-b border-solid border-ws-700">
        <div className="text-3xl flex-1 text-ws-100 text-left">
          {active.title}
        </div>
        {
          active.id === 'subscribe' && (
            <div>
              <AddSubscribe />
            </div>
          )
        }
      </div>
      <div className="flex-1 overflow-y-auto">
        {
          active.id === 'subscribe' && (
            <SubscribeList />
          )
        }
        {
          active.id === 'all' && (
            <AllItemList onShow={handleItemClick} ref={allItemListRef} />
          )
        }
      </div>
      <div className="h-20 border-t border-solid border-ws-700 rounded-2xl flex justify-around">
        {
          tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <div className={`flex flex-col items-center justify-center h-full ${active.id === tab.id ? 'text-ws-300' : 'text-ws-100'
                } text-base cursor-pointer`}
                onClick={() => handleTabChange(tab)}
                key={tab.id}>
                <Icon className="w-7 h-7" />
                <div className="mt-1">
                  {tab.title}
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
})