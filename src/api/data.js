import axios from "./axios";
import nprogress from 'nprogress';
import "nprogress/nprogress.css";
export const baseUrl = 'https://api_doc.pacificsilkroad.cn'

// 向指定的 url 获取数据表单
export const getForm = (requestUrl, callback) => {
    nprogress.start();
    axios.request({
        url: baseUrl + requestUrl,
        method: 'get'
    }).then(({data: res}) => {
        nprogress.done()
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
