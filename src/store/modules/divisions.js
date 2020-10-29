import divisions from '../../assets/json/divisions.json'
import colors from '../../assets/json/colors.json'

const loadDivision = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // console.log(divisions)
            resolve(divisions)
        }, time)
    })
}
const loadColors = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(colors)
        }, time)
    })
}

export default{
    state:{
        divisions:{},
        colors:[],
        index: null
    },
    getters:{
        getAllDivision(state){
            return state.divisions
        },
        getColors(state){
            return state.colors
        },
        getIndex(state){
            return state.index
        }
    },
    mutations:{
        SET_DATA(state, payload){
            state.divisions = payload
        },
        SET_COLORS(state, payload){
            state.colors = payload
        },
        ADD_MAIN_SIDEBAR(state, payload){
            state.divisions.unshift(payload)
        },
        ADD_CHILD_MAIN_SIDEBAR(state, payload){
            // console.log(payload[1].index)
            const data = payload[0]
            // console.log(data)
            state.divisions[payload[1].index].children.unshift(data)
        },
         ADD_CHILD_INDEX_SIDEBAR(state, payload){
            // console.log(payload[1].index)
            var listItem = payload[1].index.split('_').map(Number)
            console.log(listItem)
            const data = payload[0]
            console.log(data)
            var division_1 = state.divisions[listItem[0]]

            for(var i = 1; i<=listItem.length;i++){
                console.log(i, '=', listItem.length)
                if(i == listItem.length){
                    var a = division_1.children
                }else{
                    a = division_1.children[listItem[i]]
                }
                 division_1 = a
                // state.divisions[listItem[0]].children[listItem]
            }
            console.log(division_1)
            
            division_1.unshift(data)
            // division
            // state.divisions[listItem[0]].children[listItem[1]].children.unshift(data)
        },
        SET_INDEX(state, payload){
            console.log('payload index = ', payload)
            state.index = payload
        },
        UPDATE_MAIN_SIDEBAR(state, payload){
            console.log('payload = ',payload)
            console.log('index = ',payload[1].index)
            var listItem = payload[1].index.split('_').map(Number)
            // console.log(listItem)
            const data = payload[0]
            // console.log(data)
            var division_2 = state.divisions[listItem[0]];

            if(listItem.length>1){
                // division_2 = state.divisions[listItem[0]]

                for(var i = 1; i<listItem.length;i++){
                    // console.log(i, '=', listItem.length)
                    // if(i+1 == listItem.length){
                    //     var a = division_2.children
                    // }else{
                    //     a = division_2.children[listItem[i]]
                    // }
                    var a = division_2.children[listItem[i]]
                    division_2 = a
                }
            }
            // console.log(b_1)
            // console.log(listItem.length)
            var count = parseInt(state.divisions[listItem[0]].count)
            if(listItem.length>1){
                count -= parseInt(division_2.count)
                state.divisions[listItem[0]].count = count
                // console.log(b_1[listItem[listItem.length-2]])
                var change_children = state.divisions[listItem[0]];
                for(var j = listItem.length-1; j>1;j--){
                    // console.log('listItem[listItem.length-j] = ', listItem[listItem.length-j])
                    // console.log(change_children)
                    var s = change_children.children[listItem[listItem.length-j]]
                    // console.log(s)
                    // console.log('division_2.count = ', division_2.count)
                    var count_children = parseInt(s.count)
                    count_children -= parseInt(division_2.count)
                    s.count = count_children + parseInt(data.count)
                    change_children = s
                    // b_1[listItem[j-1]].count += parseInt(data.count)
                }
            }
           
            console.log(division_2)

            console.log('-------sss--------')
            Object.keys(division_2).map((item) => {
                if(item == "id"){
                    if(division_2[item] == data.id){
                        division_2.name = data.name
                        division_2.count = data.count
                        if(listItem.length>1){
                            count += parseInt(data.count)
                            state.divisions[listItem[0]].count = count
                        }
                        
                        console.log(division_2)
                        return division_2
                    }
                }
            })
        },

        DELETE_MAIN_SIDEBAR(state, payload){
            console.log('payload = ',payload)
            console.log('index = ',payload[0].index)
            var listItem = payload[0].index.split('_').map(Number)
            // console.log(listItem)
            const data = payload[0]
            console.log(data)
            if(listItem.length>1){
                var division_3 = state.divisions[listItem[0]]

                for(var i = 1; i<listItem.length;i++){
                    // console.log(i, '=', listItem.length)
                    if(i+1 == listItem.length){
                        var a = division_3.children
                    }else{
                        a = division_3.children[listItem[i]]
                    }
                    division_3 = a
                }
            }else{
                division_3 = state.divisions
            }
            
            console.log(division_3)

            console.log('-------sss--------')

            var index = division_3.findIndex(todo => todo.id == payload[0].id)
            
            if(listItem.length>1){
                state.divisions[listItem[0]].count -= parseInt(division_3[index].count)

                var change_children_del = state.divisions[listItem[0]];
                for(var j = listItem.length-1; j>1;j--){
                    var s_del = change_children_del.children[listItem[listItem.length-j]]
                    var count_children_del = parseInt(s_del.count)
                    count_children_del -= parseInt(division_3[index].count)
                    s_del.count = count_children_del
                    change_children_del = s_del
                }
            }
            console.log(index)
            division_3.splice(index, 1)
        }
    },
    actions:{
        async loadDivision({commit}, payload){
            try {
                const data = await loadDivision(payload)
                commit('SET_DATA', data)
            } catch (error) {
                console.error(error)
            }
        },
        async loadColors({commit}, payload){
            try {
                const data = await loadColors(payload)
                commit('SET_COLORS', data)
            } catch (error) {
                console.error(error)
            }
        }
    }
}