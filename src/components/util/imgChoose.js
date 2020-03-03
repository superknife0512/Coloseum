import catImg from '../../assets/img/avatars/cat.jpg';
import goatImg from '../../assets/img/avatars/goat.jpg';
import dogImg from '../../assets/img/avatars/dog.jpg';
import koalaImg from '../../assets/img/avatars/koala.jpg';
import rabbitImg from '../../assets/img/avatars/rabbit.jpg';
import eagleImg from '../../assets/img/avatars/eagle.jpg';

import linkImg from '../../assets/img/helpers/link.png';
import shieldImg from '../../assets/img/helpers/shield.png';
import stealingImg from '../../assets/img/helpers/stealing.png';
import supportImg from '../../assets/img/helpers/support.png';

import firstImg from '../../assets/img/medals/first.png';
import secondImg from '../../assets/img/medals/second.png';
import thirdImg from '../../assets/img/medals/third.png';
import fourthImg from '../../assets/img/medals/fourth.png';

export default {
  avaChoose(playerImg) {
    switch (playerImg) {
      case 'dog':
        return dogImg;
      case 'goat':
        return goatImg;
      case 'koala':
        return koalaImg;
      case 'cat':
        return catImg;
      case 'rabbit':
        return rabbitImg;
      default:
        return eagleImg;
    }
  },

  helperImgChoose(powerType) {
    switch (powerType) {
      case 'link':
        return linkImg;
      case 'shield':
        return shieldImg;
      case 'steal':
        return stealingImg;
      case 'support':
        return supportImg;
      default:
        return eagleImg;
    }
  },

  medalImg(rank) {
    switch (rank) {
      case 1:
        return firstImg;
      case 2:
        return secondImg;
      case 3:
        return thirdImg;
      case 4:
        return fourthImg;
      default:
        return eagleImg;
    }
  },
};
