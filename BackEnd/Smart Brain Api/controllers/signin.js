//const bcrypt = require("bcrypt-nodejs");
const handleSignin = (db,bcrypt) => (req, res) => {
    // console.log(req.body);
    const {email, password} = req.body;
    // console.log(email, password)
    db.select('*').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid){
                return db.select('*').from('users')
                    .where('email','=',email)
                    .then(user => res.json(user[0]))
                    .catch(error => res.status(400).json('Unable to get user'))
            }
            else {
                res.status(400).json('Wrong Credentials')
            }

        })
        .catch(error => res.status(400).json('wrong credentials'))

}

module.exports = {
    handleSignin
}