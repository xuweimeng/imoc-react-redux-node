export funtion getRedirectPath({type, avator}){
    // 根据用户信息，返回跳转地址
    // user.type /boss /genius
    // user.avator /bossinfo /geniusinfo

    let url = (type==='boss')?'/boss':'/genius'
    if(!avator) {
        url += 'info'
    }
    return url
}