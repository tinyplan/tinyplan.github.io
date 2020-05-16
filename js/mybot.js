document.write('<script src="/js/vue.js" type="text/javascript" charset="utf-8"></script>');
document.write('<script src="/js/botui.js" type="text/javascript" charset="utf-8"></script>');
// 聊天机器人
function bot_ui_ini() {
    var botui = new BotUI("hello-mashiro")
    botui.message.add({
        delay: 800,
        content: "Hi, there👋"
    }).then(function () {
        botui.message.add({
            delay: 1100,
            content: "这里是 Mashiro"
        }).then(function () {
            botui.message.add({
                delay: 1100,
                content: "一个可爱的蓝孩子~"
            }).then(function () {
                botui.action.button({
                    delay: 1600,
                    action: [{
                        text: "然后呢？ 😃",
                        value: "sure"
                    }, {
                        text: "少废话！ 🙄",
                        value: "skip"
                    }]
                }).then(function (a) {
                    "sure" == a.value && sure();
                    // 直接去世
                    "skip" == a.value && end()
                })
            })
        })
    });
    var sure = function () {
        botui.message.add({
            delay: 600,
            content: "😘"
        }).then(function () {
            secondpart()
        })
    }
    var end = function () {
        botui.message.add({
            delay: 600,
            content: "![...](https://view.moezx.cc/images/2018/05/06/a1c4cd0452528b572af37952489372b6.md.jpg)"
        })
    }
    var secondpart = function () {
        botui.message.add({
            delay: 1500,
            content: "目前就读于上海财经大学"
        }).then(function () {
            botui.message.add({
                delay: 1500,
                content: "向往技术却误入商科，但后来喜欢上了经济学…"
            }).then(function () {
                botui.message.add({
                    delay: 1200,
                    content: "因为数据分析也需要Coder嘛"
                }).then(function () {
                    botui.message.add({
                        delay: 1500,
                        content: "主攻 R 语言和 Python，略懂 STATA，偶尔也折腾 HTML/CSS/JavaScript/PHP"
                    }).then(function () {
                        botui.message.add({
                            delay: 1500,
                            content: "研究的方向，是经济/金融方向的数据分析（data science）以及机器学习（machine learning）"
                        }).then(function () {
                            botui.message.add({
                                delay: 1800,
                                content: "喜欢画画，希望有一天能够被称为画师"
                            }).then(function () {
                                botui.action.button({
                                    delay: 1100,
                                    action: [{
                                        text: "为什么叫Mashiro呢？ 🤔",
                                        value: "why-mashiro"
                                    }]
                                }).then(function (a) {
                                    thirdpart()
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    var thirdpart = function () {
        botui.message.add({
            delay: 1E3,
            content: "Mashiro以及站名都来自一部动画，因为和主角有一样的爱好~ 如果有兴趣可以找找首页上的视频~"
        }).then(function () {
            botui.action.button({
                delay: 1500,
                action: [{
                    text: "为什么是白猫呢？ 🤔",
                    value: "why-cat"
                }]
            }).then(function (a) {
                fourthpart()
            })
        })
    }
    var fourthpart = function () {
        botui.message.add({
            delay: 1E3,
            content: "因为对GitHub有种执念… "
        }).then(function () {
            botui.message.add({
                delay: 1100,
                content: "而且我真的是猫控！"
            }).then(function () {
                botui.action.button({
                    delay: 1500,
                    action: [{
                        text: "域名有什么含意吗？(ง •_•)ง",
                        value: "why-domain"
                    }]
                }).then(function (a) {
                    fifthpart()
                })
            })
        })
    }
    var fifthpart = function () {
        botui.message.add({
            delay: 1E3,
            content: "emmmm，看备案信息你就知道了=.= 本来想要zheng.xin的，但50万真买不起。。"
        }).then(function () {
            botui.message.add({
                delay: 1600,
                content: "那么，仔细看看我的博客吧？ ^_^"
            })
        })
    } 
}