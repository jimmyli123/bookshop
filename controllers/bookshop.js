const cloudinary = require("../middleware/cloudinary");
const Transaction = require("../models/Transaction");
const User = require("../models/User")


module.exports = {
    getProfile: async (req, res) => {
        try {
          const transactions = await Transaction.find({ user: req.user.id });
          
          res.render("profile.ejs", { tranx: transactions, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
    getCreatePage: async (req,res) => {
      res.render('createListing.ejs')
    },
    createListing: async (req, res) => {
      try {
        // console.log(req)
        console.log(`Req.files: ${JSON.stringify(req.files[0].path)}`)
        let imgUrls = []
        let cloudinaryIds = []
        // req.files returns an object of the files that we uploaded. 
        // Iterate through req.files and save the path.secure_url and path.public_id 
        // to local arrays.
        for (let i =0; i < req.files.length; i++) {
            let pathToUpload = req.files[i].path
            const result = await cloudinary.uploader.upload(pathToUpload)
            imgUrls.push(result.secure_url)
            cloudinaryIds.push(result.public_id)
        }


        await Transaction.create( {
          subject: req.body.subject,
          price: req.body.price || '0',
          details: req.body.details,
          // image: result.secure_url,
          // cloudinaryId: result.public_id,
          image: imgUrls,
          cloudinaryId: cloudinaryIds,
          typeOf: req.body.typeOf,
          user: req.user.id
        })
        res.redirect("/profile")
      } catch (err) {
        console.log(err)
      }
    },
    deleteListing: async (req, res) => {
      try {
        const result = await Transaction.findById({ _id: req.params.id})
        await cloudinary.uploader.destroy(result.cloudinaryId)
        await Transaction.remove({_id: req.params.id})
        console.log(result)
        console.log("Transaction was deleted")
        res.redirect('/profile')
      } catch(err) {
        console.log(`Error happened at delete: ${err}`)
      }
      
    },
    getBuying: async(req,res) => {
      try {
        const result = await Transaction.find({typeOf: 'buying'})
        res.render('getBuying.ejs', {
          tranx  :result,
          user : req.user 
        })
      } catch(err) {
        console.log(`Error happened at GetBuying: ${getBuying}`)
      }
      
    },
    getListing: async(req,res) => {
      try {
        const result = await Transaction.findById(req.params.id)
        res.render("listing.ejs", {
          tranx: result,
          user: req.user
        })
      } catch(err) {
        console.log(`Error happened at GetList: ${err}`)
      }
    },
    getAllListing: async (req,res)=> {
      try {
        const result = await Transaction.find()
        res.render("allListings.ejs", {
          tranx: result
        })
      } catch(err) {
        console.log(`Error happened at GetAllListing: ${err}`)
      }

    },
    getSelling: async(req,res) => {
      try {
        const result = await Transaction.find({typeOf: 'selling'})
        res.render('getSelling.ejs', {
          tranx  :result,
          user : req.user 
        })
      } catch(err) {
        console.log(`Error happened at GetBuying: ${getBuying}`)
      }
      
    },
    getFree: async(req,res) => {
      try {
        const result = await Transaction.find({typeOf: 'giving'})
        res.render('getFree.ejs', {
          tranx  :result,
          user : req.user 
        })
      } catch(err) {
        console.log(`Error happened at GetBuying: ${getBuying}`)
      }
      
    },
    addBookmark: async(req,res) => {
      try {
        let currentUser = await User.findById({_id: req.user.id})

        if (currentUser.myBookmarks.indexOf(req.params.id)!== -1) {
          let user = await User.findOneAndUpdate({_id: req.user.id}, {
            $pull: {myBookmarks: req.params.id}
          })
          console.log('Bookmark removed')
        } else {
          
          let user = await User.findOneAndUpdate({_id: req.user.id}, {
            $push: {myBookmarks: req.params.id}
          })
          console.log('Bookmark added')
        }
      } catch(err) {
        console.log(`Error happened at addBookmark: ${err}`)
      }
    },
    getBookmarks: async(req,res) => {
      try {
        const arrayOfMyBookmarks = req.user.myBookmarks;
        const transactions = await Transaction.find({
          '_id': { $in: arrayOfMyBookmarks} 
        })

        res.render("getBookmarks.ejs", {
          tranx: transactions
        })
      }
      catch(err) {
        console.log(`Error at getBookmarks: ${err}`)
      }
    }

}