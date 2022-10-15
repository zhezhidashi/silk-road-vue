import axios from "./axios";
import nprogress from 'nprogress';
import "nprogress/nprogress.css";
// export const baseUrl = 'https://api_doc.pacificsilkroad.cn'
export const baseUrl = 'https://dev.pacificsilkroad.cn/api-service'

// 向指定的 url 获取数据表单
export const getForm = (requestUrl, callback) => {
    nprogress.start();
    axios.request({
        url: baseUrl + requestUrl,
        method: 'get'
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('getForm 的 response', res);
        callback(res)
    })
}

// 向指定的 url 提交数据表单
export const postForm = (requestUrl, params, callback) => {
    console.log('postForm 的表单', requestUrl, params)
    nprogress.start();
    axios.request({
        url: baseUrl + requestUrl,
        method: 'post',
        data: params,
    }).then(({ data: res }) => {
        console.log('postForm 的 response', res);
        nprogress.done()
        // if (res.code === 0) {
        //     alert("提交成功");
        // } else if (res.code === 400) {
        //     alert("请求对象不存在");
        // } else {
        //     alert("网络错误");
        // }
        callback(res);
    })
}

// 语种简称对应表
export const LanguageMap = {
    AR: "阿拉伯文",
    BE: "白俄罗斯文",
    BG: "保加利亚文",
    CA: "加泰罗尼亚文",
    CS: "捷克文",
    DA: "丹麦文",
    DE: "德文",
    EL: "希腊文",
    EN: "English",
    ES: "Español",
    ET: "爱沙尼亚文",
    FI: "芬兰文",
    FR: "法文",
    HR: "克罗地亚文",
    HU: "匈牙利文",
    IT: "意大利文",
    IW: "希伯来文",
    JA: "日文",
    KO: "朝鲜文",
    LT: "立陶宛文",
    MK: "马其顿文",
    NL: "Nederlands",
    NO: "挪威文",
    PL: "波兰文",
    PT: "葡萄牙文",
    RO: "罗马尼亚文",
    RU: "俄文",
    SK: "斯洛伐克文",
    SL: "斯洛文尼亚文",
    SQ: "阿尔巴尼亚文",
    SR: "塞尔维亚文",
    SV: "瑞典文",
    TH: "泰文",
    TR: "土耳其文",
    UK: "乌克兰文",
    ZH: "中文",
}

// 判断 list 列表是否含有 x
export const ListContain = (list, x) => {
    for (let item of list) {
        if (x === item) return true;
    }
    return false;
}