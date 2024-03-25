import React, { useEffect, useState } from 'react';
import FollowersList from '../DisplayNetwork/followers_list.jsx';
import FollowingList from '../DisplayNetwork/following_list.jsx';
import './displaynetwork.css';

const DisplayNetwork = () => {
  const [activeTab, setActiveTab] = useState('my-followers'); // Default active tab
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = (tab) => {
    setActiveTab(tab);
    setIsClicked(!isClicked);
  };


  return(
    <div className="outer-my-network-container">
       <div className="followers-or-following-container">
         <button className={activeTab === 'my-followers' ? 'clicked' : ''}
             onClick={() => handleButtonClick('my-followers')}>Followers
         </button>
         <button className={activeTab === 'my-following' ? 'clicked' : ''}
             onClick={() => handleButtonClick('my-following')}>Following
         </button>
       </div>
       <div className="followers-or-following-list">
          {activeTab === 'my-followers' && <FollowersList/>}
          {activeTab === 'my-following' && <FollowingList/>}
       </div>
    </div>
  );
};

export default DisplayNetwork;
