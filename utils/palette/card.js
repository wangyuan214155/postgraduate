export default class LastMayday {
  palette(posterParams) {
    let priceTop, mktPriceTop, soldQuantityTop, imageTop;
    let mktPriceLeft;
    if (posterParams.system == 'android'){
      mktPriceLeft = `${posterParams.oriPriceLength * 1.2 + 10}px`;
    }else{
      mktPriceLeft = `${posterParams.oriPriceLength * 1.2 + 30}px`;
    }

    return ({
      width: '415rpx',
      height: '600rpx',
      left: '3000rpx',
      views: [
        {
          type: 'rect',
          css: {
            width: '415rpx',
            height: '600rpx',
            color: '#ffffff',
          }
        },
        {
          type: 'text',
          text: `${posterParams.cardPrice}`,
          css: {
            top: 0,
            color: '#ff3333',
            fontSize: '28rpx',
          },
        },
        {
          type: 'text',
          text: `${posterParams.mktPrice}`,
          css: {
            top: `2rpx`,
            color: '#999999',
            textDecoration: 'line-through',
            left: mktPriceLeft,
            fontSize: '24rpx',
          },
        },
        {
          type: 'image',
          url: `${posterParams.imageUrl}`,
          css: {
            top: '50rpx',
            width: '195rpx',
            height: `195rpx`,
          },
        },
        {
          type: 'image',
          url: `${posterParams.secondImageUrl}`,
          css: {
            top: '50rpx',
            left: `215rpx`,
            width: '195rpx',
            height: `195rpx`,
          },
        },
      ],
    });
  }
}

const startTop = 0;
const startLeft = 0;
const gapSize = 10;