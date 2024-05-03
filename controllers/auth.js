const createUser = (req, res) => {
    res.json({
        ok: true,
        message: 'registro'
    })
}

const loginUser = (req, res) => {
    res.json({
        ok: true,
        message: 'login'
    })
} 

const renewUser = (req, res) => {
    res.json({
        ok: true,
        message: 'renew'
    })
}

module.exports = {createUser, loginUser, renewUser}