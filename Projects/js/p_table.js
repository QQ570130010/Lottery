var app = new Vue({
    el: '#app',
    data: function() {
        return {
            sizs: 1,
            mySelectItem: {
                rdCount: 3,
                rtCount: 4,
                bdCount: 0,
                btCount: 2
            },
            str1: "",
            str2: "",
            selectItem: {
                id: "ssq",
                name: "双色球",
                redCount: 33,
                selectRedCount: 6,
                blueCount: 16,
                selectBlueCount: 1,
                reds: [],
                blues: [],
                rd: {
                    title: "红胆",
                    show: true,
                    list: [],
                    maxCount: 0
                },
                rt: {
                    title: "红拖",
                    show: true,
                    list: [],
                    maxCount: 0
                },
                bd: {
                    title: "蓝胆",
                    show: true,
                    list: [],
                    maxCount: 0
                },
                bt: {
                    title: "蓝拖",
                    show: true,
                    list: [],
                    maxCount: 0
                }
            },
            selectRadio: null,
            lotteryItemList: [{
                id: "ssq",
                name: "双色球",
                redCount: 33,
                selectRedCount: 6,
                blueCount: 16,
                selectBlueCount: 1
            }, {
                id: "dlt",
                name: "大乐透",
                redCount: 35,
                selectRedCount: 5,
                blueCount: 12,
                selectBlueCount: 2
            }, {
                id: "kl8",
                name: "快乐8",
                redCount: 80,
                selectRedCount: 1,
                blueCount: 0,
                selectBlueCount: 0
            }],
            blwbk: false
        }
    },
    computed: {
        rdMaxCount: function() {
            var returnValue = 0;
            returnValue = this.selectItem.selectRedCount - 1;
            return returnValue;
        },
        rtMinCount: function() {
            var returnValue = 0;
            returnValue = this.selectItem.selectRedCount - this.mySelectItem.rdCount;
            return returnValue;
        },
        rtMaxCount: function() {
            var returnValue = 0;
            returnValue = this.selectItem.redCount - this.mySelectItem.rdCount;
            return returnValue;
        },
        bdMaxCount: function() {
            var returnValue = 0;
            returnValue = this.selectItem.selectBlueCount - 1;
            return returnValue;
        },
        btMinCount: function() {
            var returnValue = 0;
            returnValue = this.selectItem.selectBlueCount - this.mySelectItem.bdCount;
            return returnValue;
        },
        btMaxCount: function() {
            var returnValue = 0;
            returnValue = this.selectItem.blueCount - this.mySelectItem.bdCount;
            return returnValue;
        },
        //备选红胆
        filterRdList: function() {
            var returnList = [];
            returnList = this.selectItem.rt.list.filter(function(currentValue) {
                return !currentValue.selected;
            });
            return returnList;
        },
        filterRtList: function() {
            var returnList = [];
            returnList = this.selectItem.rd.list.filter(function(currentValue) {
                return !currentValue.selected;
            });
            return returnList;
        },
        filterBdList: function() {
            var returnList = [];
            returnList = this.selectItem.bt.list.filter(function(currentValue) {
                return !currentValue.selected;
            });
            return returnList;
        },
        filterBtList: function() {
            var returnList = [];
            returnList = this.selectItem.bd.list.filter(function(currentValue) {
                return !currentValue.selected;
            });
            return returnList;
        },
        resultItem: function() {
            var returnItem = {
                rdCount: 0,
                rtCount: 0,
                bdCount: 0,
                btCount: 0,
                strList: [],
                str1: "",
                str2: "",
                list1: [],
                list2: [],
                list3: [],
                list4: [],
                redsList: [],
                bluesList: [],
                allNumsList: [],
                totalZhuShu: 0,
                money: 0
            };
            var selectItem = this.selectItem;
            var mySelectItem = this.mySelectItem;
            var rdbtList = [];
            var strList = [];
            var isFinish = false;
            ['rd', 'rt', 'bd', 'bt'].forEach(function(currentValue) {
                var addItem = {
                    name: "",
                    numbers: [],
                    numberstrs: ""
                };
                var objItem = selectItem[currentValue];
                var numbers = objItem.list.filter(function(currentValue1) {
                        return currentValue1.selected;
                    })
                    .map(function(currentValue1) {
                        return currentValue1.ball;
                    });
                var title = "";
                var id = selectItem.id;
                title = objItem.title;
                //红胆数量 = 0
                if (currentValue == "rt" && mySelectItem.rdCount == 0) {
                    //红托 = 红复
                    if (id == 'ssq') {
                        title = "红复";
                    } else if (id == 'dlt') {
                        title = "前区拖";
                    } else if (id == 'kl8') {
                        title = "拖";
                    }
                }
                if (currentValue == "bt" && mySelectItem.bdCount == 0) {
                    //红托 = 红复
                    if (id == 'ssq') {
                        if (numbers.length > 1) {

                            title = "蓝复";
                        } else if (numbers.length == 1) {
                            title = "蓝单";
                        }
                    } else if (id == 'dlt') {
                        title = "后区拖";
                    } else if (id == 'kl8') {
                        title = "拖";
                    }
                }

                addItem.name = title;
                addItem.numbers = numbers;
                addItem.numberstrs = addItem.name + "：" + numbers.join(",")
                returnItem[currentValue + 'Count'] = numbers.length;

                rdbtList.push(numbers.map(function(data) {
                    return data; //原封不懂
                }));

                if (numbers.length > 0) {
                    strList.push(addItem);
                }
            });
            returnItem.strList = strList;

            if (returnItem.rdCount + returnItem.rtCount >= this.selectItem.selectRedCount &&
                returnItem.bdCount + returnItem.btCount >= this.selectItem.selectBlueCount
            ) {
                isFinish = true;
            } else {
                isFinish = false;
            }
            returnItem.isFinish = isFinish;



            if (isFinish) {

                returnItem.str1 += "-------" + selectItem.name + "选号-------" + "\n";
                returnItem.str1 += returnItem.strList.map(function(data) {
                    return data.numberstrs;
                }).join("\n");
                var rdList = rdbtList[0];
                var rtList = rdbtList[1];
                var bdList = rdbtList[2];
                var btList = rdbtList[3];


                var selectRedCount = selectItem.selectRedCount;
                var selectBlueCount = selectItem.selectBlueCount;
                var _selectRedCount = selectRedCount - mySelectItem.rdCount;
                var _selectBlueCount = selectBlueCount - mySelectItem.bdCount;

                var _totalCount12 = rtList.length;
                var _totalCount34 = btList.length;
                var _rtList = JSON.parse(JSON.stringify(rtList));
                var _btList = JSON.parse(JSON.stringify(btList));

                var redsCount = 1 * this.binomialCoefficient(_totalCount12, _selectRedCount);
                var bulesCount = 1 * this.binomialCoefficient(_totalCount34, _selectBlueCount);

                var totalZhuShu = redsCount * bulesCount;
                returnItem.totalZhuShu = totalZhuShu;
                returnItem.money = 2 * totalZhuShu;

                if (totalZhuShu > 1000) {
                    returnItem.str2 = "总注数超过1000，不生成选号详情";
                } else {
                    returnItem.str2 = "-------选号详情-------\n";
                    var list1 = rdList;
                    var list2 = this.getCombinListList(_totalCount12, _selectRedCount, _rtList);
                    var list3 = bdList;
                    var list4 = this.getCombinListList(_totalCount34, _selectBlueCount, _btList);

                    returnItem.list1 = list1;
                    returnItem.list2 = list2;
                    returnItem.list3 = list3;
                    returnItem.list4 = list4;

                    var redsList = [];
                    var bluesList = [];

                    list2.forEach(function(dataList) {
                        var innerList = list1.concat(dataList);
                        redsList.push(_.sortBy(innerList, function(o) { return o; }));
                    });

                    list4.forEach(function(dataList) {
                        var innerList = list3.concat(dataList);
                        bluesList.push(_.sortBy(innerList, function(o) { return o; }));
                    });

                    returnItem.redsList = redsList;
                    returnItem.bluesList = bluesList;

                    returnItem.allNumsList = this.getAllNumsList(redsList, bluesList);

                    returnItem.str2 += returnItem.allNumsList.join("\n");
                    returnItem.str2 += "\n"
                    returnItem.str2 += "\n"
                }

            }
            console.log("四个胆拖", returnItem);
            return returnItem;
        }
    },
    watch: {
        "resultItem.str1": function(value) {
            this.str1 = value;
        },
        "resultItem.str2": function(value) {
            this.str2 = value;
        },
        mySelectItem: {
            immediate: true,
            deep: true,
            handler: function(value) {
                if (value.rdCount > this.rdMaxCount) {
                    this.mySelectItem.rdCount = this.rdMaxCount;
                }

                if (value.rtCount > this.rtMaxCount) {
                    this.mySelectItem.rtCount = this.rtMaxCount;
                }
                if (value.rtCount < this.rtMinCount) {
                    this.mySelectItem.rtCount = this.rtMinCount;
                }


                if (value.bdCount > this.bdMaxCount) {
                    this.mySelectItem.bdCount = this.bdMaxCount;
                }

                if (value.btCount > this.btMaxCount) {
                    this.mySelectItem.btCount = this.btMaxCount;
                }
                if (value.btCount < this.btMinCount) {
                    this.mySelectItem.btCount = this.btMinCount;
                }
                this.resetBalls();
            }
        },
        selectRadio: {
            immediate: true,
            handler: function(value) {
                if (value) {
                    var findModel = this.lotteryItemList.find(function(data) {
                        return data.id == value;
                    });
                    if (findModel) {
                        this.selectItem = this.$options.data().selectItem;
                        this.selectItem.id = findModel.id;
                        this.selectItem.name = findModel.name;
                        this.selectItem.redCount = findModel.redCount;
                        this.selectItem.selectRedCount = findModel.selectRedCount;
                        this.selectItem.blueCount = findModel.blueCount;
                        this.selectItem.selectBlueCount = findModel.selectBlueCount;

                        this.initData(this.selectItem);
                    }
                }
            }
        }
    },
    created: function() {
        this.onLoad();
    },
    methods: {
        sjNz: function() {
            this.randomBalls(this.sizs);
        },
        randomBalls: function(num) {
            var list = [];
            for (var i = 0; i < num; i++) {
                var redStr = _.sortBy(_.sampleSize(this.selectItem.reds, this.selectItem.selectRedCount), function(o) { return o; }).join(" ");
                var blueStr = _.sortBy(_.sampleSize(this.selectItem.blues, this.selectItem.selectBlueCount), function(o) { return o; }).join(" ");
                list.push(redStr + " + " + blueStr);
            }

            if (list.length > 0) {

                if (!this.blwbk) {
                    this.str2 = "";
                }
                this.str2 += "-------" + this.selectItem.name + "选号-------" + "\n";
                this.str2 += list.join("\n");
                this.str2 += "\n"
                this.str2 += "\n"

            }

        },
        //求组合数
        binomialCoefficient: function(N, M) {
            if (M > N || M < 0) {
                return 0;
            }
            let result = 1;
            for (let i = 1; i <= M; i++) {
                result *= (N - M + i) / i;
            }
            return result;
        },
        getAllNumsList: function(redsList, bluesList) {
            var that = this;
            var returnList = [];

            redsList.forEach(function(item1) {
                var redsStr = item1.join(" ");
                if (that.selectItem.id == "kl8") {
                    returnList.push(redsStr);
                } else {
                    bluesList.forEach(function(item2) {
                        var bluesStr = item2.join(" ");

                        returnList.push(redsStr + " + " + bluesStr);
                    });
                }

            });

            return returnList;

        },
        getCombinListList: function(_totalCount, _selectCount, _list) {
            var returnList = [];
            var that = this;
            if (isNaN(_totalCount) || _totalCount <= 0) {
                _totalCount = 0;
            }
            if (isNaN(_selectCount) || _selectCount <= 0) {
                _selectCount = 0;
            }

            //_totalCount = _totalCount.toFixed(0);
            //_selectCount = _selectCount.toFixed(0);

            var totalCount = _totalCount;
            var selectCount = _selectCount;

            var arr = [];
            for (var i = 0; i < totalCount; i++) {
                arr.push(i + 1);
            }
            var combinCount = selectCount;

            var getCombinList = this.getNum(arr, combinCount, ',');
            if (selectCount == 1) {
                returnList = [];
                for (var i = 0; i < _totalCount; i++) {
                    returnList.push([_list[i]]);
                }

            } else if (selectCount > 1) {
                _getListList = this.getListList(getCombinList, ',');
                for (var i = 0; i < _getListList.length; i++) {
                    var innerList = _getListList[i];
                    //console.log("里面是？", innerList);
                    //下标List
                    var subList = innerList.map(function(data) {
                        var IntNum = parseInt(data);
                        return IntNum - 1;
                    });
                    //pushList
                    var pushList = subList.map(function(data) {
                        return _list[data];
                    });
                    returnList.push(pushList);
                }

            }

            return returnList;
        },
        getNum: function(nums, index, _splitStr) {
            var that = this;
            var retNum = [];
            var splitStr = _splitStr || " ";
            if (index > 1) {
                for (var i = 0; i < nums.length; i++) {
                    var temp = [];
                    for (var y = i + 1; y < nums.length; y++) {
                        temp.push(nums[y]);
                    }
                    var num = that.getNum(temp, index - 1, splitStr);

                    num.forEach(function(number) {
                        retNum.push(nums[i] + splitStr + number);
                        //retNum.push(nums.concat([number]));

                    });


                }
            } else {
                nums.forEach(function(num) {
                    retNum.push(num);
                });
            }
            return retNum;
        },
        getListList: function(_list, _splitStr) {
            var flag = (Object.prototype.toString.call(_list) === '[object Array]')
            var returnList = [];
            var splitStr = _splitStr || " ";
            if (flag) {
                _list.forEach(function(currentValue) {
                    returnList.push(currentValue.split(splitStr));
                });
            }
            return returnList;
        },
        clearNums: function() {
            this.str1 = "";
            this.str2 = "";
        },
        getRandomArray: function(arr, num) {
            //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
            var returnArr = _.sampleSize(arr, num);
            return returnArr;
        },
        resetBalls: function() {
            this.resetAnList('rd');
            this.resetAnList('rt');
            this.resetAnList('bd');
            this.resetAnList('bt');
        },
        randomAnList: function(rdbt) {
            this.resetAnList(rdbt);
            switch (rdbt) {
                case "rd":
                    this.rdSelect();
                    break;
                case "rt":
                    this.rtSelect();
                    break;
                case "bd":
                    this.bdSelect();
                    break;
                case "bt":
                    this.btSelect();
                    break;
                default:

                    break;
            }


        },
        resetAnList: function(rdbt) {
            var list = this.selectItem[rdbt].list;
            if (list) {
                list.forEach(function(currentValue) {
                    currentValue.selected = false;
                    currentValue.locked = false;
                });
            }
        },
        setRandomBalls: function(totalCount, selectRDCount) {
            var rdList = this.getRandomArray(list, selectCount); //被选中的item
            rdList.forEach(function(currentValue, index) {
                currentValue1.selected = true;
            });
        },
        rdSelect: function() {
            var mySelectItem = this.mySelectItem;
            var selectItem = this.selectItem;
            var selectCount = mySelectItem.rdCount;
            var updateList = selectItem.rd.list;
            var filterList = this.filterRdList;

            var selectList = this.getRandomArray(filterList, selectCount);

            selectList.forEach(function(currentValue, index) {
                updateList.forEach(function(currentValue1, index1) {
                    if (currentValue1.ball == currentValue.ball) {
                        currentValue1.selected = true;
                    }
                });
            });
        },
        rtSelect: function() {
            var mySelectItem = this.mySelectItem;
            var selectItem = this.selectItem;
            var selectCount = mySelectItem.rtCount;
            var updateList = selectItem.rt.list;
            var filterList = this.filterRtList;

            var selectList = this.getRandomArray(filterList, selectCount);

            selectList.forEach(function(currentValue, index) {
                updateList.forEach(function(currentValue1, index1) {
                    if (currentValue1.ball == currentValue.ball) {
                        currentValue1.selected = true;
                    }
                });
            });
        },
        bdSelect: function() {
            var mySelectItem = this.mySelectItem;
            var selectItem = this.selectItem;
            var selectCount = mySelectItem.bdCount;
            var updateList = selectItem.bd.list;
            var filterList = this.filterBdList;

            var selectList = this.getRandomArray(filterList, selectCount);

            selectList.forEach(function(currentValue, index) {
                updateList.forEach(function(currentValue1, index1) {
                    if (currentValue1.ball == currentValue.ball) {
                        currentValue1.selected = true;
                    }
                });
            });
        },
        btSelect: function() {
            var mySelectItem = this.mySelectItem;
            var selectItem = this.selectItem;
            var selectCount = mySelectItem.btCount;
            var updateList = selectItem.bt.list;
            var filterList = this.filterBtList;

            var selectList = this.getRandomArray(filterList, selectCount);

            selectList.forEach(function(currentValue, index) {
                updateList.forEach(function(currentValue1, index1) {
                    if (currentValue1.ball == currentValue.ball) {
                        currentValue1.selected = true;
                    }
                });
            });
        },
        submitButtonClick: function() {
            var that = this;

            this.resetBalls();
            this.rdSelect();
            this.rtSelect();
            this.bdSelect();
            this.btSelect();

        },
        getBallClasses: function(item, color) {
            var classes = [];
            if (item.selected) {
                switch (color) {
                    case "red":
                        classes.push('rb');
                        break;
                    case "blue":
                        classes.push('bb');
                        break;
                    default:

                        break;
                }
            } else {
                classes.push('gb');
            }

            if (item.locked) {

            }
            return classes;
        },
        //补0
        prefixZero: function(num, n) {
            if (isNaN(num)) {
                return "00";
            }
            return (Array(n).join(0) + num).slice(-n);
        },
        selectBall: function(selectItem, item, rbdt) {
            var maxCount = selectItem[rbdt].maxCount;
            switch (rbdt) {
                case "rd":
                    item.selected = !item.selected
                    break;
                case "rt":
                    item.selected = !item.selected
                    break;
                case "bd":
                    item.selected = !item.selected
                    break;
                case "bt":
                    item.selected = !item.selected
                    break;
                default:
                    break;
            }
        },
        initData: function(selectItem) {
            selectItem.rd.list = [];
            selectItem.rt.list = [];
            selectItem.bd.list = [];
            selectItem.bt.list = [];
            switch (selectItem.id) {
                case "ssq":
                    selectItem.rd.title = "红胆";
                    selectItem.rd.show = true;
                    selectItem.rt.title = "红拖";
                    selectItem.rt.show = true;
                    selectItem.bd.title = "蓝胆";
                    selectItem.bd.show = false;
                    selectItem.bt.title = "蓝复";
                    selectItem.bt.show = true;

                    break;
                case "dlt":
                    selectItem.rd.title = "前区胆";
                    selectItem.rd.show = true;
                    selectItem.rt.title = "前区拖";
                    selectItem.rt.show = true;
                    selectItem.bd.title = "后区胆";
                    selectItem.bd.show = true;
                    selectItem.bt.title = "后区拖";
                    selectItem.bt.show = true;
                    break;
                case "kl8":
                    selectItem.rd.title = "胆";
                    selectItem.rd.show = true;
                    selectItem.rt.title = "拖";
                    selectItem.rt.show = true;
                    selectItem.bd.title = "后区胆";
                    selectItem.bd.show = false;
                    selectItem.bt.title = "后区拖";
                    selectItem.bt.show = false;
                    break;
                default:

                    break;
            }
            selectItem.reds = [];
            selectItem.blues = [];
            for (var i = 0; i < selectItem.redCount; i++) {
                selectItem.reds.push(this.prefixZero(i + 1, 2), );
            }
            for (var i = 0; i < selectItem.blueCount; i++) {
                selectItem.blues.push(this.prefixZero(i + 1, 2), );
            }
            selectItem.rd.maxCount = selectItem.selectRedCount - 1;
            selectItem.rt.maxCount = selectItem.redCount;
            selectItem.bd.maxCount = selectItem.selectBlueCount - 1;
            selectItem.bt.maxCount = selectItem.blueCount;

            selectItem.rd.list = this.getBallsList(selectItem.redCount);
            selectItem.rt.list = this.getBallsList(selectItem.redCount);
            selectItem.bd.list = this.getBallsList(selectItem.blueCount);
            selectItem.bt.list = this.getBallsList(selectItem.blueCount);
        },
        getBallsList: function(ballCount) {
            var returnList = [];

            for (var i = 0; i < ballCount; i++) {
                var addItem = {
                    ball: this.prefixZero(i + 1, 2),
                    selected: false,
                    locked: false
                };
                returnList.push(addItem);
            }
            return returnList;
        },
        onLoad: function() {
            this.initRadio();
        },
        initRadio: function() {
            this.selectRadio = this.lotteryItemList[1].id;
        }
    }

});