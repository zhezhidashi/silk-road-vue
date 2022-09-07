import axios from "./axios";

export const baseUrl = 'https://api_doc.pacificsilkroad.cn'

// 向指定的 url 获取数据表单
export const getForm = (requestUrl, callback) => {
    axios.request({
        url: baseUrl + requestUrl,
        method: 'get'
    }).then(({data: res}) => {
        
        // if (res.code === 0) {
        //     alert("查询成功");
        // } else if (res.code === 400) {
        //     alert("查询对象不存在");
        // } else {
        //     alert("网络错误");
        // }

        console.log('getForm 的 response', res);
        callback(res)
    })
}
