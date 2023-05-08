import fetch from "dva/fetch";
import { createHashHistory } from "history";
import { notification, message } from "antd";

const history = createHashHistory();
let isTrue;

function parseJSON(response) {
  //系统维护
  if (response.status === 301) {
    history.push("/close");
  } else if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 400 || //一般错误(注册账号)
    response.status === 403 || //没有权限 委里网络拦截
    // response.status === 404 || //图斑关联项目id查询失败
    response.status === 500 //一般错误
  ) {
    return response.json();
  } else if (response.status === 401) {
    const user = JSON.parse(localStorage.getItem("sb_user")) || {};
    history.push(user.userType === "建设" ? "/login/js" : "/login/xz");
    return {
      success: false,
      error: {
        message: "登录信息过期，请重新登录！",
      },
    };
  } else {
    console.error(response.status, response.url);
    return {
      success: false,
      error: {
        message:
          response.status === 502
            ? "系统正在更新！"
            : response.status === 504
            ? "系统请求超时！"
            : "系统异常！",
      },
    };
  }
}

function checkStatus(response) {
  if (!isTrue) {
    notification.config({
      duration: 5,
      top: 50,
    });
    message.config({
      duration: 5,
    });
    isTrue = true;
  }
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}
