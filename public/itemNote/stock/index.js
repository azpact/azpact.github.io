/*
    { type: 11, name: "刪除" },
    { type: 12, name: "刪除此資料" },
    { type: 13, name: "新增" },
    { type: 14, name: "基本資料" },
    { type: 21, name: "觀察中" },
    { type: 22, name: "移至觀察" },
    { type: 31, name: "立即申購" },
    { type: 32, name: "已申購" },
    { type: 41, name: "股票" },
    { type: 42, name: "基金" }
*/

new Vue({
  data: () => ({
    point: "",
    pointShow: false,
    code: "",
    name: "",
    sort: 41,
    handlingFee: "",
    managementFee: "",
    watchIndex: "",
    watchFilter: "day",
    inputWatchList: false,
    baseWatchList: false,
    baseWatchListShow: false,
    messageBox: false,
    listOne: listOne,
    queryList: queryList,
    purchaseList: purchaseList
  }),
  methods: {

    // async fGetStock() {

    // }
    // async fPostStock() {

    // },
    // fMessageBox() {

    // },
    fPoint(key, text) {

      //1 show
      //2 close

      switch (key) {
        case 1:
          this.pointShow = true
          this.point = text
          break;
        case 2:
          this.pointShow = false
          this.point = ""
          break;
        default:
          break;
      }
    },
    fCheck(key, type, index) {
      /*
       1.背景確認是已申購 (check purchaseList.code)
       2.繼續申購獲得 index
       3.申購 code 確認 觀察的 code index
      */
      let p = this.listOne
      switch (key) {
        case 1:
          let wCodeRow = []
          let pCodeRow = []
          p.forEach(function(e) {
            wCodeRow.push(e.code)
          })
          this.purchaseList.forEach(function(e) {
            pCodeRow.push(e.code)
          })
          wCodeRow.forEach(function(eO, indexO) {
            pCodeRow.forEach(function(eT) {
              if (eO === eT) {
                // console.log('yes',eO,indexO)
                p[indexO].watchType = true
              }
            })
          })
          console.log('check 1')
          break;
        case 2:
          let wCode = index;
          let pIndex = false;
          this.purchaseList.forEach(function(e, i) {
            if (e.code === wCode) {
              // console.log(e.code,i,wCode)
              pIndex = i
            }
          })
          if (pIndex) {
            return pIndex
          }
          console.log('check 2')
          break;
        case 3:
          p.forEach(function(e,i){
            if(e.code==index)
            p[i].watchType = false
          })
          console.log('check 3')
          break;
        default:
          break;
      }
    },
    fWatchList(key, type, index) {
      /*
        1.開啟/關閉 輸入 input (1開啟 2關閉)
        2.送出 輸入
        3.開啟/關閉 基本 base (1開啟 2關閉 3開啟基礎 4關閉基礎/儲存)
        4.移至 (1移至觀察 2立即申請[全部新增] 3繼續申請[部分新增] 4刪除)
        5.篩選 (1Day 2Month 3Year)
      */
      let p = this.listOne
      switch (key) {
        case 1:
          if (type == 1) {
            this.inputWatchList = true
            this.editWatchList = false
            this.fWatchList(3, 2)
            console.log("1-1")
          } else if (type == 2) {
            this.inputWatchList = false
            this.fPoint(2)
            console.log("1-2")
          }

          break;
        case 2:
          if (!this.code || !this.name || !this.sort || !this.handlingFee || !this.managementFee) {
            this.fPoint(1, "請正確輸入資料")
            console.log('2')
          } else {
            let row = {
              code: this.code,
              name: this.name,
              sort: this.sort,
              date: moment().format("YYYY-MM-DD"),
              dayNetWorth: "30.1",
              monthAverageNetWorth: "30.2",
              yearAverageNetWorth: "30.3",
              watchStatus: 21,
              watchOperating: 31,
              baseInformation: 14,
              watchType: false,
              basewatchList: false,
              handlingFee: this.handlingFee,
              managementFee: this.managementFee
            }
            this.listOne.push(row)
            this.code = ""
            this.name = ""
            this.sort = 41
            this.handlingFee = ""
            this.managementFee = ""
            this.fPoint(2)
            this.fWatchList(1, 2)
            console.log('2')
          }
          break;
        case 3:
          if (type == 1) {
            this.baseWatchList = true
            this.watchIndex = index
            this.code = p[index].code
            this.handlingFee = p[index].handlingFee
            this.managementFee = p[index].managementFee
            this.fWatchList(1, 2)
            console.log('3-1')
          } else if (type == 2) {
            this.baseWatchList = false
            this.baseWatchListShow = false
            this.code = ""
            this.handlingFee = ""
            this.managementFee = ""
            console.log("3-2")
          } else if (type == 3) {
            this.baseWatchListShow = true
            console.log("3-3")
          } else if (type == 4) {
            p[index].code = this.code
            p[index].handlingFee = this.handlingFee
            p[index].managementFee = this.managementFee
            this.baseWatchListShow = false
            console.log("3-4")
          }
          break;
        case 4:
          switch (type) {
            case 1:
              p[index].watchType = false
              console.log('4-1')
              break;
            case 2:
              console.log('4-2')
              p[index].watchType = true
              let wCode = p[index].code
              let row = {
                code: wCode,
                purchaseFull: [{
                  purchaseDate: moment().format("YYYY-MM-DD"),
                  saleDate: "",
                  holeYears: "",
                  holeMonths: "",
                  holeTotalMonths: "",
                  purchaseNet: "30.1",
                  purchaseUnit: "",
                  saleNet: "",
                  saleUnit: "",
                  hold: "持有中"
                }]
              }
              this.purchaseList.push(row)
              break;
            case 3:
              let code = p[index].code
              let pIndex = this.fCheck(2, "", code);
              let rowFull = {
                purchaseDate: moment().format("YYYY-MM-DD"),
                saleDate: "",
                holeYears: "",
                holeMonths: "",
                holeTotalMonths: "",
                purchaseNet: "99",
                purchaseUnit: "",
                saleNet: "",
                saleUnit: "",
                hold: "持有中"
              }
              this.purchaseList[pIndex].purchaseFull.push(rowFull)
              console.log('4-3')
              break;
            case 4:
              this.fWatchList(3, 2)
              let i = this.watchIndex
              p.splice(i, 1) //刪除此資料

              console.log('4-4')
              break;
            default:
              break;
          }
          break;
        case 5:
          switch (type) {
            case 1:
              this.watchFilter = 'day'
              console.log('5-1')
              break;
            case 2:
              this.watchFilter = 'month'
              console.log('5-2')
              break;
            case 3:
              this.watchFilter = 'year'
              console.log('5-3')
              break;
            case 4:
              this.watchFilter = 'all'
              console.log('5-4')
              break;
            default:
              break;
          }
          break;
        default:
          console.log('尚未設定')
          break;
      }
    },
    fPurchaseList(key, type, index) {
      /*
        1.編輯
        2.刪除
      */
      switch (key) {
        case 1:
          console.log('申購 1')
          break;
        case 2:
          let wIndex = type
          let pIndex = index
          let delectCode = []
          // console.log(wIndex,pIndex)
          delectCode.push(this.purchaseList[wIndex].code)
          this.purchaseList[wIndex].purchaseFull.splice(pIndex, 1)
          if (this.purchaseList[wIndex].purchaseFull.length === 0) {
            this.purchaseList.splice(wIndex, 1)
            $('.collapsible').collapsible('close', wIndex);
            this.fCheck(3,"",delectCode[0])
          }
          console.log('申購 2')
          break;
        default:
          break;
      }
    }

  },
  watch: {
    code() {
      if (this.inputWatchList || this.baseWatchListShow) {
        this.code = this.code.replace(/[\W]/g, '');
      }
    },
    handlingFee() {
      if (this.inputWatchList || this.baseWatchListShow) {
        this.handlingFee = this.handlingFee.replace(/[^0-9\.]/g, '');
      }
    },
    managementFee() {
      if (this.inputWatchList || this.baseWatchListShow) {
        this.managementFee = this.managementFee.replace(/[^0-9\.]/g, '');
      }
    }
  },
  mounted() {
    this.fCheck(1)
    $(document).ready(function() {
      $('select').formSelect();
      $('.collapsible').collapsible();
      $('.collapsible').collapsible('open',0);
    })
  }
}).$mount("#app");