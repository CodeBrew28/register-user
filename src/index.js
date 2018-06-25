const { send, json } = require('micro')
const mongoose = require('mongoose');
const { Player } = require('schemas')(mongoose);

mongoose.connect(process.env.MONGO_URL)
mongoose.Promise = global.Promise

module.exports = register = async (req, res) => {
    const body = await json(req)
    if (body.email) {
        const player = new Player({email: body.email });  
        try {s
            await player.save()
        } catch (error) {
            send(res, 400, "There is an existing account already");
        }
        const data = { message: 'Welcome ' + body.email };
        send(res, 200, data);
    }
    const data = { message: 'Please provide an email' };
    send(res, 400, data);
    
}

