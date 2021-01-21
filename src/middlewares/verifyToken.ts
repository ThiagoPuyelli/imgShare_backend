import jwt from "jsonwebtoken"

export default (req, res, next) => {
    const token = req.headers['x-access-token'].split("|")[0];

    if(!token){
        return res.status(404).send({
            auth: false,
            message: "Usuario no identificado"
        });
    }

    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
        if(err) return res.status(404).send({error: "Token inválido"});

        if(decoded){
            req.decoded = decoded;
            next()
        }
    });
}