import axios from 'axios'

export async function General(method, url, data={}, headers={}){
    try {
        let res = await axios({ method, url, data, headers })
        let val = await res.data
        return val            
    } catch (error) {
        console.log(error)
        let val = false
        return val  
    }
} 

export async function Get(url, config){
    try {
        let res = await axios.get(url,{config})
        let data = await res.data
        let err = false
        return {data, err}            
    } catch (error) {
        console.log(error)
        let data = null
        let err = true
        return {data, err}            
    }

    // try {
    //     let res = await axios.get(url,{config})
    //     let data = await res.data
    //     return data            
    // } catch (error) {
    //     console.log(error)
    //     let data = null
    //     return data            
    // }
} 

export async function Put(url, val,config){
    try {
        let res = await axios.put(url,{id: val},{config})
        let data = await res.data
        return data            
    } catch (error) {
        console.log(error)
        return error  
    }
} 

export async function Delete(url, val,config){
    let res = await axios.delete(url,{data:{id: val},config})
    let data = await res.data
    return data
} 