let app =  getApp();

function mutiFont(arr, rank) {
  let temp = []
  for (var i = 0; i < arr.length; i++) {
    let top1 = 355 + (100 * i);
    let top2 = 380 + (100 * i);
    let top3 = 440 + (100 * i);
    let top4 = 365 + (100 * i);
    let top5 = 370 + (100 * i);


    let fontColor = '';
    let backgroundColor ='';
    let top = '';
    let rankImg = '/asset/images/normal.png';
    let rankleft = '';
    if(arr[i].rank == 1){
      top = top5
      rankImg = '/asset/images/first.png'
    }else if(arr[i].rank == 2){
      top = top5
      rankImg = '/asset/images/second.png'
    }else if(arr[i].rank == 3){
      top = top5
      rankImg = '/asset/images/third.png'
    }else{
      top = top2
      rankImg = '/asset/images/normal.png'

    }
    if(arr[i].rank >=10){
      
      rankleft = 60
    }else{
      rankleft = 68;

    }
    if (rank == (arr[i].rank)) {
      fontColor = '#ffffff';
      backgroundColor = '#4871E2'
    } else {
      fontColor = '#666666';
      backgroundColor = '#ffffff'

    }
    let outline = {
      type: 'rect',
      css: {
        width: '750rpx',
        top: top1 + 'rpx',
        height: '100rpx',
        color: backgroundColor,
      }
    }
    let imgobj = {
      type: 'image',
      url: rankImg,
      css: {
        top:  top4 + 'rpx',
        left: 45+ 'rpx',
        width: '64rpx',
        height: '64rpx',
      },
    }
    let rankobj = {
      type: 'text',
      text: `${arr[i].rank}`,
      css: {
        color: '#ffffff',
        fontSize: '32rpx',
        top: top + 'rpx',
        left: rankleft+'rpx',
        lineHeight: '100rpx',
      },
    }
   
    let des1 = {
      type: 'text',
      text: `${arr[i].openid}`,
      css: {
        color: fontColor,
        fontSize: '32rpx',
        top: top2 + 'rpx',
        left: '155rpx',
        lineHeight: '100rpx',

      },
    }
    let des2 = {
      type: 'text',
      text: `${arr[i].specialName}`,
      css: {
        color: fontColor,
        fontSize: '32rpx',
        top: top2 + 'rpx',
        left: '320rpx',
        lineHeight: '100rpx',
      },
    }
    let des3 = {
      type: 'text',
      text: `${arr[i].score}`,
      css: {
        color: fontColor,
        fontSize: '32rpx',
        top: top2 + 'rpx',
        right: '60rpx',
        lineHeight: '100rpx',
      },
    }
    let des4 = {
      type: 'rect',
      css: {
        width: '750rpx',
        top: top3 + 'rpx',
        height: '20rpx',
        color: '#EFF2F5',
      }
    }
    temp.push(outline,imgobj,rankobj, des1, des2, des3,des4)
  }
  return temp
}
export default class LastMayday {
  palette(posterParams) {
    console.log(posterParams, '绘图开始')
   
    let temp = mutiFont(posterParams.rankList, posterParams.rankNum)

    let views = [
      {
        type: 'rect',
        css: {
          width: '750rpx',
          top: '30rpx',
          height: '160rpx',
          color: '#4871E2',
        }
      },
      {
        type: 'text',
        text: '学校',
        css: {
          top: `50rpx`,
          color: '#ffffff',
          left: `30rpx`,
          fontSize: '30rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `${posterParams.schoolName}`,
        css: {
          top: `50rpx`,
          color: '#ffffff',
          right: `30rpx`,
          fontSize: '30rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: '学院',
        css: {
          top: `90rpx`,
          color: '#ffffff',
          left: `30rpx`,
          fontSize: '30rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `${posterParams.collageName}`,
        css: {
          top: `90rpx`,
          color: '#ffffff',
          right: `30rpx`,
          fontSize: '30rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: '当前排名',
        css: {
          top: `130rpx`,
          color: '#ffffff',
          left: `30rpx`,
          fontSize: '30rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: '第',
        css: {
          top: `130rpx`,
          color: '#ffffff',
          right: `120rpx`,
          fontSize: '30rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `${posterParams.rankNum == 0 ? '-' : posterParams.rankNum}`,
        css: {
          top: `125rpx`,
          color: '#f4ea2a',
          right: `75rpx`,
          fontSize: '36rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: '名',
        css: {
          top: `130rpx`,
          color: '#ffffff',
          right: `30rpx`,
          fontSize: '30rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'rect',
        css: {
          width: '750rpx',
          top: '230rpx',
          height: '120rpx',
          color: '#ffffff',
        }
      },
      {
        type: 'text',
        text: '名次',
        css: {
          top: `270rpx`,
          width:'104rpx',
          color: '#333333',
          left: `50rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx',
        },
      },
      {
        type: 'text',
        text: '考生ID',
        css: {
          top: `270rpx`,
          color: '#333333',
          left: `180rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `专业`,
        css: {
          top: `270rpx`,
          color: '#333333',
          left: `420rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: '成绩',
        css: {
          top: `270rpx`,
          color: '#333333',
          right: `60rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
    ]
    let obj = [
      {
        type: 'rect',
        css: {
          width: '750rpx',
          height: '180rpx',
          bottom: 20 + 'rpx',
          color: '#ffffff',
          shadow :'5 -10 30 rgba(207, 211, 230, 1)',
          
        }
      },
      {
        type: 'image',
        url: `/asset/images/minipagram.jpg`,
        css: {
          bottom: 30 + 'rpx',
          left: 40+ 'rpx',
          width: '160rpx',
          height: '160rpx',
        },
      },
      {
        type: 'text',
        text: `导师名额小程序 `,
        css: {
          bottom: 70 + 'rpx',
          width: '230rpx',
          height: '80rpx',
          color: '#333333',
          right: '30rpx',
          fontSize: '30rpx',
          lineHeight: '80rpx',
          textAlign: 'center'
        },
      },
      {
        type: 'text',
        text: `长按识别.去看看`,
        css: {
          bottom: 10+ 'rpx',
          width: '230rpx',
          height: '80rpx',
          color: '#666666',
          right: '10rpx',
          fontSize: '22rpx',
          lineHeight: '80rpx',
          textAlign: 'center'
        },
      }
    ]
    views = views.concat(temp,obj)
    console.log(views, 5555)
    return ({
      width: '750rpx',
      height: '1334rpx',
      top: '0rpx',
      left: '2000rpx',
      background: '#EFF2F5',
      views: views
    });
  }
}