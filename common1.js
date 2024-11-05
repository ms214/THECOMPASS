const friendRecommendations = (network, user) => {
    let nearFriends = network[user]; // user의 친구들
    let visits = {};
    visits[user] = true;
    for(let i = 0; i<nearFriends.length; i++)
        visits[nearFriends[i]] = true;
    let nextFriend = {};

    let answer = [];
    let cnt = 1;

    let nextFind = [...network[user]];

    while(nextFind.length !== 0 && Object.keys(visits).length !== Object.keys(network).length){
        let len = nextFind.length;
        for(let i = 0; i<len; i++){
            nextFriend[nextFind[i]] = network[nextFind[i]];
            for(let j = 0; j<network[nextFind[i]].length; j++){
                if(!visits[network[nextFind[i]][j]]){
                    visits[network[nextFind[i]][j]] = true;
                    answer = [...answer, network[nextFind[i]][j]];
                    nextFind = [...nextFind, network[nextFind[i]][j]];
                }
            }
            nextFind = nextFind.filter((a) => a !== nextFind[i])
        }
    }

    return answer;

}
  