const BASE_URL = "http://localhost:5000/quizs"

export const createGame = async (gameData) => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gameData)
        })
        const data = await res.json()
        return {
            success: true,
            message: 'Create game success',
            data: data
        }
    } catch (error) {
        console.log('Error in create game : ', error)
        return {
            success: true,
            message: 'Fail to Create game',
        }
    }
}


// == example option ==
// {
//     key: 'userName',
//     value: 'jeno'    
// }
export const getAllGames = async (option) => {
    try {
        const res = await fetch(`${BASE_URL}${ option ? `?${option.key}=${option.value}` : '' }`)
        const data = await res.json()
        return {
            success: true,
            message: 'get all game success',
            data: data
        }
    } catch (error) {
        console.log('Error in get all game : ', error)
        return {
            success: true,
            message: 'Fail to get all game',
        }
    }
}

export const getGameById = async (gameId) => {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}`)
        const data = await res.json()
        return {
            success: true,
            message: 'Get game success',
            data: data
        }
    } catch (error) {
        console.log('Error in get game : ', error)
        return {
            success: true,
            message: 'Fail to get game',
        }
    }
}


export const updateGame = async (gameId, newData) => {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        })
        const data = await res.json()
        return {
            success: true,
            message: 'Update game success',
            data: data
        }
    } catch (error) {
        console.log('Error in update all game : ', error)
        return {
            success: true,
            message: 'Fail to update all game',
        }
    }
}

export const deleteGame = async (gameId) => {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        })
        const data = await res.json()
        return {
            success: true,
            message: 'Update game success',
            data: data
        }
    } catch (error) {
        console.log('Error in update all game : ', error)
        return {
            success: true,
            message: 'Fail to update all game',
        }
    }
}