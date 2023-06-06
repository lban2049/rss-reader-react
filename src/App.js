import './App.css';
import { ItemDetail } from './view/ItemDetail';
import LeftArea from './view/LeftArea';
import { useState, useRef } from 'react';

function App() {
  const leftRef = useRef(null);

  const [itemData, setItemData] = useState(null);
  const showItemDetail = (item) => {
    setItemData(item);
  }

  // 内容点击已读时，左侧列表自动切换到下一条
  const handleItemRead = () => {
    if (leftRef && leftRef.current) {
      leftRef.current.handleItemRead();
    }
  }

  return (
    <div className="App bg-ws-950 flex flex-row">
      <div className='left-block h-full border border-solid border-ws-700'>
        <LeftArea onItemShow={showItemDetail} ref={leftRef} />
      </div>
      <div className="flex-1">
        {
          itemData && (
            <ItemDetail itemData={itemData} onItemRead={handleItemRead} />
          )
        }
      </div>
    </div>
  );
}

export default App;
