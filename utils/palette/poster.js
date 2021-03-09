function mutiFont(arr) {
  let temp = []
  arr.forEach((item, index) => {
    let outline = {
      type: 'rect',
      css: {
        width: '690rpx',
        right: '30rpx',
        top: '540rpx',
        height: '80rpx',
        color: '#ffffff',
        shadow:' 0px 16rpx 3px #888888' 
      }
    }
    let des1 = {
      type: 'text',
      text: `${item.openid}`,
      css: {
        color: '#666666',
        fontSize: '32rpx',
        top: '310rpx',
        left: '70rpx',
        top: `540rpx`,
        lineHeight: '80rpx'
      },
    }
    let des2 = {
      type: 'text',
      text:`${item.score}`,
      css: {
        color: '#666666',
        fontSize: '32rpx',
        top: '540rpx',
        left: '320rpx',
        lineHeight: '80rpx'

      },
    }
    let des3 = {
      type: 'text',
      text: `${item.rank}`,
      css: {
        color: '#666666',
        fontSize: '32rpx',
        top: '540rpx',
        left: '550rpx',
        lineHeight: '80rpx'
      },
    }
    temp.push(outline,des1, des2, des3)

  });
  console.log(temp, 22222)
  return temp
}
export default class LastMayday {
  palette(posterParams) {
    // console.log(posterParams, '绘图开始')
    posterParams.applyStudentList = [
      { userId: "3", openid: "***D-R8", score: "375", rank: 1 }
    ]
    console.log(posterParams, '绘图开始')
    let temp = mutiFont(posterParams.applyStudentList)

    let views = [
      {
        type: 'rect',
        css: {
          width: '690rpx',
          right: '30rpx',
          top: '30rpx',
          height: '280rpx',
          color: '#ffffff',
          borderRadius: '32rpx',
        }
      },
      {
        type: 'image',
        url: `/asset/images/teacher.png`,
        css: {
          top: 70 + 'rpx',
          left: 60 + 'rpx',
          width: '45rpx',
          height: '45rpx',
        },
      },
      {
        type: 'text',
        text: '导师姓名：',
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
        text: `${posterParams.teacherName}`,
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
        url: `/asset/images/more_person.png`,
        css: {
          top: 150 + 'rpx',
          left: 60 + 'rpx',
          width: '45rpx',
          height: '45rpx',
        },
      },
      {
        type: 'text',
        text: '当前报考人数：',
        css: {
          top: `150rpx`,
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
          top: `150rpx`,
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
          top: `150rpx`,
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
          top: `150rpx`,
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
          top: 230 + 'rpx',
          left: 60 + 'rpx',
          width: '45rpx',
          height: '45rpx',
        },
      },
      {
        type: 'text',
        text: '导师组内排名：',
        css: {
          top: `230rpx`,
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
          top: `230rpx`,
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
          top: `230rpx`,
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
          top: `230rpx`,
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
          top: `340rpx`,
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
          top: '420rpx',
          background: '#ffffff',
          borderRadius: '16rpx',
        }
      },
      {
        type: 'text',
        text: `考生ID `,
        css: {
          top: `450rpx`,
          width:'230rpx',
          height:'80rpx',
          color: '#666666',
          left:'110rpx',
          // right: `90rpx`,
          fontSize: '32rpx',
          lineHeight: '80rpx',
          textAlign:'center'
        },
      },
      {
        type: 'text',
        text: `成绩`,
        css: {
          top: `450rpx`,
          width:'230rpx',
          height:'80rpx',
          color: '#666666',
          left:'320rpx',
          fontSize: '32rpx',
          lineHeight: '80rpx',
          textAlign:'center'

        },
      },
      {
        type: 'text',
        text: `名次`,
        css: {
          top: `450rpx`,
          width:'230rpx',
          height:'80rpx',
          color: '#666666',
          left: `550rpx`,
          fontSize: '32rpx',
          lineHeight: '80rpx',
          textAlign:'center'

        },
      },

    ]
    views = views.concat(temp)
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