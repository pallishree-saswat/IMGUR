const User = require('../models/User');
const Photo = require('../models/Photo')
const Fav = require('../models/Favourite')
const bcrypt = require("bcryptjs");
const { verify } = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const convertBufferToString = require("../utils/convertBufferToString");
const { sign } = require("jsonwebtoken");
const Op = require('sequelize').Op;



module.exports = {
    async userRegister(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!email || !password || !name) {
                return res.status(400).send({ statusCode: 400, message: "Bad request" });
            }

            const createUser = await User.create({ name, email, password });
            const secretKey = `anuraggothi`;
            const accessToken = await sign({ id: createUser.id }, secretKey, {
                expiresIn: (1000 * 60 * 60*24).toString()
            });
            createUser.accessToken = accessToken
            await createUser.save()
            res.status(201).json({
                statusCode: 201,
                user:createUser,
                accessToken: accessToken,
                expiresIn: "24h"
            });
        } catch (err) {
            console.log(err.message)
            res.status(500).send(err.message);
        }
    },


    async userLogin(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ statusCode: 400, message: 'Invalid Credentials' });
            const user = await User.findByEmailAndPassword(email, password);
            const secretKey = `anuraggothi`;
            const accessToken = await sign({ id: user.id }, secretKey, {
                expiresIn: (1000 * 60 * 60*24).toString()
            });
            user.accessToken = accessToken;
            await user.save()
            res.status(200).json({
                statusCode: 200,
                user,
                accessToken: accessToken,
                expiresIn: "24h"
            });
        }
        catch (err) {
            if (err.name === 'AuthError') {
                res.json({ message: err.message })
            }
        }
    },

    async userLogout(req, res) {
        try {
            const token = req.params.token
            const user = await User.nullifyToken(token);
            res.json({ user, message: 'Logout successfully' });

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }

    },

    async singleUser(req, res) {
        res.json(req.user)
    },

    async userImageUpdate(req, res) {
        const user = req.user;
        console.log(req.files)
        const { title, description} = req.body
        let privacy = req.body.privacy
        if(!req.body.privacy){
            privacy= 'public'
        }
        const token = req.params.token
        try {
            const urls = []
            for(i=0;i<req.files.length;i++){
                let imageContent = convertBufferToString(
                    req.files[i].originalname,
                    req.files[i].buffer
                );
                let imageUrl = await cloudinary.uploader.upload(imageContent)
                console.log(imageUrl)
                urls.push(imageUrl.secure_url);
                console.log(urls)
            }   
            const photo = await Photo.create({ url: urls.join(','), title: title, description: description, uploadedBy: user.id,privacy:privacy });
            res.json({ message: "Image uploaded Successfully", photo: photo });

        } catch (err) {
            console.log(err.message);
            res.json({ error: "Image Upload Error" });
        }
    },

    async addFav(req, res) {
        try {
            const user = req.user;
            const photoId = req.params.photoId;
            const photo = await Photo.findOne({
                where: {
                    id: photoId
                }
            });
            console.log(photo)
            const Favourite = await Fav.create({ favouriteBy: user.id, photoDetail: photo.dataValues, photoId: photo.dataValues.id });
            console.log(Favourite)
            res.status(201).json({ FavouriteAdded: Favourite });
        } catch (err) {
            console.log(err.message);
            if (err.message === 'Already Bookmarked') {
                res.send("Already Bookmarked");
            }
            res.json({ error: "Favourite Error" });
        }
    },

    //@desc:For deleting user bookmark
    //@access:PRIVATE
    async deleteFav(req, res) {
        try {
            const user = req.user;
            const favId = req.params.favId;
            const deleteFav = await Fav.destroy({
                where: {
                    id: favId
                }
            });
            console.log('deleting')
            console.log(deleteFav)
            res.json({ FavRemoved: "Bookmard Deleted" });
        } catch (err) {
            console.log(err.message);
            res.json({ error: "Fetch Error" });
        }
    },
    async publicImage(req,res){
        try{
            const images  = await Photo.findAll({
                where:{
                    privacy:'public'
                }
            })
            res.json({images})
        }
        catch (err) {
            res.json({ error: "Fetch Error" });
        }
    },
    async allImage(req,res){
        try{
            const user = req.user
            const images  = await Photo.findAll({
                where: {
                    [Op.or]:[
                        {
                            privacy:'public'
                        },
                        {
                            uploadedBy: user.id
                        }
                    ]
                }
            })
            res.json({images})
        }
        catch (err) {
            console.log(err)
            res.json({ error: "Fetch Error" });
        }
    },
    async myfav (req,res){
        try{
            const user = req.user
            const fav =  await Fav.findAll({where:{
                favouriteBy:user.id
            }})
            console.log(fav.dataValues)
            res.json({fav})
        }
        catch (err) {
            console.log(err)
            res.json({ error: "Fetch Error" });
        }
    },
    async myphotos(req,res){
        try{
            const user = req.user
            console.log(user.id)
            const photo = await Photo.findAll({
                where: {
                    uploadedBy:user.id
                }
            })
            res.json({photo})

        }
        catch (err) {
            res.json({ error: "Fetch Error" });
        }
    }

}