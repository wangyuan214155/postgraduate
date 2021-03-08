export default class LastMayday {
  palette(posterParams) {
    let priceTop, mktPriceTop, couponTop, soldQuantityTop, imageTop, couponWidth, mktPriceLeft;
    // posterParams.couponTitleList = {
    //   length: 78,
    //   title: '满100.00减20.00'
    // }
    if(posterParams.system == 'android'){
      mktPriceLeft = `${startLeft * 2 + posterParams.priceLength}rpx`;
    }else{
      mktPriceLeft = `${startLeft * 2 + posterParams.priceLength + 30}rpx`;
    }
    if (posterParams.lines == 1) {
      priceTop = `${startTop * 2+ 3 * gapSize * 2}rpx`;
      mktPriceTop = `${startTop * 2 + 3 * gapSize * 2 + 13 * 2}rpx`;
      if (JSON.stringify(posterParams.couponTitleList) == '{}'){ // 不存在优惠券
        couponTop = 0;
        soldQuantityTop = `${startTop * 2 + 8 * gapSize * 2}rpx`;
        imageTop = `${startTop * 2 + 12 * gapSize * 2}`;
      }else{
        soldQuantityTop = `${startTop * 2 + 11 * gapSize * 2}rpx`;
        imageTop = `${startTop * 2 + 15 * gapSize * 2}`;
        if(posterParams.system == 'android'){
          couponWidth = `${posterParams.couponTitleList.length + 6}px`;
          couponTop = `${startTop * 2 + 8 * gapSize * 2 + 6}`;
        }else{
          couponWidth = `${posterParams.couponTitleList.length * 1.2 + 4}px`;
          couponTop = `${startTop * 2 + 8 * gapSize * 2 + 6}`;
        }
      }
    } else {
      priceTop = `${startTop * 2 + posterParams.lines * 3 * gapSize * 2}rpx`;
      mktPriceTop = `${startTop * 2 + 3 * posterParams.lines * gapSize * 2 + 13 * 2}rpx`;
      if (JSON.stringify(posterParams.couponTitleList) == '{}') { // 不存在优惠券
        couponTop = 0;
        soldQuantityTop = `${startTop * 2 + 5.5 * posterParams.lines * gapSize * 2}rpx`;
        imageTop = `${startTop * 2 + 8 * posterParams.lines * gapSize * 2}`;
      } else {
        soldQuantityTop = `${startTop * 2 + 6.8 * posterParams.lines * gapSize * 2}rpx`;
        imageTop = `${startTop * 2 + 8.8 * posterParams.lines * gapSize * 2}`;
        if (posterParams.system == 'android') {
          couponWidth = `${posterParams.couponTitleList.length + 6}px`;
          couponTop = `${startTop * 2 + 5.5 * posterParams.lines * gapSize * 2 + 6}`;
        } else {
          couponWidth = `${posterParams.couponTitleList.length * 1.2 + 4}px`;
          couponTop = `${startTop * 2 + 5.5 * posterParams.lines * gapSize * 2 + 6}`;
        }
      }
    }

    console.log('couponTop', couponTop)

    if (JSON.stringify(posterParams.couponTitleList) == '{}') {
      return ({
        width: '750rpx',
        height: '1334rpx',
        top: '0rpx',
        left: '2000rpx',
        background: 'linear-gradient(0deg, #ff3333 0%, #F9AE1C 100%)',
        views: [{
            type: 'rect',
            css: {
              width: '684rpx',
              right: '32rpx',
              top: '32rpx',
              height: '1268rpx',
              color: '#ffffff',
            }
          },
          {
            type: 'text',
            text: `${posterParams.title}`,
            css: {
              width: '600rpx',
              top: `96rpx`,
              color: '#333333',
              textDecoration: 1,
              left: `${startLeft * 2}rpx`,
              fontSize: '48rpx',
              fontWeight: 'bold',
              maxLines: 2,
              lineHeight: '60rpx'
            },
          },
          {
            type: 'text',
            text: `${posterParams.price}`,
            css: {
              top: priceTop,
              color: '#ff3333',
              textDecoration: 1,
              left: `${startLeft * 2}rpx`,
              fontSize: '80rpx',
              fontWeight: 'bold',
              fontFamily: 'DIN  Alternate',
            },
          },
          {
            type: 'text',
            text: `${posterParams.mktPrice}`,
            css: {
              top: mktPriceTop,
              color: '#999999',
              textDecoration: 'line-through',
              left: mktPriceLeft,
              fontSize: '48rpx',
              fontWeight: 'bold',
              fontFamily: 'DIN  Alternate',
            },
          },
          {
            type: 'text',
            text: `销量 ${posterParams.soldQuantity}件`,
            css: {
              top: soldQuantityTop,
              color: '#999999',
              left: `${startLeft * 2}rpx`,
              fontSize: '28rpx',
            },
          },
          {
            type: 'image',
            url: `${posterParams.imageUrl}`,
            css: {
              top: imageTop + 'rpx',
              left: `${startLeft * 2}rpx`,
              width: '600rpx',
              height: '600rpx',
            },
          },
          {
            type: 'image',
            url: '/utils/palette/qrcode_bg.png',
            css: {
              bottom: `20rpx`,
              width: '748rpx',
              height: '325rpx',
            },
          },
          {
            type: 'image',
            url: `${posterParams.qrcode}`,
            css: {
              bottom: '76rpx',
              left: '90rpx',
              width: '230rpx',
              height: '230rpx',
            },
          },
        ],
      });
    } else {
      return ({
        width: '750rpx',
        height: '1334rpx',
        left: '200rpx',
        background: 'linear-gradient(0deg, #ff3333 0%, #F9AE1C 100%)',
        views: [{
            type: 'rect',
            css: {
              width: '684rpx',
              right: '32rpx',
              top: '32rpx',
              height: '1268rpx',
              color: '#ffffff',
            }
          },
          {
            type: 'text',
            text: `${posterParams.title}`,
            css: {
              width: '600rpx',
              top: `96rpx`,
              color: '#333333',
              textDecoration: 1,
              left: `${startLeft * 2}rpx`,
              fontSize: '48rpx',
              fontWeight: 'bold',
              maxLines: 2,
              lineHeight: '60rpx'
            },
          },
          {
            type: 'text',
            text: `${posterParams.price}`,
            css: {
              top: priceTop,
              color: '#ff3333',
              textDecoration: 1,
              left: `${startLeft * 2}rpx`,
              fontSize: '80rpx',
              fontWeight: 'bold',
              fontFamily: 'DIN  Alternate',
            },
          },
          {
            type: 'text',
            text: `${posterParams.mktPrice}`,
            css: {
              top: mktPriceTop,
              color: '#999999',
              textDecoration: 'line-through',
              left: mktPriceLeft,
              fontSize: '48rpx',
              fontWeight: 'bold',
              fontFamily: 'DIN  Alternate',
            },
          },
          // {
          //   type: 'rect',
          //   css: {
          //     width: couponWidth,
          //     height: '40rpx',
          //     top: `${couponTop - 6}rpx`,
          //     left: `${startLeft * 2}rpx`,
          //     color: '#ff3333',
          //     borderRadius: '16rpx'
          //   },
          // },
          {
            type: 'text',
            text: `${posterParams.couponTitleList.title}`,
            css: {
              top: `${couponTop}rpx`,
              color: '#ffffff',
              left: `${startLeft * 2}rpx`,
              fontSize: '20rpx',
              lineHeight: '24rpx',
              background: '#ff3333',
              padding: '0rpx 6rpx 10rpx 6rpx',
            },
          },
          {
            type: 'text',
            text: `销量 ${posterParams.soldQuantity}件`,
            css: {
              top: soldQuantityTop,
              color: '#999999',
              left: `${startLeft * 2}rpx`,
              fontSize: '28rpx',
            },
          },
          {
            type: 'image',
            url: `${posterParams.imageUrl}`,
            css: {
              top: imageTop + 'rpx',
              left: `${startLeft * 2}rpx`,
              width: '600rpx',
              height: '600rpx',
            },
          },
          {
            type: 'image',
            url: '/utils/palette/qrcode_bg.png',
            css: {
              bottom: '20rpx',
              width: '748rpx',
              height: '325rpx',
            },
          },
          {
            type: 'image',
            url: `${posterParams.qrcode}`,
            css: {
              bottom: '76rpx',
              left: '90rpx',
              width: '230rpx',
              height: '230rpx',
            },
          },
        ],
      });
    }
  }
}

const startTop = 48;
const startLeft = 36;
const gapSize = 10;

const common = {
  left: `${startLeft}rpx`,
  fontSize: '40rpx',
};

function _textDecoration(decoration, index, color) {
  return ({
    type: 'text',
    text: decoration,
    css: [{
      top: `${startTop + index * gapSize}rpx`,
      color: color,
      textDecoration: decoration,
    }, common],
  });
}

function _image(index, rotate, borderRadius) {
  return ({
    type: 'image',
    url: '/palette/avatar.jpg',
    css: {
      top: `${startTop + 8.5 * gapSize}rpx`,
      left: `${startLeft + 160 * index}rpx`,
      width: '120rpx',
      height: '120rpx',
      shadow: '10rpx 10rpx 5rpx #888888',
      rotate: rotate,
      borderRadius: borderRadius,
    },
  });
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '22rpx',
      top: `${startTop + 8.5 * gapSize + 140}rpx`,
    },
  };
  if (index === 3) {
    des.css.right = '60rpx';
  } else {
    des.css.left = `${startLeft + 120 * index + 30}rpx`;
  }
  return des;
}