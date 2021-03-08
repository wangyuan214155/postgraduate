export default class LastMayday {
    palette(posterParams) {
        console.log(posterParams,666666)
        let realNameLength;
        let positionTop = 262;
        let phoneTop = 329;
        const lineHeight = 36 ;
        if(posterParams.lines == 1){
          positionTop = positionTop+'rpx';
          phoneTop = phoneTop+'rpx'
        }else{
          positionTop = positionTop+(2*lineHeight)+'rpx';
          phoneTop = phoneTop +(2*lineHeight)+'rpx'
        }
        console.log(positionTop,'其实高度')
  
      return ({
        width: '750rpx',
        height: '1108rpx',
        background: '#ffffff',
        borderRadius:'16rpx',
        views: [
          {
            type: 'image',
            url: 'https://assets.aleqipei.com/wxapp/images/personal/card_back.png',
            css: {
              width: '750rpx',
              height: '482rpx',
            },
          },
          {
            type: 'text',
            text: `${posterParams.realName}`,
            css: {
              top:'73rpx' ,
              left:'64rpx',
              color: '#ffffff',
              fontSize: '74rpx',
            },
          },
          {
            type: 'text',
            text: `${posterParams.company_name}`,
            css: {
              top: `206rpx`,
              left: '64rpx',
              width:'654rpx',
              color: '#ffffff',
              maxLines:2,
              lineHeight:'42rpx',
              fontSize: '42rpx',
            },
          },
          {
            type: 'text',
            text: `${posterParams.position}`,
            css: {
              top:positionTop,
              left: '64rpx',
              color: '#ffffff',
              fontSize: '42rpx',
            },
          },
          {
            type: 'text',
            text: `${posterParams.phone}`,
            css: {
              top: phoneTop,
              left: '64rpx',
              color: '#ffffff',
              fontSize: '42rpx',
            },
          },
          {
            type: 'image',
            url: `${posterParams.bigCirlImage}`,
            css: {
              top: '322rpx',
              right:'55rpx',
              height:'183rpx',
              width:'183rpx',
            },
          },
          {
            type: 'image',
            url: `${posterParams.avatarUrl}`,
            css: {
              top: '345rpx',
              right:'79rpx',
              height:'133rpx',
              width:'133rpx',
              borderRadius:'133rpx'
            },
          },
          {
            type: 'image',
            url: `${posterParams.qrcodeImage}`,
            css: {
              bottom: '213rpx',
              left: '191rpx',
              width: '366rpx',
              height: `366rpx`,
            },
          },
          {
            type: 'text',
            text:'微信扫码关注"阿乐汽配公众号"' ,
            css: {
              bottom: '104rpx',
              left: '111rpx',
              color:'#333333',
              fontSize:'37rpx',
              left:'93rpx',
            },
          },
          
        ],
      });
    }
  }
  
  