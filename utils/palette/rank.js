let app =  getApp();

function mutiFont(arr, rank) {
  let temp = []
  for (var i = 0; i < arr.length; i++) {
    let top1 = 510 + (80 * i);
    let top2 = 540 + (80 * i);
    let fontColor = '';
    let shadow = '0 -3 20 rgba(186, 201, 222, 0.45)';
    if (rank == (arr[i].rank)) {
      fontColor = '#4871E2';
    } else {
      fontColor = '#666666';
    }
    let outline = {
      type: 'rect',
      css: {
        width: '690rpx',
        right: '30rpx',
        top: top1 + 'rpx',
        height: '80rpx',
        color: '#ffffff',
        shadow: shadow,
      }
    }
    let des1 = {
      type: 'text',
      text: `${arr[i].openid}`,
      css: {
        color: fontColor,
        fontSize: '32rpx',
        top: top2 + 'rpx',
        left: '70rpx',
        lineHeight: '80rpx',

      },
    }
    let des2 = {
      type: 'text',
      text: `${arr[i].score}`,
      css: {
        color: fontColor,
        fontSize: '32rpx',
        top: top2 + 'rpx',
        left: '320rpx',
        lineHeight: '80rpx',
      },
    }
    let des3 = {
      type: 'text',
      text: `${arr[i].rank}`,
      css: {
        color: fontColor,
        fontSize: '32rpx',
        top: top2 + 'rpx',
        left: '570rpx',
        lineHeight: '80rpx',
      },
    }
    temp.push(outline, des1, des2, des3)
  }
  return temp
}
export default class LastMayday {
  palette(posterParams) {
    console.log(posterParams, '绘图开始')
    posterParams.rankNum = 3
    posterParams.rankList = [
      {userId: "35", openid: "***xf0I", specialName: "计算机科学与技术", score: "415", rank: 1},
      {userId: "21", openid: "***1Bw0", specialName: "计算机科学与技术", score: "376", rank: 2},
      {userId: "3", openid: "***D-R8", specialName: "计算机科学与技术", score: "375", rank: 3} ,
      {userId: "6", openid: "***_BUs", specialName: "计算机科学与技术", score: "366", rank: 4} ,
      {userId: "15", openid: "***zSPU", specialName: "计算机科学与技术", score: "351", rank: 5},
      {userId: "270", openid: "***ALTw", specialName: "计算机科学与技术", score: "308", rank: 6},
      {userId: "34", openid: "***nu9g", specialName: "计算机科学与技术", score: "298", rank: 7}
    ]
    let temp = mutiFont(posterParams.rankList, posterParams.rankNum)

    let views = [
      {
        type: 'rect',
        css: {
          width: '750rpx',
          top: '30rpx',
          height: '80rpx',
          color: '#4871E2',
        }
      },
      {
        type: 'text',
        text: '当前排名',
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
        text: '第',
        css: {
          top: `50rpx`,
          color: '#ffffff',
          right: `120rpx`,
          fontSize: '30rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `${posterParams.rankNum}`,
        css: {
          top: `45rpx`,
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
          top: `50rpx`,
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
          top: '150rpx',
          height: '120rpx',
          color: '#ffffff',
        }
      },
      {
        type: 'text',
        text: '名次',
        css: {
          top: `190rpx`,
          width:'104rpx',
          color: '#333333',
          left: `55rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx',
        },
      },
      {
        type: 'text',
        text: '考生ID',
        css: {
          top: `190rpx`,
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
          top: `190rpx`,
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
          top: `190rpx`,
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
          top: app.globalData.screenHeight - 250 + 'rpx',
          color: '#ffffff',
          shadow :'0 -10 20 rgba(186, 201, 222, 0.45)'
        }
      },
      {
        type: 'image',
        url: `/asset/images/minipagram.jpg`,
        css: {
          top:  app.globalData.screenHeight -240 + 'rpx',
          left: 40+ 'rpx',
          width: '160rpx',
          height: '160rpx',
        },
      },
      {
        type: 'text',
        text: `导师名额小程序 `,
        css: {
          top: app.globalData.screenHeight -210 + 'rpx',
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
          top: app.globalData.screenHeight -150 + 'rpx',
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