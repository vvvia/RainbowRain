import {Base} from '../../utils/base.js';
class Cart extends Base{
    constructor(){
        super();
        this._storageKeyName='cart';
    };
    getCartDataFromLocal(flag){
        var res = wx.getStorageSync(this._storageKeyName);
        if(!res){
            res=[];
        }
        if(flag){
            var newRes=[];
            for(let i=0;i<res.length;i++){
                if(res[i].selectStatus){
                    newRes.push(res[i]);
                }
            }
            res=newRes;
        }

        return res;
    };

    getCartTotalCounts(flag){
        var data=this.getCartDataFromLocal(),
            counts1=0,
            counts2=0;
        for(let i=0;i<data.length;i++){
            if (flag){
                if(data[i].selectStatus) {
                    counts1 += data[i].counts;
                    counts2++;
                }
            }else{
                counts1 += data[i].counts;
                counts2++;
            }
        }
        return {
            counts1:counts1,
            counts2:counts2
        };
    };


    execSetStorageSync(data){
        wx.setStorageSync(this._storageKeyName,data);
    };
    add(item,counts){
        var cartData=this.getCartDataFromLocal();
        if(!cartData){
            cartData=[];
        }
        var isHadInfo=this._isHasThatOne(item.id,cartData);
        //新商品
        if(isHadInfo.index==-1) {
            item.counts=counts;
            item.selectStatus=true;  //默认在购物车中为选中状态
            cartData.push(item);
        }
        //已有商品
        else{
            cartData[isHadInfo.index].counts+=counts;
        }
        this.execSetStorageSync(cartData);  //更新本地缓存
        return cartData;
    };

    _changeCounts(id,counts){
        var cartData=this.getCartDataFromLocal(),
            hasInfo=this._isHasThatOne(id,cartData);
        if(hasInfo.index!=-1){
            if(hasInfo.data.counts>1){
                cartData[hasInfo.index].counts+=counts;
            }
        }
        this.execSetStorageSync(cartData);  //更新本地缓存
    };

    /*
    * 增加商品数目
    * */
    addCounts(id){
        this._changeCounts(id,1);
    };

    /*
    * 购物车减
    * */
    cutCounts(id){
        this._changeCounts(id,-1);
    };

    /*购物车中是否已经存在该商品*/
    _isHasThatOne(id,arr){
        var item,
            result={index:-1};
        for(let i=0;i<arr.length;i++){
            item=arr[i];
            if(item.id==id) {
                result = {
                    index:i,
                    data:item
                };
                break;
            }
        }
        return result;
    }

    /*
    * 删除某些商品
    */
    delete(ids){
        if(!(ids instanceof Array)){
            ids=[ids];
        }
        var cartData=this.getCartDataFromLocal();
        for(let i=0;i<ids.length;i++) {
            var hasInfo = this._isHasThatOne(ids[i], cartData);
            if (hasInfo.index != -1) {
                cartData.splice(hasInfo.index, 1);  //删除数组某一项
            }
        }
        this.execSetStorageSync(cartData);
    }
}

export {Cart};