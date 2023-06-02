import { useState } from 'react'
import { GearIcon, PaperPlaneIcon, EnvelopeClosedIcon, StarIcon, PlusIcon } from '@radix-ui/react-icons'
import AddSubscribe from './leftComponents/AddSubscribe'

export default function LeftArea() {

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
      </div>
      <div className="h-20 border-t border-solid border-ws-700 rounded-2xl flex justify-around">
        {
          tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <div className={`flex flex-col items-center justify-center h-full ${
                active.id === tab.id ? 'text-ws-300' : 'text-ws-100'
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
}