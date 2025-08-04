import httpInstance from "@/utils/http"

//获取商品信息
export const getDetail = (id) => {
    return httpInstance({
        url: '/goods',
        params: {
            id
        }
    })
}
