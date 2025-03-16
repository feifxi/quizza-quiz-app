const BASE_URL = "http://localhost:5000/users"

export const createUser = async (userData) => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
        const data = await res.json()
        return {
            success: true,
            message: 'Create user success',
            data: data
        }
    } catch (error) {
        console.log('Error in create user : ', error)
        return {
            success: false,
            message: 'Fail to Create user',
        }
    }
}
 

export const getAllUsers = async (options) => {
    try {
        let queryString = ''
        if (options && options.length > 0) {
            queryString = options.reduce((prev, option) => prev + '&' + option.key + '=' + option.value , '')
            queryString = '?' + queryString.slice(1, queryString.length)
        }
        const res = await fetch(`${BASE_URL}${queryString}`)
        const data = await res.json()
        return {
            success: true,
            message: 'get all user success',
            data: data
        }
    } catch (error) {
        console.log('Error in get all user : ', error)
        return {
            success: true,
            message: 'Fail to get all user',
        }
    }
}

export const getUserById = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}`)
        const data = await res.json()
        return {
            success: true,
            message: 'Get user success',
            data: data
        }
    } catch (error) {
        console.log('Error in get user : ', error)
        return {
            success: true,
            message: 'Fail to get user',
        }
    }
}


export const updateUser = async (userId, newData) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        })
        const data = await res.json()
        return {
            success: true,
            message: 'Update user success',
            data: data
        }
    } catch (error) {
        console.log('Error in update all user : ', error)
        return {
            success: true,
            message: 'Fail to update all user',
        }
    }
}

export const deleteUser = async (userId) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        })
        const data = await res.json()
        return {
            success: true,
            message: 'Update user success',
            data: data
        }
    } catch (error) {
        console.log('Error in update all user : ', error)
        return {
            success: true,
            message: 'Fail to update all user',
        }
    }
}