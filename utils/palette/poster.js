let app = getApp();

function mutiFont(arr, rank) {
  let temp = []
  for (var i = 0; i < arr.length; i++) {
    let top1 = 560 + (80 * i);
    let top2 = 580 + (80 * i);
    let fontColor = '';
    let shadow = '5 -10 30 rgba(207, 211, 230, 1)';
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
    let temp = mutiFont(posterParams.applyStudentList, posterParams.rank)
    
    let views = [
      {
        type: 'rect',
        css: {
          width: '690rpx',
          right: '30rpx',
          top: '30rpx',
          height: '330rpx',
          color: '#ffffff',
          borderRadius: '32rpx',
        }
      },
      {
        type: 'image',
        url: `/asset/images/school.png`,
        css: {
          top: 70 + 'rpx',
          left: 60 + 'rpx',
          width: '45rpx',
          height: '45rpx',
        },
      },
      {
        type: 'text',
        text: '学校：',
        css: {
          top: `70rpx`,
          color: '#666666',
          textDecoration: 1,
          left: `125rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `${posterParams.schoolName}`,
        css: {
          top: `70rpx`,
          color: '#666666',
          right: `60rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'image',
        url: `/asset/images/depart.png`,
        css: {
          top: 120 + 'rpx',
          left: 60 + 'rpx',
          width: '45rpx',
          height: '45rpx',
        },
      },
      {
        type: 'text',
        text: '学院：',
        css: {
          top: `120rpx`,
          color: '#666666',
          textDecoration: 1,
          left: `125rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `${posterParams.collageName}`,
        css: {
          top: `120rpx`,
          color: '#666666',
          right: `60rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'image',
        url: `/asset/images/teacher.png`,
        css: {
          top: 170 + 'rpx',
          left: 60 + 'rpx',
          width: '40rpx',
          height: '40rpx',
        },
      },
      {
        type: 'text',
        text: '导师姓名：',
        css: {
          top: `170rpx`,
          color: '#666666',
          textDecoration: 1,
          left: `125rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `${posterParams.teacherName}`,
        css: {
          top: `170rpx`,
          color: '#666666',
          right: `60rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'image',
        url: `/asset/images/more_person.png`,
        css: {
          top: 220 + 'rpx',
          left: 60 + 'rpx',
          width: '40rpx',
          height: '40rpx',
        },
      },
      {
        type: 'text',
        text: '当前报考人数：',
        css: {
          top: `220rpx`,
          color: '#666666',
          textDecoration: 1,
          left: `125rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `共有`,
        css: {
          top: `220rpx`,
          color: '#666666',
          right: `130rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: ` ${posterParams.reportNum} `,
        css: {
          top: `220rpx`,
          color: '#4871E2',
          right: `90rpx`,
          fontSize: '36rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `名`,
        css: {
          top: `220rpx`,
          color: '#666666',
          right: `60rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'image',
        url: `/asset/images/rank_person.png`,
        css: {
          top: 270 + 'rpx',
          left: 60 + 'rpx',
          width: '40rpx',
          height: '40rpx',
        },
      },
      {
        type: 'text',
        text: '导师组内排名：',
        css: {
          top: `270rpx`,
          color: '#666666',
          textDecoration: 1,
          left: `125rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `第`,
        css: {
          top: `270rpx`,
          color: '#666666',
          right: `130rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: ` ${posterParams.rank} `,
        css: {
          top: `270rpx`,
          color: '#4871E2',
          right: `90rpx`,
          fontSize: '36rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `名`,
        css: {
          top: `270rpx`,
          color: '#666666',
          right: `60rpx`,
          fontSize: '32rpx',
          fontWeight: 'bold',
          lineHeight: '80rpx'
        },
      },
      {
        type: 'text',
        text: `导师组内排名`,
        css: {
          top: `390rpx`,
          color: '#333333',
          left: '280rpx',
          fontSize: '36rpx',
          lineHeight: '80rpx',
        },
      },
      {
        type: 'rect',
        css: {
          width: '690rpx',
          height: 80 + 80 * posterParams.applyStudentList.length + 'rpx',
          right: '30rpx',
          top: '470rpx',
          background: '#ffffff',
          borderRadius: '16rpx',
          padding: '100rpx 0rpx'
        }
      },
      {
        type: 'text',
        text: `考生ID `,
        css: {
          top: `500rpx`,
          width: '230rpx',
          height: '80rpx',
          color: '#666666',
          left: '110rpx',
          // right: `90rpx`,
          fontSize: '32rpx',
          lineHeight: '80rpx',
          textAlign: 'center'
        },
      },
      {
        type: 'text',
        text: `成绩`,
        css: {
          top: `500rpx`,
          width: '230rpx',
          height: '80rpx',
          color: '#666666',
          left: '320rpx',
          fontSize: '32rpx',
          lineHeight: '80rpx',
          textAlign: 'center'

        },
      },
      {
        type: 'text',
        text: `名次`,
        css: {
          top: `500rpx`,
          width: '230rpx',
          height: '80rpx',
          color: '#666666',
          left: `550rpx`,
          fontSize: '32rpx',
          lineHeight: '80rpx',
          textAlign: 'center'

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
          shadow: '5 -10 30 rgba(207, 211, 230, 1)',

        }
      },
      {
        type: 'image',
        url: `/asset/images/minipagram.jpg`,
        css: {
          bottom: 30 + 'rpx',
          left: 40 + 'rpx',
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
          bottom: 10 + 'rpx',
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
    views = views.concat(temp, obj)
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