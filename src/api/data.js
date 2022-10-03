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
        if (res.code === 0) {
            alert("请求成功");
        } else if (res.code === 400) {
            alert("请求对象不存在");
        } else {
            alert("网络错误");
        }
        callback(res);
    })
}

