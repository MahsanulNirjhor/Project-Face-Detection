//const bcrypt = require("bcrypt-nodejs");
const handlerRegister = (db,bcrypt) => (req,res) => {
    const {email,password,id,name} =req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect Submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx.insert({
                    email: email, // loginEmail[0].email was used in the tutorial
                    name: name,
                    time : new Date()
                })
                    .into('users')
                    .returning('*')
                    .then(users => {
                        res.json(users[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('Unable to register'));
    // res.json(database.users[database.users.length-1]);
}

module.exports = {
    handlerRegister
};