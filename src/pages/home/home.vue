<template>
  <div>


    <el-row :gutter="30">
      <el-col :span="8">
        <el-row class="grid-content bg-purple" type="flex" align="middle" justify="center">
          <el-col :span="14" class="fz32">500</el-col>
          <el-col :span="10" class="lefttext">
            <p>我的客户(人)</p>
            <p>上周新增客户 12</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="grid-content bg-orange" type="flex" align="middle" justify="center">
          <el-col :span="14" class="fz32">5248.20</el-col>
          <el-col :span="10" class="lefttext">
            <p>我的佣金(元)</p>
            <p>本周年度总额</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="grid-content bg-red" type="flex" align="middle" justify="center">
          <el-col :span="14" class="fz32">500</el-col>
          <el-col :span="10" class="lefttext">
            <p>我的团队(人)</p>
            <p>上周新增客户 1人</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <div class="row-fluid margin-top-20 pieOutCointer">
      <div class="title">我的销量（万元）</div>
      <div class="piecointer">
        <div id="leftcontainer"></div>
        <div id="leftdata">
          <div>
            <span class="circle"></span>
            <span>年度指标：1000</span>
          </div>
          <div>
            <span class="circle2"></span>
            <span>已 完成：1000</span>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="piecointer">
        <div id="middlecontainer"></div>
        <div id="middledata">
          <div>
            <span class="circle"></span>
            <span>年度指标：1000</span>
          </div>
          <div>
            <span class="circle2"></span>
            <span>已 完成：1000</span>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="piecointer">
        <div id="rightcontainer"></div>
        <div id="rightdata">
          <div>
            <span class="circle"></span>
            <span>年度指标：1000</span>
          </div>
          <div>
            <span class="circle2"></span>
            <span>已 完成：1000</span>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>

    <div class="margin-top-20 barOutCointer">
      <div class="title">周销量新增</div>
      <div id="myChartBarCointer" style="height: 300px"></div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "首页",
      myChartBar: ""
    };
  },
  methods: {
    ...mapMutations(["SET_TOKEN_0", "SET_USER_ID_0", "SET_FUNC"]),

    //餅狀圖
    initPie() {
      var myChartleft = this.$echarts.init(
        document.getElementById("leftcontainer")
      );
      var myChartmiddle = this.$echarts.init(
        document.getElementById("middlecontainer")
      );
      var myChartright = this.$echarts.init(
        document.getElementById("rightcontainer")
      );

      var option = {
        tooltip: {
          show: false
        },
        graphic: {
          type: "group",
          left: "center",
          top: "center",
          children: [
            {
              type: "text",
              right: "center",
              top: "10px",
              style: {
                text: "30%",
                textAlign: "center",
                font: '16px "Microsoft YaHei", sans-serif',
                fill: "black"
              }
            },
            {
              type: "text",
              right: "center",
              top: "30px",
              style: {
                text: "理财",
                textAlign: "center",
                font: '12px "Microsoft YaHei", sans-serif',
                fill: "#7F8FA4"
              }
            }
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            startAngle: 320,
            avoidLabelOverlap: false,
            hoverAnimation: false,
            legendHoverLink: false,
            cursor: "default",
            radius: ["90%", "100%"],

            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      };

      option.series[0].data = [
        {
          value: 100,
          name: "已完成",
          itemStyle: {
            color: "#FDC581"
          }
        },
        {
          value: 900,
          name: "年度指标",
          itemStyle: {
            color: "#E7EBEF"
          }
        }
      ];

      myChartleft.setOption(option);
      myChartmiddle.setOption(option);
      myChartright.setOption(option);
    },
    //柱狀圖
    initBar() {
      this.myChartBar = this.$echarts.init(
        document.getElementById("myChartBarCointer")
      );
      var option = {
        color: ["#003366", "#006699"],
        legend: {
          left: "0",
          itemWidth: 15,
          textStyle: {
            color: "#7F8FA4"
          },
          data: [
            {
              name: "当前周",
              icon: "circle"
            },
            {
              name: "同比上周",
              icon: "circle"
            }
          ]
        },
        grid: {
          left: "50",
          right: "50"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLine: {
              show: false
            },

            data: ["理财", "基金", "保险"],
            axisLabel: {
              textStyle: {
                color: "#9FA9BA",
                fontSize: 14
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "金额万元",
            nameTextStyle: {
              color: "#9FA9BA",
              align: "center",
              verticalAlign: "bottom"
            },
            axisTick: { show: false },
            axisLine: { show: false },
            splitLine: {
              lineStyle: { color: "#E7EBEF" }
            },
            axisLabel: {
              textStyle: {
                color: "#9FA9BA"
              }
            }
          }
        ],
        series: [
          {
            name: "当前周",
            type: "bar",
            barWidth: 25,
            data: [320, 332, 301],
            itemStyle: {
              normal: {
                barBorderRadius: 12,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#48DFFE" },
                  { offset: 1, color: "#51A6FC" }
                ])
              }
            }
          },
          {
            name: "同比上周",
            type: "bar",
            barWidth: 25,
            data: [220, 182, 191],
            itemStyle: {
              normal: {
                barBorderRadius: 12,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(2,148,255,0.33)" },
                  { offset: 1, color: "rgba(255,255,255,0.00)" }
                ])
              }
            }
          }
        ]
      };
      // 绘制图表
      this.myChartBar.setOption(option);
    }
  },
  mounted() {
    this.initBar();
    this.initPie();
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  text-align: center;
  color: #fff;
}
.fz32 {
  font-size: 32px;
}
.el-col {
  border-radius: 4px;
}

.bg-orange {
  background: #feca34;
}

.bg-purple {
  background: #0294ff;
}

.bg-red {
  background: #ff475b;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 26px 5px;
  text-align: center;
  .lefttext {
    text-align: left;
    p {
      margin-bottom: 10px;
    }
  }
}

.pieOutCointer {
  background-color: white;
  padding: 24px 0;
  box-sizing: border-box;
  border-radius: 4px;
}
.pieOutCointer .title {
  padding-left: 24px;
}
.pieOutCointer .title,
.barOutCointer .title {
  font-size: 16px;
  color: #000000;
}
.circle {
  width: 10px;
  height: 10px;
  background-color: #e7ebef;
  border-radius: 5px; /* 图形的半径 */
  display: inline-block;
  margin-right: 5px;
}
.circle2 {
  width: 10px;
  height: 10px;
  background-color: #fdc581;
  border-radius: 5px; /* 图形的半径 */
  display: inline-block;
  margin-right: 5px;
}
.piecointer {
  color: #7f8fa4;
  font-size: 12px;
  padding-left: 24px;
  box-sizing: border-box;
  float: left;
  height: 100%;
  width: 33%;
  line-height: 20px;
}
.barOutCointer .title {
  padding-bottom: 10px;
}
.pieOutCointer .title {
  padding-bottom: 14px;
}
#leftcontainer,
#middlecontainer,
#rightcontainer {
  float: left;
  height: 72px;
  width: 72px;
}
#leftdata,
#middledata,
#rightdata {
  float: left;
  padding: 14px 0 14px 10px;
}
.piecointer .line {
  float: right;
  width: 1px;
  height: 72px;
  background-color: #dfe3e9;
  margin: 0;
}
.barOutCointer {
  background-color: white;
  padding: 24px 24px 0 24px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
