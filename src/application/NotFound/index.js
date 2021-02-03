import React from 'react';
import Image from '../../assets/imgs/404.png';
import childImage from '../../assets/imgs/404_cloud.png';
import { NotFoundContainer } from './style';

const goHome = () => {
  window.location.hash = '/project';
};
function NotFound() {
  return (
    <NotFoundContainer>
      <div className="wscn-http404">
        <div className="pic-404">
          <img className="pic-404__parent" src={Image} alt="404" />
          <img className="pic-404__child left" src={childImage} alt="404" />
          <img className="pic-404__child mid" src={childImage} alt="404" />
          <img className="pic-404__child right" src={childImage} alt="404" />
        </div>
      </div>
      <div className="bullshit">
        <div className="bullshit__oops">404!</div>
        <div className="bullshit__headline">你想找的页面不存在</div>
        <div className="bullshit__info">
          请检查您输入的网址是否正确，或者点击下面的按钮返回首页。
        </div>
        <div className="bullshit__return-home" onClick={goHome}>
          回到首页
        </div>
      </div>
    </NotFoundContainer>
  );
}

export default React.memo(NotFound);
